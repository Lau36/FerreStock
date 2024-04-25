import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./register/register";
import Login from "./Login/Login.jsx";
import Home from "./Home/Index";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
