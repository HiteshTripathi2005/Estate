import React from "react";
import {
  MapContainer as LeafletMap,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

const MapContainer = () => {
  const position = [19.054999, 72.8692035];

  return (
    <div className="h-full w-full">
      <LeafletMap
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup className="text-sm">
            <div className="font-medium">Property Location</div>
            <div className="text-gray-600">Click to get directions</div>
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
};

export default MapContainer;
