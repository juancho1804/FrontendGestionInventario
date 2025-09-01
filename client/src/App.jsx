import FilterMenu from "./components/filterMenu.jsx";
import ProductList from "./components/ProductList.jsx";
import AddProductFormModal from "./components/AddProductFormModal.jsx";
import { useState, useEffect } from "react";

export default function App() {
    const [products, setProducts] = useState([]);
    const base = import.meta.env.VITE_API_URL || "http://localhost:8001";

    const fetchProducts = async () => {
    try {
        const res = await fetch(`${base}/products?ts=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        console.log("[APP] Productos recibidos del backend:", data);
        setProducts(data);
    } catch (err) {
        console.error("Error al cargar los productos", err);
    }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            {/* HEADER */}
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a className="navbar-brand" href="#">
                        <img src="src/images/Copia de Store 1A.png" alt="Logo Store1A" height="40" />
                    </a>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a className="nav-link active px-2 link-secondary fw-semibold" href="#">INVENTARIO</a></li>
                    <li><a className="nav-link link-secondary" href="#">ORDENES</a></li>
                    <li><a className="nav-link px-2 link-secondary" href="#">ATENDER</a></li>
                </ul>

                <div className="col-md-3 text-end">
                    <a href="#" className="nav-link text-white"><i className="bi bi-person fs-4"></i></a>
                </div>
            </header>

            {/* LAYOUT */}
            <div className="d-flex">

                {/* SIDEBAR */}
                <div className="flex-shrink-0 text-white sidebar" style={{ width: "250px", height: "100vh", backgroundColor: "#000000" }}>
                    <ul className="nav flex-column" style={{ paddingTop: "150px" }}>
                        <li className="nav-item text-center">
                            <a className="nav-link text-white fw-semibold active" style={{ fontSize: "16.5px" }}>PRODUCTOS</a>
                            <a href="#" className="nav-link text-white active-link">Productos activos</a>
                            <a href="#" className="nav-link text-white-50">Productos inactivos</a>
                        </li>
                    </ul>
                    <br />
                    <ul className="nav flex-column">
                        <li className="nav-item text-center fw-semibold">
                            <a href="#" className="nav-link text-white-50">CATEGORÍAS</a>
                        </li>
                    </ul>
                </div>

                {/* MAIN */}
                <div className="flex-grow-1 main-content" style={{ backgroundColor: "#000000", width: "auto" }}>

                    {/* Barra secundaria */}
                    <div className="d-flex align-items-center py-4 border-bottom" style={{ paddingLeft: "190px" }}>
                        {/* Filtro */}
                        <FilterMenu/>

                        {/* Buscador */}
                        <form className="d-flex mx-1" style={{ flex: 1, maxWidth: "600px" }}>
                            <input className="form-control me-2" type="search" placeholder="Buscar" />
                            <button className="btn" type="submit"><i className="bi bi-search text-white"></i></button>
                        </form>

                        {/* Botón agregar */}
                        <button className="btn btn-light d-flex align-items-center ms-auto me-5"
                            data-bs-toggle="modal" data-bs-target="#addProductFormModal"
                            style={{ borderRadius: "10px" }}>
                            <i className="bi bi-plus-circle mx-1 text-success"></i>
                            Agregar Producto
                        </button>
                        <AddProductFormModal onSuccess ={fetchProducts}></AddProductFormModal>

                    </div>

                    <ProductList products={products} onDelete={fetchProducts}></ProductList>

                </div>
            </div>
        </>
    );
}
