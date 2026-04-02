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
  const { isUserLoggedIn, isUserResfreshing } = useAuth();

  if (!isUserLoggedIn && isUserResfreshing) return "Loading...";

  return isUserLoggedIn && !isUserResfreshing ? (
    <Navigate to={redirectTo} />
  ) : (
    Component
  );
};

export default RestrictedRoute;
