import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import AdminHomePage from "./components/adminMain/index";
import UserHomePage from "./components/userMain/index";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Items from "./components/Items";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Routes>
      {/* Role-based redirection */}
      {token && role === "admin" ? (
        <>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="/items" element={<Items />} />
        </>
      ) : token && role === "user" ? (
        <>
          <Route path="/" element={<UserHomePage />} />
          <Route path="/items" element={<Items />} />
        </>
      ) : (
        <Route path="/" element={<Navigate replace to="/login" />} />
      )}

      {/* Public routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<ResetPassword />} />

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
