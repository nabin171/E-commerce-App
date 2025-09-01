import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="flex pt-4 lg:flex-row lg:gap-4 lg:justify-between">
      {/* Left Section */}
      <div className=" flex flex-col gap-4  lg:w-full lg:h-auto">
        {/* Main Text Card */}
        <div
          className="flex p-4 h-1/2 text-justify rounded-3xl lg:flex-col lg:text-6xl lg:gap-5 lg:justify-between"
          style={{ backgroundColor: "#EAEAF3" }}
        >
          <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex items-center gap-2 lg:gap-4">
              <p className="font-bold">PREMIUM</p>
              <FaArrowRightLong className="arrow text-lg sm:text-xl lg:text-6xl" />
            </div>
            <p className="font-bold">SHOES FOR EVERY</p>
            <p className="font-bold">OCCASION</p>
          </div>

          <p className="text-xs sm:text-base lg:text-lg xl:text-xl ">
            Prime made the ATL proud, putting on a show every time he touched
            the turf. Electrify the game like one of the best corners ever in
            the Nike Diamond Turf 93. It features the iconic midfoot strap and
            modern game-breaking tech, like the Vapor Edge 360 plate and mesh
            cuff. And, of course, we had to drench this with the same knockout
            black and reds Deion donned back in the day.
          </p>
        </div>

        {/* Product Images Row */}

        <div className="flex gap-2 sm:gap-4 lg:flex-row lg:justify-between lg:h-full">
          <div className="relative" style={{ backgroundColor: "#EAEAF3" }}>
            <img
              src={assets.n1}
              className="pt-20 rounded-3xl w-full h-full sm:h-32 lg:h-auto lg:w-full  "
              alt="Nike Jordan"
            />
            <p className="absolute bottom-4">Jordon 4</p>
          </div>
          <div className="relative " style={{ backgroundColor: "#EAEAF3" }}>
            <img
              src={assets.n1}
              className="pt-20 rounded-3xl w-full h-40 sm:h-32 lg:h-auto lg:w-full "
              alt="Nike Jordan"
            />
            <p className="absolute bottom-4">Jordon 4</p>
          </div>
        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="w-full h-full">
        <img
          src={assets.air1}
          className="w-full h-full rounded-3xl object-cover"
          alt="Featured shoe"
        />
      </div>
    </div>
  );
};

export default Hero;
