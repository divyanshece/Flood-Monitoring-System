import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import FullView from "./Pages/FullView";
import Home from "./Pages/Home";
import Map from "./Pages/Map";
import SigninAdmin from "./Pages/SigninAdmin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<SigninAdmin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/fullview"
          element={
            <PrivateRoute>
              <FullView />
            </PrivateRoute>
          }
        />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;
