import React from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router";

const RestrictedRoute = ({
  component: Component,
  redirectTo = "/",
}: {
  component: React.ReactElement;
  redirectTo: string;
}) => {
  const { isUserLoggedIn } = useAuth();

  return isUserLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
