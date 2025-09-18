import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account created successfully");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-white text-3xl" />
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

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          {/* Name Field */}
          {currentState === "Sign Up" && (
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
                  required
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-base outline-none transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl text-base outline-none transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow hover:shadow-xl hover:bg-blue-300 transition transform hover:scale-[1.02]"
          >
            {currentState === "Login" ? "Login" : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await axios.post(
                  `${backendUrl}/api/user/googlelogin`,
                  {
                    token: credentialResponse.credential,
                  }
                );
                if (res.data.success) {
                  setToken(res.data.token);
                  localStorage.setItem("token", res.data.token);
                  toast.success("Logged in successfully");
                  navigate("/");
                }
              } catch (err) {
                console.error(err);
                toast.error("Google login failed");
              }
            }}
            onError={() => toast.error("Google login failed")}
          />

          {/* Toggle Login / Sign Up */}
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
              {currentState === "Login" ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
