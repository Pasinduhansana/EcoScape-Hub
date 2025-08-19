import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaLeaf,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaShieldAlt,
  FaUserFriends,
  FaAward,
  FaCheck,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Login failed. Please try again.");
        console.log(result);
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Left Side - Features with Background Image */}
      <div className="hidden lg:flex flex-4 relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/80 to-green-700/70" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col justify-center items-start p-16 text-white"
        >
          <div className="max-w-lg">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <FaLeaf className="w-6 h-6 text-green-300" />
              </div>
              <span className="text-2xl font-bold">EcoScape Hub</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome Back
              <span className="block text-green-300">Eco Warrior</span>
            </h1>

            <p className="text-xl text-green-100 mb-12 leading-relaxed">
              Continue your journey towards creating beautiful, sustainable
              landscapes that make a positive impact on our planet.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30">
                  <FaShieldAlt className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Secure Platform
                  </h3>
                  <p className="text-green-200 text-sm">
                    Your data is protected with enterprise-grade security
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30">
                  <FaUserFriends className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Community Support
                  </h3>
                  <p className="text-green-200 text-sm">
                    24/7 access to our expert landscaping community
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30">
                  <FaAward className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Trusted Experts
                  </h3>
                  <p className="text-green-200 text-sm">
                    Work with certified sustainable landscaping professionals
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Testimonial */}
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-green-100 mb-4 italic">
                "EcoScape Hub transformed our backyard into a stunning,
                eco-friendly oasis. The team's expertise in sustainable
                landscaping is unmatched!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center">
                  <span className="text-green-800 font-bold text-sm">SJ</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Sarah Johnson</div>
                  <div className="text-green-200 text-sm">Portland, OR</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15K+</div>
                <div className="text-sm text-green-200">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-green-200">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-green-200">Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Modern Login Form */}
      <div className="flex-2 w-full flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaLeaf className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to continue your eco-journey
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <FaEnvelope className="absolute left-4 top-12 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-[10px] rounded-xl border border-gray-200 focus:ring-1 outline-none focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <FaLock className="absolute left-4 top-12 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-[10px] rounded-xl border border-gray-200 focus:ring-1 outline-none focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm bg-gray-50 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 accent-emerald-400  rounded transition-colors duration-200"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-500 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-[8px] px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                >
                  <FaGoogle className="h-4 w-4 text-red-500 mr-2" />
                  Google
                </button>
                <button
                  onClick={() => handleSocialLogin("facebook")}
                  className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
                >
                  <FaFacebook className="h-4 w-4 text-blue-600 mr-2" />
                  Facebook
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-green-600 hover:text-green-500 font-semibold transition-colors duration-200"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
