import { useEffect, useRef, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import { generateNewMarker } from "./useMap";
import { Map } from "mapbox-gl";
import { useSelector } from "react-redux";
import { markers } from "../../redux/marker/selector";
import Locations from "./Locations";
import AddMarkerModal from "./AddMarkerModal";
import EditMarkerModal from "./EditMarkerModal";
import { useInitMap } from "./initMap";
import Menu from "../Menu/Menu";
import SideMenu from "../Menu/SideMenu";

export const MapContainer = () => {
  const { mapContainerRef, mapRef, initialCoords, setInitialCoords } =
    useInitMap();

  const lngLat = useRef<{ lng: number; lat: number } | null>(null);

  const [markersList, setMarkers] = useState<
    {
      id: string;
      name: string;
      position: { lng: number; lat: number };
      owner_id?: string;
    }[]
  >([]);

  const userMarkers = useSelector(markers);

  useEffect(() => {
    setMarkers(userMarkers);
  }, [userMarkers]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      setInitialCoords([longitude, latitude]);
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setCenter(initialCoords);
  }, [initialCoords]);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [isMunuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);

  const resetMenu = () => setMenuOpen(false);

  const [chosenMarker, setMarker] = useState<number | null>(null);

  const restMarker = () => setMarker(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      const target = e.originalEvent.target as HTMLElement | null;

      const isClickData = target
        ?.closest("div")
        ?.classList.contains("mapboxgl-marker");

      if (isClickData) {
        const clickData = target?.closest("div");
        // console.log(clickData);
        // console.log("clicking id: ", clickData.getAttribute("marker_id"));
        if (!clickData) return;

        const id = clickData.getAttribute("marker_id");

        const typeOfMarker = clickData.getAttribute("marker_type");

        if (typeOfMarker == "found") {
          return;
        }

        openMenu();
        setMarker(Number(id));

        return;
      }

      lngLat.current = {
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      };

      openModal();
    };

    mapRef.current?.on("click", handleClick);

    return () => {
      mapRef.current?.off("click", handleClick);
    };
  }, []);

  const [isEditOpen, setEditOpen] = useState(false);

  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState("");
  const [editLat, setEditLat] = useState<number | null>(null);
  const [editLng, setEditLng] = useState<number | null>(null);

  const closeEdit = () => {
    setEditOpen(false);
  };

  const openEdit = ({
    name,
    id,
    lng,
    lat,
  }: {
    name: string;
    id: string;
    lng: number;
    lat: number;
  }) => {
    setEditOpen(true);
    setEditName(name);
    setEditId(id);
    setEditLat(lat);
    setEditLng(lng);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const handleMapLoad = () => {
      markersList.forEach((m) => {
        return generateNewMarker({
          map,
          ...{
            lng: m.position.lng,
            lat: m.position.lat,
            name: m.name,
            id: m.id,
            openEdit: openEdit,
            closeEdit: closeEdit,
          },
          type: "users",
        });
      });
    };

    map.on("load", handleMapLoad);

    return () => {
      map.off("load", handleMapLoad);
    };
  }, [markersList]);

  return (
    <div className="min-[1440px]:grid min-[1440px]:grid-cols-[25vw_75vw] min-[1440px]:grid-rows-[88px_auto] min-[1440px]:overflow-hidden w-full min-h-screen">
      <Menu
        mapRef={mapRef}
        menuTrigger={isMunuOpen}
        id={chosenMarker}
        resetMenu={resetMenu}
        restMarker={restMarker}
        lngLat={lngLat}
        openEdit={openEdit}
        extraStyles="col-start-1 col-end-3 row-start-1"
      />

      <SideMenu
        mapRef={mapRef}
        id={chosenMarker}
        openEdit={openEdit}
        // extraStyles="col-start-1 col-end-3 row-start-1"
      />

      <div
        id="map-container"
        className="
      relative 
      w-[100vw] h-[100vh]
      min-[1440px]:w-[75vw] 
      min-[1440px]:h-[calc(100vh-88px)]
      min-[1440px]:col-start-2 
      min-[1440px]:row-start-2
    "
        ref={mapContainerRef}
      />
      <div className="fixed top-0 left-0 w-full min-[768px]:hidden ">
        <Locations mapRef={mapRef} lngLat={lngLat} markersList={markersList} />
      </div>
      <AddMarkerModal
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
      />
    </div>
  );
};

export default Map;
