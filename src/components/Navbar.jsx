import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center gap-11 py-3 px-8 bg-[#1E352F] text-gray-50">
      <h2 className="text-3xl font-semibold font-montserrat">Meal Planner</h2>
      <nav>
        <ul className="flex gap-8 text-md items-center text-gray-300 font-inter">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/planner">Planner</Link>
          <Link to="/favorites">Favorites</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
