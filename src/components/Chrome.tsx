import type { ReactNode } from 'react'
import { clockLabel } from '../lib/time'
import { GearIcon, GuideIcon, HomeIcon } from './Icons'

export type Tab = 'casa' | 'guia' | 'ajustes'

/** Barra de estado simulada: solo se dibuja dentro del marco de escritorio. */
export function StatusBar() {
  return (
    <div className="statusbar" aria-hidden>
      <span className="sb-time">{clockLabel()}</span>
      <span className="sb-island" />
      <span className="sb-right">
        <svg width="18" height="12" viewBox="0 0 18 12">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4.6} y={8 - i * 2.6} width="3.2" height={4 + i * 2.6} rx="1" fill={i < 2 ? '#fff' : '#777'} />
          ))}
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <path fill="#fff" d="M8.5 2.2c2.5 0 4.8 1 6.5 2.6l1.2-1.3A11 11 0 0 0 8.5.4 11 11 0 0 0 .8 3.5L2 4.8a9.2 9.2 0 0 1 6.5-2.6m0 3.6c1.5 0 2.9.6 4 1.6l1.2-1.3a7.6 7.6 0 0 0-10.4 0l1.2 1.3c1.1-1 2.5-1.6 4-1.6m0 3.5c.6 0 1.1.2 1.5.6L8.5 11.5 7 9.9c.4-.4.9-.6 1.5-.6" />
        </svg>
        <span className="sb-battery">
          <span>76</span>
        </span>
      </span>
    </div>
  )
}

const TABS: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'casa', label: 'Casa', icon: <HomeIcon /> },
  { id: 'guia', label: 'Guía', icon: <GuideIcon /> },
  { id: 'ajustes', label: 'Ajustes', icon: <GearIcon /> },
]

export function TabBar({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="tabbar" aria-label="Navegación principal">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`tab ${tab === t.id ? 'tab-active' : ''}`}
          onClick={() => onChange(t.id)}
          aria-current={tab === t.id ? 'page' : undefined}
          data-testid={`tab-${t.id}`}
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
