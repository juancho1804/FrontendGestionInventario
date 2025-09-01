import { Dropdown } from "react-bootstrap";
import { useCategories } from "../hooks/useCategories";

export default function FilterMenu() {

    const {categories, loading, error} = useCategories();

    return (
        <div className="dropdown me-2">
            <button className="btn text-white d-flex align-items-center dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                <i className="bi bi-filter me-1" style={{ fontSize: "25px" }}></i> Filtrar
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
                {categories.map((cat)=>(
                    <li key={cat.id}>
                        <a className="dropdown-item">{cat.name}</a>
                    </li>
                )
                )

                }
            </ul>
        </div>
    );
}


