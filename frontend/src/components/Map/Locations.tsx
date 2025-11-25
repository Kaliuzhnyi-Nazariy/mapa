import React, { useEffect, useRef, useState } from "react";
import { getLocation, moveToMarker } from "./locationsRequests";
import type { Map } from "mapbox-gl";
import { useNearMe } from "./mapRequest";
import { generateNewMarker, removeMarkers } from "./useMap";
import type { Marker } from "../../types/markers";
import { LocateFixed, MapPinned } from "lucide-react";

const Locations = ({
  mapRef,
  lngLat,
  markersList,
}: {
  mapRef: React.RefObject<Map | null>;
  lngLat: React.RefObject<{ lng: number; lat: number } | null>;
  markersList: {
    id: string;
    name: string;
    position: { lng: number; lat: number };
    owner_id?: string;
  }[];
}) => {
  const [chosenMarker, setChosenMarker] = useState<null | Marker>(null);

  const onChange = (e: string) => {
    if (e !== "select") {
      const location = JSON.parse(e);
      setChosenMarker(location);
      const locationCoords = location.position;
      moveToMarker(mapRef, locationCoords);
    }
  };

  const { loading, error, locations, getNearMeLocations } = useNearMe();

  if (error) {
    console.log(error);
  }

  const findNearMe = async () => {
    if (chosenMarker) {
      removeMarkers({ map: mapRef, type: "found" });

      getNearMeLocations({
        lng: chosenMarker.position.lng,
        lat: chosenMarker.position.lat,
      });
    } else {
      console.log("Set your location");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    console.log("markersRef: ", markersRef);

    if (markersRef.current.length > 0) {
      removeMarkers({ map: mapRef });
      markersRef.current = [];
    }

    locations.forEach(
      (l: {
        properties: {
          coordinates: { longitude: number; latitude: number };
          name: string;
        };
      }) => {
        const marker = generateNewMarker({
          map,
          lng: l.properties.coordinates.longitude,
          lat: l.properties.coordinates.latitude,
          name: l.properties.name,
          type: "found",
        });

        markersRef.current.push(marker);
      }
    );
  }, [locations]);

  return (
    <div className="absolute top-3 left-3 w-[95%] min-[768px]:relative z-40 min-[768px]:w-4/6 min-[768px]:top-0 min-[768px]:left-0 min-[768px]:h-fit min-[1440px]:fixed min-[1440px]:top-11 min-[1440px]:left-1/2 min-[1440px]:-translate-1/2 ">
      <ul className="grid gap-5 text-[12px] grid-cols-4 w-full h-5 min-[768px]:grid-cols-[1fr_4fr_1fr] min-[768px]:h-fit ">
        <li className="size-10 grid justify-self-center justify-center items-center rounded-full bg-white col-start-1">
          <button
            type="button"
            onClick={() => getLocation(mapRef, lngLat, setChosenMarker)}
          >
            <LocateFixed />
          </button>
        </li>
        <li className="px-3 py-1.5 rounded-full bg-white col-start-2 col-end-4 min-[768px]:col-end-3 ">
          <select
            name=""
            id=""
            className="w-full h-full outline outline-transparent rounded-full"
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="select">select</option>
            {markersList.length > 0 &&
              markersList.map((m) => {
                return (
                  <option value={JSON.stringify(m)} key={m.id}>
                    {m.name}
                  </option>
                );
              })}
          </select>
        </li>
        <li className="size-10 grid justify-self-center justify-center items-center rounded-full bg-white col-start-4 min-[768px]:col-start-3 ">
          <button onClick={() => findNearMe()}>
            {loading ? "Loading..." : <MapPinned />}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Locations;
