import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./Register/register.js";
import Login from "./Login/Login.jsx";
import Home from "./Home/Index";
import Inventory from "./Inventory/Index.js";

function AppRouter() {
  const isLoggedIn = window.localStorage.getItem('token'); // Modificado para usar el token

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/Home" /> : <Login />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Inventario" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
