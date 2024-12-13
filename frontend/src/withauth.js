import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    // const isAuthenticated = localStorage.getItem('isAuthenticated');
    const isAuthenticated = localStorage.getItem('UserAuthToken');
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return <Component {...props} />;
  };
  return AuthenticatedComponent;
};

export default withAuth;
