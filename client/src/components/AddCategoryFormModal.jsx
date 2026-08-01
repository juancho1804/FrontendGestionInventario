import { useState } from "react";
import { toast } from "react-toastify";

const GENDER_OPTIONS = [
  { value: "HOMBRE", label: "Hombre" },
  { value: "MUJER", label: "Mujer" },
];

export default function AddCategoryFormModal({
  category = null,
  onCreate,
  onUpdate,
  onSuccess,
  onClose,
}) {
  const [name, setName] = useState(category?.name || "");
  const [gender, setGender] = useState(category?.gender || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const categoryData = { name, gender };
      if (category) {
        await onUpdate(category.id, categoryData);
        toast.success("Categoría actualizada");
      } else {
        await onCreate(categoryData);
        toast.success("Categoría creada");
      }
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog m-0" style={{ maxWidth: 480 }}>
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold">
              {category ? "Editar Categoría" : "Agregar Categoría"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Camisetas"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Género</label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Seleccione...</option>
                  {GENDER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg"
                  disabled={loading}
                >
                  {loading
                    ? "Guardando..."
                    : category
                      ? "Actualizar Categoría"
                      : "Guardar Categoría"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
