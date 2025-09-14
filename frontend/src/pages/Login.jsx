import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex items-center justify-center bg-gray-50 p-4 mt-20"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            {currentState}
          </h1>
          <div className="w-8 h-[2px] bg-gray-800 mx-auto"></div>
        </div>

        {/* Full Name Field - Only show for Sign Up */}
        {currentState === "Sign Up" && (
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base outline-none transition-colors duration-200 focus:border-blue-500"
            />
          </div>
        )}

        {/* Email Address Field - Show for both */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-base outline-none transition-colors duration-200 focus:border-blue-500"
          />
        </div>

        {/* Date of Birth Field - Only show for Sign Up */}
        {currentState === "Sign Up" && (
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base outline-none transition-colors duration-200 focus:border-blue-500"
            />
          </div>
        )}

        {/* Gender Field - Only show for Sign Up */}
        {currentState === "Sign Up" && (
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Gender
            </label>
            <select className="w-full p-4 border-2 border-gray-200 rounded-xl text-base outline-none transition-colors duration-200 focus:border-blue-500 bg-white">
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        )}

        {/* Password Field - Show for both */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              required
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl text-base outline-none transition-colors duration-200 focus:border-blue-500"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
              <FaEye className="h-10 w-10" />
            </div>
          </div>
        </div>

        {/* Confirm Password Field - Only show for Sign Up */}
        {currentState === "Sign Up" && (
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                required
                type="password"
                placeholder="Confirm your password"
                className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl text-base outline-none transition-colors duration-200 focus:border-blue-500"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
                <FaEye className="h-10 w-10" />
              </div>
            </div>
          </div>
        )}

        {/* Remember Me Checkbox - Only show for Login */}
        {currentState === "Login" && (
          <div className="flex items-center mb-8">
            <input
              type="checkbox"
              id="remember"
              className="w-[18px] h-[18px] mr-3 accent-blue-500"
            />
            <label
              htmlFor="remember"
              className="text-base text-gray-700 cursor-pointer"
            >
              Remember me
            </label>
          </div>
        )}

        {/* Terms and Conditions - Only show for Sign Up */}
        {currentState === "Sign Up" && (
          <div className="flex items-start mb-8">
            <input
              required
              type="checkbox"
              id="terms"
              className="w-[18px] h-[18px] mr-3 mt-1 accent-blue-500"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-700 cursor-pointer"
            >
              I agree to the{" "}
              <a href="#" className="text-blue-500 hover:text-blue-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:text-blue-600">
                Privacy Policy
              </a>
            </label>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white border-none rounded-xl p-4 text-lg font-semibold cursor-pointer mb-6 transition-colors duration-200"
        >
          {currentState === "Login" ? "Sign In" : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Sign In Button */}
        <button
          type="button"
          className="w-full bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 rounded-xl p-4 text-base font-medium cursor-pointer mb-8 flex items-center justify-center gap-3 transition-colors duration-200"
        >
          <FcGoogle className="h-10 w-10" />
          Continue with Google
        </button>

        {/* Toggle between Login and Sign Up */}
        <div className="text-center mb-8">
          <span className="text-gray-500 text-base">
            {currentState === "Login"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
            }
            className="text-blue-500 no-underline font-semibold hover:text-blue-600 bg-transparent border-none cursor-pointer"
          >
            {currentState === "Login" ? "Sign up" : "Sign in"}
          </button>
        </div>

        {/* Footer Links - Only show for Login */}
        {currentState === "Login" && (
          <div className="text-center flex flex-col gap-3">
            <a
              href="#"
              className="text-gray-500 no-underline text-base hover:text-gray-700"
            >
              Forgot your password?
            </a>
            <a
              href="#"
              className="text-gray-500 no-underline text-base hover:text-gray-700"
            >
              Need help?
            </a>
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
