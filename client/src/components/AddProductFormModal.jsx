import { useProductForm } from "../hooks/useProductForm";
import { useCategories } from "../hooks/useCategories";
import { useBrands } from "../hooks/useBrands";

export default function AddProductFormModal({onSuccess}) {
  const { handleSubmit, loading, error } = useProductForm(onSuccess);
  const { categories, loading: loadingCategories, error: errorCategories } = useCategories();
  const {brands} = useBrands()

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="addProductFormModal"
      aria-labelledby="addProductLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProductLabel">
              Agregar Producto
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {errorCategories && <div className="alert alert-warning">{errorCategories}</div>}

            <form id="productForm" onSubmit={handleSubmit}>
              {/* Color + Precio */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="color" className="form-label">Color</label>
                  <input type="text" className="form-control" id="color" name="color" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="price" className="form-label">Precio</label>
                  <input type="number" className="form-control" id="price" name="price" required />
                </div>
              </div>

              {/* Categoría (dinámica) */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="category" className="form-label">Categoría</label>
                  <select className="form-select" id="category" name="category" required>
                    <option value="">
                      {loadingCategories ? "Cargando..." : "Seleccione..."}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Marca (por ahora estática) */}
                <div className="col-md-6">
                  <label htmlFor="brand" className="form-label">Marca</label>
                  <select className="form-select" id="brand" name="brand" required>
                    <option value={""}>
                      Seleccione...
                    </option>
                    {brands.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.brand}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

{/* Tallas */}
              <div className="mb-3">
                <label className="form-label">Tallas y Cantidad</label>
                <div className="row g-2">
                  {["S","M", "L", "XL", "XXL","XXXL"].map((size) => (
                    <div key={size} className="col-6 d-flex align-items-center">
                      <span className="me-2 fw-semibold">{size}:</span>
                      <input
                        type="number"
                        className="form-control"
                        name={`size_${size}`}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Imagen */}
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Imagen del producto</label>
                <input type="file" className="form-control" id="image" name="image" accept="image/*" />
              </div>

              {/* Botón */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}