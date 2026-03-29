export default function SizeInventory({ sizes, product }) {
  return (
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
  );
}