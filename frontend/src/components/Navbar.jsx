import React from "react";
import YoumDropLogo from "../assets/YumDropLogo.svg";
import { NavLink } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="w-full px-4 py-3 lg:py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center lg:flex-1">
            <NavLink to="/home">
              <img
                src={YoumDropLogo}
                alt="YumDrop Logo"
                className="h-10 md:h-12 w-auto"
              />
            </NavLink>
          </div>

          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center gap-2 border border-gray-300 rounded px-5 py-2.5 hover:text-blue-500 cursor-pointer hover:border-blue-500 transition-all shadow-sm w-full max-w-xs justify-center">
              <MapPinIcon className="w-5 h-5" />
              <span className="text-sm md:text-base font-medium">
                Delivery address
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end lg:justify-center xl:justify-center gap-3 md:gap-6 lg:flex-1">
            <NavLink to="/login">
              <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                <div className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300">
                  <UserIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium sm:hidden lg:inline">
                  Account
                </span>
              </button>
            </NavLink>

            <button className="relative flex items-center gap-2 hover:text-blue-500 transition-colors">
              <div className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300">
                <ShoppingCartIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium sm:hidden lg:inline ">
                Cart
              </span>
            </button>
          </div>
        </div>

        <div className="mt-3 lg:hidden">
          <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full px-4 py-2.5 hover:text-blue-500 cursor-pointer hover:border-blue-500 transition-all mx-auto max-w-md w-full">
            <MapPinIcon className="w-5 h-5" />
            <span className="text-sm">Delivery address</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
