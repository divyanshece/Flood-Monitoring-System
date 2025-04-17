// import React, { useEffect, useState } from "react";
// import { db } from "../firebaseconfig";
// import {
//   ref,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// import { Link, useNavigate } from "react-router-dom";

// const DashBoardTable = () => {
//   const [recievedData, SetRecievedData] = useState([]);
//   useEffect(() => {
//     const distanceRef = ref(db, "underpasses");
//     onValue(distanceRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const result = snapshot.val();
//         // console.log(result);
//         // Convert object to an array
//         const resultInArray = Object.keys(result).map((key) => ({
//           passName: key, // Keep the Firebase key for reference
//           ...result[key],
//         }));
//         SetRecievedData(resultInArray);
//         // console.log("Data retrieved successfully", resultInArray);
//       } else {
//         console.log("No data available");
//         SetRecievedData();
//       }
//     });
//   }, []);

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="py-2 px-4 text-left">Underpass Name</th>
//             <th className="py-2 px-4 text-left">Latitude Longitude</th>
//             <th className="py-2 px-4 text-left">Device Status</th>
//             <th className="py-2 px-4 text-left">Water Level</th>
//             <th className="py-2 px-4 text-left">Timestamp</th>
//             <th className="py-2 px-4 text-center">Full View</th>
//           </tr>
//         </thead>
//         <tbody>
//           {recievedData.map((item) => (
//             <tr key={item.id} className="border-b hover:bg-gray-100 transition">
//               <td className="py-2 px-4">{item.passName || "N/A"}</td>
//               <td className="py-2 px-4">
//                 {item.location?.lat || "N/A"} & {item.location?.lng || "N/A"}
//               </td>
//               <td className="py-2 px-4">
//                 {item.sensors ? "Active" : "Deactive"}
//               </td>
//               <td className="py-2 px-4">
//                 {console.log(item.sensors?.ultrasonic?.distance)}
//                 {item.sensors?.ultrasonic?.distance < 15
//                   ? "Flooded 🔴"
//                   : "Clear 🟢" || "N/A"}
//               </td>
//               <td className="py-2 px-4">
//                 {new Date(
//                   item.sensors?.ultrasonic?.timestamp * 1000
//                 ).toLocaleString() || "N/A"}
//               </td>
//               <td className="py-2 px-4 text-center cursor-pointer">
//                 {" "}
//                 <Link
//                   className="hover:underline text-[#20cfff] hover:text-green-400"
//                   to="/fullview"
//                   state={{ underpass: item }}
//                 >
//                   🔍 View In Detail
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DashBoardTable;

import React, { useEffect, useState } from "react";
import { db } from "../firebaseconfig";
import { ref, onValue } from "firebase/database"; // Assuming you’ve set this up in firebaseconfig.js
import { Link } from "react-router-dom";

const DashBoardTable = () => {
  const [recievedData, SetRecievedData] = useState([]);

  useEffect(() => {
    const distanceRef = ref(db, "underpasses");

    onValue(distanceRef, (snapshot) => {
      if (snapshot.exists()) {
        const result = snapshot.val();

        const resultInArray = Object.keys(result).map((key) => ({
          passName: key,
          ...result[key],
        }));
        SetRecievedData(resultInArray);
      } else {
        console.log("No data available");
        SetRecievedData([]);
      }
    });
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Underpass Name</th>
            <th className="py-2 px-4 text-left">Latitude & Longitude</th>
            <th className="py-2 px-4 text-left">Device Status</th>
            <th className="py-2 px-4 text-left">Water Level</th>
            <th className="py-2 px-4 text-left">Timestamp</th>
            <th className="py-2 px-4 text-center">Full View</th>
          </tr>
        </thead>
        <tbody>
          {recievedData.map((item) => {
            const sensors = item.sensors || {};

            const distances = Object.values(sensors)
              .map((s) => s.distance)
              .filter((d) => typeof d === "number");

            // console.log("Distances:", distances); // Debugging line
            const minDistance =
              distances.length > 0 ? Math.max(...distances) : null;
            // console.log("Min Distance:", minDistance); // Debugging line

            const timestamps = Object.values(sensors)
              .map((s) => s.timestamp)
              .filter((t) => typeof t === "number");

            const latestTimestamp =
              timestamps.length > 0 ? Math.max(...timestamps) : null;

            const isFlooded = minDistance !== null && minDistance < 15;

            return (
              <tr
                key={item.passName}
                className={`border-b transition ${
                  isFlooded ? "bg-red-100" : "hover:bg-gray-100"
                }`}
              >
                <td className="py-2 px-4">{item.passName || "N/A"}</td>
                <td className="py-2 px-4">
                  {item.location?.lat || "N/A"} & {item.location?.lng || "N/A"}
                </td>
                <td className="py-2 px-4">
                  {Object.keys(sensors).length > 0 ? "Active" : "Inactive"}
                </td>
                <td className="py-2 px-4">
                  {minDistance !== null ? (
                    <>
                      {minDistance.toFixed(2)} cm{" "}
                      <span className="ml-2">
                        {isFlooded ? "🔴 Flooded" : "🟢 Clear"}
                      </span>
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="py-2 px-4">
                  {latestTimestamp
                    ? new Date(latestTimestamp * 1000).toLocaleString()
                    : "N/A"}
                </td>
                <td className="py-2 px-4 text-center cursor-pointer">
                  <Link
                    className="hover:underline text-[#20cfff] hover:text-green-400"
                    to="/fullview"
                    state={{ underpass: item }}
                  >
                    🔍 View In Detail
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoardTable;
