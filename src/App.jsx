import "./App.css";
import "./index.css";

import { Home } from "./pages/Home";
import { Login, Register } from "./pages/Auth";
import { UserDashboard } from "./pages/UserDashboard";

import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
