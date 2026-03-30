import { useState } from "react";
import { signinService, registerService } from "../services/userService";

const USER_KEY = "auth_user";
const TOKEN_KEY = "auth_token";

export function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const login = async (email, contrasenia, remember) => {
    const token = await signinService(email, contrasenia);

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userData = { email: payload.sub, role: payload.role, nombres: payload.nombres };

    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    }

    setToken(token);
    setUser(userData);
  };

  const register = async (formData) => {
    await registerService(formData);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  return { user, token, login, register, logout };
}