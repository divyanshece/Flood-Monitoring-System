import { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent!");
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">Flood Monitoring System</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="w-full p-3 rounded-md bg-gray-100" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-3 rounded-md bg-gray-100" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md">Login</button>
          <p className="text-red-500 text-sm text-center">{error}</p>
          <button type="button" onClick={handleForgotPassword} className="text-blue-500 hover:underline text-sm">Forgot Password?</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
