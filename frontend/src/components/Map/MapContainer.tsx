// import { useEffect, useRef, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
// import { generateNewMarker } from "./useMap";
import { Map } from "mapbox-gl";
import {
  // useEffect,
  type Ref,
} from "react";
// import { useSelector } from "react-redux";
// import { markers } from "../../redux/marker/selector";
// import Locations from "./Locations";
// import AddMarkerModal from "./AddMarkerModal";
// import EditMarkerModal from "./EditMarkerModal";
// import { useInitMap } from "./initMap";
// import Menu from "../Menu/Menu";
// import SideMenu from "../Menu/SideMenu";

export const MapContainer = ({
  mapContainerRef,
}: // clickHandle,
// mapRef,
{
  mapContainerRef: Ref<HTMLDivElement>;
  // clickHandle: (e: mapboxgl.MapMouseEvent | unknown) => void;
  // mapRef: Ref<mapboxgl.Map | null>;
}) => {
  // useEffect(() => {
  //   if (!mapRef || !mapRef.current) return;

  //   const handleClick = (e: mapboxgl.MapMouseEvent) => {
  //     const target = e.originalEvent.target as HTMLElement | null;

  //     const isClickData = target
  //       ?.closest("div")
  //       ?.classList.contains("mapboxgl-marker");

  //     if (isClickData) {
  //       const clickData = target?.closest("div");
  //       // console.log(clickData);
  //       // console.log("clicking id: ", clickData.getAttribute("marker_id"));
  //       if (!clickData) return;

  //       const id = clickData.getAttribute("marker_id");

  //       const typeOfMarker = clickData.getAttribute("marker_type");

  //       if (typeOfMarker == "found") {
  //         return;
  //       }

  //       console.log(id);

  //       // openMenu();
  //       // setMarker(Number(id));

  //       return;
  //     }

  //     console.log("modal is open");
  //     // lngLat.current = {
  //     //   lat: e.lngLat.lat,
  //     //   lng: e.lngLat.lng,
  //     // };

  //     // openModal();
  //   };

  //   mapRef.current?.on("click", handleClick);

  //   return () => {
  //     mapRef.current?.off("click", handleClick);
  //   };
  // }, []);

  return (
    <>
      <div
        id="map-container"
        className="
      relative 
      w-screen h-screen
      min-[1440px]:w-[75vw] 
      min-[1440px]:h-[calc(100vh-88px)]
      min-[1440px]:col-start-2 
      min-[1440px]:row-start-2
    "
        ref={mapContainerRef}
      />
      {/* <div className="fixed top-0 left-0 w-full min-[768px]:hidden ">
        <Locations mapRef={mapRef} lngLat={lngLat} markersList={userMarkers} />
      </div> */}
      {/*<AddMarkerModal
        isShown={isModalOpen}
        closeModal={closeModal}
        lngLat={lngLat.current}
        mapRef={mapRef}
        openEdit={openEdit}
      />
      <EditMarkerModal
        isModalOpen={isEditOpen}
        closeModal={closeEdit}
        name={editName}
        id={editId}
        lat={editLat}
        lng={editLng}
        map={mapRef}
        openEdit={openEdit}
      /> */}
    </>
  );
};

export default Map;
