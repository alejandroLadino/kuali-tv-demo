# KualiDigital · Demo de TV en vivo

Demo web interactivo de la app móvil de televisión en vivo. Funciona con datos locales:
no requiere iniciar sesión, credenciales ni conexión a señales o APIs de producción.

## Arrancar

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev        # desarrollo: http://localhost:5173
```

Para presentar con la versión optimizada:

```bash
npm run build      # genera dist/
npm run preview    # sirve dist/ en http://localhost:4173
```

`dist/` es estático y usa rutas relativas: se puede subir tal cual a cualquier hosting.

## Abrir desde un teléfono en la misma red

1. Conecta la computadora y el teléfono a la misma red Wi-Fi.
2. Ejecuta `npm run dev` (o `npm run preview`). Vite muestra una línea **Network**,
   por ejemplo `http://192.168.1.25:5173/`.
3. Abre esa dirección en el navegador del teléfono.
4. Opcional: en iPhone, *Compartir → Agregar a inicio* para abrirlo sin barras del navegador.

Si no carga, revisa que el firewall de la computadora permita conexiones entrantes al puerto 5173/4173.

## Cómo se ve

- **Teléfono**: la app ocupa toda la pantalla y respeta las áreas seguras.
  Al girar el teléfono en *Casa* se abre el reproductor en horizontal.
- **Escritorio**: la app aparece dentro de un marco de iPhone; el marco gira a horizontal
  al abrir el reproductor completo. Teclas: `Esc` vuelve, `↑`/`↓` cambian de canal, espacio pausa.
- Forzar un modo: agrega `?marco=1` (marco) o `?marco=0` (pantalla completa) a la URL.

## Recorrido

Inicio de sesión → **Entrar** (sin credenciales) → *Casa*: tocar un canal lo reproduce arriba →
tocar el video muestra los controles → ⤢ abre el reproductor horizontal con cambio de canal ▲▼ →
**‹ Canales** regresa al mismo punto de la lista. *Guía*: tocar un programa al aire lo reproduce
en Casa; un programa futuro muestra su hora de inicio. *Ajustes → Acerca de → Cerrar sesión*
vuelve al inicio.

## Dónde cambiar cada cosa

| Qué | Archivo |
| --- | --- |
| Canales, números, programación, logotipos y video por canal | `src/data/channels.ts` |
| Colores, logotipo de la marca, video de demostración, hora/fecha del demo, mostrar login | `src/config/brand.ts` |
| Logotipos de canales | `public/logos/` y el campo `logo` de cada canal, p. ej. `` `${import.meta.env.BASE_URL}logos/canal-1.png` `` |
| Logotipo de KualiDigital | `public/brand/kualidigital-logo.png` |
| Video | `public/video/` y `brand.demoVideo` (o `video` en un canal) |
| Estilos | `src/index.css` |

### Video

- Sin video configurado, cada canal muestra una **vista previa animada** con su programa
  y el rótulo «Reproducción simulada».
- Con `brand.demoVideo` (un MP4 H.264 autorizado), todos los canales lo reproducen
  y se rotula «Video de demostración». Inicia en silencio (requisito de los navegadores);
  aparece el botón de sonido en los controles.
- Con `video` en un canal, ese canal usa su propio archivo sin rótulo.

### Hora del demo

La programación «al aire» se calcula con un reloj fijo (`brand.demoClock`, 11:33 pm del vie 20 nov,
como en las capturas), así el demo se ve igual a cualquier hora de la presentación.

## Pendientes provisionales

- **Logotipos de canales**: distintivos de color con número y nombre. Sustituir por los archivos originales.
- **Logotipo KualiDigital**: recortado de la captura (baja resolución). Sustituir por el SVG/PNG original.
- **Tipografía**: fuente del sistema (SF Pro en iPhone/Mac; la equivalente en otros equipos).
- **Iconos** de pestañas, login y reproductor: dibujados para el demo imitando las capturas.
- **Reproductor horizontal y controles sobre el video**: las capturas no los muestran; diseño propuesto.
- **Canales y programación**: nombres genéricos (*Canal 1 Noticias*, *Canal 2 Deportes*…) y programas de muestra, sin marcas ni títulos reales.
- **Selector de fecha de la Guía**: solo hay un día de muestra; no se despliega.
- **Ajustes → SAP** y **Política de privacidad**: solo presencia visual.
