import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import { useSelector } from "react-redux";
import { markersLoading } from "../../redux/marker/selector";
import {
  deleteMarker,
  getMarkers,
  updateMarker,
} from "../../redux/marker/request";
import { generateNewMarker, removeMarkers } from "./useMap";
import type { Map } from "mapbox-gl";
import { customToast } from "../../toasts/toast";
import type { Marker } from "../../types/markers";

const EditMarkerModal = ({
  isModalOpen,
  closeModal,
  name,
  id,
  lat,
  lng,
  map,
  openEdit,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  name: string;
  id: string;
  lat: number | null;
  lng: number | null;
  map: React.RefObject<Map | null>;
  openEdit?: ({
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
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setNewName(name);
  }, [name]);

  const inputStyle =
    "outline focus:outline-amber-500 transition-colors relative w-full px-2 py-1 rounded";

  const liStyle =
    "group opacity-50 focus-within:opacity-100 transition-opacity duration-150 w-full ";

  const dispatch = useAppDispatch();

  const editSubmit = async () => {
    if (!lng || !lat || !name) return;

    const res = await dispatch(
      updateMarker({
        markerId: id,
        markerName: newName,
        position: { lat, lng },
      }),
    );

    removeMarkers({ map, markerId: id });

    generateNewMarker({
      lat,
      lng,
      map: map.current!,
      type: "users",
      name: newName,
      openEdit,
      id,
    });

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getMarkers());
      closeModal();
      customToast("suc", `${name} marker updated!`);
    } else {
      customToast("err", "Sth went wrong!");
    }
  };

  const deleteSubmit = async () => {
    if (!id) return;
    const res = await dispatch(deleteMarker({ markerId: id }));

    // console.log(res);

    if (res.meta.requestStatus === "fulfilled") {
      // console.log(id);
      removeMarkers({ map, markerId: id });
      await dispatch(getMarkers());
      closeModal();

      const resData: Marker | { message: string } | undefined = res.payload;

      if (resData && "name" in resData) {
        customToast("suc", `'${resData && resData.name}' marker deleted!`);
      }
    } else {
      customToast("err", "Sth went wrong!");
    }
  };

  const markerLoading = useSelector(markersLoading);

  return (
    <div
      className={`${
        isModalOpen ? "fixed" : "hidden"
      } top-0 left-0 bg-black/50 w-full h-full z-50`}
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >
      <div
        className="fixed top-1/2 left-1/2 bg-white -translate-1/2 p-5 rounded-2xl w-4/5 min-[768px]:w-3/5 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="uppercase flex justify-center">Edit marker</h2>
        <form className="mt-2">
          <ul className="flex flex-col gap-3 justify-center items-center w-full">
            <li className={liStyle + " w-full"}>
              <label htmlFor="">
                <h3>Name of place: </h3>

                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={inputStyle}
                  disabled={markerLoading}
                />
              </label>
            </li>
            <li className={liStyle}>
              <label htmlFor="">
                <h3>Name of place: </h3>

                <ul className="flex items-center gap-2">
                  <li className={liStyle + "w-1/2"}>
                    <h4 className="mb-1">Latitude: </h4>
                    <input
                      type="text"
                      value={lat ?? ""}
                      className={inputStyle}
                      disabled
                    />
                  </li>
                  <li className={liStyle + "w-1/2"}>
                    <h4 className="mb-1">Longitude: </h4>
                    <input
                      type="text"
                      value={lng ?? ""}
                      className={inputStyle}
                      disabled
                    />
                  </li>
                </ul>
              </label>
            </li>
          </ul>
        </form>
        <ul className="grid grid-cols-2 gap-3 mt-4">
          <li className="w-full justify-self-center col-start-1">
            <button
              disabled={!lat || !lng || markerLoading}
              className="disabled:opacity-50 mt-1 w-full py-2 bg-orange-500 text-white min-[1440px]:opacity-50 hover:opacity-100 focus:opacity-100 transition-opacity duration-150"
              onClick={() => deleteSubmit()}
            >
              {markerLoading ? "Loading..." : "Delete marker"}
            </button>
          </li>
          <li className="w-full justify-self-center col-start-2">
            <button
              disabled={!lat || !lng || markerLoading}
              className="disabled:opacity-50 mt-1 w-full py-2 bg-orange-500 text-white min-[1440px]:opacity-50 hover:opacity-100 focus:opacity-100 transition-opacity duration-150"
              onClick={() => editSubmit()}
            >
              {markerLoading ? "Loading..." : "Edit marker"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditMarkerModal;
