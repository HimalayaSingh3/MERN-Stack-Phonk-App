import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Button = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/logout");
      console.log("LoggedOut Successfully", res);
      navigate("/");
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div>
      <button
        className="p-1 px-3 cursor-pointer bg-red-500 rounded-lg text-white font-semibold"
        onClick={handleSubmit}
      >
        Logout
      </button>
    </div>
  );
};

export default Button;
