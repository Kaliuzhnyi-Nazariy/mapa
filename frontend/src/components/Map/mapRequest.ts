import axios from "axios";
import { useCallback, useState } from "react";

export function useNearMe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState([]);

  const getNearMeLocations = useCallback(
    async ({ lng, lat }: { lng: number; lat: number }) => {
      try {
        setLoading(true);
        setError(null);
        setLocations([]);

        const res = await axios.get(
          `https://api.mapbox.com/search/searchbox/v1/reverse?longitude=${lng}&latitude=${lat}&access_token=${
            import.meta.env.VITE_MAP_TOKEN
          }`
        );

        // console.log(res.data.features);

        setLocations(res.data.features);
        return res.data.features;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, locations, getNearMeLocations };
}
