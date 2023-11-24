import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function PrivateRoute ({ path, element })  {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      path={path}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
  
};

export default PrivateRoute;