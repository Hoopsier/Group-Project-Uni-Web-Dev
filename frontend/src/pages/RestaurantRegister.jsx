import React, { useState } from "react";
import YoumDropLogo from "../assets/YumDropLogo.svg";

import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

import AuthTabButton from "../components/Ui/AuthTabButton";

const RestaurantRegister = () => {


  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showSignupMessage, setShowSignupMessage] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side Image, logo and text */}

      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/736x/bf/98/34/bf98341f4092074d7fe12dce42f588ac.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute top-6 left-6 z-10">
            <div className="flex items-center">
              <img
                src={YoumDropLogo}
                alt="YumDrop Logo"
                className="h-14 w-auto drop-shadow-lg"
              />
            </div>
          </div>

          {/* For Background img Text */}
          <div className="relative h-full flex items-center justify-center px-8">
            <div className="text-center text-white max-w-xl">
              <div className="mb-6">
                <h2 className="text-5xl font-bold mb-4 leading-tight bg-black/9 w-fit p-3 rounded-3xl">
                  Welcome to <span className="text-yellow-300">Yum</span>
                  <span className="text-white">Drop</span>
                </h2>
                <p className="text-2xl mb-6 font-medium bg-black/7 rounded-3xl">
                  Grow your restaurant with more visibility, more orders, and
                  loyal customers.
                </p>
                <div className="h-1 w-24 bg-red-500 mx-auto mb-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side Sign in Form */}
      <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Merchant Account
          </h1>
          <p className="text-gray-600 mt-2">Start selling on YomDrop today !</p>
        </div>

        <div className="flex border-b mb-8">
          <AuthTabButton label="Login" to="/login" />
          <AuthTabButton label="Sign Up" to="/signup" />
          <AuthTabButton
            label="List Your Restaurant"
            to="/restaurant-register"
          />
        </div>

        {showSignupMessage && (
          <div className="flex-1 text-red-500 text-center">
            <span className="font-medium">Signup is not ready</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="Restaurant or business name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="minimum 8 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="Re-enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
          >
            <span>Create Account & Continue</span>
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Sign in
            </a>
          </p>
        </form>
        {/* Note */}
        <div className="relative flex justify-center text-sm">
          <p className="text-xs text-gray-600 text-center mt-3 w-2xs bg-gray-100 p-1.5 rounded-2xl">
            Note: You will receive a verification email after registration.
            Please verify your email to continue with restaurant setup.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            By signing in, you agree to our{" "}
            <a
              href="#terms"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#privacy"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegister;
