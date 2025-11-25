import { useSelector } from "react-redux";
import { userIsRefreshing, userLoggedIn } from "../redux/user/selectors";

export const useAuth = () => {
  const isUserLoggedIn = useSelector(userLoggedIn);
  const isUserResfreshing = useSelector(userIsRefreshing);

  return { isUserLoggedIn, isUserResfreshing };
};
