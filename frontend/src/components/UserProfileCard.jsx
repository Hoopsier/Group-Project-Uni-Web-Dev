import React from "react";

function UserProfileCard() {
  return (
    <div className="border-[#D1D5DC] p-4 rounded-lg shadow-md w-full  ">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}

        <img
          className="w-20 h-20 rounded-full object-cover"
          src="https://i.pinimg.com/736x/0f/68/94/0f6894e539589a50809e45833c8bb6c4.jpg"
          alt="User profile"
        />

        <div>
          {/* User Details */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
            <p className="text-gray-600">(555) 123-4567</p>

            {/* Edit Button */}
            <button className="mt-3 bg-white border border-black hover:bg-gray-100 text-black text-sm font-medium py-1.5 px-4 transition duration-200 w-full rounded">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
