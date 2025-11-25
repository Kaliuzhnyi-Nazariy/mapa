import React from "react";
import type { Marker } from "../../types/markers";
import { Map } from "mapbox-gl";
import { moveToMarker } from "../Map/locationsRequests";
import { useAppDispatch } from "../../redux/dispatch";
import { deleteMarker } from "../../redux/marker/request";
import { removeMarkers } from "../Map/useMap";
import { useSelector } from "react-redux";
import { markersLoading } from "../../redux/marker/selector";

const MenuListItem = ({
  itemRefs,
  um,
  id,
  mapRef,
  closeMenu,
  openEdit,
}: {
  itemRefs: React.RefObject<Record<string, HTMLLIElement | null>>;
  um: Marker;
  // id?: number | null;
  id?: number | null;
  mapRef: React.RefObject<Map | null>;
  closeMenu?: () => void;
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
}) => {
  const dispatch = useAppDispatch();

  const markerLoading = useSelector(markersLoading);

  return (
    <li
      ref={(el) => (itemRefs.current[um.id] = el)}
      className={`border rounded-2xl p-2 transition-colors duration-300 ${
        id && String(id) == um.id && "bg-orange-500 text-white"
      }`}
      onClick={() => {
        const locationCoords = {
          lng: um.position.lng,
          lat: um.position.lat,
        };

        // console.log({ locationCoords });
        // console.log({ mapRef });

        moveToMarker(mapRef, locationCoords);
        if (closeMenu) closeMenu();
      }}
    >
      <h3>
        Name: <b>{um.name}</b>
      </h3>
      <ul className="flex gap-2 text-[12px]">
        <li>lat: {um.position.lat}</li>
        <li>lng: {um.position.lng}</li>
      </ul>
      {markerLoading ? (
        <div className="w-full">
          <p className="px-auto">Loading...</p>
        </div>
      ) : (
        <ul className="flex gap-2">
          <li className="w-1/2">
            <button
              type="button"
              className="w-full bg-orange-500 text-white text-center"
              onClick={(e) => {
                e.stopPropagation();
                openEdit({
                  name: um.name,
                  id: um.id,
                  lat: um.position.lat,
                  lng: um.position.lng,
                });
                if (closeMenu) closeMenu();
              }}
            >
              Edit
            </button>
          </li>
          <li className="w-1/2">
            <button
              type="button"
              className="w-full bg-orange-500 text-white text-center"
              onClick={async (e) => {
                e.stopPropagation();
                await dispatch(deleteMarker({ markerId: um.id }));
                removeMarkers({ map: mapRef, markerId: um.id });
              }}
            >
              Delete
            </button>
          </li>
        </ul>
      )}
    </li>
  );
};

export default MenuListItem;
