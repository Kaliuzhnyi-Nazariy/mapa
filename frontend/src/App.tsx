import "mapbox-gl/dist/mapbox-gl.css";
import MapComponent from "./components/Map/MapComponent";
import AuthPage from "./components/auth/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestrictedRoute from "./Routes/RestrictedRoute";
import { useAppDispatch } from "./redux/dispatch";
import { useEffect, useRef } from "react";
import { getMe } from "./redux/user/userRequests";
import PrivateRoute from "./Routes/PrivateRoute";
import GreetingPage from "./components/greeting/GreetingPage";
import { useSelector } from "react-redux";
import {
  userIsRefreshing,
  userLoggedIn,
  username,
} from "./redux/user/selectors";
import { customToast } from "./toasts/toast";
import NotFoundPage from "./components/NotFoundPage";
function App() {
  const dispatch = useAppDispatch();

  const isRefreshingLoading = useSelector(userIsRefreshing);
  const userName = useSelector(username);
  const isLoggedIn = useSelector(userLoggedIn);

  const prevLoading = useRef<boolean | null>(null);

  useEffect(() => {
    if (prevLoading.current === true && isRefreshingLoading === false) {
      if (isLoggedIn) {
        customToast("suc", `${userName}, welcome!`);
      } else {
        customToast("err", `You are not logged in!`);
      }
    }

    prevLoading.current = isRefreshingLoading;
  }, [isRefreshingLoading]);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <>
      {isRefreshingLoading ? (
        "loading..."
      ) : (
        <BrowserRouter>
          {/* <BrowserRouter basename="https://mapa-app.onrender.com"> */}
          <Routes>
            <Route path="/" element={<GreetingPage />} />
            <Route
              path="/auth"
              element={
                <RestrictedRoute component={<AuthPage />} redirectTo="/map" />
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute component={<MapComponent />} redirectTo="/auth" />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
