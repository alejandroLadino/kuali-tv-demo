import { useState } from 'react'
import { brand } from '../config/brand'
import { LockIcon, MailIcon } from '../components/Icons'

/**
 * Inicio de sesión (captura 2). En el demo NO valida credenciales:
 * «Entrar» funciona con los campos vacíos o con cualquier texto.
 */
export function LoginScreen({ onEnter }: { onEnter: () => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  return (
    <form
      className="screen login"
      onSubmit={(e) => {
        e.preventDefault()
        onEnter()
      }}
    >
      <img src={brand.logo} alt={brand.appName} className="login-logo" draggable={false} />
      <div className="login-card">
        <label className="login-field">
          <MailIcon />
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Nombre de usuario"
            autoComplete="off"
            autoCapitalize="off"
          />
        </label>
        <div className="login-sep" />
        <label className="login-field">
          <LockIcon />
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Contraseña"
            autoComplete="off"
          />
        </label>
      </div>
      <button type="submit" className="btn-accent login-btn" data-testid="login-enter">
        Entrar
      </button>
      <p className="login-hint">Demo: no se requieren credenciales</p>
      <span className="flex1" />
      <span className="login-privacy">Política de privacidad</span>
    </form>
  )
}
