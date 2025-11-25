import "mapbox-gl/dist/mapbox-gl.css";
import MapComponent from "./components/Map/MapComponent";
import AuthPage from "./components/auth/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestrictedRoute from "./Routes/RestrictedRoute";
import { useAppDispatch } from "./redux/dispatch";
import { useEffect } from "react";
import { getMe } from "./redux/user/userRequests";
import PrivateRoute from "./Routes/PrivateRoute";
import GreetingPage from "./components/greeting/GreetingPage";
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <BrowserRouter basename="https://mapa-app.onrender.com">
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
