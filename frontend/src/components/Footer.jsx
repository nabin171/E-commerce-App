import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr]  my-10 mt-40 text-sm sm:justify-between">
        <div>
          <h1
            className="mb-5 w-32 text-xl sm:text-2xl lg:text-3xl font-extrabold tasa-explorer
                 text-gray-700"
          >
            MyBrand
          </h1>
          <p className="w-full md:w-2/3 text-gray-600">
            Prime made the ATL proud, putting on a show every time he touched
            the turf. Electrify the game like one of the best corners ever in
            the Nike Diamond Turf 93. It features the iconic midfoot strap and
            modern game-breaking tech, like the Vapor Edge 360
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+977 9862276291</li>
            <li>karki0008@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@karki0008.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
