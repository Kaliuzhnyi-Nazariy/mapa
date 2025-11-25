import type { LngLatLike, Map } from "mapbox-gl";
import type React from "react";
import { generateNewMarker } from "./useMap";
import type { Dispatch } from "react";

export const getLocation = (
  mapRef: React.RefObject<Map | null>,
  lngLat: React.RefObject<{ lng: number; lat: number } | null>,
  setChosenMarker: Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      position: { lng: number; lat: number };
      owner_id?: string;
    } | null>
  >
) => {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(succCalback, errCalback);
    }
  };

  const succCalback = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    lngLat.current = {
      lng: position.coords.longitude,
      lat: position.coords.latitude,
    };

    if (lngLat.current) {
      mapRef.current?.flyTo({ center: lngLat.current as LngLatLike });
    }

    const map = mapRef.current;

    if (map) {
      generateNewMarker({
        map,
        ...{ lng: position.coords.longitude, lat: position.coords.latitude },
        type: "me",
        name: "Me",
      });
    }

    setChosenMarker({
      id: "0",
      name: "Here",
      position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
  };

  const errCalback = () => {
    console.log("error");
    return;
  };

  getLocation();
};

export const moveToMarker = (
  mapRef: React.RefObject<Map | null>,
  locationCoords: { lng: number; lat: number }
) => {
  console.log(!mapRef);
  if (!mapRef) {
    console.log("no map");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  mapRef &&
    mapRef.current?.flyTo({
      center: {
        lat: locationCoords.lat,
        lng: locationCoords.lng,
      } as LngLatLike,
    });
};
