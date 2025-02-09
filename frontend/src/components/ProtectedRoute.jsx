import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchProtectedData } from "../api/authService";

const ProtectedRoute = ({ element: Element }) => {
  const [isAuthenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetchProtectedData();
        console.log(response);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>
  }

  return isAuthenticated ? (
    <Element />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
