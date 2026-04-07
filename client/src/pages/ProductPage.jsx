import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useColors } from "../hooks/useColors";
import Header from "../components/Header";
import { formatPrice } from "../hooks/utils/formatPrice";

export default function ProductPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { colors } = useColors();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  if (loading) return <div className="main-content p-5">Cargando...</div>;
  if (error) return <div className="main-content p-5">Error: {error}</div>;
  if (!product) return null;

  const color = colors.find((c) => c.id === product.colorId);
  const sizes = Object.entries(product.variantes).filter(
    ([, stock]) => stock > 0,
  );

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="container py-4">
          <div className="row g-5">
            {/* IZQUIERDA — imágenes */}
            <div className="col-md-6">
              <div className="product-image-main">
                <img
                  src={`${import.meta.env.VITE_API_URL}${product.urlImages[selectedImage]}`}
                  alt={product.name}
                  className="product-image-main__img"
                />
              </div>

              {product.urlImages.length > 1 && (
                <div className="product-thumbnails">
                  {product.urlImages.map((url, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`product-thumbnail ${selectedImage === index ? "product-thumbnail--active" : ""}`}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}${url}`}
                        className="product-thumbnail__img"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DERECHA — info */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <div>
                <p className="product-detail__category">
                  {product.categoryName}
                </p>
                <h2 className="product-detail__name">{product.name}</h2>
              </div>

              <p className="product-detail__price">
                {formatPrice(product.price)}
              </p>

              <hr className="product-detail__divider" />

              {color && (
                <div>
                  <p className="product-detail__label">
                    Color —{" "}
                    <span className="product-detail__label-value">
                      {color.name}
                    </span>
                  </p>
                  <span
                    className="product-color-dot"
                    style={{ background: color.hexCode }}
                  />
                </div>
              )}

              <div>
                <p className="product-detail__label">
                  Talla{" "}
                  {selectedSize && (
                    <span className="product-detail__label-value">
                      — {selectedSize}
                    </span>
                  )}
                </p>
                <div className="product-sizes">
                  {sizes.map(([size]) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`product-size-btn ${selectedSize === size ? "product-size-btn--active" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="product-detail__divider" />
              {/*

              <button
                disabled={!selectedSize}
                className={`product-add-btn ${selectedSize ? "product-add-btn--active" : ""}`}
              >
                {selectedSize ? "Agregar al carrito" : "Selecciona una talla"}
              </button>
              comentario */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
