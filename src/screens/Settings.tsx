import { brand } from '../config/brand'
import { ChevronLeft, ChevronRight } from '../components/Icons'

export type SettingsPage = null | 'acerca' | 'sap'

/** Ajustes (captura 1). Fuera del alcance de TV en vivo: solo presencia visual. */
export function SettingsScreen({
  page,
  onOpen,
  onRestart,
}: {
  page: SettingsPage
  onOpen: (p: SettingsPage) => void
  onRestart: () => void
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
        <div className="settings-body">
          {page === 'acerca' ? (
            <>
              <img src={brand.logo} alt={brand.appName} className="about-logo" />
              <p>Demo interactivo de la app de televisión en vivo.</p>
              <p className="muted">
                Programación, logotipos de canales y reproducción son de muestra. No se conecta
                a señales ni servicios de producción.
              </p>
              <button className="btn-accent" onClick={onRestart} data-testid="restart">
                Reiniciar demo
              </button>
            </>
          ) : (
            <p className="muted">
              Ajuste de audio de la app actual. Su funcionamiento no se incluye en este demo de TV
              en vivo.
            </p>
          )}
        </div>
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
