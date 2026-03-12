import { useProductForm } from "../hooks/useProductForm";
import { useCategories } from "../hooks/useCategories";
import { useBrands } from "../hooks/useBrands";

const SIZES = ["S","M","L","XL","XXL","XXXL"];

export default function AddProductFormModal({ product = null, onSuccess }) {

  const { handleSubmit, loading, error } = useProductForm(product, onSuccess);

  const {
    categories,
    loading: loadingCategories,
    error: errorCategories
  } = useCategories();

  const {
    brands,
    loading: loadingBrands,
    error: errorBrands
  } = useBrands();

  return (
    <div
      className="modal fade"
      id="addProductFormModal"
      tabIndex="-1"
      aria-labelledby="addProductLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title" id="addProductLabel">
              {product ? "Editar Producto" : "Agregar Producto"}
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          {/* BODY */}
          <div className="modal-body">

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            {errorCategories && (
              <div className="alert alert-warning">{errorCategories}</div>
            )}

            {errorBrands && (
              <div className="alert alert-warning">{errorBrands}</div>
            )}

            <form onSubmit={handleSubmit}>

              {/* COLOR + PRECIO */}
              <div className="row mb-3">

                <div className="col-md-6">
                  <label className="form-label">Color</label>
                  <input
                    type="text"
                    className="form-control"
                    name="color"
                    defaultValue={product?.color}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    defaultValue={product?.price}
                    required
                  />
                </div>

              </div>

              {/* CATEGORIA + MARCA */}
              <div className="row mb-3">

                <div className="col-md-6">
                  <label className="form-label">Categoría</label>

                  <select
                    className="form-select"
                    name="category"
                    defaultValue={product?.categoryId || ""}
                    required
                  >
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

                <div className="col-md-6">
                  <label className="form-label">Marca</label>

                  <select
                    className="form-select"
                    name="brand"
                    defaultValue={product?.brandId || ""}
                    required
                  >
                    <option value="">
                      {loadingBrands ? "Cargando..." : "Seleccione..."}
                    </option>

                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.brand}
                      </option>
                    ))}

                  </select>
                </div>

              </div>

              {/* TALLAS */}
              <div className="mb-3">

                <label className="form-label">
                  Tallas y Cantidad
                </label>

                <div className="row g-2">

                  {SIZES.map((size) => (
                    <div
                      key={size}
                      className="col-6 d-flex align-items-center"
                    >

                      <span className="me-2 fw-semibold">
                        {size}:
                      </span>

                      <input
                        type="number"
                        className="form-control"
                        name={`size_${size}`}
                        min="0"
                        placeholder="0"
                      />

                    </div>
                  ))}

                </div>

              </div>

              {/* IMAGEN */}
              <div className="mb-3">

                <label className="form-label">
                  Imagen del producto
                </label>

                <input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                />

              </div>

              {/* BOTON */}
              <div className="d-grid">

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >

                  {loading
                    ? "Guardando..."
                    : product
                    ? "Actualizar Producto"
                    : "Guardar Producto"}

                </button>

              </div>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}