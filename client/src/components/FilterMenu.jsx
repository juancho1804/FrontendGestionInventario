import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useCategories } from "../hooks/useCategories";

export default function FilterMenu() {
  const { categories, loading, error } = useCategories();

  return (
    <div
      className="d-flex align-items-center py-4 border-bottom"
      style={{ paddingLeft: "190px" }}
    >
      <div className="dropdown me-2">
        <button
          className="btn text-white d-flex align-items-center dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-filter me-1" style={{ fontSize: "25px" }}></i>{" "}
          Filtrar
        </button>
        <ul className="dropdown-menu custom-dropdown">
          {loading && (
            <li>
              <span className="dropdown-item">Cargando...</span>
            </li>
          )}
          {error && (
            <li>
              <span className="dropdown-item text-danger">Error:{error}</span>
            </li>
          )}
          {categories.map((cat) => (
            <li key={cat.id}>
              <a className="dropdown-item">{cat.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <form className="d-flex mx-1" style={{ flex: 1, maxWidth: "600px" }}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar"
        />
        <button className="btn" type="submit">
          <i className="bi bi-search text-white"></i>
        </button>
      </form>
    </div>
  );
}
