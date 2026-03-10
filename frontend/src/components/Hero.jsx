import heroImg from "../assets/homeimg/hero.png";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import AI_Chat from "./AI_Chat";

export default function Hero() {
  const [imageVisible, setImageVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setImageVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:4000/api/restaurants");
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message || "Something went wrong while loading restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const Typewriter = ({ text, speed = 50 }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
      let index = 0;
      const timer = setInterval(() => {
        setValue(text.slice(0, index + 1));
        index += 1;
        if (index === text.length) {
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{value}</span>;
  };

  return (
    <div className="overflow-x-hidden">
      <div className="px-4 relative mb-10">
        <div className="h-60 bg-linear-to-r from-green-100 to-green-800 rounded-lg flex flex-col justify-center px-10 relative">
          <h2 className="text-5xl font-bold text-green-900">
            <Typewriter text=" Eat Fresh.Feel Better." speed={30} />
          </h2>
          <p className="text-2xl text-green-700 mt-1">
            <Typewriter text="Healthy meals delivered to your door 🏡" speed={40} />
          </p>
        </div>

        <div
          className={`hidden sm:block absolute right-5 top-3 w-48 h-48 rounded-full bg-cover bg-center
              shadow-[0_10px_25px_rgba(0,0,0,0.25),0_25px_60px_rgba(0,0,0,0.35)]
              transition-transform duration-300 hover:scale-105
              ${imageVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          style={{
            backgroundImage: `url(${heroImg})`,
          }}
        />
      </div>

      <AI_Chat />

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

      <div className="px-6 pb-14">
        {loading ? (
          <p className="text-sm text-gray-500">Loading restaurants...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : restaurants.length === 0 ? (
          <p className="text-sm text-gray-500">No restaurants available yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
