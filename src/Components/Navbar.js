import React from "react";
import "./Navbar.css";
import logo from "../Resources/logoNavbar.png";

//Navbar
function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: "#BBBFBA", width: "100%" }}
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <ul className="navbarListado d-flex">
                    <a href="/">
                        <img src={logo} alt="Logo" className="imageNav" />
                    </a>

                    <li className="navbarItems">
                        <a href="/" className="navbar-home">
                            Inicio
                        </a>
                        <span style={{ marginRight: "30px" }}></span>
                        <a href="/" className="navbar-home">
                            Inventario
                        </a>
                        <span style={{ marginRight: "30px" }}></span>
                        <a href="/" className="navbar-home">
                            Proveedores
                        </a>
                        <span style={{ marginRight: "30px" }}></span>
                        <a href="/" className="navbar-home">
                            Cerrar sesión
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
