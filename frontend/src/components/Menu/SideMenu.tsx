import React, { useEffect, useRef, useState } from "react";
import MenuListItem from "./MenuListItem";
import { useSelector } from "react-redux";
import { markers } from "../../redux/marker/selector";
import { Map } from "mapbox-gl";

const SideMenu = ({
  mapRef,
  id,
  openEdit,
}: // extraStyles,
{
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
  // extraStyles?: string;
}) => {
  const userMarkers = useSelector(markers);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const [chosenMarker, setChosenMarker] = useState<string | null>(null);

  useEffect(() => {
    console.log(id);
    if (!id) return;

    setChosenMarker(String(id));

    const el = itemRefs.current[String(id)];

    console.log(el);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [id, userMarkers]);

  setTimeout(() => {
    setChosenMarker(null);
  }, 2000);

  return (
    <aside
      className={` w-[25vw] py-4 px-5 transition-all duration-300 overflow-hidden hidden min-[1440px]:block row-start-2 `}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Your places: </h2>
      <small>Amount: {userMarkers.length}</small>

      {userMarkers && userMarkers.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-3 overflow-y-auto max-h-[75vh]">
          {userMarkers.map((um) => {
            return (
              <MenuListItem
                key={um.id}
                um={um}
                mapRef={mapRef}
                id={Number(chosenMarker)}
                // id={id}
                itemRefs={itemRefs}
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
  );
};

export default SideMenu;
