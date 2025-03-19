import React, { useContext,useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser, setToken,logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white border-b border-gray-700 shadow-lg">
  <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400 transition-all duration-300">
    E-Commerce
  </Link>
  <div>
    {user ? (
      <>
        <span className="mr-4 text-gray-300 hover:text-white transition-colors duration-200">Welcome, {user.username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          Logout
        </button>
      </>
    ) : (
      <Link 
        to="/login" 
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-md"
      >
        Login
      </Link>
    )}
  </div>
</nav>
  );
};

export default Navbar;
