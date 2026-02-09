
import { useMemo, useState } from "react";
import CategoryRow from "../components/CategoryRow";
import RestaurantCard from "../components/RestaurantCard";
import { categories } from "../data/categories";
import { mockRestaurants } from "../data/mockRestaurants";
export default function Home() {
  const [activeCategory, setActiveCategory] = useState("burger");
  const [address, setAddress] = useState("");

  const featured = useMemo(() => {
    return mockRestaurants.filter((r) => r.categoryId === activeCategory);
  }, [activeCategory]);

<div className="p-4 bg-red-500 text-white font-bold">TAILWIND OK</div>

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <section className="border border-gray-200 bg-gray-50 p-10 text-center">
        <div className="text-gray-400 text-3xl">📍</div>
        <h1 className="text-2xl font-semibold mt-4">Find restaurants near you</h1>
        <p className="text-gray-500 mt-2">
          Enter your delivery address to discover amazing restaurants
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full sm:w-96"
            placeholder="Enter your address or location"
          />
          <button className="bg-black text-white px-6 py-2 font-medium">
            Find Restaurants
          </button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div className="mt-4">
          <CategoryRow
            categories={categories}
            activeId={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Featured Restaurants</h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((r) => (
            <RestaurantCard key={r.id} {...r} />
          ))}
        </div>

        <button className="mt-10 bg-black text-white px-6 py-2 font-medium">
          List Your Restaurant
        </button>
      </section>
    </main>
  );
}
