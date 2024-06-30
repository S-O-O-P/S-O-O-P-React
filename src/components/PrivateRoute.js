import React from 'react';
import { Navigate } from 'react-router-dom';
import ExpiredToken from '../apis/ExpiredToken'

const PrivateRoute = ({ element: Component }) => {
    ExpiredToken();

  const storedToken = JSON.parse(localStorage.getItem('accessToken'));
  const now = new Date().getTime();

  return storedToken && now < storedToken.expiresAt ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
