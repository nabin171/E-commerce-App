import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import logo from "../assets/frontend_assets/logo.png";

export default function Navbar() {
  console.log("assets.logo =", assets?.logo);
  return (
    <div className="bg-amber-300 flex items-center justify-between py-5 font-medium">
      <img src={assets.logo} alt="" className="w-36" />
    </div>
  );
}
