import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login/Login.jsx";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
