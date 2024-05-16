import React from "react";
import "./Navbar.css";
import logo from "../Resources/logoNavbar.png";
import { logout } from "../api/api";
import { createBrowserHistory } from "history";



//Navbar
function Navbar() {
  const tokenAccess = localStorage.getItem("token");
  const history = createBrowserHistory();
  const handleLogout = async () => {
    try {
      const response = await logout(tokenAccess);

      if (response.status === 200) {
        window.localStorage.clear();
        window.sessionStorage.clear();
        history.replace("/");
        window.location.href = "./";
      }
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
    }
  };

  return (
    <nav
      className="navbar "
      style={{ backgroundColor: "#F2F2F2", width: "100%" }}
    >
      <div>
        <ul className="navbarListado ">
          <a href="/">
            <img src={logo} alt="Logo" className="imageNav" />
          </a>

          <li className="navbarItems">
            <a href="/" className="navbar-home">
              Inicio
            </a>
            <span style={{ marginRight: "30px" }}></span>
            <a href="/Inventario" className="navbar-home">
              Inventario
            </a>
            <span style={{ marginRight: "30px" }}></span>
            <a href="/Proveedores" className="navbar-home">
              Proveedores
            </a>
            <span style={{ marginRight: "30px" }}></span>
            <a className="navbar-home" onClick={handleLogout}>
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
