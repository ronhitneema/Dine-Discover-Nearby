import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBasedElement = ({ allowedRoles, children, redirectPath = "/" }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  if (allowedRoles.includes(user.role)) {
    return children;
  }

  return <Navigate to={redirectPath} />;
};

export default RoleBasedElement;
