import React from "react";
import AuthNavbar from "../components/common/AuthNavbar";
import MapContainer from "../components/Map/MapContainer";

const Map = () => {
  return (
    <div>
      <AuthNavbar />
      <div className="mt-[90px] h-[calc(100vh-6rem)]">
        <MapContainer />
      </div>
    </div>
  );
};

export default Map;
