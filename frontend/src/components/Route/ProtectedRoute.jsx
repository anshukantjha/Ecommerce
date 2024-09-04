import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import Loader from "../Loader";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading || isAuthenticated === null) return <Loader />;
  if (isAdmin === true && user.role !== "admin")
    return <Navigate to="/login" />;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
