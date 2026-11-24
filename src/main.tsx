import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { brand } from './config/brand'
import './index.css'
import App from './App'

// Pasar los colores de marca a variables CSS.
const c = brand.colors
const root = document.documentElement.style
root.setProperty('--accent', c.accent)
root.setProperty('--bg', c.background)
root.setProperty('--surface', c.surface)
root.setProperty('--surface-active', c.surfaceActive)
root.setProperty('--separator', c.separator)
root.setProperty('--text', c.textPrimary)
root.setProperty('--text-2', c.textSecondary)
root.setProperty('--text-3', c.textMuted)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
