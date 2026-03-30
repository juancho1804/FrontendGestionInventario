import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm({ onLogin, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    try {
      await onLogin(
        form.email.value,
        form.contrasenia.value,
        form.remember.checked
      );
      onSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input className="auth-input" type="email" name="email" placeholder="Email" required />
      <input className="auth-input" type="password" name="contrasenia" placeholder="Contraseña" required />
      <label className="auth-remember">
        <input type="checkbox" name="remember" />
        <span>Recordarme</span>
      </label>
      <button type="submit" className="auth-btn auth-btn--primary" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}