import { useState, useEffect } from "react";
import { useProductForm } from "../hooks/useProductForm";
import { useCategories } from "../hooks/useCategories";
import { useBrands } from "../hooks/useBrands";
import { toast } from "react-toastify";
import { useSizes } from "../hooks/useSizes";

export default function AddProductFormModal({
  product = null,
  onSuccess,
  onClose,
}) {
  const { sizes, loading: loadingSizes, error: errorSizes } = useSizes();
  const { handleSubmit, loading, error } = useProductForm(
    product,
    sizes,
  );
  const [preview, setPreview] = useState(
    product?.urlImage
      ? `${import.meta.env.VITE_API_URL}${product.urlImage}`
      : null,
  );
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  const { brands, loading: loadingBrands, error: errorBrands } = useBrands();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (e) => {
    const result = await handleSubmit(e);
    if (result?.success) {
      toast.success(
        product
          ? "Producto actualizado correctamente"
          : "Producto guardado correctamente",
      );
      if (onSuccess) onSuccess();
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Cuando terminen de cargar las opciones Y haya producto, sincroniza
  useEffect(() => {
    if (!loadingCategories && product?.categoryId) {
      setSelectedCategory(String(product.categoryId)); // <-- convierte a string
    }
  }, [loadingCategories, product?.categoryId]);

  useEffect(() => {
    if (!loadingBrands && product?.brandId) {
      setSelectedBrand(String(product.brandId)); // <-- convierte a string
    }
  }, [loadingBrands, product?.brandId]);

  return (
    // Overlay controlado por React, no por Bootstrap JS
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-dialog modal-xl m-0"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="modal-content border-0 shadow">
          {/* HEADER */}
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold">
              {product ? "Editar Producto" : "Agregar Producto"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {errorCategories && (
              <div className="alert alert-warning">{errorCategories}</div>
            )}
            {errorBrands && (
              <div className="alert alert-warning">{errorBrands}</div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="row">
                {/* IZQUIERDA */}
                <div className="col-md-7">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Color</label>
                      <input
                        type="text"
                        className="form-control"
                        name="color"
                        defaultValue={product?.color}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Precio</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        defaultValue={product?.price}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Categoría
                      </label>
                      <select
                        className="form-select"
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
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
                      <label className="form-label fw-semibold">Marca</label>
                      <select
                        className="form-select"
                        name="brand"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        required
                      >
                        <option value="">
                          {loadingBrands ? "Cargando..." : "Seleccione..."}
                        </option>
                        {brands.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Inventario por talla
                    </label>
                    <div className="row g-2">
                      {sizes.map((size) => (
                        <div key={size.id} className="col-md-4">
                          <div className="border rounded p-2 d-flex justify-content-between align-items-center">
                            <span className="fw-bold">{size.size}</span>
                            <input
                              type="number"
                              className="form-control"
                              style={{ width: "80px" }}
                              name={`size_${size.size}`}
                              min="0"
                              placeholder="0"
                              defaultValue={
                                product?.variantes?.[size.size] || 0
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg"
                      disabled={loading}
                    >
                      {loading
                        ? "Guardando..."
                        : product
                          ? "Actualizar Producto"
                          : "Guardar Producto"}
                    </button>
                  </div>
                </div>

                {/* DERECHA - IMAGEN */}
                <div className="col-md-5">
                  <label className="form-label fw-semibold">
                    Imagen del producto
                  </label>
                  <div className="border rounded p-3 text-center bg-light">
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="img-fluid"
                        style={{
                          maxHeight: "350px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      <div className="py-5 text-muted">
                        Vista previa de la imagen
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    className="form-control mt-3"
                    name="image"
                    accept="image/png, image/jpeg, image/heic"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
