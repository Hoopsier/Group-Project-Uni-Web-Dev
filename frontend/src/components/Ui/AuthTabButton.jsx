import React from "react";
import { NavLink } from "react-router-dom";

function Button({ label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex-1 pb-4 font-semibold text-lg relative transition-colors ${
          isActive ? "text-black" : "text-gray-500 hover:text-gray-700"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600"></span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default Button;
