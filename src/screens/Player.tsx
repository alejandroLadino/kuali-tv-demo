import { useCallback, useEffect, useRef, useState } from 'react'
import { ChannelLogo } from '../components/ChannelLogo'
import {
  ChannelUpDown,
  ChevronLeft,
  ExpandIcon,
  PauseIcon,
  PlayIcon,
  SpeakerIcon,
} from '../components/Icons'
import { sourceFor, VideoSurface } from '../components/VideoSurface'
import type { Channel } from '../data/channels'
import { currentProgram, range } from '../lib/time'

export interface PlaybackProps {
  channel: Channel
  playing: boolean
  muted: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
}

/** Muestra los controles al tocar el video y los oculta tras unos segundos. */
function useAutoHide(delay = 3500) {
  const [visible, setVisible] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const arm = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setVisible(false), delay)
  }, [delay])
  const show = useCallback(() => {
    setVisible(true)
    arm()
  }, [arm])
  const toggle = useCallback(() => {
    setVisible((v) => {
      if (!v) arm()
      return !v
    })
  }, [arm])
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return { visible, show, toggle, setVisible }
}

/** Reproductor integrado en la parte superior de Casa (como en la captura). */
export function InlinePlayer({
  channel,
  playing,
  muted,
  onTogglePlay,
  onToggleMute,
  onExpand,
}: PlaybackProps & { onExpand: () => void }) {
  const ctl = useAutoHide()
  const hasAudio = sourceFor(channel).kind === 'video'
  const prog = currentProgram(channel)

  return (
    <div className="inline-player" data-testid="inline-player">
      <VideoSurface channel={channel} playing={playing} muted={muted} />
      <div
        className={`ctl-layer ${ctl.visible || !playing ? 'ctl-on' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) ctl.toggle()
        }}
        data-testid="player-tap"
      >
        <div className="ctl-top">
          <span className="ctl-live">EN VIVO</span>
          <span className="ctl-title">
            {channel.number} · {prog.title}
          </span>
        </div>
        <button
          className="ctl-round ctl-center"
          onClick={() => {
            onTogglePlay()
            ctl.show()
          }}
          aria-label={playing ? 'Pausar' : 'Reproducir'}
          data-testid="play-toggle"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className="ctl-bottom">
          {hasAudio && (
            <button className="ctl-icon" onClick={onToggleMute} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
              <SpeakerIcon muted={muted} />
            </button>
          )}
          <span className="flex1" />
          <button className="ctl-icon" onClick={onExpand} aria-label="Pantalla completa" data-testid="expand">
            <ExpandIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Reproductor a pantalla completa (horizontal).
 * PROVISIONAL: las capturas no muestran este estado; se diseñó siguiendo la
 * apariencia del reproductor integrado. Incluye cambio de canal ▲▼.
 */
export function FullscreenPlayer({
  channel,
  playing,
  muted,
  onTogglePlay,
  onToggleMute,
  onBack,
  onPrev,
  onNext,
  rotate,
}: PlaybackProps & {
  onBack: () => void
  onPrev: () => void
  onNext: () => void
  rotate: boolean
}) {
  const ctl = useAutoHide(4000)
  const hasAudio = sourceFor(channel).kind === 'video'
  const prog = currentProgram(channel)

  useEffect(() => {
    ctl.show()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel.id])

  return (
    <div className={`fs ${rotate ? 'fs-rotate' : ''}`} data-testid="fullscreen-player">
      <div className="fs-inner">
        <VideoSurface channel={channel} playing={playing} muted={muted} />
        <div
          className={`ctl-layer fs-ctl ${ctl.visible || !playing ? 'ctl-on' : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) ctl.toggle()
          }}
        >
          <div className="fs-top">
            <button className="fs-back" onClick={onBack} aria-label="Volver a Canales" data-testid="fs-back">
              <ChevronLeft />
              <span>Canales</span>
            </button>
            <div className="fs-info">
              <ChannelLogo channel={channel} size={34} />
              <div>
                <div className="fs-name">{prog.title}</div>
                <div className="fs-sub">
                  {channel.number} <span className="dot" /> {range(prog)}
                </div>
              </div>
            </div>
            {hasAudio ? (
              <button className="ctl-icon" onClick={onToggleMute} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
                <SpeakerIcon muted={muted} />
              </button>
            ) : (
              <span style={{ width: 44 }} />
            )}
          </div>
          <button
            className="ctl-round ctl-center"
            onClick={() => {
              onTogglePlay()
              ctl.show()
            }}
            aria-label={playing ? 'Pausar' : 'Reproducir'}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="fs-ch">
            <button className="ctl-icon" onClick={() => { onNext(); ctl.show() }} aria-label="Canal siguiente" data-testid="ch-up">
              <ChannelUpDown dir="up" />
            </button>
            <span>CH</span>
            <button className="ctl-icon" onClick={() => { onPrev(); ctl.show() }} aria-label="Canal anterior" data-testid="ch-down">
              <ChannelUpDown dir="down" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
