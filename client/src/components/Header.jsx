import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import AuthPanel from "./auth/AuthPanel";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("login");
  const {user, login, register, logout} = useAuth();

  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      )
        setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <header className="d-flex align-items-center justify-content-between px-4">
      <a className="navbar-brand" href="#">
        <img src="/src/images/Copia de Store 1A.png" alt="Logo Store1A" />
      </a>

      <ul className="nav">
        <li>
          <a className="nav-link active fw-semibold">INVENTARIO</a>
        </li>
        <li>
          <a className="nav-link">ORDENES</a>
        </li>
        <li>
          <a className="nav-link">ATENDER</a>
        </li>
      </ul>

      <div className="auth-trigger-wrapper">
        <a
          ref={triggerRef}
          className="nav-link text-white user-icon"
          onClick={() => setOpen((o) => !o)}
        >
          <i className="bi bi-person fs-4"></i>
        </a>
        <AuthPanel
          panelRef={panelRef}
          open={open}
          view={view}
          setView={setView}
          user={user}
          onLogin={async (email, contrasenia, remember) => {
            await login(email, contrasenia, remember);
            setOpen(false);
          }}
          onRegister={register}
          onLogout={() => {
            logout();
            setOpen(false);
          }}
        />
      </div>
    </header>
  );
}
