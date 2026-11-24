import { useLayoutEffect, useRef } from 'react'

/** Posiciones de desplazamiento guardadas por pantalla durante la sesión del demo. */
const memory = new Map<string, { top: number; left: number }>()

/**
 * Guarda y restaura la posición de desplazamiento de un contenedor, para volver
 * al mismo punto del catálogo/guía al cambiar de pestaña o salir del reproductor.
 */
export function useScrollMemory<T extends HTMLElement>(
  key: string,
  initial?: (el: T) => void,
) {
  const ref = useRef<T>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const saved = memory.get(key)
    if (saved) {
      el.scrollTop = saved.top
      el.scrollLeft = saved.left
    } else if (initial) {
      initial(el)
    }
    const onScroll = () => memory.set(key, { top: el.scrollTop, left: el.scrollLeft })
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return ref
}

export function resetScrollMemory() {
  memory.clear()
}
