import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Register/register.js";
import Login from "./Login/Login.jsx";
import Home from "./Home/Index";
import Inventory from "./Inventory/Index.js";
import Suppliers from "./Suppliers/Suppliers.jsx";
import Orders from "./Orders/Orders.js";
import CreateOrders from "./CreateOrders/Index.js";

function AppRouter() {
  const isLoggedIn = window.localStorage.getItem("token"); // Modificado para usar el token

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/Home" /> : <Login />}
        />
        <Route path="/Registro" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Inventario" element={<Inventory />} />
        <Route path="/Proveedores" element={<Suppliers />} />
        <Route path="/Pedidos" element={<Orders />} />
        <Route path="/Pedidos/Crear" element={<CreateOrders />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
