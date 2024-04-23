import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./register/register";
import Login from "./Login/Login.jsx";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
