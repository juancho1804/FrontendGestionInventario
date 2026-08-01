import { useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import AddCategoryFormModal from "../components/AddCategoryFormModal";
import { useCategories } from "../hooks/useCategories";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function CategoryManagementPage() {
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    removeCategory,
  } = useCategories();

  const [showModal, setShowModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleAdd = () => {
    setCategoryToEdit(null);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setShowModal(true);
  };

  const handleDelete = async (category) => {
    const result = await Swal.fire({
      title: "¿Eliminar categoría?",
      text: `Esta acción eliminará "${category.name}" permanentemente`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53935",
      cancelButtonColor: "#333",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await removeCategory(category.id);
        Swal.fire("Eliminada", "La categoría fue eliminada", "success");
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0">Gestión de Categorías</h2>
            <button
              className="btn btn-light d-flex align-items-center ms-auto me-5"
              style={{ borderRadius: "10px" }}
              type="button"
              onClick={handleAdd}
            >
              <i className="bi bi-plus-circle mx-1 text-success"></i>
              Agregar Categoría
            </button>
          </div>

          {loading && <p>Cargando categorías...</p>}
          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && categories.length === 0 && (
            <p className="text-muted">No hay categorías registradas.</p>
          )}

          {!loading && categories.length > 0 && (
            <div className="row g-3">
              {categories.map((cat) => (
                <div className="col-12 col-md-6 col-lg-4" key={cat.id}>
                  <div className="card p-3 d-flex flex-row align-items-center justify-content-between">
                    <div>
                      <p className="product-name m-0">{cat.name}</p>
                      <p className="product-brand m-0">{cat.gender}</p>
                    </div>
                    <div className="d-flex" style={{ gap: "8px" }}>
                      <button
                        title="Editar"
                        className="btn-icon"
                        onClick={() => handleEdit(cat)}
                      >
                        <Pencil size={16} color="#f6fe86" />
                      </button>
                      <button
                        title="Eliminar"
                        className="btn-icon"
                        onClick={() => handleDelete(cat)}
                      >
                        <Trash2 size={16} color="#ae3232" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddCategoryFormModal
          category={categoryToEdit}
          onCreate={createCategory}
          onUpdate={updateCategory}
          onSuccess={() => {
            setShowModal(false);
            setCategoryToEdit(null);
          }}
          onClose={() => {
            setShowModal(false);
            setCategoryToEdit(null);
          }}
        />
      )}
    </>
  );
}
