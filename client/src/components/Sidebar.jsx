export default function Sidebar(){

    return(
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
    )

}