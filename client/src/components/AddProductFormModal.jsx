import { useState, useEffect, useRef } from "react";
import { useProductForm } from "../hooks/useProductForm";
import { useCategories } from "../hooks/useCategories";
import { useBrands } from "../hooks/useBrands";
import { useSizes } from "../hooks/useSizes";
import { toast } from "react-toastify";

export default function AddProductFormModal({ product = null, onSuccess, onClose }) {
  const { sizes } = useSizes();
  const { categories, loading: loadingCategories } = useCategories();
  const { brands, loading: loadingBrands } = useBrands();

  const [images, setImages] = useState(
    product?.urlImages?.map((url) => ({
      preview: `${import.meta.env.VITE_API_URL}${url}`,
      data: url,
    })) || [],
  );

  const { handleSubmit, loading, error } = useProductForm(
    product,
    sizes,
    images.map((img) => img.data),
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!loadingCategories && product?.categoryId)
      setSelectedCategory(String(product.categoryId));
  }, [loadingCategories, product?.categoryId]);

  useEffect(() => {
    if (!loadingBrands && product?.brandId)
      setSelectedBrand(String(product.brandId));
  }, [loadingBrands, product?.brandId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const nuevas = files.map((file) => ({
      preview: URL.createObjectURL(file),
      data: file,
    }));
    setImages((prev) => [...prev, ...nuevas].slice(0, 4));
    e.target.value = ""; // reset input para poder agregar misma imagen
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (e) => {
    const result = await handleSubmit(e);
    if (result?.success) {
      toast.success(product ? "Producto actualizado" : "Producto guardado");
      if (onSuccess) onSuccess();
    }
  };

  // Grid adaptativo según cantidad de imágenes
  const getGridStyle = (count) => {
    if (count === 0) return {};
    if (count === 1) return { gridTemplateColumns: "1fr" };
    return { gridTemplateColumns: "1fr 1fr" };
  };

  const canAddMore = images.length < 4;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-dialog modal-xl m-0" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fw-bold">
              {product ? "Editar Producto" : "Agregar Producto"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleFormSubmit}>
              <div className="row">
                {/* IZQUIERDA */}
                <div className="col-md-7">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Color</label>
                      <input type="text" className="form-control" name="color" defaultValue={product?.color} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Precio</label>
                      <input type="number" className="form-control" name="price" defaultValue={product?.price} required />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Categoría</label>
                      <select className="form-select" name="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                        <option value="">{loadingCategories ? "Cargando..." : "Seleccione..."}</option>
                        {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Marca</label>
                      <select className="form-select" name="brand" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} required>
                        <option value="">{loadingBrands ? "Cargando..." : "Seleccione..."}</option>
                        {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Inventario por talla</label>
                    <div className="row g-2">
                      {sizes.map((size) => (
                        <div key={size.id} className="col-md-4">
                          <div className="border rounded p-2 d-flex justify-content-between align-items-center">
                            <span className="fw-bold">{size.name}</span>
                            <input
                              type="number"
                              className="form-control"
                              style={{ width: "80px" }}
                              name={`size_${size.name}`}
                              min="0"
                              placeholder="0"
                              defaultValue={product?.variantes?.[size.name] || 0}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
                      {loading ? "Guardando..." : product ? "Actualizar Producto" : "Guardar Producto"}
                    </button>
                  </div>
                </div>

                {/* DERECHA - GRID DE IMÁGENES */}
                <div className="col-md-5">
                  <label className="form-label fw-semibold">
                    Imágenes del producto
                    <span className="text-muted fw-normal ms-2" style={{ fontSize: 12 }}>
                      ({images.length}/4)
                    </span>
                  </label>

                  <div
                    style={{
                      display: "grid",
                      ...getGridStyle(images.length + (canAddMore ? 1 : 0)),
                      gap: 8,
                      minHeight: 200,
                    }}
                  >
                    {/* Imágenes actuales */}
                    {images.map((img, index) => (
                      <div
                        key={index}
                        style={{ position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "1" }}
                      >
                        {/* Badge "Principal" en la primera */}
                        {index === 0 && (
                          <span style={{
                            position: "absolute", top: 6, left: 6,
                            background: "#e53935", color: "#fff",
                            fontSize: 10, fontWeight: 700,
                            padding: "2px 7px", borderRadius: 20,
                            zIndex: 2,
                          }}>
                            Principal
                          </span>
                        )}
                        <img
                          src={img.preview}
                          alt={`imagen-${index}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        {/* Botón eliminar */}
                        <button
                          type="button"
                          onClick={() => handleRemove(index)}
                          style={{
                            position: "absolute", top: 6, right: 6,
                            background: "rgba(0,0,0,0.55)", border: "none",
                            color: "#fff", borderRadius: "50%",
                            width: 24, height: 24, fontSize: 14,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", zIndex: 2,
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    {/* Celda para agregar — desaparece al llegar a 4 */}
                    {canAddMore && (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          aspectRatio: "1",
                          border: "2px dashed #ccc",
                          borderRadius: 10,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          gap: 6,
                          transition: "border-color .2s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = "#888"}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = "#ccc"}
                      >
                        <span style={{ fontSize: 36, color: "#aaa", lineHeight: 1 }}>+</span>
                        <span style={{ fontSize: 12, color: "#aaa" }}>Añadir imagen</span>
                      </div>
                    )}
                  </div>

                  {/* Input file oculto */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg, image/heic"
                    multiple
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