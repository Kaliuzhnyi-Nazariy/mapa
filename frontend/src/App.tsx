import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// routes
import RestrictedRoute from "./Routes/RestrictedRoute";
import PrivateRoute from "./Routes/PrivateRoute";

// pages
import { lazy, useEffect } from "react";
import GreetingPage from "./components/greeting/GreetingPage";
import AuthPage from "./components/auth/AuthPage";
const MapPage = lazy(() => import("./components/Map/MapComponent"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

// user fetch
import { useAppDispatch } from "./redux/dispatch";
import { getMe } from "./redux/user/userRequests";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
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
          element={<PrivateRoute component={<MapPage />} redirectTo="/auth" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
