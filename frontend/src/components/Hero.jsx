import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row pt-4 gap-4 lg:gap-6 xl:gap-8 lg:justify-between min-h-screen lg:min-h-[80vh]">
      {/* Left Section */}
      <div className="flex flex-col gap-4 lg:w-1/2 xl:w-3/5">
        {/* Main Text Card */}
        <div
          className="flex flex-col sm:flex-row lg:flex-col p-4 sm:p-6 lg:p-8 xl:p-10 text-justify rounded-3xl gap-4 lg:gap-6 xl:gap-8 flex-1"
          style={{ backgroundColor: "#EAEAF3" }}
        >
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 xl:gap-6 sm:w-1/2 lg:w-full">
            <div className="flex items-center gap-2 lg:gap-4 xl:gap-6">
              <p className="font-bold text-sm sm:text-base md:text-lg lg:text-4xl xl:text-5xl 2xl:text-6xl">
                PREMIUM
              </p>
              <FaArrowRightLong className="arrow text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl" />
            </div>
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight">
              SHOES FOR EVERY
            </p>
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight">
              OCCASION
            </p>
          </div>

          <div className="sm:w-1/2 lg:w-full">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed">
              Prime made the ATL proud, putting on a show every time he touched
              the turf. Electrify the game like one of the best corners ever in
              the Nike Diamond Turf 93. It features the iconic midfoot strap and
              modern game-breaking tech, like the Vapor Edge 360 plate and mesh
              cuff. And, of course, we had to drench this with the same knockout
              black and reds Deion donned back in the day.
            </p>
          </div>
        </div>

        {/* Product Images Row */}
        <div className="flex gap-2 sm:gap-4 lg:gap-6">
          <div
            className="relative flex-1 rounded-3xl overflow-hidden min-h-[120px] sm:min-h-[150px] lg:min-h-[200px] xl:min-h-[250px]"
            style={{ backgroundColor: "#EAEAF3" }}
          >
            <img
              src={assets.n1}
              className="w-full h-full object-cover pt-8 sm:pt-12 lg:pt-16 xl:pt-20"
              alt="Nike Jordan"
            />
            <p className="absolute bottom-2 left-4 sm:bottom-3 sm:left-6 lg:bottom-4 lg:left-8 text-xs sm:text-sm lg:text-base xl:text-lg font-medium">
              Jordan 4
            </p>
          </div>

          <div
            className="relative flex-1 rounded-3xl overflow-hidden min-h-[120px] sm:min-h-[150px] lg:min-h-[200px] xl:min-h-[250px]"
            style={{ backgroundColor: "#EAEAF3" }}
          >
            <img
              src={assets.n1}
              className="w-full h-full object-cover pt-8 sm:pt-12 lg:pt-16 xl:pt-20"
              alt="Nike Jordan"
            />
            <p className="absolute bottom-2 left-4 sm:bottom-3 sm:left-6 lg:bottom-4 lg:left-8 text-xs sm:text-sm lg:text-base xl:text-lg font-medium">
              Jordan 4
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="w-full h-64 sm:h-80 md:h-96 lg:w-1/2 xl:w-2/5 lg:h-auto">
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
