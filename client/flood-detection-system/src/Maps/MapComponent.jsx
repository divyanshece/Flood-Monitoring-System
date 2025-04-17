import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const Routing = ({ start, end }) => {
  const map = useMap(); // Get access to the map instance

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]), // Start location
        L.latLng(end[0], end[1]), // End location
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      show: false, // Hide step-by-step instructions
      addWaypoints: false, // Prevent users from adding extra waypoints
    }).addTo(map);

    return () => map.removeControl(routingControl); // Cleanup on unmount
  }, [map, start, end]);

  return null;
};

const MapComponent = () => {
  const startLocation = [51.505, -0.09]; // Example: London
  const endLocation = [51.515, -0.08]; // Example: Another point in London

  return (
    <MapContainer
      center={startLocation}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={startLocation}>
        <Popup>Start Point</Popup>
      </Marker>
      <Marker position={endLocation}>
        <Popup>End Point</Popup>
      </Marker>
      <Routing start={startLocation} end={endLocation} />
    </MapContainer>
  );
};

export default MapComponent;
