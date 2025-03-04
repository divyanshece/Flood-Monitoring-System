import { useState } from "react";
import { auth, provider } from "../firebaseconfig"; // Firebase config
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import googlelogo from "../assets/googlelogo.png";
import { Link } from "react-router-dom";
import { handleFailure, handleSuccess } from "../utils.js";
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email & Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      handleSuccess("Signup successful!");
      navigate("/login");
    } catch (err) {
      handleFailure("Signup failed: " + err.message);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      handleSuccess("Signup successful!");
      navigate("/dashboard"); // Redirect after signup
    } catch (error) {
      handleFailure("Google Signup failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-semibold text-blue-700 text-center mb-6">
          Signup
        </h1>

        <form
          className="space-y-6 flex flex-col justify-center items-center"
          onSubmit={handleSignup}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg cursor-pointer"
          >
            Signup
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            // transition={Slide}
          />
        </form>

        <span>
          Already a user,{" "}
          <Link
            to={"/login"}
            className="text-blue-500 hover:text-green-400 underline"
          >
            Login
          </Link>
        </span>

        <div className="flex justify-center items-center mt-6">
          <button
            onClick={handleGoogleSignup}
            className="text-black py-3 px-2 rounded-lg flex items-center justify-center cursor-pointer hover:underline"
          >
            <img src={googlelogo} alt="Google" className="w-5 h-5 mr-1" />
            Signup with Google
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
