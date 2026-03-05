import React from "react";
import { useEffect, useState } from "react";


function UserProfileCard({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/${userId}`);

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

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
