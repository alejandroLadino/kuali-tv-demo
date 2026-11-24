import type { Channel } from '../data/channels'

/**
 * Logotipo del canal. Si `channel.logo` no está definido se dibuja un
 * distintivo PROVISIONAL (número + nombre corto) en lugar del logo original.
 */
export function ChannelLogo({ channel, size = 54 }: { channel: Channel; size?: number }) {
  if (channel.logo) {
    return (
      <img
        className="ch-logo-img"
        src={channel.logo}
        alt={channel.name}
        width={size}
        height={size}
        draggable={false}
      />
    )
  }
  return (
    <div
      className="ch-badge"
      style={{ width: size, height: size, ['--ch' as string]: channel.color }}
      aria-label={channel.name}
      title={`${channel.name} (logotipo provisional)`}
    >
      <span className="ch-badge-num" style={{ fontSize: size * 0.46 }}>
        {channel.number}
      </span>
      <span className="ch-badge-name" style={{ fontSize: Math.max(6, size * 0.13 * Math.min(1, 9 / channel.badge.length)) }}>
        {channel.badge}
      </span>
    </div>
  )
}
