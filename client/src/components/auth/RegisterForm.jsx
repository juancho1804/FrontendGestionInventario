import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterForm({ onRegister, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    try {
      await onRegister({
        nombres: form.nombres.value,
        apellidos: form.apellidos.value,
        email: form.email.value,
        contrasenia: form.contrasenia.value,
        identificacion: form.identificacion.value,
        tipoIdentificacion: form.tipoIdentificacion.value,
      });
      toast.success("Registro exitoso, inicia sesión");
      onSuccess(); // cambia a vista login
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input className="auth-input" type="text" name="nombres" placeholder="Nombres" required />
      <input className="auth-input" type="text" name="apellidos" placeholder="Apellidos" required />
      <input className="auth-input" type="email" name="email" placeholder="Email" required />
      <input className="auth-input" type="password" name="contrasenia" placeholder="Contraseña" required />
      <input className="auth-input" type="text" name="identificacion" placeholder="Identificación" required />
      <select className="auth-input" name="tipoIdentificacion" required>
        <option value="">Tipo de identificación</option>
        <option value="CEDULA">Cédula</option>
        <option value="TARJETA_IDENTIDAD">Tarjeta de identidad</option>
        <option value="EXTRANJERIA">Extranjería</option>
      </select>
      <button type="submit" className="auth-btn auth-btn--primary" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}