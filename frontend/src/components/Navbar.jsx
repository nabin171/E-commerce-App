import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import logo from "../assets/frontend_assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaCartArrowDown } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import { IoIosMenu } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="flex flex-col gap-4 p-4 items-center lg:flex-row lg:w-auto lg:justify-between lg:gap-20"
      style={{ backgroundColor: "#EAEAF3" }}
    >
      <div className="flex items-center  bg-[#EAEAF3]">
        <Link to={"/"}>
          <h1
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold tasa-explorer
                 text-gray-700"
          >
            MyBrand
          </h1>
        </Link>
      </div>

      <ul className="hidden sm:flex sm:flex-col gap-2 lg:flex-row lg:gap-5 text-base lg:text-xl w-full lg:w-auto text-gray-700 bg-white rounded-3xl p-2 lg:p-4 justify-center">
        <NavLink to="/" className="flex flex-col items-center gap-1 ">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
      </ul>

      <div className="flex flex-row items-center justify-center gap-3 lg:gap-6 w-full lg:w-auto bg-white rounded-3xl p-2 lg:p-4">
        <SlMagnifier className="cursor-pointer text-3xl" />
        <div className="group relative">
          <CgProfile className="cursor-pointer text-3xl" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <BsCartPlus n className=" min-w-5 text-3xl " alt="" />
          <div className="absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            10
          </div>
        </Link>
        <IoIosMenu
          className="w-5 h-4 cursor-pointer sm:hidden"
          alt=""
          onClick={() => {
            setVisible(true);
          }}
        />
        {/* sidebar menu for small screens*/}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600 ">
            <div
              className="flex items-center gap-4 p-3 cursor-pointer "
              onClick={() => setVisible(false)}
            >
              <FaArrowLeft className="h-4 " alt="" />
              <p>Back</p>
            </div>

            <NavLink
              onClick={() => setVisible(false)}
              className="border py-2 pl-6"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="border py-2 pl-6"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="border py-2 pl-6"
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="border py-2 pl-6"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
