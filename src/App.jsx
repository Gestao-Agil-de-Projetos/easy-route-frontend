import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/index.jsx";
import RegisterPage from "./components/pages/RegisterPage/index.jsx";
import HomePage from "./components/pages/HomePage";
import OwnerPage from "./components/pages/OwnerPage";
import ProfilePage from "./components/pages/ProfilePage/index.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./styles/App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["PASSENGER"]}>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner"
            element={
              <ProtectedRoute allowedRoles={["OWNER"]}>
                <OwnerPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute allowedRoles={["PASSENGER", "OWNER"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
