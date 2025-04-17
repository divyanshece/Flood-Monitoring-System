import { useEffect, useState } from "react";
import { auth, provider, signInWithPopup } from "../firebaseconfig.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googlelogo from "../assets/googlelogo.png";
import { handleFailure, handleSuccess } from "../utils.js";
import { ToastContainer } from "react-toastify";

const SigninAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // default role is User

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleSuccess("Login successful");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      handleFailure("Invalid credentials");
      setError("Invalid credentials");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      handleFailure("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      handleSuccess("Password reset email sent!");
    } catch (err) {
      handleFailure("Failed to send password reset email.");
      setError("Error: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // pass the user data to dashboard page
      localStorage.setItem("username", result.user.displayName);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };
  useEffect(() => {
    if (role === "Admin") {
      navigate("/adminlogin");
    } else if (role === "User") {
      navigate("/login");
    }
  }, [role, navigate]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen  ">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md ">
          <h1 className="text-4xl font-semibold text-blue-700 text-center mb-6">
            Admin Login
          </h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-36 p-3 border mb-6 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="User">Login as User</option>
            <option value="Admin">Login as Admin</option>
          </select>
          <form
            className="space-y-6 flex flex-col justify-center items-center"
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-blue-600 to-blue-300 text-white font-semibold py-3 rounded-lg cursor-pointer hover:bg-green-400 "
            >
              Login
            </button>
            <span>
              Don't have an account,{" "}
              <Link
                to={"/signup"}
                className="text-blue-500 hover:text-green-400 underline"
              >
                Signup
              </Link>
            </span>
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
          <div className="flex flex-row justify-between align-middle items-center mb-2 ml-30">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="px-2 py-3 rounded-lg  flex items-center justify-center cursor-pointer  text-red-500 hover:underline "
            >
              Forgot Password?
            </button>

            {/* <button
              onClick={handleGoogleLogin}
              className=" text-black py-3 px-2 rounded-lg flex items-center justify-center cursor-pointer hover:underline  decoration-black "
            >
              <img src={googlelogo} alt="Google" className="w-5 h-5 mr-1" />
              Sign in with Google
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninAdmin;
