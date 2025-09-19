import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@heroui/react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-extrabold text-white mb-4">MyBrand</h1>
          <p className="text-gray-400 leading-relaxed">
            Prime made the ATL proud, putting on a show every time he touched
            the turf. Electrify the game like one of the best corners ever in
            the Nike Diamond Turf 93.
          </p>
        </div>

        {/* Company */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Company</h2>
          <ul className="space-y-2">
            <NavLink to="/">
              <li className="hover:text-blue-500 cursor-pointer">Home</li>
            </NavLink>
            <NavLink to="/about">
              {" "}
              <li className="hover:text-blue-500 cursor-pointer">About Us</li>
            </NavLink>
            <NavLink to="/cart">
              {" "}
              <li className="hover:text-blue-500 cursor-pointer">Delivery</li>
            </NavLink>

            <NavLink to="/cart">
              {" "}
              <li className="hover:text-blue-500 cursor-pointer">
                Privacy Policy
              </li>
            </NavLink>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h2>
          <ul className="space-y-2">
            <li className="hover:text-blue-500">+977 9862276291</li>
            <li>
              <a
                href="mailto:karki0008@gmail.com"
                className="hover:text-blue-500"
              >
                karki0008@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Newsletter</h2>
          <p className="text-gray-400 mb-3">
            Stay updated with our latest offers.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10">
        <p className="text-center text-gray-400 py-5 text-sm">
          © 2025 karki0008.com — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
