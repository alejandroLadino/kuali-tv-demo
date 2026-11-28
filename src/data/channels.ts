/**
 * Catálogo de canales del demo (datos locales, sin APIs de producción).
 *
 * - Canales y programas son genéricos (Canal N + género) para no usar
 *   marcas ni títulos reales. Todo es DATO DE MUESTRA.
 * - `logo`: ruta a la imagen original del canal en public/logos/. Mientras
 *   esté vacío se muestra un distintivo provisional con número y nombre.
 * - `photo`: foto libre de derechos (Unsplash/Pexels) que se muestra de fondo
 *   en la vista previa simulada. Sin foto se usa un fondo de color animado.
 * - `video`: video propio de ese canal (opcional). Si no hay, se usa
 *   brand.demoVideo y, si tampoco existe, la reproducción simulada.
 * - Horarios en formato 24 h. Las horas antes de las 12:00 se consideran
 *   de la madrugada siguiente (la guía cubre de 10:00 pm a 3:00 am).
 */

const fotos = `${import.meta.env.BASE_URL}fotos/`

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
  /** Foto de fondo de la vista previa simulada (public/fotos/canal-N.jpg). */
  photo?: string
  video?: string
  schedule: Program[]
}

/** Completa la programación con bloques de 30 min hasta las 3:00 am. */
function fill(programs: Program[], filler = 'Programa pagado', until = '03:00'): Program[] {
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
    id: 'canal-1',
    number: 1,
    name: 'Canal 1 Noticias',
    badge: 'NOTICIAS',
    color: '#2E7BD6',
    schedule: fill([
      { title: 'Noticiero estelar', start: '22:00', end: '23:30' },
      { title: 'Análisis de la noche', start: '23:30', end: '00:30' },
      { title: 'Resumen informativo', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'canal-2',
    number: 2,
    name: 'Canal 2 Deportes',
    badge: 'DEPORTES',
    color: '#3A8F5C',
    photo: `${fotos}canal-2.jpg`,
    schedule: fill([
      { title: 'Fútbol en vivo', start: '22:00', end: '23:00' },
      { title: 'Zona deportiva', start: '23:00', end: '00:00' },
      { title: 'Grandes jugadas', start: '00:00', end: '00:30' },
      { title: 'Grandes jugadas', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'canal-3',
    number: 3,
    name: 'Canal 3 Novelas',
    badge: 'NOVELAS',
    color: '#B5487A',
    photo: `${fotos}canal-3.jpg`,
    schedule: fill([
      { title: 'Amor en la ciudad', start: '22:00', end: '00:00' },
      { title: 'Corazones cruzados', start: '00:00', end: '02:00' },
    ]),
  },
  {
    id: 'canal-4',
    number: 4,
    name: 'Canal 4 Cine',
    badge: 'CINE',
    color: '#C81E2B',
    photo: `${fotos}canal-4.jpg`,
    schedule: fill([
      { title: 'Función estelar', start: '22:00', end: '23:30' },
      { title: 'Cortometrajes', start: '23:30', end: '00:00' },
      { title: 'Cine clásico', start: '00:00', end: '00:30' },
      { title: 'Cine clásico', start: '00:30', end: '01:00' },
      { title: 'Trasnoche de película', start: '01:00', end: '02:00' },
    ]),
  },
  {
    id: 'canal-5',
    number: 5,
    name: 'Canal 5 Infantil',
    badge: 'INFANTIL',
    color: '#D9A21B',
    schedule: fill([
      { title: 'Aventuras animadas', start: '22:00', end: '23:30' },
      { title: 'Cuentos para dormir', start: '23:30', end: '00:00' },
      { title: 'Dibujos clásicos', start: '00:00', end: '00:30' },
      { title: 'Dibujos clásicos', start: '00:30', end: '01:00' },
      { title: 'Pequeños exploradores', start: '01:00', end: '01:30' },
    ]),
  },
  {
    id: 'canal-6',
    number: 6,
    name: 'Canal 6 Música',
    badge: 'MÚSICA',
    color: '#7A5AC8',
    photo: `${fotos}canal-6.jpg`,
    schedule: fill([
      { title: 'Conciertos en vivo', start: '22:00', end: '23:00' },
      { title: 'Ranking musical', start: '23:00', end: '00:00' },
      { title: 'Sesiones acústicas', start: '00:00', end: '01:00' },
      { title: 'Videos de la noche', start: '01:00', end: '02:00' },
    ]),
  },
  {
    id: 'canal-7',
    number: 7,
    name: 'Canal 7 Variedades',
    badge: 'VARIEDADES',
    color: '#4C6EF5',
    schedule: fill([
      { title: 'Show de variedades', start: '22:00', end: '23:30' },
      { title: 'Noche de concursos', start: '23:30', end: '00:30' },
      { title: 'Programa pagado', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'canal-8',
    number: 8,
    name: 'Canal 8 Cultura',
    badge: 'CULTURA',
    color: '#2F6FD0',
    photo: `${fotos}canal-8.jpg`,
    schedule: fill([
      { title: 'Arte y sociedad', start: '22:00', end: '00:02' },
      { title: 'Programa pagado', start: '00:02', end: '00:30' },
      { title: 'Programa pagado', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'canal-9',
    number: 9,
    name: 'Canal 9 Documentales',
    badge: 'DOCS',
    color: '#8C8C8C',
    photo: `${fotos}canal-9.jpg`,
    schedule: fill([
      { title: 'Planeta salvaje', start: '22:00', end: '00:00' },
      { title: 'Historias reales', start: '00:00', end: '00:30' },
      { title: 'Historias reales', start: '00:30', end: '01:00' },
    ]),
  },
  {
    id: 'canal-10',
    number: 10,
    name: 'Canal 10 Series',
    badge: 'SERIES',
    color: '#A8323E',
    photo: `${fotos}canal-10.jpg`,
    schedule: fill([
      { title: 'Maratón de series', start: '22:00', end: '00:02' },
      { title: 'Misterio en la costa', start: '00:02', end: '02:00' },
    ]),
  },
  {
    id: 'canal-11',
    number: 11,
    name: 'Canal 11 Comedia',
    badge: 'COMEDIA',
    color: '#5A8F3A',
    photo: `${fotos}canal-11.jpg`,
    schedule: fill([
      { title: 'Noche de risas', start: '22:00', end: '00:00' },
      { title: 'Stand-up', start: '00:00', end: '01:00' },
    ]),
  },
  {
    id: 'canal-12',
    number: 12,
    name: 'Canal 12 Hogar',
    badge: 'HOGAR',
    color: '#D63A3A',
    photo: `${fotos}canal-12.jpg`,
    schedule: fill([
      { title: 'Cocina fácil', start: '22:00', end: '00:00' },
      { title: 'Viajes y destinos', start: '00:00', end: '02:00' },
    ]),
  },
]

export const GUIDE_START = toMin('22:00')
export const GUIDE_END = toMin('03:00')
