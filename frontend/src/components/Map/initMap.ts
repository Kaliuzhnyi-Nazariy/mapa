import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export function useInitMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [initialCoords, setInitialCoords] = useState<[number, number]>([
    -74.0242, 40.6941,
  ]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/streets-v12",
      container: mapContainerRef.current,
      center: initialCoords,
      zoom: 12,
      doubleClickZoom: false,
    });

    mapRef.current = map;

    map.on("load", () => {
      mapRef.current = map;
    });

    return () => map.remove();
  }, []);

  return { mapRef, mapContainerRef, initialCoords, setInitialCoords };
}
