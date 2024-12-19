import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Importa el contexto

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
