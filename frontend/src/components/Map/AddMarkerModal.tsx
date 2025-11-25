import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import { addMarker } from "../../redux/marker/request";
import { useSelector } from "react-redux";
import { markersLoading } from "../../redux/marker/selector";
import { generateNewMarker } from "./useMap";
import type { Map } from "mapbox-gl";
import type { Marker } from "../../types/markers";

const AddMarkerModal = ({
  isShown,
  closeModal,
  lngLat,
  openEdit,
  mapRef,
}: {
  isShown: boolean;
  closeModal: () => void;
  lngLat: { lng: number; lat: number } | null;
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
  mapRef: React.RefObject<Map | null>;
}) => {
  const [nameOfPlace, setNameOfPlace] = useState("");
  const [placePosition, setPlacePosition] = useState<{
    lng: number;
    lat: number;
  } | null>(null);

  const clearFields = () => {
    setNameOfPlace("");
    setPlacePosition(null);
  };

  useEffect(() => {
    if (lngLat) {
      console.log("lngLat in useEffect: ", lngLat);
      setPlacePosition(lngLat);
    }
  }, [lngLat]);

  const inputStyle =
    "outline focus:outline-amber-500 transition-colors relative w-full px-2 py-1 rounded";

  const liStyle =
    "group opacity-50 focus-within:opacity-100 transition-opacity duration-150  w-full ";

  const dispatch = useAppDispatch();

  const submitHandle = async () => {
    if (!nameOfPlace || !placePosition?.lat || !placePosition.lng) return;

    const res = await dispatch(
      addMarker({
        markerName: nameOfPlace,
        position: {
          lng: placePosition.lng,
          lat: placePosition.lat,
        },
      })
    );

    if (res.meta.requestStatus == "fulfilled") {
      if (mapRef) {
        generateNewMarker({
          lat: placePosition.lat,
          lng: placePosition.lng,
          type: "users",
          map: mapRef.current!,
          name: nameOfPlace,
          id: (res.payload as Marker).id,
          openEdit: openEdit,
        });
      }

      clearFields();
      closeModal();
    }
  };

  const markerLoading = useSelector(markersLoading);

  return (
    <div
      className={`${
        isShown ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-black/50 z-50`}
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >
      <div
        className="fixed top-1/2 left-1/2 bg-white -translate-1/2 p-5 rounded-2xl w-4/5 min-[768px]:w-3/5 min-[1440px]:w-2/5 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="uppercase flex justify-center">Add marker</h2>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            submitHandle();
          }}
          className="mt-2"
        >
          <ul className="flex flex-col gap-3 justify-center items-center w-full">
            <li className={liStyle + " w-full"}>
              <label htmlFor="">
                <h3>Name of place: </h3>

                <input
                  type="text"
                  value={nameOfPlace}
                  onChange={(e) => setNameOfPlace(e.target.value)}
                  className={inputStyle}
                  disabled={markerLoading}
                />
              </label>
            </li>
            <li className={liStyle}>
              <label className="w-full">
                <h3>Name of place: </h3>

                <ul className="flex items-center gap-2 min-[1440px]:w-full ">
                  <li className={liStyle + "w-1/2"}>
                    <h4 className="mb-1">Latitude: </h4>
                    <input
                      type="text"
                      value={placePosition?.lat ?? ""}
                      onChange={(e) =>
                        setPlacePosition((prev) => ({
                          ...prev!,
                          lat: Number(e.target.value),
                        }))
                      }
                      className={inputStyle}
                      disabled={markerLoading}
                    />
                  </li>
                  <li className={liStyle + "w-1/2"}>
                    <h4 className="mb-1">Longitude: </h4>
                    <input
                      type="text"
                      value={placePosition?.lng ?? ""}
                      onChange={(e) =>
                        setPlacePosition((prev) => ({
                          ...prev!,
                          lng: Number(e.target.value),
                        }))
                      }
                      className={inputStyle}
                      disabled={markerLoading}
                    />
                  </li>
                </ul>
              </label>
            </li>
            <li className="w-full">
              <button
                disabled={
                  !placePosition?.lat || !placePosition?.lng || markerLoading
                }
                className="disabled:opacity-50 mt-1 w-full py-2 bg-orange-500 text-white min-[1440px]:opacity-50 hover:opacity-100 focus:opacity-100 transition-opacity duration-150"
              >
                {markerLoading ? "Loading..." : "Create marker"}
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default AddMarkerModal;
