import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // check if token exists

  if (!token) {
    // if no token, redirect to login page
    return <Navigate to="/auth" />;
  }

  // if token exists, show the admin page
  return children;
}
