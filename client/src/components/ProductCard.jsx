import { formatPrice } from "../hooks/utils/formatPrice";
import {Pencil, Eye, Trash2} from 'lucide-react'

export default function ProductCard({ product, onDelete }) {
  return (
    <div className="col">
      <div className="card d-flex flex-column">
        {/* Imagen */}
        <div className="card-image-wrapper">
          <img
            src={`${import.meta.env.VITE_API_URL}${product.urlImage}`}
            className="img-fluid image-card"
            alt={product.name}
          />
        </div>

        {/* Contenedor de info + botones */}
        <div className="card-footer d-flex align-items-center" style={{ gap: "16px" }}>
          {/* Info del producto */}
          <div className="card-info" style={{ flex: 1 }}>
            <p className="card-text product-name">{product.name}</p>
            <p className="card-text product-brand">{product.brand}</p>
            <p className="card-text product-price">{formatPrice(product.price)}</p>
          </div>

          {/* Botones a la derecha */}
          <div className="card-actions d-flex flex-column" style={{ gap: "8px" }}>
            <button title="Ver" className="btn-icon" onClick={() => /* manejar ver */ null}>
              <Eye color="#48c3cb" />
            </button>
            <button title="Editar" className="btn-icon" onClick={() => /* manejar editar */ null}>
              <Pencil color="#f6fe86"/>
            </button>
            <button
              title="Eliminar"
              className="btn-icon btn-danger"
              onClick={() => onDelete(product.id)}
            >
              <Trash2 color="#ae3232" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}