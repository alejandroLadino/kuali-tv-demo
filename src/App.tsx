import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { brand } from './config/brand'
import { StatusBar, TabBar, type Tab } from './components/Chrome'
import { channels } from './data/channels'
import { resetScrollMemory } from './lib/useScrollMemory'
import { GuideScreen } from './screens/Guide'
import { HomeScreen } from './screens/Home'
import { LoginScreen } from './screens/Login'
import { FullscreenPlayer } from './screens/Player'
import { SettingsScreen, type SettingsPage } from './screens/Settings'

/**
 * Marco de teléfono en escritorio; pantalla completa en celular.
 * Forzar con ?marco=1 o ?marco=0 en la URL.
 */
function useFrameMode() {
  const forced = new URLSearchParams(location.search).get('marco')
  const query = '(min-width: 700px) and (min-height: 560px)'
  const [frame, setFrame] = useState(() =>
    forced ? forced === '1' : window.matchMedia(query).matches,
  )
  useEffect(() => {
    if (forced) return
    const mq = window.matchMedia(query)
    const on = () => setFrame(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [forced])
  return frame
}

function usePortrait() {
  const [p, setP] = useState(() => window.matchMedia('(orientation: portrait)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)')
    const on = () => setP(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return p
}

/** Escala el marco para que quepa en la ventana del escritorio. */
function useFrameScale(frame: boolean, landscape: boolean) {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    if (!frame) return
    const calc = () => {
      const w = landscape ? 868 : 414
      const h = landscape ? 414 : 868
      setScale(Math.min(1, (window.innerHeight - 48) / h, (window.innerWidth - 48) / w))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [frame, landscape])
  return scale
}

export default function App() {
  const frame = useFrameMode()
  const portrait = usePortrait()

  const [loggedIn, setLoggedIn] = useState(!brand.showLogin)
  const [tab, setTab] = useState<Tab>('casa')
  const [channelId, setChannelId] = useState(channels[0].id)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [settingsPage, setSettingsPage] = useState<SettingsPage>(null)
  const [toast, setToast] = useState<string | null>(null)
  // En el teléfono, girar a horizontal en Casa abre el reproductor completo.
  const [landscapeDismissed, setLandscapeDismissed] = useState(false)
  useEffect(() => setLandscapeDismissed(false), [portrait])
  const autoFull = !frame && !portrait && loggedIn && tab === 'casa' && !landscapeDismissed
  const toastTimer = useRef<number | undefined>(undefined)

  const channel = channels.find((c) => c.id === channelId) ?? channels[0]
  const scale = useFrameScale(frame, fullscreen)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const select = (id: string) => {
    setChannelId(id)
    setPlaying(true)
  }

  const step = (d: 1 | -1) => {
    const i = channels.findIndex((c) => c.id === channelId)
    select(channels[(i + d + channels.length) % channels.length].id)
  }

  // Pantalla completa con historial: el botón «atrás» del teléfono también regresa.
  const openFullscreen = () => {
    setFullscreen(true)
    history.pushState({ kualiFs: true }, '')
    if (!frame) {
      const el = document.documentElement
      el.requestFullscreen?.()
        .then(() => (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> }).lock?.('landscape'))
        .catch(() => {})
    }
  }
  const closeFullscreen = () => {
    if (autoFull && !fullscreen) return setLandscapeDismissed(true)
    if (history.state?.kualiFs) history.back()
    else setFullscreen(false)
  }
  useEffect(() => {
    const onPop = () => {
      setFullscreen(false)
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Teclado en escritorio: Esc sale, flechas cambian de canal en pantalla completa.
  useEffect(() => {
    if (!fullscreen && !autoFull) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen()
      if (e.key === 'ArrowUp') step(1)
      if (e.key === 'ArrowDown') step(-1)
      if (e.key === ' ') setPlaying((p) => !p)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const restart = () => {
    resetScrollMemory()
    setTab('casa')
    setSettingsPage(null)
    setChannelId(channels[0].id)
    setPlaying(true)
    setLoggedIn(!brand.showLogin)
  }

  const playback = {
    channel,
    playing,
    muted,
    onTogglePlay: () => setPlaying((p) => !p),
    onToggleMute: () => setMuted((m) => !m),
  }

  const app = (
    <div className={`app ${frame ? 'in-frame' : 'on-device'}`}>
      {frame && !fullscreen && <StatusBar />}
      {!loggedIn ? (
        <LoginScreen onEnter={() => setLoggedIn(true)} />
      ) : (
        <>
          {tab === 'casa' && (
            <HomeScreen {...playback} onSelect={select} onExpand={openFullscreen} suspended={fullscreen || autoFull} />
          )}
          {tab === 'guia' && (
            <GuideScreen
              playingId={channelId}
              onPlay={(id) => {
                select(id)
                setTab('casa')
              }}
              onInfo={showToast}
            />
          )}
          {tab === 'ajustes' && (
            <SettingsScreen
              page={settingsPage}
              onOpen={setSettingsPage}
              onRestart={restart}
              onInfo={showToast}
            />
          )}
          <TabBar
            tab={tab}
            onChange={(t) => {
              if (t === 'ajustes' && tab === 'ajustes') setSettingsPage(null)
              setTab(t)
            }}
          />
          {(fullscreen || autoFull) && (
            <FullscreenPlayer
              {...playback}
              onBack={closeFullscreen}
              onPrev={() => step(-1)}
              onNext={() => step(1)}
              rotate={!frame && portrait}
            />
          )}
        </>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
      {frame && <div className="home-indicator" />}
    </div>
  )

  if (!frame) return app

  return (
    <div className="desk">
      <div
        className={`phone ${fullscreen ? 'phone-land' : ''}`}
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <div className="phone-screen">{app}</div>
      </div>
    </div>
  )
}
