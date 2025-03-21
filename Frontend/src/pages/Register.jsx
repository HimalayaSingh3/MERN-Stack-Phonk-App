import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
  "https://mern-stack-phonk-app.onrender.com/api/v1/users/register",
  values,
  { withCredentials: true } 
);


      localStorage.setItem("token", res.data.token);

      console.log("User registered successfully!");
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border shadow-lg rounded-xl h-auto w-96 flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold">Register</h1>
        <form className="flex flex-col w-full mt-4" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 text-sm mb-2" aria-live="assertive">
              {error}
            </p>
          )}
          <h4>Username</h4>
          <input
            type="text"
            placeholder="Enter your username..."
            name="username"
            value={values.username}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <h4>Email</h4>
          <input
            type="text"
            placeholder="Enter your email..."
            name="email"
            value={values.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <h4 className="mt-4">Password</h4>
          <input
            type="text"
            placeholder="Enter your password..."
            name="password"
            value={values.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="mt-4 p-2 rounded bg-red-500 font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:bg-gray-400"
            disabled={!values.username || !values.email || !values.password}
          >
            Register
          </button>
          <p className="mt-2 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
