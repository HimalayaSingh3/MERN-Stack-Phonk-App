import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mern-stack-phonk-app.onrender.com/api/v1/users/login", {
        email,
        password,
      });

      const token = res.data.token;
      const isAdmin = res.data.isAdmin;

      login({ token, isAdmin });
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border shadow-lg rounded-xl h-82 w-96 flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold">Login</h1>
        <form className="flex flex-col w-full mt-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <label className="font-semibold">Email</label>
          <input
            type="text"
            placeholder="Enter your email..."
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="font-semibold mt-4">Password</label>
          <input
            type="text"
            placeholder="Enter your password..."
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="cursor-pointer mt-4 p-2 rounded bg-blue-500 font-semibold text-white"
          >
            Login
          </button>

          <p className="mt-2 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="underline text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
