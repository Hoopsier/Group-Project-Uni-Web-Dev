import React from "react";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

function AccountSettingsCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-xl shadow-md border border-[#D1D5DC] bg-white ">
      <div className="flex items-start gap-4">
        <div className="text-3xl shrink-0">{icon}</div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold ">{title}</h3>

          <p className="text-sm text-gray-600  mt-1">
            {description}
          </p>
        </div>

        <button className="shrink-0">
          <ArrowRightIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}

export default AccountSettingsCard;
