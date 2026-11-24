/**
 * Configuración de marca y del demo.
 * Cambia aquí colores, logotipo, video y el "reloj" del demo.
 */

const base = import.meta.env.BASE_URL

export const brand = {
  appName: 'KualiDigital',

  /**
   * Logotipo de la pantalla de inicio de sesión.
   * PROVISIONAL: recortado de la captura de la app (baja resolución).
   * Sustituir por el archivo original (SVG o PNG @3x) en public/brand/.
   */
  logo: `${base}brand/kualidigital-logo.png`,

  /** Colores muestreados de las capturas de la app actual. */
  colors: {
    accent: '#FF9500', // naranja: botón Entrar, pestaña activa, puntos de horario
    background: '#1A1A1A',
    surface: '#2F2F2F', // tarjetas de canal, formulario de login
    surfaceActive: '#565656', // canal en reproducción
    separator: '#383838',
    textPrimary: '#FFFFFF',
    textSecondary: '#A6A6A6',
    textMuted: '#7A7A7A',
  },

  /**
   * Video local autorizado para el demo (opcional).
   * Colócalo en public/video/ y escribe la ruta, p. ej. `${base}video/demo.mp4`.
   * Si se usa en todos los canales, el reproductor lo rotula «Video de demostración».
   * Con `null` se muestra una vista previa por canal rotulada «Reproducción simulada».
   */
  demoVideo: null as string | null,

  /**
   * Reloj fijo del demo para que la programación «en vivo» coincida siempre
   * con las capturas, sin importar la hora real de la presentación.
   */
  demoClock: {
    time: '23:33', // hora mostrada en la barra de estado y usada para "al aire"
    dateLabel: 'vie 20 nov', // fecha del selector de la Guía
  },

  /** Mostrar la pantalla de inicio de sesión al abrir (no valida credenciales). */
  showLogin: true,
}

export type Brand = typeof brand
