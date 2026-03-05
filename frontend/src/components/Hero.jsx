import { useEffect, useState } from "react";
import heroImg from "../assets/homeimg/hero.png";

export default function Hero({ sortKey = "feature", onChangeSort }) {
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setImageVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const filters = [
    { key: "feature", label: "Feature" },
    { key: "rating", label: "Rating" },
    { key: "deliveryTime", label: "Delivery Time" },
    { key: "price", label: "Price" },
  ];

  return (
    <div>
      {/* Hero banner */}
      <div className="px-4 relative mb-6">
        <div className="h-60 bg-linear-to-r from-green-100 to-green-800 rounded-lg flex flex-col justify-center px-10 relative">
          <h2 className="text-5xl font-bold text-green-900">
            Eat Fresh. Feel Better.
          </h2>
          <p className="text-2xl text-green-700 mt-1">
            Healthy meals delivered to your door 🏡
          </p>
        </div>

        <div
          className={`absolute right-10 top-6 w-24 h-24 rounded-full bg-cover bg-center
            shadow-[0_10px_25px_rgba(0,0,0,0.25),0_25px_60px_rgba(0,0,0,0.35)]
            transition-transform duration-300 hover:scale-105
            ${imageVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden="true"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 px-4 py-3">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => onChangeSort?.(f.key)}
            className={[
              "text-xs px-3 py-1 border rounded-full cursor-pointer transition-colors duration-200",
              sortKey === f.key
                ? "bg-violet-100 border-gray-600"
                : "bg-gray-150 hover:bg-violet-100 hover:border-gray-600",
            ].join(" ")}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}