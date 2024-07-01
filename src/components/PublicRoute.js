import React from 'react';
import { Navigate } from 'react-router-dom';
import ExpiredToken from '../apis/ExpiredToken'

const PublicRoute = ({ element: Component, restricted }) => {
    ExpiredToken();
    
  const storedToken = JSON.parse(localStorage.getItem('accessToken'));
  const now = new Date().getTime();

  return storedToken && now < storedToken.expiresAt && restricted ? (
    <Navigate to="/main" />
  ) : (
    <Component />
  );
};

export default PublicRoute;
