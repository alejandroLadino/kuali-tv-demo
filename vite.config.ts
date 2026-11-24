import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Rutas relativas: el build funciona en cualquier carpeta o servidor estático.
  base: './',
  plugins: [react()],
  // host: true expone el servidor en la red local para abrirlo desde el teléfono.
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
