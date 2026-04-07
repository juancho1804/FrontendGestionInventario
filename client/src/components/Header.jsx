import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { NAV_BY_ROLE } from "./config/navigationConfig";
import AuthPanel from "./auth/AuthPanel";
import NavMenu from "./navMenu";
import { Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ onGenderChange, selectedGender }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState("login");
  const { user, login, register, logout } = useAuth();

  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  const role = user?.role === "ROLE_ADMIN" ? "ADMIN" : "USER";
  const navItems = NAV_BY_ROLE[role];

  const handleGenderChange = (gender) => {
    if (onGenderChange) {
      onGenderChange(gender); // comportamiento normal en InventoryPage
    } else {
      // en ProductPage navega al inventario con el género
      navigate(gender ? `/?gender=${gender}` : "/");
    }
  };

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
    <header className="d-flex align-items-center px-4">
      <div className="d-flex align-items-center">
        <a className="navbar-brand me-4">
          <img src="/images/Copia de Store 1A.png" alt="Logo Store1A" />
        </a>
        <NavMenu
          items={navItems}
          onGenderChange={handleGenderChange} 
          selectedGender={selectedGender} 
        />
      </div>

      <div className="d-flex align-items-center gap-3 ms-auto">
        <button className="icon-btn">
          <Search size={20} />
        </button>
        <div className="auth-trigger-wrapper">
          <button
            ref={triggerRef}
            className="icon-btn"
            onClick={() => setOpen((o) => !o)}
          >
            <User size={20} />
          </button>
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
      </div>
    </header>
  );
}
