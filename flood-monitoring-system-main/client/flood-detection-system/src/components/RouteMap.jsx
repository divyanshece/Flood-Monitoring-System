import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import axios from "axios";
import home1 from "../assets/home2.png";
import destination2 from "../assets/destination1.png";
import Loader from "./Loader";
import location from "../assets/location.png";
const getCityCoordinates = async (city) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
    );
    if (response.data.length > 0) {
      return [
        parseFloat(response.data[0].lat),
        parseFloat(response.data[0].lon),
      ];
    }
    return null;
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    return null;
  }
};

const hazardLocations = [
  [22.08, 82.051], // Example hazard location
  // [20.0, 78.0], // Add more as needed
  // [22.0808325, 82.0516102],
  // [18.52104, 73.85354],
  [27.88879, 76.29123],
];

const Routing = ({ startCity, endCity }) => {
  const map = useMap();
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  useEffect(() => {
    const fetchCoordinates = async () => {
      const startCoords = await getCityCoordinates(startCity);
      const endCoords = await getCityCoordinates(endCity);
      setStart(startCoords);
      setEnd(endCoords);
    };
    if (startCity && endCity) {
      fetchCoordinates();
    }
  }, [startCity, endCity]);

  useEffect(() => {
    if (!map || !start || !end) return;
    //
    let routingControl;
    let selectedRouteLayer;
    routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1", // OSRM public API
        alternatives: true, // Enable multiple routes
      }),
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 6, opacity: 0.7 }],
      },
      addWaypoints: false,
    })
      .on("routesfound", (e) => {
        const routes = e.routes;
        // console.log("all routes found", routes);
        let hazardDetected = false;
        // Draw all routes with different styles
        routes.forEach((route, index) => {
          // Check if the route passes through a hazard location
          route.coordinates.forEach((coord) => {
            hazardLocations.forEach(([hazardLat, hazarLon]) => {
              const distance = map.distance(
                L.latLng(coord.lat, coord.lng),
                L.latLng(hazardLat, hazarLon)
              );
              if (distance <= 500) {
                // Adjust this value based on your hazard detection threshold
                hazardDetected = true;
                // mark
                L.circle([hazardLat, hazarLon], {
                  color: "red",
                  radius: 3000,
                }).addTo(map);
                // var marker = L.marker([latitude, longitude], {
                //   icon: L.icon({
                //     iconUrl: "../assets/location.png",

                //     iconSize: [25, 41],
                //     iconAnchor: [12, 41],
                //   }),
                // });
              }
            });
          });
          if (hazardDetected) {
            alert(
              "Hazard detected on the route. Please select an alternative route."
            );
          }

          const color = index === 0 ? "red" : index === 1 ? "green" : "red";
          const routeLine = L.Routing.line(route, {
            styles: [{ color, weight: 4, opacity: 0.6 }],
          }).addTo(map);
          // Add click handler to select this route
          routeLine.on("click", () => {
            if (selectedRouteLayer) {
              map.removeLayer(selectedRouteLayer);
            }
            selectedRouteLayer = L.Routing.line(route, {
              styles: [{ color: "orange", weight: 6, opacity: 0.9 }],
            }).addTo(map);
            // Optionally pan/zoom to the selected route
            map.fitBounds(routeLine.getBounds());
          });
        });
      })
      .addTo(map);

    routingControl.on("routesfound", () => {
      // Zoom into the start location when the route is ready
      map.setView(L.latLng(start[0], start[1]), 13);
    });

    // Clean up on unmount
    return () => {
      if (routingControl) map.removeControl(routingControl);
      if (selectedRouteLayer) map.removeLayer(selectedRouteLayer);
    };
  }, [map, start, end]);
};

const RouteMap = () => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [isRouteReady, setIsRouteReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([
    22.0808325, 82.0516102,
  ]);

  useEffect(() => {
    // Get current location if no cities are entered
    if (!city1 && !city2) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log(position);
            const { latitude, longitude } = position.coords;
            setCurrentLocation([latitude, longitude]);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }
    }
  }, [city1, city2]);

  const handleSubmit = async () => {
    if (city1 && city2) {
      setLoading(true); // Start loading
      const startCoords = await getCityCoordinates(city1);
      const endCoords = await getCityCoordinates(city2);
      if (startCoords && endCoords) {
        setIsRouteReady(true);
      }
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center p-2">
        <div className="flex flex-row items-center justify-center p-2">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
            <div className="relative mb-4">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src={home1} alt="Home Icon" className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="Start address"
                value={city1}
                onChange={(e) => setCity1(e.target.value)}
                className="w-full p-3 pl-10 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="relative mb-4">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img
                  src={destination2}
                  alt="Destination Icon"
                  className="w-6 h-6"
                />
              </div>
              <input
                type="text"
                placeholder="Destination address"
                value={city2}
                onChange={(e) => setCity2(e.target.value)}
                className="w-full p-3 pl-10 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            {/* Submit */}
            <button
              className="w-full bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 py-2 cursor-pointer"
              onClick={handleSubmit}
            >
              Search Route
            </button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <MapContainer
              center={currentLocation}
              zoom={6}
              style={{ height: "500px", width: "700px" }}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {isRouteReady && <Routing startCity={city1} endCity={city2} />}
              {/* <Marker>
                <Popup>Current Location</Popup>
              </Marker> */}
            </MapContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default RouteMap;

// location name
