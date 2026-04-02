import { MenuIcon } from "lucide-react";
import Locations from "../Map/Locations";
import type { Map } from "mapbox-gl";
import type { Marker } from "../../types/markers";

const Header = ({
  isMenuOpen,
  closeMenu,
  openMenu,
  mapRef,
  userMarkers,
  lngLat,
  userMarkersLoading,
}: {
  mapRef: React.RefObject<Map | null>;
  isMenuOpen: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  userMarkers: Marker[];
  lngLat: { lng: number; lat: number } | null;
  userMarkersLoading: boolean;
}) => {
  return (
    <div
      className={`overflow-hidden h-12 min-[768px]:h-18 min-[1440px]:h-22 w-full relative block min-[1440px]:col-start-1 min-[1440px]:col-end-3 ${
        ""
        // extraStyles && extraStyles
      }`}
    >
      <div className="fixed  bg-orange-500 w-full top-0 left-0 z-10 flex justify-between items-center px-6 min-[1440px]:relative h-12 min-[768px]:h-18 min-[1440px]:h-22">
        {/* <div className="bg-orange-500 w-full h-full flex justify-between items-center"></div> */}
        <h1 className="text-white">Mapa</h1>
        <Locations
          mapRef={mapRef}
          markersList={userMarkers}
          lngLat={lngLat}
          markerLoading={userMarkersLoading}
        />
        <button
          type="button"
          onClick={openMenu}
          className="min-[1440px]:hidden"
        >
          <MenuIcon className="size-5 text-white" />
        </button>
      </div>

      <div
        className={`bg-black/50 w-full h-full ${
          isMenuOpen ? "fixed" : "hidden"
        } top-0 left-0 z-30 min-[1440px]:hidden`}
        onClick={(e) => {
          e.stopPropagation();
          closeMenu();
        }}
      ></div>
    </div>
  );
};

export default Header;
