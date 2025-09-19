import React from "react";
import { assets } from "../assets/admin_assets/assets";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="lt" />
      <button
        onClick={() => setToken("")}
        className="inline-flex items-center gap-3 bg-gradient-to-r bg-gray-900  text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-xl transition transform hover:scale-[1.02]"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
