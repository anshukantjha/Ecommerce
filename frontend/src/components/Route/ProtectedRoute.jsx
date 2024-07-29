import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import Loader from '../Loader';

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading) return <Loader/>; 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
