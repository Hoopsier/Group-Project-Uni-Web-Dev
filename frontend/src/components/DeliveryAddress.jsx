import { MapPin } from "lucide-react";

const DeliveryAddress = ({ value, onChange }) => {
  return (
    <div className="border border-gray-700 bg-gray-300 shadow-sm">
      <div className="border-b border-gray-300 px-4 py-3">
        <h2 className="text-sm sm:text-base font-semibold flex items-center gap-2">
          
          {/* Location Icon */}
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
            <MapPin size={14} />
          </span>

          Delivery Address
        </h2>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        <input
          type="text"
          placeholder="Street and Number"
          value={value.street}
          onChange={(e) => onChange({ ...value, street: e.target.value })}
          className="w-full border border-gray-700 bg-white px-3 py-2 text-sm outline-none focus:border-black"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="City"
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            className="border border-gray-700 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={value.zip}
            onChange={(e) => onChange({ ...value, zip: e.target.value })}
            className="border border-gray-700 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        <input
        
          type="text"
          placeholder="Additional instructions (Optional)"
          value={value.instructions}
          onChange={(e) =>
            onChange({ ...value, instructions: e.target.value })
          }
          className="w-full border border-gray-700 bg-white px-3 py-2 text-sm outline-none focus:border-black"
        />
      </div>
    </div>
  );
};

export default DeliveryAddress;