import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiCall, API_ENDPOINTS } from "../config/apiConfig.js";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // Verify token with API
    apiCall(API_ENDPOINTS.ADMIN_VERIFY)
      .then(data => {
        setIsAuthenticated(data.success);
      })
      .catch(err => {
        console.error("Token verification error:", err);
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;