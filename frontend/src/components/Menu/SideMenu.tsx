import React, { useEffect, useRef, useState } from "react";
import MenuListItem from "./MenuListItem";
// import { useSelector } from "react-redux";
// import { markers, markersLoading } from "../../redux/marker/selector";
import { Map } from "mapbox-gl";
import { X } from "lucide-react";
import type { Marker } from "../../types/markers";

const SideMenu = ({
  mapRef,
  id,
  openEdit,
  // extraStyles,
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
  // extraStyles?: string;
}) => {
  // const userMarkers = useSelector(markers);
  // const userMarkersLoading = useSelector(markersLoading);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const [chosenMarker, setChosenMarker] = useState<string | null>(null);

  useEffect(() => {
    if (id == null) return;

    setChosenMarker(String(id));

    const el = itemRefs.current[String(id)];

    if (el) {
      // el.scrollIntoView({
      //   behavior: "smooth",
      //   block: "center",
      //   inline: "nearest",
      // });
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
    setTimeout(() => {
      setChosenMarker(null);
    }, 2000);
  }, [chosenMarker]);

  return (
    <aside
      className={`fixed top-0 right-0 bg-white w-3/4 z-30 md:w-[25vw] py-4 px-5 min-h-screen transition-all duration-300 ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } overflow-hidden min-[1440px]:relative min-[1440px]:block row-start-2 col-start-1 min-[1440px]:translate-x-0 `}
      onClick={(e) => e.stopPropagation()}
    >
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

      {userMarkersLoading ? (
        "Markers loading..."
      ) : (
        <>
          {userMarkers && userMarkers.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-3 overflow-y-auto max-h-[75vh]">
              {userMarkers.map((um) => {
                if (!um || !um.id) return null;

                return (
                  <MenuListItem
                    key={um.id}
                    um={um}
                    mapRef={mapRef}
                    id={Number(chosenMarker)}
                    // id={id}
                    itemRefs={itemRefs}
                    openEdit={openEdit}
                    closeMenu={closeMenu}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="absolute top-1/2 left-1/2 -translate-1/2 opacity-50">
              No data
            </p>
          )}
        </>
      )}
    </aside>
  );
};

export default SideMenu;
