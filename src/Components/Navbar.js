import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Resources/logoNavbar.png";
import { logout } from "../api/api";
import { createBrowserHistory } from "history";


//Navbar
function Navbar() {
  const tokenAccess = localStorage.getItem("token");
  const history = createBrowserHistory();
  const [showModal, setShowModal] = useState(false);


  const handleLogout = async () => {
    try {
      const response = await logout(tokenAccess);

      if (response.status === 200) {
        window.localStorage.clear();
        window.sessionStorage.clear();
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
        history.replace("/");
        window.location.href = "./";
      }
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
    }
  };

  const showLogoutDialog = () => {
    setShowModal(true);
  };

  const hideLogoutDialog = () => {
    setShowModal(false);
  };

  const confirmLogout = () => {
    handleLogout();
    setShowModal(false);
  };

  return (
    <>
      <nav
        className="navbar"
        style={{ backgroundColor: "#F2F2F2", width: "100%" }}
      >
        <div>
          <ul className="navbarListado">
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
              <a href="/Pedidos" className="navbar-home">
                Pedidos
              </a>
              <span style={{ marginRight: "30px" }}></span>
              <a className="navbar-home" onClick={showLogoutDialog}>
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
        {showModal && (
          <div className="modal-logout">
            <div className="modal-content-logout">
              <h2>Cerrar sesión</h2>
              <p>¿Estás seguro de salir del la aplicación?</p>
              <div className="modal-buttons">
                <button className="button-modal-logout" onClick={confirmLogout}>Confirmar</button>
                <button className="button-modal-logout" onClick={hideLogoutDialog}>Cancelar</button>
              </div>
            </div>
          </div>
        )

        }
      </nav>
    </>
  );
}

export default Navbar;
