import { brand } from '../config/brand'
import { toMin, type Channel, type Program } from '../data/channels'

export const NOW = toMin(brand.demoClock.time)

/** "23:30" → "11:30 pm" (formato de las capturas). */
export function fmt(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h < 12 ? 'am' : 'pm'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function range(p: Program): string {
  return `${fmt(p.start)} - ${fmt(p.end)}`
}

export function currentProgram(ch: Channel, now = NOW): Program {
  return (
    ch.schedule.find((p) => toMin(p.start) <= now && now < toMin(p.end)) ??
    ch.schedule[0]
  )
}

export function isOnAir(p: Program, now = NOW): boolean {
  return toMin(p.start) <= now && now < toMin(p.end)
}

/** Hora del reloj del demo como "11:33". */
export function clockLabel(): string {
  const [h, m] = brand.demoClock.time.split(':').map(Number)
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')}`
}
