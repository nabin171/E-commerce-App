import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  // Formik + Yup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name:
        currentState === "Sign Up"
          ? Yup.string()
              .min(3, "Name must be at least 3 characters")
              .required("Full name is required")
          : Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (currentState === "Sign Up") {
          const response = await axios.post(`${backendUrl}/api/user/register`, {
            name: values.name,
            email: values.email,
            password: values.password,
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
            email: values.email,
            password: values.password,
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
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <Lock className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentState === "Login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600">
            {currentState === "Login"
              ? "Sign in to access your account"
              : "Join us today by filling the form below"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name Field (Sign Up only) */}
          {currentState === "Sign Up" && (
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-200"
                  } focus:ring-2 focus:ring-gray-800 outline-none transition`}
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-gray-800 outline-none transition`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-12 pr-12 py-3 border rounded-xl ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-gray-800 outline-none transition`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Remember Me (Login only) */}
          {currentState === "Login" && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 accent-gray-800 rounded border-gray-300"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-700 transition transform hover:scale-[1.02]"
          >
            {currentState === "Login" ? "Login" : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <div className="w-full">
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
              theme="outline"
              size="large"
              width="100%"
            />
          </div>

          {/* Toggle Login / Sign Up */}
          <div className="text-center mt-6 text-sm">
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
              className="text-gray-900 font-semibold hover:underline"
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
