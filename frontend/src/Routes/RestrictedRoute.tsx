// import React from "react";
// import { useAuth } from "./useAuth";
// import { Navigate } from "react-router";

// const RestrictedRoute = ({
//   component: Component,
//   redirectTo = "/",
// }: {
//   component: React.ReactElement;
//   redirectTo: string;
// }) => {
//   const { isUserLoggedIn, isUserResfreshing } = useAuth();

//   if (!isUserLoggedIn && isUserResfreshing) return "Loading...";

//   return isUserLoggedIn && !isUserResfreshing ? (
//     <Navigate to={redirectTo} />
//   ) : (
//     Component
//   );
// };

// export default RestrictedRoute;

import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { userIsRefreshing, userLoggedIn } from "../redux/user/selectors";

const RestrictedRoute = ({
  component: Component,
  redirectTo = "/",
}: {
  component: React.ReactElement;
  redirectTo: string;
}) => {
  const isUserLoggedIn = useSelector(userLoggedIn);
  const isUserResfreshing = useSelector(userIsRefreshing);

  if (isUserResfreshing) return "Loading...";

  return isUserLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
