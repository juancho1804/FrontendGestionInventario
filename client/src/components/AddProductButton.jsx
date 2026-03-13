export default function AddProductButton() {
  return (
    <button
      className="btn btn-light d-flex align-items-center ms-auto me-5"
      data-bs-toggle="modal"
      data-bs-target="#addProductFormModal"
      style={{ borderRadius: "10px" }}
      type="button"
    >
      <i className="bi bi-plus-circle mx-1 text-success"></i>
      Agregar Producto
    </button>
  );
}
