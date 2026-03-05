import React, { useState } from "react";
import YoumDropLogo from "../assets/YumDropLogo.svg";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import AuthTabButton from "../components/Ui/AuthTabButton";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showSignupMessage, setShowSignupMessage] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      const contentType = response.headers.get("content-type");

      // Attempt to parse JSON only if the response is JSON
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // If not JSON, read as text to see what the server actually sent
        const text = await response.text();
        throw new Error(
          `Server returned ${response.status}: ${text || "Empty response"}`,
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left side Image, logo and text */}

      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/736x/07/96/82/0796829bf2c79a281297ecc9eeb84f9c.jpg)",
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
                  Delivering happiness to your door
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Sign in to continue to your account
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
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a
                href="#forgot"
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Forgot password?
              </a>
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
                placeholder="Enter your password"
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
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
          >
            <span>{loading ? "Signing in..." : "Sign In"}</span>
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

export default Login;
