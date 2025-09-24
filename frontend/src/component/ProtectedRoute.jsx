import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const tokent = localStorage.getItem("token");

  return tokent ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
