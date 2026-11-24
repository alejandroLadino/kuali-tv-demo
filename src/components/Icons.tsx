/* Iconos en trazo, dibujados para el demo a partir de las capturas
   (estilo similar a SF Symbols). Sustituibles por el set original. */

type P = { size?: number; className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const HomeIcon = ({ size = 30 }: P) => (
  <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden>
    <path {...stroke} strokeWidth={2.2} d="M5 13.2 15 4.5l10 8.7V24a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
  </svg>
)

export const GuideIcon = ({ size = 30 }: P) => (
  <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden>
    <g {...stroke} strokeWidth={2.4}>
      <path d="M11 8h15M11 15h15M11 22h15" />
      <path d="M4.5 8h1.5M4.5 15h1.5M4.5 22h1.5" strokeWidth={3} />
    </g>
  </svg>
)

export const GearIcon = ({ size = 30 }: P) => {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden>
      <g {...stroke} strokeWidth={2}>
        <path
          d={teeth
            .map((a) => {
              const r1 = 9.2, r2 = 12.2, w = 11
              const p = (r: number, d: number) => {
                const rad = ((a + d) * Math.PI) / 180
                return `${(15 + r * Math.cos(rad)).toFixed(2)} ${(15 + r * Math.sin(rad)).toFixed(2)}`
              }
              return `${p(r1, -22.5 + 3)} L${p(r2, -w)} L${p(r2, w)} L${p(r1, 22.5 - 3)}`
            })
            .map((s, i) => (i === 0 ? `M${s}` : `L${s}`))
            .join(' ') + ' Z'}
        />
        <circle cx="15" cy="15" r="4.2" />
      </g>
    </svg>
  )
}

export const ChevronRight = ({ size = 14 }: P) => (
  <svg width={size * 0.6} height={size} viewBox="0 0 9 15" aria-hidden>
    <path {...stroke} strokeWidth={1.8} d="M1.5 1.5 7.5 7.5l-6 6" />
  </svg>
)

export const ChevronLeft = ({ size = 22 }: P) => (
  <svg width={size * 0.6} height={size} viewBox="0 0 12 20" aria-hidden>
    <path {...stroke} strokeWidth={2.6} d="M10 2 2 10l8 8" />
  </svg>
)

export const ChevronDown = ({ size = 14 }: P) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 15 9" aria-hidden>
    <path {...stroke} strokeWidth={1.8} d="M1.5 1.5 7.5 7.5l6-6" />
  </svg>
)

export const MailIcon = ({ size = 26 }: P) => (
  <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden>
    <g {...stroke} strokeWidth={1.6}>
      <rect x="2" y="5.5" width="22" height="15" rx="1.5" />
      <path d="m2.5 6.5 10.5 8.5 10.5-8.5M2.8 20l7.7-7M23.2 20l-7.7-7" />
    </g>
  </svg>
)

export const LockIcon = ({ size = 26 }: P) => (
  <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden>
    <g {...stroke} strokeWidth={1.6}>
      <rect x="6" y="11.5" width="14" height="11" rx="2.5" />
      <path d="M9 11.5V8a4 4 0 0 1 8 0v3.5" />
    </g>
  </svg>
)

export const PlayIcon = ({ size = 34 }: P) => (
  <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden>
    <path fill="currentColor" d="M10 6.5v21a1.5 1.5 0 0 0 2.3 1.3l16.5-10.5a1.5 1.5 0 0 0 0-2.6L12.3 5.2A1.5 1.5 0 0 0 10 6.5" />
  </svg>
)

export const PauseIcon = ({ size = 34 }: P) => (
  <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden>
    <rect x="8" y="6" width="6" height="22" rx="1.5" fill="currentColor" />
    <rect x="20" y="6" width="6" height="22" rx="1.5" fill="currentColor" />
  </svg>
)

export const ExpandIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden>
    <path {...stroke} strokeWidth={2} d="M13 3h6v6M9 19H3v-6M19 3l-6.5 6.5M3 19l6.5-6.5" />
  </svg>
)

export const SpeakerIcon = ({ size = 22, muted = false }: P & { muted?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden>
    <path fill="currentColor" d="M3 8h3.5L11 4v14l-4.5-4H3z" />
    {muted ? (
      <path {...stroke} strokeWidth={1.8} d="m14.5 8.5 5 5m0-5-5 5" />
    ) : (
      <path {...stroke} strokeWidth={1.8} d="M14.5 8a4 4 0 0 1 0 6M17 5.5a7.5 7.5 0 0 1 0 11" />
    )}
  </svg>
)

export const ChannelUpDown = ({ dir, size = 22 }: P & { dir: 'up' | 'down' }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden>
    <path {...stroke} strokeWidth={2.4} d={dir === 'up' ? 'M5 14l6-6 6 6' : 'M5 8l6 6 6-6'} />
  </svg>
)
