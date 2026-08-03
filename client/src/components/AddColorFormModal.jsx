import { useState } from "react";
import { toast } from "react-toastify";

export default function AddColorFormModal({ onCreate, onSuccess, onClose }) {
  const [name, setName] = useState("");
  const [hexCode, setHexCode] = useState("#000000");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onCreate({ name, hexCode });
      toast.success("Color creado");
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
      <div className="modal-dialog m-0" style={{ maxWidth: 420 }}>
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold">Agregar Color</h5>
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
                  placeholder="Ej: Rojo"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Color</label>
                <div className="d-flex align-items-center" style={{ gap: 10 }}>
                  <input
                    type="color"
                    value={hexCode}
                    onChange={(e) => setHexCode(e.target.value)}
                    style={{
                      width: 44,
                      height: 38,
                      padding: 0,
                      border: "1px solid #333",
                      borderRadius: 8,
                      background: "none",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={hexCode}
                    onChange={(e) => setHexCode(e.target.value)}
                    placeholder="#000000"
                    required
                  />
                </div>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg"
                  disabled={loading}
                >
                  {loading ? "Guardando..." : "Guardar Color"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
