import { useState, useEffect } from "react";
import { useProductForm } from "../hooks/useProductForm";
import { useImageManager } from "../hooks/useImageManager";
import { useCategories } from "../hooks/useCategories";
import { useBrands } from "../hooks/useBrands";
import { useSizes } from "../hooks/useSizes";
import { toast } from "react-toastify";
import ImageGrid from "./ImageGrid";
import SizeInventory from "./SizeInventory";
import { useColors } from "../hooks/useColors";
import ColorPicker from "./ColorPicker";

export default function AddProductFormModal({
  product = null,
  onSuccess,
  onClose,
}) {
  const { sizes } = useSizes();
  const { categories, loading: loadingCategories } = useCategories();
  const { brands, loading: loadingBrands } = useBrands();
  const { colors, loading: loadingColors } = useColors();

  const { images, fileInputRef, handleImageChange, handleRemove, canAddMore } =
    useImageManager(product);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const { handleSubmit, loading, error } = useProductForm(
    product,
    sizes,
    images.map((img) => img.data),
    selectedColor,
  );
  useEffect(() => {
    if (!loadingCategories && product?.categoryId)
      setSelectedCategory(String(product.categoryId));
  }, [loadingCategories, product?.categoryId]);

  useEffect(() => {
    if (!loadingBrands && product?.brandId)
      setSelectedBrand(String(product.brandId));
  }, [loadingBrands, product?.brandId]);

  useEffect(() => {
    if (!loadingColors && product?.colorId)
      setSelectedColor(String(product.colorId));
  }, [loadingColors, product?.colorId]);

  const handleFormSubmit = async (e) => {
    const result = await handleSubmit(e);
    if (result?.success) {
      toast.success(product ? "Producto actualizado" : "Producto guardado");
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-dialog modal-xl m-0"
      >
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
                      <ColorPicker
                        colors={colors}
                        value={selectedColor}
                        onChange={setSelectedColor}
                        loading={loadingColors}
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

                  <SizeInventory sizes={sizes} product={product} />

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

                {/* DERECHA */}
                <ImageGrid
                  images={images}
                  canAddMore={canAddMore}
                  onRemove={handleRemove}
                  onAdd={() => fileInputRef.current?.click()}
                  fileInputRef={fileInputRef}
                  onFileChange={handleImageChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
