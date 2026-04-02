import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import { getMarkers } from "../../redux/marker/request";
import { MapContainer } from "./MapContainer";
import SideMenu from "../Menu/SideMenu";
import { useInitMap } from "./initMap";
import AddMarkerModal from "./AddMarkerModal";
import { useSelector } from "react-redux";
import { markers } from "../../redux/marker/selector";
import { generateNewMarker, removeMarkers } from "./useMap";
import EditMarkerModal from "./EditMarkerModal";
import Menu from "../Menu/Menu";

export interface Coordinates {
  lng: number;
  lat: number;
}

export interface Markers {
  id: string;
  name: string;
  position: { lng: number; lat: number };
}

const MapComponent = () => {
  const dispatch = useAppDispatch();

  const markersList = useSelector(markers);

  useEffect(() => {
    dispatch(getMarkers());
  }, []);

  const {
    mapContainerRef,
    mapRef,
    // initialCoords,
    // setInitialCoords,
    // clickHandle,
    setOnMapClick,
  } = useInitMap();

  const [lngLat, setLngLat] = useState<Coordinates | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);

  const resetMenu = () => setMenuOpen(false);

  const [chosenMarker, setMarker] = useState<number | null>(null);

  useEffect(() => {
    setOnMapClick((e: mapboxgl.MapMouseEvent) => {
      const target = e.originalEvent.target as HTMLElement | null;

      const isClickData = target
        ?.closest("div")
        ?.classList.contains("mapboxgl-marker");

      if (isClickData) {
        const clickData = target?.closest("div");

        if (!clickData) {
          // setMarker();
          return;
        }

        const id = clickData.getAttribute("marker_id");

        const typeOfMarker = clickData.getAttribute("marker_type");

        if (typeOfMarker == "found") {
          return;
        }

        openMenu();

        if (!chosenMarker) {
          setMarker(Number(id));
        }

        return;
      }

      setLngLat({
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      });

      openModal();
    });
  }, [setOnMapClick]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (markersList.length === 0) return;

    markersList.map((m) => {
      removeMarkers({
        map: mapRef,
        markerId: m.id,
        type: "users",
      });
    });

    markersList.map((m) => {
      generateNewMarker({
        lng: m.position.lng,
        lat: m.position.lat,
        map: mapRef.current!,
        type: "users",
        name: m.name,
        id: m.id,
        openEdit,
      });
    });
  }, [markersList]);

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

  setTimeout(() => {
    setMarker(null);
  }, 500);

  return (
    <div className="min-[1440px]:grid min-[1440px]:grid-cols-[25vw_75vw] min-[1440px]:grid-rows-[88px_auto] min-[1440px]:overflow-hidden w-full min-h-screen overflow-hidden h-screen">
      <Menu
        mapRef={mapRef}
        menuTrigger={isMenuOpen}
        id={chosenMarker}
        resetMenu={resetMenu}
        // restMarker={restMarker}
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
      <MapContainer mapContainerRef={mapContainerRef} />
      <AddMarkerModal
        isShown={isModalOpen}
        closeModal={closeModal}
        lngLat={lngLat}
        mapRef={mapRef}
        openEdit={openEdit}
      />{" "}
      <EditMarkerModal
        isModalOpen={isEditOpen}
        closeModal={closeEdit}
        name={editName}
        id={editId}
        lat={editLat}
        lng={editLng}
        map={mapRef}
        openEdit={openEdit}
      />{" "}
    </div>
  );
};

export default MapComponent;
