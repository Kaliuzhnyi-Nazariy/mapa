import React, { useEffect, useRef, useState } from "react";
import MenuListItem from "./MenuListItem";
import { Map } from "mapbox-gl";
import { X } from "lucide-react";
import type { Marker } from "../../types/markers";
import { Link } from "react-router";

const SideMenu = ({
  mapRef,
  id,
  openEdit,
  closeMenu,
  isMenuOpen,
  userMarkers,
  userMarkersLoading,
}: {
  mapRef: React.RefObject<Map | null>;
  id?: number | null;
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
  closeMenu: () => void;
  isMenuOpen: boolean;
  userMarkers: Marker[];
  userMarkersLoading: boolean;
}) => {
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [chosenMarker, setChosenMarker] = useState<string | null>(null);

  useEffect(() => {
    if (id == null) return;

    setChosenMarker(String(id));
    const el = itemRefs.current[String(id)];

    if (el) {
      const container = el.parentElement;
      if (container) {
        const offsetTop = el.offsetTop;
        const containerHeight = container.clientHeight;

        container.scrollTo({
          top: offsetTop - containerHeight / 2,
          behavior: "smooth",
        });
      }
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChosenMarker(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [chosenMarker]);

  return (
    <aside
      //   className={`fixed top-0 right-0 bg-white w-3/4 z-30 md:w-[25vw] py-4 px-5 h-screen transition-all duration-300 ${
      //     isMenuOpen ? "translate-x-0" : "translate-x-full"
      //   } overflow-hidden min-[1440px]:relative min-[1440px]:flex row-start-2 col-start-1 min-[1440px]:translate-x-0 flex flex-col min-[1440px]:h-full`}
      className={`fixed top-0 right-0 bg-white w-3/4 z-30 md:w-[25vw] py-4 px-5 h-dvh flex flex-col transition-all duration-300 ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } overflow-hidden min-[1440px]:relative row-start-2 col-start-1 min-[1440px]:translate-x-0 min-[1440px]:h-full`}
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <button
          type="button"
          onClick={closeMenu}
          className="absolute top-4.5 right-5.5 min-[1440px]:hidden"
        >
          <X className="size-5 " />
        </button>

        <h2>Your places: </h2>
        <small>
          Amount: {userMarkersLoading ? "loading..." : userMarkers.length}
        </small>
      </div>

      <div className="overflow-y-auto mt-5 pr-1 flex-1 min-h-0">
        {userMarkersLoading ? (
          "Markers loading..."
        ) : (
          <>
            {userMarkers && userMarkers.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {userMarkers.map((um) => {
                  if (!um || !um.id) return null;
                  return (
                    <MenuListItem
                      key={um.id}
                      um={um}
                      mapRef={mapRef}
                      id={Number(chosenMarker)}
                      itemRefs={itemRefs}
                      openEdit={openEdit}
                      closeMenu={closeMenu}
                    />
                  );
                })}
              </ul>
            ) : (
              <p className="opacity-50 mt-10 text-center">No data</p>
            )}
          </>
        )}
      </div>
      <Link to="/user" className="mt-auto pt-4 border-t border-gray-100 block">
        Settings
      </Link>
    </aside>
  );
};

export default SideMenu;
