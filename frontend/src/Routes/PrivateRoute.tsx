import React from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: {
  component: React.ReactElement;
  redirectTo: string;
}) => {
  const { isUserLoggedIn, isUserResfreshing } = useAuth();
  const conditionToRedirect = !isUserLoggedIn && !isUserResfreshing;

  return conditionToRedirect ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;
