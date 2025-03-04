import React, { useEffect, useState } from "react";
import { db } from "../firebaseconfig";
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const DashBoardTable = () => {
  const [recievedData, SetRecievedData] = useState([]);
  useEffect(() => {
    const distanceRef = ref(db, "underpasses");
    onValue(distanceRef, (snapshot) => {
      if (snapshot.exists()) {
        const result = snapshot.val();
        // console.log(result);
        // Convert object to an array
        const resultInArray = Object.keys(result).map((key) => ({
          passName: key, // Keep the Firebase key for reference
          ...result[key],
        }));
        SetRecievedData(resultInArray);
        // console.log("Data retrieved successfully", resultInArray);
      } else {
        console.log("No data available");
        SetRecievedData();
      }
    });
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Underpass Name</th>
            <th className="py-2 px-4 text-left">Latitude Longitude</th>
            <th className="py-2 px-4 text-left">Device Status</th>
            <th className="py-2 px-4 text-left">Water Level</th>
            <th className="py-2 px-4 text-left">Timestamp</th>
            <th className="py-2 px-4 text-center">Full View</th>
          </tr>
        </thead>
        <tbody>
          {recievedData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-100 transition">
              <td className="py-2 px-4">{item.passName || "N/A"}</td>
              <td className="py-2 px-4">
                {item.location?.lat.toFixed(2) || "N/A"} &{" "}
                {item.location?.lng.toFixed(2) || "N/A"}
              </td>
              <td className="py-2 px-4">
                {item.sensors ? "Active" : "Deactive"}
              </td>
              <td className="py-2 px-4">
                {item.sensors?.ultrasonic?.distance < 5
                  ? "Flooded 🔴"
                  : "Safe 🟢" || "N/A"}
              </td>
              <td className="py-2 px-4">
                {new Date(
                  item.sensors?.ultrasonic?.timestamp * 1000
                ).toLocaleString() || "N/A"}
              </td>
              <td className="py-2 px-4 text-center cursor-pointer">🔍</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoardTable;
