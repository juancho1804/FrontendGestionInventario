export default function AddProductButton({onClick}) {
  return (
    <button
      className="btn btn-light d-flex align-items-center ms-auto me-5"
      style={{ borderRadius: "10px" }}
      type="button"
      onClick={onClick}
    >
      <i className="bi bi-plus-circle mx-1 text-success"></i>
      Agregar Producto
    </button>
  );
}
