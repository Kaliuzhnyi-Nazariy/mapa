import React, { useEffect, useRef, useState } from "react";
import Locations from "../Map/Locations";
import { useSelector } from "react-redux";
import { markers } from "../../redux/marker/selector";
import { Map } from "mapbox-gl";
import MenuListItem from "./MenuListItem";
import { MenuIcon, X } from "lucide-react";
// import { useInitMap } from "../Map/initMap";

const Menu = ({
  mapRef,
  menuTrigger,
  id,
  resetMenu,
  restMarker,
  lngLat,
  openEdit,
  extraStyles,
}: {
  mapRef: React.RefObject<Map | null>;
  menuTrigger?: boolean;
  id?: number | null;
  // resetMenu?: () => React.Dispatch<React.SetStateAction<boolean>>;
  resetMenu?: () => void;
  restMarker?: () => void;
  lngLat: React.RefObject<{ lng: number; lat: number } | null>;
  openEdit: ({
    name,
    id,
    lng,
    lat,
  }: {
    name: string;
    id: string;
    lng: number;
    lat: number;
  }) => void;
  extraStyles?: string;
}) => {
  // const Menu = () => {
  // const { mapRef } = useInitMap();

  const [isMenuOpen, setMenu] = useState(false);

  useEffect(() => {
    if (menuTrigger) {
      setMenu(menuTrigger);
      if (resetMenu) {
        resetMenu();
      }
    }
  }, [menuTrigger]);

  const openMenu = () => setMenu(true);
  const closeMenu = () => {
    setMenu(false);
    if (restMarker) {
      restMarker();
    }
  };

  const userMarkers = useSelector(markers);

  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    // console.log(id);
    if (!id) return;

    const el = itemRefs.current[String(id)];

    // console.log(el);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [id, userMarkers]);

  return (
    <div
      className={`overflow-hidden w-full relative hidden min-[768px]:block ${
        extraStyles && extraStyles
      }`}
    >
      <div className="fixed h-15 bg-orange-500 w-full top-0 left-0 z-10 flex justify-between items-center px-10 min-[1440px]:relative min-[1440px]:h-22">
        {/* <div className="bg-orange-500 w-full h-full flex justify-between items-center"></div> */}
        <h1 className="text-white">Mapa</h1>
        <Locations mapRef={mapRef} markersList={userMarkers} lngLat={lngLat} />
        <button
          type="button"
          onClick={openMenu}
          className="min-[1440px]:hidden"
        >
          <MenuIcon className="size-10 text-white" />
        </button>
      </div>

      <div
        className={`bg-black/50 w-full h-full ${
          isMenuOpen ? "fixed" : "none"
        } top-0 left-0 z-30 min-[1440px]:hidden`}
        onClick={(e) => {
          e.stopPropagation();
          closeMenu();
        }}
      >
        <aside
          className={`fixed top-0 right-0 bg-white w-2/5 min-h-screen z-30 py-4 px-5  ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-all duration-300 overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeMenu}
            className="absolute top-2.5 right-9.5"
          >
            <X className="size-10 " />
          </button>

          <h2>Your places: </h2>
          <small>Amount: {userMarkers.length}</small>

          {userMarkers && userMarkers.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-3 overflow-y-auto max-h-[84vh]">
              {userMarkers.map((um) => {
                return (
                  <MenuListItem
                    key={um.id}
                    um={um}
                    mapRef={mapRef}
                    id={id}
                    itemRefs={itemRefs}
                    closeMenu={closeMenu}
                    openEdit={openEdit}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="absolute top-1/2 left-1/2 -translate-1/2 opacity-50">
              No data
            </p>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Menu;
