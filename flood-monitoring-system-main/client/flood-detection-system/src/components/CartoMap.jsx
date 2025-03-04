import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import axios from "axios";
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; // Icons for expand button

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

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 6, opacity: 0.8 }], // More like Google Maps
      },
      addWaypoints: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, start, end]);

  return null;
};

const CartoMap = () => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [isRouteReady, setIsRouteReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([22.0808, 82.0516]);
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    if (!city1 && !city2) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation([
              position.coords.latitude,
              position.coords.longitude,
            ]);
          },
          (error) => console.error("Error getting user location:", error)
        );
      }
    }
  }, [city1, city2]);

  const handleSubmit = async () => {
    if (city1 && city2) {
      setLoading(true);
      const startCoords = await getCityCoordinates(city1);
      const endCoords = await getCityCoordinates(city2);
      if (startCoords && endCoords) {
        setIsRouteReady(true);
      }
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Map */}
      <MapContainer center={currentLocation} zoom={6} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap &copy; CARTO"
        />
        <Marker position={currentLocation}></Marker>
        {isRouteReady && <Routing startCity={city1} endCity={city2} />}
      </MapContainer>

      {/* Floating Directions Box */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-t-2xl shadow-lg w-96">
        <div className="flex flex-col items-center">
          {/* Input Fields */}
          <input
            type="text"
            placeholder="Start address"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm mb-2"
          />
          <input
            type="text"
            placeholder="Destination address"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm mb-2"
          />

          {/* Search Button */}
          <button
            className="w-full bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 py-2 cursor-pointer"
            onClick={handleSubmit}
          >
            Search Route
          </button>

          {/* Expandable Directions Panel */}
          {isRouteReady && (
            <button
              className="w-full text-gray-600 mt-2"
              onClick={() => setShowDirections(!showDirections)}
            >
              {showDirections ? (
                <FaChevronDown size={24} />
              ) : (
                <FaChevronUp size={24} />
              )}
            </button>
          )}

          {/* Expanded Directions */}
          {showDirections && (
            <div className="w-full p-3 bg-gray-100 mt-2 rounded-lg shadow-md">
              <p className="text-gray-700 text-sm">
                Estimated travel time: 20 mins
              </p>
              <p className="text-gray-700 text-sm">Distance: 5 km</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartoMap;
