import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./Register/register";
import Login from "./Login/Login.jsx";
import Home from "./Home/Index";

function AppRouter() {
  const isLoggedIn = window.localStorage.getItem('token'); // Modificado para usar el token

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/Home" /> : <Login />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
