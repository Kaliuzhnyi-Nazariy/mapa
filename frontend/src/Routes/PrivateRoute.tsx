import React from "react";
// import { useAuth } from "./useAuth";
import { Navigate } from "react-router";

import { useSelector } from "react-redux";
import { userIsRefreshing, userLoggedIn } from "../redux/user/selectors";

const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: {
  component: React.ReactElement;
  redirectTo: string;
}) => {
  const isUserLoggedIn = useSelector(userLoggedIn);
  const isUserResfreshing = useSelector(userIsRefreshing);
  // const { isUserLoggedIn, isUserResfreshing } = useAuth();

  if (!isUserLoggedIn && isUserResfreshing) return "Loading...";

  const conditionToRedirect = !isUserLoggedIn && !isUserResfreshing;

  return conditionToRedirect ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;
