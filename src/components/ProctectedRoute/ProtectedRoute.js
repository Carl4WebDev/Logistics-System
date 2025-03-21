import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    alert("Access Denied: You don't have permission to view this page.");
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
