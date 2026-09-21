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
  // 🟢 Use Redux selectors instead of useAuth()
  const isUserLoggedIn = useSelector(userLoggedIn);
  const isUserResfreshing = useSelector(userIsRefreshing);

  // While the app is verifying the session, render nothing or a loader
  if (isUserResfreshing) return "Loading...";

  // If logged in, block entry to restricted pages (like /auth) and redirect
  return isUserLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
