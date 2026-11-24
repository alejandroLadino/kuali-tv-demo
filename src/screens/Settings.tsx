import { brand } from '../config/brand'
import { ChevronLeft, ChevronRight } from '../components/Icons'

export type SettingsPage = null | 'acerca' | 'sap'

/** Ajustes (captura 1). Fuera del alcance de TV en vivo: solo presencia visual. */
export function SettingsScreen({
  page,
  onOpen,
  onRestart,
  onInfo,
}: {
  page: SettingsPage
  onOpen: (p: SettingsPage) => void
  onRestart: () => void
  onInfo: (msg: string) => void
}) {
  if (page) {
    return (
      <div className="screen settings">
        <header className="nav-bar">
          <button className="nav-back" onClick={() => onOpen(null)}>
            <ChevronLeft size={20} />
            <span>Ajustes</span>
          </button>
          <h1>{page === 'acerca' ? 'Acerca de' : 'SAP'}</h1>
        </header>
        {page === 'acerca' ? (
          <AboutPage onRestart={onRestart} onInfo={onInfo} />
        ) : (
          <div className="settings-body">
            <p className="muted">
              Ajuste de audio de la app actual. Su funcionamiento no se incluye en este demo de TV
              en vivo.
            </p>
          </div>
        )}
      </div>
    )
  }
  return (
    <div className="screen settings">
      <header className="nav-bar">
        <h1>Ajustes</h1>
      </header>
      <div className="settings-list">
        <button className="settings-row" onClick={() => onOpen('acerca')}>
          <span>Acerca de</span>
          <ChevronRight />
        </button>
        <button className="settings-row" onClick={() => onOpen('sap')}>
          <span>SAP</span>
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

/** Acerca de (captura de la app): cuenta, versión, política y cierre de sesión. */
function AboutPage({ onRestart, onInfo }: { onRestart: () => void; onInfo: (msg: string) => void }) {
  return (
    <div className="about">
      <div className="settings-row settings-info">
        <span>Nombre de la cuenta</span>
        <span className="settings-value">{brand.about.accountName}</span>
      </div>
      <div className="settings-row settings-info">
        <span>Versión</span>
        <span className="settings-value">{brand.about.version}</span>
      </div>
      <button
        className="settings-row"
        onClick={() => onInfo('La política de privacidad no se incluye en este demo')}
      >
        <span className="settings-link">Política de privacidad</span>
        <span className="settings-arrow">&gt;</span>
      </button>
      <button className="btn-logout" onClick={onRestart} data-testid="restart">
        Cerrar sesión
      </button>
    </div>
  )
}
