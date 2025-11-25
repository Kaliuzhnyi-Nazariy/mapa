import { useEffect } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import { getMarkers } from "../../redux/marker/request";
import { MapContainer } from "./MapContainer";

const MapComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMarkers());
  }, []);

  return (
    <>
      <MapContainer />
    </>
  );
};

export default MapComponent;
