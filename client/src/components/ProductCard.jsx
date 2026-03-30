import { formatPrice } from "../hooks/utils/formatPrice";
import { Pencil, Eye, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function ProductCard({ product, onDelete, onEdit, isAdmin }) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53935",
      cancelButtonColor: "#333",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await onDelete(product.id);
    }
  };

  return (
    <div className="col">
      <div className="card d-flex flex-column">
        {/* Imagen */}
        <div className="card-image-wrapper">
          <img
            src={`${import.meta.env.VITE_API_URL}${product.urlImages[0]}`}
            className="img-fluid image-card"
            alt={product.name}
          />
        </div>

        {/* Contenedor de info + botones */}
        <div
          className="card-footer d-flex align-items-center"
          style={{ gap: "16px" }}
        >
          {/* Info del producto */}
          <div className="card-info" style={{ flex: 1 }}>
            <p className="card-text product-name">{product.name}</p>
            <p className="card-text product-brand">{product.brand}</p>
            <p className="card-text product-price">
              {formatPrice(product.price)}
            </p>
          </div>

          {isAdmin && (
            <>
              {/* Botones a la derecha */}
              <div
                className="card-actions d-flex flex-column"
                style={{ gap: "8px" }}
              >
                <button
                  title="Ver"
                  className="btn-icon"
                  onClick={() => /* manejar ver */ null}
                >
                  <Eye color="#48c3cb" />
                </button>
                <button
                  title="Editar"
                  className="btn-icon"
                  onClick={() => onEdit(product)}
                >
                  <Pencil color="#f6fe86" />
                </button>
                <button
                  title="Eliminar"
                  className="btn-icon btn-danger"
                  onClick={handleDelete}
                >
                  <Trash2 color="#ae3232" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
