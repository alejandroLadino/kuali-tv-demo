/**
 * Catálogo de canales del demo (datos locales, sin APIs de producción).
 *
 * - Los canales y programas de las 11:00 pm a la 1:00 am provienen de las
 *   capturas de Casa y Guía. Lo que no se veía en ellas es DATO DE MUESTRA.
 * - `logo`: ruta a la imagen original del canal en public/logos/. Mientras
 *   esté vacío se muestra un distintivo provisional con número y nombre.
 * - `video`: video propio de ese canal (opcional). Si no hay, se usa
 *   brand.demoVideo y, si tampoco existe, la reproducción simulada.
 * - Horarios en formato 24 h. Las horas antes de las 12:00 se consideran
 *   de la madrugada siguiente (la guía cubre de 10:00 pm a 3:00 am).
 */

export interface Program {
  title: string
  start: string // "HH:MM"
  end: string // "HH:MM"
}

export interface Channel {
  id: string
  number: number
  name: string
  /** Texto corto del distintivo provisional. */
  badge: string
  /** Color del distintivo provisional y de la vista previa simulada. */
  color: string
  logo?: string
  video?: string
  schedule: Program[]
}

/** Completa la programación con bloques de 30 min hasta las 3:00 am. */
function fill(programs: Program[], filler = 'Inova', until = '03:00'): Program[] {
  const out = [...programs]
  let last = out[out.length - 1].end
  while (toMin(last) < toMin(until)) {
    const next = fromMin(Math.min(toMin(last) + 30, toMin(until)))
    out.push({ title: filler, start: last, end: next })
    last = next
  }
  return out
}

/** Minutos desde las 00:00 del día del demo (madrugada = +24 h). */
export function toMin(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return (h < 12 ? h + 24 : h) * 60 + m
}

function fromMin(min: number): string {
  const h = Math.floor(min / 60) % 24
  const m = min % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export const channels: Channel[] = [
  {
    id: 'azteca-uno',
    number: 1,
    name: 'Azteca Uno',
    badge: 'AZTECA UNO',
    color: '#2E7BD6',
    schedule: fill([
      { title: 'Ventaneando', start: '22:00', end: '23:30' }, // muestra
      { title: 'Los protagonistas', start: '23:30', end: '00:30' },
      { title: 'Inova', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'las-estrellas',
    number: 2,
    name: 'Las Estrellas',
    badge: 'LAS ESTRELLAS',
    color: '#7A5AC8',
    schedule: fill([
      { title: 'N+ Noticias', start: '22:00', end: '23:00' }, // muestra
      { title: 'Tercer grado deportivo', start: '23:00', end: '00:00' },
      { title: 'Iglesia universal', start: '00:00', end: '00:30' },
      { title: 'Iglesia universal', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'imagen-tv',
    number: 3,
    name: 'Imagen Televisión',
    badge: 'IMAGEN TV',
    color: '#D63A3A',
    schedule: fill([
      { title: 'Imagen Televisión', start: '22:00', end: '00:00' },
      { title: 'Imagen Televisión', start: '00:00', end: '02:00' },
    ]),
  },
  {
    id: 'foro',
    number: 4,
    name: 'Foro',
    badge: 'FORO',
    color: '#C81E2B',
    schedule: fill([
      { title: 'Es la hora de opinar', start: '22:00', end: '23:30' }, // muestra
      { title: 'Las noticias', start: '23:30', end: '00:00' },
      { title: 'CV directo', start: '00:00', end: '00:30' },
      { title: 'Inova', start: '00:30', end: '01:00' },
      { title: 'Historias de la ciudad', start: '01:00', end: '02:00' }, // título completo: muestra
    ]),
  },
  {
    id: 'canal-5',
    number: 5,
    name: 'Canal 5',
    badge: 'CANAL 5',
    color: '#3A8F5C',
    schedule: fill([
      { title: 'Cine de noche', start: '22:00', end: '23:30' }, // muestra
      { title: 'Contacto deportivo', start: '23:30', end: '00:00' },
      { title: 'Inova', start: '00:00', end: '00:30' },
      { title: 'Inova', start: '00:30', end: '01:00' },
      { title: 'México mágico', start: '01:00', end: '01:30' }, // título completo: muestra
    ]),
  },
  {
    id: 'canal-6',
    number: 6,
    name: 'Canal 6',
    badge: 'CANAL 6',
    color: '#D9A21B',
    schedule: fill([
      { title: 'Noticias 6', start: '22:00', end: '23:00' }, // muestra
      { title: 'Es Show', start: '23:00', end: '00:00' },
      { title: 'Buenas noches Don Fematt', start: '00:00', end: '01:00' },
      { title: 'Cuando el amor llega', start: '01:00', end: '02:00' }, // título completo: muestra
    ]),
  },
  {
    id: 'azteca-7',
    number: 7,
    name: 'Azteca 7',
    badge: 'AZTECA 7',
    color: '#4C6EF5',
    schedule: fill([
      { title: 'Lo mejor de la Liga', start: '22:00', end: '23:30' }, // muestra
      { title: 'Travesuras de amor', start: '23:30', end: '00:30' },
      { title: 'Inova', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'a-mas',
    number: 8,
    name: 'a+',
    badge: 'A+',
    color: '#2F6FD0',
    schedule: fill([
      { title: 'Noticias a+', start: '22:00', end: '00:02' }, // muestra
      { title: 'Inova', start: '00:02', end: '00:30' },
      { title: 'Inova', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'nueve',
    number: 9,
    name: 'Nu9ve',
    badge: 'NU9VE',
    color: '#8C8C8C',
    schedule: fill([
      { title: 'Cine Nu9ve', start: '22:00', end: '00:00' }, // muestra
      { title: 'Crónicas', start: '00:00', end: '00:30' },
      { title: 'Crónicas', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'once',
    number: 11,
    name: 'Once',
    badge: 'ONCE',
    color: '#A8323E',
    schedule: fill([
      { title: 'Once Noticias', start: '22:00', end: '00:02' }, // muestra
      { title: 'Pandora y el holandés errante', start: '00:02', end: '02:00' },
    ]),
  },
  // Canales de muestra para demostrar el desplazamiento del catálogo.
  {
    id: 'canal-14',
    number: 14,
    name: 'Canal 14',
    badge: 'CANAL 14',
    color: '#5A8F3A',
    schedule: fill([
      { title: 'Documentales', start: '22:00', end: '00:00' },
      { title: 'Conversatorio', start: '00:00', end: '01:00' },
    ]),
  },
  {
    id: 'canal-22',
    number: 22,
    name: 'Canal 22',
    badge: 'CANAL 22',
    color: '#B5487A',
    schedule: fill([
      { title: 'Noches de jazz', start: '22:00', end: '00:00' },
      { title: 'Cine de arte', start: '00:00', end: '02:00' },
    ]),
  },
]

export const GUIDE_START = toMin('22:00')
export const GUIDE_END = toMin('03:00')
