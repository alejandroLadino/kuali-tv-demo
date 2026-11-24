import { useEffect } from 'react'
import { ChannelLogo } from '../components/ChannelLogo'
import { channels } from '../data/channels'
import { currentProgram, range } from '../lib/time'
import { useScrollMemory } from '../lib/useScrollMemory'
import { InlinePlayer, type PlaybackProps } from './Player'

/** Casa: reproductor arriba y lista «Canales» desplazable debajo (captura 3). */
export function HomeScreen({
  onSelect,
  onExpand,
  suspended,
  ...playback
}: PlaybackProps & { onSelect: (id: string) => void; onExpand: () => void; suspended: boolean }) {
  const listRef = useScrollMemory<HTMLDivElement>('casa')
  const { channel } = playback

  // Si el canal activo quedó fuera de la vista (p. ej. elegido desde la Guía o
  // con ▲▼ en pantalla completa), desplazar lo mínimo para mostrarlo.
  // No se mide mientras el reproductor completo está abierto (el marco gira).
  useEffect(() => {
    if (suspended) return
    const t = window.setTimeout(() => {
      const list = listRef.current
      const el = list?.querySelector<HTMLElement>(`[data-ch="${channel.id}"]`)
      if (!el || !list) return
      const top = el.offsetTop - list.offsetTop
      const bottomLimit = list.scrollTop + list.clientHeight - 90 // barra de pestañas
      if (top < list.scrollTop) list.scrollTo({ top: Math.max(0, top - 12) })
      else if (top + el.offsetHeight > bottomLimit)
        list.scrollTo({ top: top + el.offsetHeight - list.clientHeight + 102 })
    }, 500)
    return () => window.clearTimeout(t)
  }, [channel.id, suspended, listRef])

  return (
    <div className="screen home">
      <InlinePlayer {...playback} onExpand={onExpand} />
      <h1 className="home-title">Canales</h1>
      <div className="list-scroll" ref={listRef} data-testid="channel-list">
        {channels.map((ch) => {
          const p = currentProgram(ch)
          const active = ch.id === channel.id
          return (
            <button
              key={ch.id}
              data-ch={ch.id}
              className={`ch-card ${active ? 'ch-card-active' : ''}`}
              onClick={() => onSelect(ch.id)}
              aria-pressed={active}
              aria-label={`${ch.name}: ${p.title}`}
            >
              <ChannelLogo channel={ch} />
              <span className="ch-text">
                <span className="ch-prog">{p.title}</span>
                <span className="ch-meta">
                  {ch.number} <span className="dot" /> {range(p)}
                </span>
              </span>
            </button>
          )
        })}
        <div className="tab-spacer" />
      </div>
    </div>
  )
}
