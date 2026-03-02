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

import AuthTabButton from "../components/Ui/AuthTabButton";

const SignUp = () => {
  // const [activeTab, setActiveTab] = useState("signup");

  const [formData, setFormData] = useState({
    fullName: "",
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
              "url(https://i.pinimg.com/736x/27/2b/e4/272be49841f6f1fa1ee88f5530500d44.jpg)",
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
                <h2 className="text-5xl font-bold mb-4 leading-tight bg-black/17 w-fit p-3 rounded-3xl">
                  Welcome to <span className="text-yellow-300">Yum</span>
                  <span className="text-white">Drop</span>
                </h2>
                <p className="text-2xl mb-6 font-medium bg-black/7 rounded-3xl">
                  Craving something delicious? We deliver the best meals in your
                  city.
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
            Create Your Account
          </h1>
          <p className="text-gray-600 mt-2">
            Join us and start ordering your favorite food today
          </p>
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
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="full name"
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
                placeholder="xxxxxxxxxx"
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
                placeholder="xxxxxxxxxx"
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
            <span>CREATE ACCOUNT</span>
          </button>
        </form>

        {/* Divider */}
        <div className="my-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-red-300 text-gray-700 font-medium py-3.5 rounded-lg shadow-sm hover:shadow transition-all duration-300 group">
          <span className="font-semibold">Login with Personal Gmail</span>
        </button>

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

export default SignUp;
