import "./App.css";
import "./index.css";

import { Home } from "./pages/Home";
import { Login, Register } from "./pages/Auth";
import { UserDashboard } from "./pages/UserDashboard";
import { AdminLogin } from "./pages/AdminLogin";
import { Admin } from "./pages/Admin";
import { AdminElection } from "./pages/AdminElection";
import { AdminCandidates } from "./pages/AdminCandidate";
import { AdminWinner } from "./pages/AdminWinner";

import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/elections" element={<AdminElection />} />
        <Route path="/admin/candidates" element={<AdminCandidates />} />
        <Route path="/admin/winner" element={<AdminWinner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
