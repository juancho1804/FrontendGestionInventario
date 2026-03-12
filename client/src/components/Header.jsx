export default function Header(){
    return(
        <header className="d-flex align-items-center justify-content-between px-4">
            
            <a className="navbar-brand" href="#">
                <img src="/src/images/Copia de Store 1A.png" alt="Logo Store1A"/>
            </a>

            <ul className="nav">
                <li><a className="nav-link active fw-semibold">INVENTARIO</a></li>
                <li><a className="nav-link">ORDENES</a></li>
                <li><a className="nav-link">ATENDER</a></li>
            </ul>

            <a className="nav-link text-white">
                <i className="bi bi-person fs-4"></i>
            </a>

        </header>
    )
}