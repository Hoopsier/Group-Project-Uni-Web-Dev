import React from "react";
import UserProfileCard from "../components/UserProfileCard";
import UserProifleDataBoxCard from "../components/UserProifleDataBoxCard";
import AccountSettingsCard from "../components/AccountSettingsCard";
import { UserRdata, AccountSettingsData } from "../data/data.js";

function UserProfile() {
  return (
    <div className="p-4 flex flex-col items-center mb-10 ">
      <div className="w-full max-w-2xl lg:max-w-4xl flex flex-col items-center p-6  h-[190vh]  ">
        <UserProfileCard />
        <div className="flex justify-items-start gap-10 mt-20 w-full h-60 ">
          {UserRdata.map((item) => (
            <UserProifleDataBoxCard
              key={item.id}
              number={item.number}
              label={item.label}
            />
          ))}
        </div>

        <p className="w-full mt-4 text-black font-bold text-lg">
          Account Settings
        </p>

        <div className="mt-5 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {AccountSettingsData.map((item) => (
            <AccountSettingsCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
