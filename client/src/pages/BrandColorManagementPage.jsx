import { useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import AddBrandFormModal from "../components/AddBrandFormModal";
import AddColorFormModal from "../components/AddColorFormModal";
import SimpleEntityList from "../components/SimpleEntityList";
import { useBrands } from "../hooks/useBrands";
import { useColors } from "../hooks/useColors";
import { Plus } from "lucide-react";

export default function BrandColorManagementPage() {
  const {
    brands,
    loading: loadingBrands,
    error: errorBrands,
    createBrand,
    removeBrand,
  } = useBrands();

  const {
    colors,
    loading: loadingColors,
    error: errorColors,
    createColor,
    removeColor,
  } = useColors();

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  const confirmDelete = async ({ title, name }) => {
    return Swal.fire({
      title,
      text: `Esta acción eliminará "${name}" permanentemente`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53935",
      cancelButtonColor: "#333",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
  };

  const handleDeleteBrand = async (brand) => {
    const result = await confirmDelete({
      title: "¿Eliminar marca?",
      name: brand.name,
    });
    if (result.isConfirmed) {
      try {
        await removeBrand(brand.id);
        Swal.fire("Eliminada", "La marca fue eliminada", "success");
      } catch (err) {
        Swal.fire("Error", err.message || "No se pudo eliminar", "error");
      }
    }
  };

  const handleDeleteColor = async (color) => {
    const result = await confirmDelete({
      title: "¿Eliminar color?",
      name: color.name,
    });
    if (result.isConfirmed) {
      try {
        await removeColor(color.id);
        Swal.fire("Eliminado", "El color fue eliminado", "success");
      } catch (err) {
        Swal.fire("Error", err.message || "No se pudo eliminar", "error");
      }
    }
  };

  return (
    <>
      <Header />

      <div className="main-content">
        <div className="container py-4">
          {/* ===== MARCAS ===== */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold m-0">Marcas</h2>
            <button
              className="btn btn-light d-flex align-items-center"
              style={{ borderRadius: "10px" }}
              type="button"
              onClick={() => setShowBrandModal(true)}
            >
              <Plus size={16} className="me-1" />
              Agregar Marca
            </button>
          </div>

          {loadingBrands && <p>Cargando marcas...</p>}
          {errorBrands && (
            <div className="alert alert-danger">{errorBrands}</div>
          )}
          {!loadingBrands && brands.length === 0 && (
            <p className="text-muted">No hay marcas registradas.</p>
          )}
          {!loadingBrands && brands.length > 0 && (
            <SimpleEntityList items={brands} onDelete={handleDeleteBrand} />
          )}

          <hr className="my-5" style={{ borderColor: "#2a2a2a" }} />

          {/* ===== COLORES ===== */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold m-0">Colores</h2>
            <button
              className="btn btn-light d-flex align-items-center"
              style={{ borderRadius: "10px" }}
              type="button"
              onClick={() => setShowColorModal(true)}
            >
              <Plus size={16} className="me-1" />
              Agregar Color
            </button>
          </div>

          {loadingColors && <p>Cargando colores...</p>}
          {errorColors && (
            <div className="alert alert-danger">{errorColors}</div>
          )}
          {!loadingColors && colors.length === 0 && (
            <p className="text-muted">No hay colores registrados.</p>
          )}
          {!loadingColors && colors.length > 0 && (
            <SimpleEntityList
              items={colors}
              onDelete={handleDeleteColor}
              renderMeta={(color) => (
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1px solid #444",
                    background: color.hexCode,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
              )}
            />
          )}
        </div>
      </div>

      {showBrandModal && (
        <AddBrandFormModal
          onCreate={createBrand}
          onSuccess={() => setShowBrandModal(false)}
          onClose={() => setShowBrandModal(false)}
        />
      )}

      {showColorModal && (
        <AddColorFormModal
          onCreate={createColor}
          onSuccess={() => setShowColorModal(false)}
          onClose={() => setShowColorModal(false)}
        />
      )}
    </>
  );
}
