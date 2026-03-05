import { useEffect, useState } from "react";
import heroImg from "../assets/homeimg/hero.png";

export default function Hero() {
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setImageVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Hero banner */}
      <div className="px-4 relative mb-10">
        <div className="h-60 bg-linear-to-r from-green-100 to-green-800 rounded-lg flex flex-col justify-center px-10 relative">
          <h2 className="text-5xl font-bold text-green-900">
            Eat Fresh. Feel Better.
          </h2>
          <p className="text-2xl text-green-700 mt-1">
            Healthy meals delivered to your door 🏡
          </p>
        </div>

        <div
          className={`absolute right-10 top-6 w-28 h-28 rounded-full bg-cover bg-center
            shadow-[0_10px_25px_rgba(0,0,0,0.25),0_25px_60px_rgba(0,0,0,0.35)]
            transition-transform duration-300 hover:scale-105
            ${imageVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          style={{ backgroundImage: `url(${heroImg})` }}
        />
      </div>

      {/* Filters (solo UI por ahora) */}
      <div className="flex flex-wrap gap-2 px-4 py-3">
        {["Feature", "Rating", "Delivery Time", "Price"].map((item) => (
          <button
            key={item}
            className="text-xs px-3 py-1 border rounded-full bg-gray-150 cursor-pointer transition-colors duration-200 hover:bg-violet-100 hover:border-gray-600"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}