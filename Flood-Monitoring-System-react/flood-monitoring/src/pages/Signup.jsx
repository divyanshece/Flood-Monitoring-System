import { useState } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError("Error creating account: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">Create Account</h1>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input type="email" placeholder="Email" className="w-full p-3 rounded-md bg-gray-100" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-3 rounded-md bg-gray-100" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md">Sign Up</button>
          <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
