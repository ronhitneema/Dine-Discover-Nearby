import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import ExploreEats from '../assets/ExploreEats_flat.png'
import {logout} from "../redux/slices/authSlice";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    dispatch(logout())
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `/search/${searchTerm}`;
  };


  
  const toggle = () => {
    setShowDropdown(false)
  }

  return (
    <nav className="sticky z-50 flex items-center justify-between w-full px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link onClick={toggle} to="/">
        <img src = {ExploreEats} width="200" height="100" alt="logo"/>
      </Link>

      {/* Search Bar */}
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            className="w-6 h-6 text-gray-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M22.8,21.4L18.5,17.1c1.2-1.5,1.9-3.4,1.9-5.5c0-5-4-9-9-9s-9,4-9,9s4,9,9,9c2.1,0,4-0.7,5.5-1.9l4.3,4.3c0.4,0.4,1,0.4,1.4,0C23.2,22.4,23.2,21.8,22.8,21.4z M4,10c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S4,13.3,4,10z" />
          </svg>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </div>

      {/* Buttons and Dropdown */}
      <div className="flex items-center space-x-4">
        {user && user.role === "customer" && (
      <>

        <Link to="/favorites" className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Your Favorites
        </Link>
        </>
        )}
        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => setShowDropdown(!showDropdown)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-transparent border-none"
          >
            Options
          </button>
          {showDropdown && (
  <div className="absolute z-10 right-0 w-40 py-2 mt-2 bg-white border rounded-md shadow-lg">
    {user && user.role === "customer" && (
      <>
        <Link onClick={toggle} to="/"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Home
        </Link>
        <Link onClick={toggle} to="/customer-profile"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Profile
        </Link>
        <Link onClick={toggle} to="/customer-settings"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Settings
        </Link>
        <Link onClick={toggle} to="/contact"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Contact Us
        </Link>
        <Link
          to="/"
          onClick={handleLogout}
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Logout
        </Link>
      </>
    )}
    {user && user.role === "restaurant"  && (
      <>
      <Link onClick={toggle} to="/restaurant-home"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Overview
        </Link>
        <Link onClick={toggle} to="/restaurant-profile"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Restaurant Profile
        </Link>
        <Link onClick={toggle} to="/restaurant-settings"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Logout
        </button>
        
      </>
    )}
    {user && user.role === "admin"  && (
      <>
      <Link onClick={toggle} to="/dashboard"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        Dashboard
      </Link>
      <Link
        onClick={handleLogout}
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        Logout
      </Link>
      
    </>
    )}
    {user === null && (
  <>
    <Link onClick={toggle} to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
      Home
    </Link>
    <Link onClick={toggle}
      to="/login"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
    >
      Login
    </Link>
    <Link onClick={toggle}
      to="/admin-login"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
    >
      Admin Login
    </Link>
    <Link onClick={toggle}
      to="/"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
    >
      Contact Us
    </Link>
  </>
)}
  </div>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
