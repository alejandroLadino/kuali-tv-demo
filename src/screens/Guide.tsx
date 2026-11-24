import { brand } from '../config/brand'
import { ChannelLogo } from '../components/ChannelLogo'
import { channels, GUIDE_END, GUIDE_START, toMin, type Channel, type Program } from '../data/channels'
import { fmt, isOnAir, NOW, range } from '../lib/time'
import { useScrollMemory } from '../lib/useScrollMemory'

/** Escala de la guía: 30 min ≈ 134 pt (medido en la captura). */
const PX_PER_MIN = 134 / 30
const LOGO_COL = 64
const ROW_H = 66

const ticks: number[] = []
for (let t = GUIDE_START; t <= GUIDE_END - 30; t += 30) ticks.push(t)

function label(min: number) {
  const h = Math.floor(min / 60) % 24
  const m = min % 60
  return fmt(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
}

/** Guía: rejilla de programación (captura 4). Datos de muestra locales. */
export function GuideScreen({
  playingId,
  onPlay,
  onInfo,
}: {
  playingId: string
  onPlay: (id: string) => void
  onInfo: (msg: string) => void
}) {
  const ref = useScrollMemory<HTMLDivElement>('guia', (el) => {
    // Al abrir por primera vez: situar el inicio del bloque actual (11:30 pm).
    const slot = Math.floor(NOW / 30) * 30
    el.scrollLeft = (slot - GUIDE_START) * PX_PER_MIN
  })

  const tap = (ch: Channel, p: Program) => {
    if (isOnAir(p)) onPlay(ch.id)
    else if (toMin(p.start) > NOW) onInfo(`${p.title} comienza a las ${fmt(p.start)}`)
    else onInfo(`${p.title} ya terminó`)
  }

  const width = (GUIDE_END - GUIDE_START) * PX_PER_MIN

  return (
    <div className="screen guide">
      <header className="guide-head">
        <h1>Guía</h1>
        {/* PROVISIONAL: la guía de muestra tiene un solo día; el selector no se despliega. */}
        <span className="guide-date" title="Guía de muestra: un solo día">
          {brand.demoClock.dateLabel}
        </span>
      </header>
      <div className="guide-scroll" ref={ref} data-testid="guide-scroll">
        <div className="guide-grid" style={{ width: LOGO_COL + width }}>
          <div className="guide-ruler" style={{ paddingLeft: LOGO_COL }}>
            <div className="guide-corner" style={{ width: LOGO_COL }} />
            {ticks.map((t) => (
              <span key={t} className="tick" style={{ left: LOGO_COL + (t - GUIDE_START) * PX_PER_MIN }}>
                {label(t)}
              </span>
            ))}
          </div>
          {channels.map((ch) => (
            <div key={ch.id} className={`g-row ${ch.id === playingId ? 'g-row-active' : ''}`} style={{ height: ROW_H }}>
              <button
                className="g-logo"
                style={{ width: LOGO_COL }}
                onClick={() => onPlay(ch.id)}
                aria-label={`Ver ${ch.name}`}
              >
                <ChannelLogo channel={ch} size={44} />
                <span>{ch.number}</span>
              </button>
              {ch.schedule.map((p) => {
                const s = Math.max(toMin(p.start), GUIDE_START)
                const e = Math.min(toMin(p.end), GUIDE_END)
                if (e <= s) return null
                return (
                  <button
                    key={p.start}
                    className={`g-cell ${isOnAir(p) ? 'g-cell-now' : ''}`}
                    style={{
                      left: LOGO_COL + (s - GUIDE_START) * PX_PER_MIN + 3,
                      width: (e - s) * PX_PER_MIN - 6,
                    }}
                    onClick={() => tap(ch, p)}
                  >
                    <span className="g-title">{p.title}</span>
                    <span className="g-meta">
                      {ch.number} <span className="dot" /> {range(p)}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
          <div className="tab-spacer" />
        </div>
      </div>
    </div>
  )
}
