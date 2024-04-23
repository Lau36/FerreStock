import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Index";
import Register from "./register/register";

function AppRouter() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Registro" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
