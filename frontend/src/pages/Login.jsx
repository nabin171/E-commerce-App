import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaLock, FaEnvelope, FaUser } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaLock className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            User Panel
          </h1>
          <p className="text-gray-600 text-lg">
            {currentState === "Login"
              ? "Welcome back! Please sign in to continue"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={onSubmitHandler}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          {/* Full Name Field - Only show for Sign Up */}
          {currentState === "Login" ? (
            ""
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-base outline-none transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>
            </div>
          )}

          {/* Email Address Field - Show for both */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="current-password"
                placeholder="Enter your Email"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-base outline-none transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
            </div>
          </div>

          {/* Password Field - Show for both */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                type="password"
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl text-base outline-none transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
              <FaEye className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-purple-500 transition-colors" />
            </div>
          </div>

          {/* Remember Me and Forgot Password - Only show for Login */}
          {currentState === "Login" && (
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-5 h-5 mr-3 accent-purple-500 rounded"
                />
                <label
                  htmlFor="remember"
                  className="text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-purple-500 hover:text-purple-600 font-medium"
              >
                Forgot password?
              </a>
            </div>
          )}

          {currentState === "Login" ? (
            <button
              onClick={() => setCurrentState("Sign in")}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mb-6"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => setCurrentState("Sign Up")}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mb-6"
            >
              Create Account
            </button>
          )}

          {/* Terms and Conditions - Only show for Sign Up */}
          {currentState === "Sign Up" && (
            <div className="flex items-start mb-8">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 mr-3 mt-1 accent-purple-500 rounded"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-purple-500 hover:text-purple-600 font-medium"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-purple-500 hover:text-purple-600 font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
          )}

          {/* Submit Button */}

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            className="w-full bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl py-4 px-6 text-base font-medium cursor-pointer flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* Toggle between Login and Sign Up */}
          <div className="text-center mt-8">
            <span className="text-gray-600">
              {currentState === "Login"
                ? "Don't have an account? "
                : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
              }
              className="text-purple-500 font-semibold hover:text-purple-600 bg-transparent border-none cursor-pointer transition-colors"
            >
              {currentState === "Login" ? "Sign Up" : "Sign in"}
            </button>
          </div>

          {/* Footer Links - Only show for Login */}
          {currentState === "Login" && (
            <div className="text-center mt-6">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                Need help?
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
