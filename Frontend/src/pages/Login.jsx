import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:3000/api/v1/users/login", { email, password });

        // Store the token instead of the entire user object
        localStorage.setItem("token", res.data.token);

        if (res.data.isAdmin) {
            console.log("Admin logged in!");
            navigate("/admin");
        } else {
            console.log("User logged in!");
            navigate("/home");
        }
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
          <h4>Email</h4>
          <input
            type="text"
            placeholder="Enter your email..."
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h4 className="mt-4">Password</h4>
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
