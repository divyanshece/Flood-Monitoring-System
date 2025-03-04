import { Navigate } from "react-router-dom";
import { auth } from "./firebaseconfig"; // Import Firebase auth
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
