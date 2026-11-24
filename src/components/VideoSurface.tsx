import { useEffect, useRef } from 'react'
import { brand } from '../config/brand'
import type { Channel } from '../data/channels'
import { currentProgram, range } from '../lib/time'

export type VideoSource =
  | { kind: 'video'; src: string; label: string | null }
  | { kind: 'simulated' }

/** Decide qué mostrar para un canal: video propio, video de demostración o simulación. */
export function sourceFor(ch: Channel): VideoSource {
  if (ch.video) return { kind: 'video', src: ch.video, label: null }
  if (brand.demoVideo) return { kind: 'video', src: brand.demoVideo, label: 'Video de demostración' }
  return { kind: 'simulated' }
}

interface Props {
  channel: Channel
  playing: boolean
  muted: boolean
  /** Mostrar el rótulo «Reproducción simulada» / «Video de demostración». */
  showTag?: boolean
}

/** Área de video 16:9. Ocupa el contenedor y se centra con bandas negras. */
export function VideoSurface({ channel, playing, muted, showTag = true }: Props) {
  const src = sourceFor(channel)
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (playing) v.play().catch(() => {})
    else v.pause()
  }, [playing, channel.id])

  const prog = currentProgram(channel)

  return (
    <div className="video-box">
      <div className="video-16x9">
        {src.kind === 'video' ? (
          <video
            ref={ref}
            key={src.src}
            src={src.src}
            muted={muted}
            autoPlay
            loop
            playsInline
            className="video-el"
          />
        ) : (
          <div
            className={`sim ${playing ? '' : 'sim-paused'}`}
            style={{ ['--ch' as string]: channel.color }}
            key={channel.id}
          >
            <div className="sim-bg" />
            <div className="sim-scan" />
            <div className="sim-bug">{channel.badge}</div>
            <div className="sim-center">
              <div className="sim-title">{prog.title}</div>
              <div className="sim-sub">
                {channel.number} · {channel.name}
              </div>
            </div>
            <div className="sim-lower">
              <span className="sim-live">EN VIVO</span>
              <span className="sim-lower-text">{range(prog)}</span>
            </div>
          </div>
        )}
        {showTag && (src.kind === 'simulated' || src.label) && (
          <div className="video-tag">
            {src.kind === 'simulated' ? 'Reproducción simulada' : src.label}
          </div>
        )}
      </div>
    </div>
  )
}
