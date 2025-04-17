// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { ref, onValue } from "firebase/database";
// import { db } from "../firebaseconfig";
// import Time from "../components/Time";
// import underpass from "../assets/underpass.jpeg";
// import img1 from "../assets/underpassinside.jpeg";
// import img2 from "../assets/underpassinside1.jpeg";
// import img3 from "../assets/underpassinside2.jpeg";

// const FullView = () => {
//   const [passdata, setPassData] = useState({});
//   const location = useLocation();
//   const data = location.state?.underpass;

//   useEffect(() => {
//     if (data) setPassData(data);
//   }, [data]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6 items-center">
//       {/* Header Section */}
//       <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 text-center">
//         <h1 className="text-2xl font-bold text-gray-800">
//           {passdata.passName || "Underpass Details"}
//         </h1>
//       </div>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
//         {/* Underpass Image */}
//         <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//           <img
//             src={underpass}
//             className="rounded-lg w-full max-h-60 object-cover"
//             alt="Underpass"
//           />
//           <p className="text-lg font-semibold mt-2">{passdata.passName}</p>
//         </div>

//         {/* Time Section */}
//         <div className=" shadow-md rounded-lg p-6 flex justify-center items-center text-white text-lg font-semibold">
//           <Time />
//         </div>

//         {/* Sensor Values */}
//         <div className="bg-purple-500 shadow-md rounded-lg p-6 text-white text-center">
//           <p className="text-lg font-semibold">Water Level</p>
//           <p className="text-xl font-bold">
//             {passdata.sensors?.ultrasonic?.distance || "N/A"}m
//           </p>
//           <p className="text-lg mt-2">
//             {passdata.sensors?.ultrasonic?.distance < 5
//               ? "Flooded 🔴"
//               : "Safe 🟢"}
//           </p>
//         </div>

//         {/* Inside Condition Box */}
//         <div className="col-span-1 md:col-span-2 bg-green-500 shadow-md rounded-lg p-6 flex flex-wrap justify-center gap-4">
//           <img
//             src={img1}
//             className="rounded-lg w-48 h-32 object-cover"
//             alt="Inside 1"
//           />
//           <img
//             src={img2}
//             className="rounded-lg w-48 h-32 object-cover"
//             alt="Inside 2"
//           />
//           <img
//             src={img3}
//             className="rounded-lg w-48 h-32 object-cover"
//             alt="Inside 3"
//           />
//         </div>

//         {/* Additional Sections */}
//         <div className="bg-yellow-400 shadow-md rounded-lg p-6 text-center text-lg font-semibold">
//           05
//         </div>
//         <div className="bg-blue-400 shadow-md rounded-lg p-6 text-center text-lg font-semibold">
//           06
//         </div>
//         <div className="col-span-1 md:col-span-2 bg-lime-400 shadow-md rounded-lg p-6 text-center text-lg font-semibold">
//           07
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullView;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseconfig";
import Time from "../components/Time";
import underpass from "../assets/underpass.jpeg";
import img1 from "../assets/underpassinside.jpeg";
import img2 from "../assets/underpassinside1.jpeg";
import img3 from "../assets/underpassinside2.jpeg";

const FullView = () => {
  const [sensorsData, setSensorsData] = useState({});
  const location = useLocation();
  const underpassKey = location.state?.underpassKey || "underpass_1"; // Default

  useEffect(() => {
    const sensorRef = ref(db, `underpasses/${underpassKey}/sensors`);
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorsData(data);
      }
    });

    return () => unsubscribe();
  }, [underpassKey]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6 items-center">
      {/* Header */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {underpassKey.replace("_", " ").toUpperCase()}
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
        {/* Underpass Image */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <img
            src={underpass}
            className="rounded-lg w-full max-h-60 object-cover"
            alt="Underpass"
          />
          <p className="text-lg font-semibold mt-2">{underpassKey}</p>
        </div>

        {/* Time */}
        <div className="shadow-md rounded-lg p-6 flex justify-center items-center text-white text-lg font-semibold bg-gray-800">
          <Time />
        </div>

        {/* Sensor Values */}
        <div className="bg-purple-500 shadow-md rounded-lg p-6 text-white text-center space-y-4">
          {Object.entries(sensorsData).map(([key, sensor]) => (
            <div key={key}>
              <p className="text-lg font-semibold">{key.toUpperCase()}</p>
              <p className="text-xl font-bold">
                {sensor.distance?.toFixed(2)} cm
              </p>
              <p className="text-lg">
                {sensor.distance < 15 ? "Flooded 🔴" : "Safe 🟢"}
              </p>
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="col-span-1 md:col-span-2 bg-green-500 shadow-md rounded-lg p-6 flex flex-wrap justify-center gap-4">
          <img
            src={img1}
            className="rounded-lg w-48 h-32 object-cover"
            alt="Inside 1"
          />
          <img
            src={img2}
            className="rounded-lg w-48 h-32 object-cover"
            alt="Inside 2"
          />
          <img
            src={img3}
            className="rounded-lg w-48 h-32 object-cover"
            alt="Inside 3"
          />
        </div>

        {/* Placeholder Sections */}
        <div className="bg-yellow-400 shadow-md rounded-lg p-6 text-center text-lg font-semibold">
          05
        </div>
        <div className="bg-blue-400 shadow-md rounded-lg p-6 text-center text-lg font-semibold">
          06
        </div>
        <div className="col-span-1 md:col-span-2 bg-lime-400 shadow-md rounded-lg p-6 text-center text-lg font-semibold">
          07
        </div>
      </div>
    </div>
  );
};

export default FullView;
