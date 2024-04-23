import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Index";

function AppRouter() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
