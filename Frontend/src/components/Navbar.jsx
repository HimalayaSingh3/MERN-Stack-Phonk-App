import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For mobile menu toggle icon
import phonk from "../assets/phonk.png";
import Button from "./Button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="shadow-md bg-red-200">
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <img src={phonk} alt="logo" className="h-8" />
          <Link className="text-xl font-bold" to="/home">
            Phonk<span className="text-white">Master</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-semibold text-white">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <Link to="/products" className="hover:text-black">
            All Products
          </Link>
          <Link to="/admin" className="hover:text-black">
            Admin
          </Link>
        </nav>

        <div className="hidden md:flex gap-2">
          <Link to="/profile">
            <button className="cursor-pointer text-white bg-green-500 p-1 px-3 rounded-lg">
              Profile
            </button>
          </Link>
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-md">
          <Link
            to="/"
            className="hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            to="/products"
            className="hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            All Products
            
          </Link>
            <Link to="/profile">
              <button className="cursor-pointer text-white bg-green-500 p-1 px-3 rounded-lg">
                Profile
              </button>
            </Link>
          
        </div>
      )}
    </div>
  );
};

export default Navbar;
