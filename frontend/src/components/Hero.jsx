"use client";
import { animate } from "animejs";

// Import the product images directly (not from assets object)
import p_img1 from "../assets/frontend_assets/p_img1.png";
import p_img2_1 from "../assets/frontend_assets/p_img2_1.png";
import p_img3 from "../assets/frontend_assets/p_img3.png";
import p_img4 from "../assets/frontend_assets/p_img4.png";
import "./Hero.css"; // Importing the CSS file

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "./CustomButton";

const Hero = () => {
  const [animationKey, setAnimationKey] = useState(0);

  // Restart animation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-100 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-12">
        {/* Left side - Text content */}
        <div className="flex-1 max-w-xl mb-12 lg:mb-0">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Fashion That
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Moves You
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Discover our latest collection of premium clothing that combines
            style, comfort, and quality. Each piece is carefully crafted to make
            you look and feel amazing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink to="/collection">
              <CustomButton label="Shop Collection" />
            </NavLink>
            <NavLink to="/cart">
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors pointer-cursor font-medium">
                View Lookbook
              </button>
            </NavLink>
          </div>
        </div>

        {/* Right side - Animated clothing items */}
        <div className="flex-1 relative h-96 lg:h-[600px] w-full max-w-2xl">
          {/* Main central area for large images */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              key={`large-1-${animationKey}`}
              src={p_img1}
              alt="Fashion Item 1"
              className="absolute w-72 h-72 object-cover rounded-2xl shadow-2xl animate-[fadeInScale_2s_ease-in-out_3s_both]"
            />
            <img
              key={`large-2-${animationKey}`}
              src={p_img2_1}
              alt="Fashion Item 2"
              className="absolute w-72 h-72 object-cover rounded-2xl shadow-2xl animate-[fadeInScale_2s_ease-in-out_5s_both]"
            />
            <img
              key={`large-3-${animationKey}`}
              src={p_img3}
              alt="Fashion Item 3"
              className="absolute w-72 h-72 object-cover rounded-2xl shadow-2xl animate-[fadeInScale_2s_ease-in-out_7s_both]"
            />
            <img
              key={`large-4-${animationKey}`}
              src={p_img4}
              alt="Fashion Item 4"
              className="absolute w-72 h-72 object-cover rounded-2xl shadow-2xl animate-[fadeInScale_2s_ease-in-out_9s_both]"
            />
          </div>

          {/* Small floating clothing items */}
          <div>
            {/* Small item 1 that moves to center */}
            <img
              src={p_img1}
              alt="Fashion Item 1"
              className="absolute w-20 h-20 object-cover rounded-lg shadow-lg animate-[moveToCenter_3s_ease-in-out_0s_both]"
              style={{ top: "10%", left: "10%" }}
            />
            {/* Additional floating small item 1 */}
            <img
              src={p_img1}
              alt="Fashion Item 1"
              className="absolute w-16 h-16 object-cover rounded-lg shadow-md opacity-60 animate-float"
              style={{ top: "30%", right: "15%" }}
            />
          </div>

          <div>
            {/* Small item 2 that moves to center */}
            <img
              src={p_img2_1}
              alt="Fashion Item 2"
              className="absolute w-20 h-20 object-cover rounded-lg shadow-lg animate-[moveToCenter2_3s_ease-in-out_2s_both]"
              style={{ top: "20%", left: "80%" }}
            />
            {/* Additional floating small item 2 */}
            <img
              src={p_img2_1}
              alt="Fashion Item 2"
              className="absolute w-16 h-16 object-cover rounded-lg shadow-md opacity-60 animate-float-delayed"
              style={{ top: "60%", right: "25%", animationDelay: "0.5s" }}
            />
          </div>

          <div>
            {/* Small item 3 that moves to center */}
            <img
              src={p_img3}
              alt="Fashion Item 3"
              className="absolute w-20 h-20 object-cover rounded-lg shadow-lg animate-[moveToCenter3_3s_ease-in-out_4s_both]"
              style={{ top: "70%", left: "5%" }}
            />
            {/* Additional floating small item 3 */}
            <img
              src={p_img3}
              alt="Fashion Item 3"
              className="absolute w-16 h-16 object-cover rounded-lg shadow-md opacity-60 animate-float"
              style={{ top: "15%", right: "35%", animationDelay: "1s" }}
            />
          </div>

          <div>
            {/* Small item 4 that moves to center */}
            <img
              src={p_img4}
              alt="Fashion Item 4"
              className="absolute w-20 h-20 object-cover rounded-lg shadow-lg animate-[moveToCenter4_3s_ease-in-out_6s_both]"
              style={{ top: "80%", left: "85%" }}
            />
            {/* Additional floating small item 4 */}
            <img
              src={p_img4}
              alt="Fashion Item 4"
              className="absolute w-16 h-16 object-cover rounded-lg shadow-md opacity-60 animate-float-delayed"
              style={{ top: "45%", right: "10%", animationDelay: "1.5s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
