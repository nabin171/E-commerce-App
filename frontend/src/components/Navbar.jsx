import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between py-5 px-4 font-medium max-w-7xl mx-auto">
        <Link
          to={"/"}
          className="transform hover:scale-105 transition-transform duration-200"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
            FASHIONX
          </h1>
        </Link>

        <ul className="sm:flex gap-8 text-sm hidden text-white">
          <NavLink to="/" className="flex flex-col items-center gap-1 group">
            <p className="hover:text-blue-200 transition-colors duration-200 font-medium tracking-wide">
              HOME
            </p>
            <hr className="w-2/4 border-none h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1 group"
          >
            <p className="hover:text-blue-200 transition-colors duration-200 font-medium tracking-wide">
              COLLECTION
            </p>
            <hr className="w-2/4 border-none h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </NavLink>
          <NavLink
            to="/about"
            className="flex flex-col items-center gap-1 group"
          >
            <p className="hover:text-blue-200 transition-colors duration-200 font-medium tracking-wide">
              ABOUT
            </p>
            <hr className="w-2/4 border-none h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </NavLink>
          <NavLink
            to="/contact"
            className="flex flex-col items-center gap-1 group"
          >
            <p className="hover:text-blue-200 transition-colors duration-200 font-medium tracking-wide">
              CONTACT
            </p>
            <hr className="w-2/4 border-none h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <div
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"
            onClick={() => setShowSearch(true)}
          >
            <img
              src={assets.search_icon}
              className="w-5 filter brightness-0 invert"
              alt=""
            />
          </div>

          <div className="group relative">
            <div
              onClick={() => (token ? null : navigate("/login"))}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"
            >
              <img
                className="w-5 filter brightness-0 invert"
                src={assets.profile_icon}
                alt=""
              />
            </div>
            {/* Dropdown Menu*/}
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-700 rounded-lg shadow-xl border border-gray-200">
                  <p className="cursor-pointer hover:text-blue-600 transition-colors duration-200">
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-red-600 transition-colors duration-200"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative group">
            <div className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200">
              <img
                src={assets.cart_icon}
                className="w-5 min-w-5 filter brightness-0 invert"
                alt=""
              />
              <div className="absolute -right-1 -top-1 w-5 h-5 text-center leading-5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white shadow-lg animate-pulse">
                {getCartCount()}
              </div>
            </div>
          </Link>

          <div
            onClick={() => setVisible(true)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer sm:hidden"
          >
            <RxHamburgerMenu className="w-6 h-6 text-white" alt="" />
          </div>
        </div>
      </div>

      {/* sidebar menu for small screen*/}
      <div
        className={`fixed top-0 h-screen right-0 bottom-0 overflow-hidden bg-gradient-to-b from-blue-600 to-purple-600 transition-all duration-300 ease-in-out z-50 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-white">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center p-6 cursor-pointer hover:bg-white/10 transition-colors duration-200"
          >
            <IoIosArrowRoundBack className="h-6 w-6 mr-2" />
            <p className="font-medium">Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-b border-white/20 hover:bg-white/10 transition-colors duration-200 font-medium tracking-wide"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-b border-white/20 hover:bg-white/10 transition-colors duration-200 font-medium tracking-wide"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-b border-white/20 hover:bg-white/10 transition-colors duration-200 font-medium tracking-wide"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-b border-white/20 hover:bg-white/10 transition-colors duration-200 font-medium tracking-wide"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
