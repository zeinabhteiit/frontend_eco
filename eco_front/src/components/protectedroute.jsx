import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // or sessionStorage if you're using that

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
