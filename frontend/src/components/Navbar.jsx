import React from "react";
import YoumDropLogo from "../assets/YumDropLogo.svg";
import { NavLink } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../Cartcontext/CartContext";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { totalItems, openCart } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="w-full px-4 py-3 lg:py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center lg:flex-1">
            <NavLink to="/">
              <img
                src={YoumDropLogo}
                alt="YumDrop Logo"
                className="h-10 md:h-12 w-auto"
              />
            </NavLink>
          </div>
          {/* Desktop Delivery Address */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavLink
              to="/checkout"
              className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2.5 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm w-full max-w-xs justify-center"
            >
              <MapPinIcon className="w-5 h-5" />
              <span className="text-sm md:text-base font-medium">
                Delivery address
              </span>
            </NavLink>
          </div>
          <div className="flex items-center justify-end lg:justify-center xl:justify-center gap-3 md:gap-6 lg:flex-1">
            {/* Cart */}
        <NavLink
          to="/"
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <span className="text-sm font-medium sm:hidden lg:inline">
            Home 
          </span>
        </NavLink>
        
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 hover:text-blue-500 transition-colors"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full border border-gray-300">
                <ShoppingCartIcon className="w-5 h-5" />

                {/* Badge */}
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center px-1">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium sm:hidden lg:inline ">
                Cart
              </span>
            </button>
            {user ? (
              // Logged in – show profile and logout
              <>
                <NavLink
                  to="/user-profile"
                  className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium sm:hidden lg:inline">
                    {user.name?.split(" ")[0] || "Account"}
                  </span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  <div className="flex items-center gap-2">
                    <span>Logout</span>
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  </div>
                </button>
              </>
            ) : (
              // Not logged in – show login link
              <NavLink
                to="/login"
                className="flex items-center gap-2 hover:text-blue-500 transition-colors"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300">
                  <UserIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium sm:hidden lg:inline">
                  Account
                </span>
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Delivery Address */}
        <div className="mt-3 lg:hidden">
          <NavLink
            to="/checkout"
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-full px-4 py-2.5 hover:text-blue-500 hover:border-blue-500 transition-all mx-auto max-w-md w-full"
          >
            <MapPinIcon className="w-5 h-5" />
            <span className="text-sm">Delivery address</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
