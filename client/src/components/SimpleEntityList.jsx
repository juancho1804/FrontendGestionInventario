import { Trash2 } from "lucide-react";

export default function SimpleEntityList({ items, onDelete, renderMeta }) {
  return (
    <div className="row g-3">
      {items.map((item) => (
        <div className="col-12 col-md-6 col-lg-4" key={item.id}>
          <div className="card p-3 d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex align-items-center" style={{ gap: 10 }}>
              {renderMeta && renderMeta(item)}
              <p className="product-name m-0">{item.name}</p>
            </div>
            <button
              title="Eliminar"
              className="btn-icon"
              onClick={() => onDelete(item)}
            >
              <Trash2 size={16} color="#ae3232" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
