import { useState, useEffect } from "react";
import { auth, db } from "../firebase-config";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [distance, setDistance] = useState("Loading...");
  const [timestamp, setTimestamp] = useState("-");
  const navigate = useNavigate();

  useEffect(() => {
    const distanceRef = ref(db, "underpasses/underpass_1/sensors/ultrasonic");
    onValue(distanceRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDistance(`${data.distance} cm`);
        setTimestamp(new Date(data.timestamp * 1000).toLocaleString());
      } else {
        setDistance("No Data");
      }
    });
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-blue-700">Flood Monitoring Dashboard</h1>
        <p className="text-lg font-semibold mt-4">Distance: {distance}</p>
        <p className="text-sm text-gray-500">Last Updated: {timestamp}</p>
      </div>
    </div>
  );
};

export default Dashboard;
