import React from "react";
import { assets } from "../assets/admin_assets/assets";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <div className="text-center my-6">
        <h1 className="text-5xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg animate-text">
          Fashion<span className="italic">X</span>
        </h1>
        <p className="mt-2 text-lg md:text-xl font-semibold text-gray-800 tracking-wide">
          Admin Panel
        </p>
      </div>

      <button
        onClick={() => setToken("")}
        className="inline-flex items-center gap-3 bg-gray-800 text-slate-300 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-700 transition transform hover:scale-[1.02]"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
