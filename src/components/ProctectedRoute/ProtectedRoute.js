import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth(); // Get the current user from AuthContext

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user's role is not allowed, redirect to a default page (e.g., dashboard)
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is authorized, render the element
  return element;
};

export default ProtectedRoute;
