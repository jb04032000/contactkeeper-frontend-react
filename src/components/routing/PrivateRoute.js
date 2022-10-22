import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  return !isAuthenticated && !loading ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
