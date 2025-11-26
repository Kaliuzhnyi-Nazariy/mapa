import { Map, Marker, Popup } from "mapbox-gl";

export const generateNewMarker = ({
  lat,
  lng,
  map,
  type,
  name,
  openEdit,
  id,
}: {
  lng: number;
  lat: number;
  map: Map;
  type?: "users" | "found" | "me";
  name?: string;
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
  id?: string;
}) => {
  const docWidth = document.documentElement.clientWidth;

  const newMarker = new Marker({
    color: type == "users" ? "#999950" : type == "me" ? "#45fab45" : "#8A6642",
    scale: 1.5,
  })
    .setLngLat([lng, lat])
    .addTo(map);

  if (id) {
    newMarker._element.setAttribute("marker_id", id);
  }

  if (type) {
    newMarker._element.setAttribute("marker_type", type);
  }

  let popup;

  if (type !== "found") {
    popup = new Popup({ offset: 50 }).setHTML(`
    <div id='popup'>
      <h2><b>Name: </b>${name}</h2>
      <p><b>lng:</b> ${lng}</p>
      <p><b>lat:</b> ${lat}</p>
      <button id="popup-btn-${id}" class="popup-btn">Edit</button>  
    </div>
  `);
  } else {
    popup = new Popup({ offset: 50 }).setHTML(`
    <div id='popup'>
      <h2><b>Name: </b>${name}</h2>
      <p><b>lng:</b> ${lng}</p>
      <p><b>lat:</b> ${lat}</p>
    </div>
  `);
  }

  if (type == "found") {
    newMarker.setPopup(popup);
  }

  popup.on("open", () => {
    const divStyle = document.getElementById("popup");
    divStyle?.classList.add(
      "px-2",
      "py-1",
      "rounded-sm",
      "max-w-[180px]",
      "relative"
    );

    const btn = document.getElementById(`popup-btn-${id}`);

    if (!btn) return;

    btn.classList.add(
      "mx-auto",
      "py-0.5",
      "bg-orange-500",
      "text-white",
      "outline-transparent",
      "rounded-[10px]",
      "w-full",
      "mt-1"
    );

    const closeBtnPopup = document.getElementsByClassName(
      "mapboxgl-popup-close-button"
    );

    if (closeBtnPopup.length > 0) {
      const btn = closeBtnPopup[0] as HTMLElement;
      btn.classList.remove("mapboxgl-popup-close-button");
      btn.classList.add(
        "absolute",
        "right-2",
        "top-1",
        "w-fit",
        "cursor-pointer",
        "bg-initial"
      );
    }

    btn.addEventListener("click", () => {
      // console.log({ openEdit, name, id, lat, lng });
      if (openEdit && name && id && lng && lat) {
        // console.log("inside click: ", { name, id, lng, lat });

        openEdit({ name, id, lng, lat });
      }
    });
  });
  if (docWidth < 768) {
    newMarker.setPopup(popup);
  }

  return newMarker;
};

export const removeMarkers = ({
  map,
  markerId,
  type,
}: {
  map: React.RefObject<Map | null>;
  markerId?: string;
  type?: "users" | "found";
}) => {
  const markers = map.current?._markers;

  if (markerId) {
    // console.log("markerId triggered");
    markers?.forEach((um) => {
      const id = um._element.getAttribute("marker_id");
      if (Number(id) === Number(markerId)) {
        um.remove();
      }
    });
  } else if (type) {
    // console.log("type triggered");
    const filteredMarkers = markers?.filter(
      (m) => m._element.getAttribute("marker_type") == type
    );
    filteredMarkers?.forEach((fm) => fm.remove());
  }
};
