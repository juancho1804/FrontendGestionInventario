import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthPanel({ panelRef, open, view, setView, user, onLogin, onRegister, onLogout }) {
  return (
    <div ref={panelRef} className={`auth-panel ${open ? "auth-panel--open" : ""}`}>
      {user ? (
        <>
          <div className="auth-panel__user-info">
            <p className="auth-panel__username">Hola, {user.nombres}</p>
            <p className="auth-panel__email">{user.email}</p>
          </div>
          <div className="auth-panel__footer">
            <button onClick={onLogout} className="auth-btn auth-btn--secondary">
              Cerrar sesión
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="auth-panel__tabs">
            <button
              className={`auth-panel__tab ${view === "login" ? "auth-panel__tab--active" : ""}`}
              onClick={() => setView("login")}
            >
              Iniciar sesión
            </button>
            <button
              className={`auth-panel__tab ${view === "register" ? "auth-panel__tab--active" : ""}`}
              onClick={() => setView("register")}
            >
              Registrarse
            </button>
          </div>

          <div className="auth-panel__body">
            {view === "login" ? (
              <LoginForm onLogin={onLogin} onSuccess={() => {}} />
            ) : (
              <RegisterForm onRegister={onRegister} onSuccess={() => setView("login")} />
            )}
          </div>
        </>
      )}
    </div>
  );
}