import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  isAuthenticated,
  element,
  pathNotAuthenticated = "/",
}) => {
  return isAuthenticated ? element : <Navigate to={pathNotAuthenticated} />;
};

export default PrivateRoute;
