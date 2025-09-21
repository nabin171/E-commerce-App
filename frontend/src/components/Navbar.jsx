import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";
import { motion } from "motion/react";

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
    <motion.div
      initial={{ y: -100, opacity: 0 }} // slide down on load
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className=" bg-gray-900 shadow-lg sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between py-5 px-4 font-medium max-w-7xl mx-auto">
        <Link
          to={"/"}
          className="transform hover:scale-105 transition-transform duration-200"
        >
          <h1 className="text-4xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg animate-text">
            Fashion<span className="italic">X</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="sm:flex gap-8 text-sm hidden text-white">
          {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((text, idx) => (
            <NavLink
              key={idx}
              to={text === "HOME" ? "/" : `/${text.toLowerCase()}`}
              className="flex flex-col items-center gap-1 group"
            >
              <p className="hover:text-blue-200 transition-colors duration-200 font-medium tracking-wide">
                {text}
              </p>
              <hr className="w-2/4 border-none h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </NavLink>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden sm:flex items-center gap-6">
          {/* Search */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"
            onClick={() => setShowSearch(true)}
          >
            <img
              src={assets.search_icon}
              className="w-5 filter brightness-0 invert"
              alt=""
            />
          </motion.div>

          {/* Profile */}
          <div className="group relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (token ? null : navigate("/login"))}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"
            >
              <img
                className="w-5 filter brightness-0 invert"
                src={assets.profile_icon}
                alt=""
              />
            </motion.div>

            {/* Dropdown */}
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

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <img
                src={assets.cart_icon}
                className="w-5 min-w-5 filter brightness-0 invert"
                alt=""
              />
              <div className="absolute -right-1 -top-1 w-5 h-5 text-center leading-5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white shadow-lg animate-pulse">
                {getCartCount()}
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex sm:hidden items-center gap-4">
          {/* Mobile Cart */}
          <Link to="/cart" className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <img
                src={assets.cart_icon}
                className="w-5 min-w-5 filter brightness-0 invert"
                alt=""
              />
              <div className="absolute -right-1 -top-1 w-5 h-5 text-center leading-5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white shadow-lg animate-pulse">
                {getCartCount()}
              </div>
            </motion.div>
          </Link>

          {/* Hamburger */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisible(true)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"
          >
            <RxHamburgerMenu className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={visible ? { x: 0, opacity: 1 } : { x: 300, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 h-screen right-0 bottom-0 overflow-hidden bg-gray-900 z-50 w-72"
      >
        <div className="flex flex-col text-white h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center p-6 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            <IoIosArrowRoundBack className="h-6 w-6 mr-2" />
            <p className="font-medium">Back</p>
          </div>

          {/* Search in Mobile Menu */}
          <div
            onClick={() => {
              setShowSearch(true);
              setVisible(false);
            }}
            className="flex items-center py-4 pl-6 border-b border-white/20 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:pl-8"
          >
            <img
              src={assets.search_icon}
              className="w-5 h-5 filter brightness-0 invert mr-3"
              alt=""
            />
            <p className="font-medium tracking-wide">SEARCH</p>
          </div>

          {/* Navigation Links */}
          {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((text, idx) => (
            <NavLink
              key={idx}
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border-b border-white/20 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400 transition-all duration-300 font-medium tracking-wide transform hover:scale-105 hover:pl-8"
              to={text === "HOME" ? "/" : `/${text.toLowerCase()}`}
            >
              {text}
            </NavLink>
          ))}

          {/* Profile Section in Mobile Menu */}
          <div className="border-b border-white/20">
            {!token ? (
              <div
                onClick={() => {
                  navigate("/login");
                  setVisible(false);
                }}
                className="flex items-center py-4 pl-6 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-400 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:pl-8"
              >
                <img
                  src={assets.profile_icon}
                  className="w-5 h-5 filter brightness-0 invert mr-3"
                  alt=""
                />
                <p className="font-medium tracking-wide">LOGIN</p>
              </div>
            ) : (
              <>
                <div className="flex items-center py-4 pl-6 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-400 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:pl-8">
                  <img
                    src={assets.profile_icon}
                    className="w-5 h-5 filter brightness-0 invert mr-3"
                    alt=""
                  />
                  <p className="font-medium tracking-wide">MY PROFILE</p>
                </div>
                <div
                  onClick={() => {
                    navigate("/orders");
                    setVisible(false);
                  }}
                  className="py-4 pl-6 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-400 transition-all duration-300 cursor-pointer font-medium tracking-wide transform hover:scale-105 hover:pl-8"
                >
                  ORDERS
                </div>
                <div
                  onClick={() => {
                    logout();
                    setVisible(false);
                  }}
                  className="py-4 pl-6 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-400 transition-all duration-300 cursor-pointer font-medium tracking-wide text-red-300 hover:text-white transform hover:scale-105 hover:pl-8"
                >
                  LOGOUT
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
