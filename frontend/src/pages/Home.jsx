import { useMemo, useState } from "react";
import CategoryRow from "../components/CategoryRow";
import { categories } from "../data/categories";
import { mockRestaurants } from "../data/mockRestaurants";

// NEW: restaurant list section (estructura de lista)
import RestaurantListSection from "../components/restaurants/RestaurantListSection";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("burger");
  const [address, setAddress] = useState("");

  const featured = useMemo(() => {
  const filtered = mockRestaurants.filter((r) => r.categoryId === activeCategory);
  return filtered.length > 0 ? filtered : mockRestaurants;
}, [activeCategory]);


  const handleSelectRestaurant = (restaurant) => {
    // Next iteration: aquí conectamos React Router => navigate(`/restaurants/${restaurant.id}`)
    console.log("Selected restaurant:", restaurant);
  };

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

      <p>
        <section className="mt-10">
        <h2 className="text-lg font-semibold">Categories</h2>

        {/* DEBUG: muestra la categoría activa */}
        <p className="text-sm text-gray-500 mt-2">Active: {activeCategory}</p>

        <div className="mt-4">
        <CategoryRow
        categories={categories}
        activeId={activeCategory}
        onChange={setActiveCategory}
          />
          </div>
        </section>

      </p>

      {/* REEMPLAZO: en vez de map + RestaurantCard directo, usamos la “estructura de lista” */}
      <RestaurantListSection
        title="Featured Restaurants"
        restaurants={featured}
        isLoading={false}
        onSelectRestaurant={handleSelectRestaurant}
      />

      <button className="mt-10 bg-black text-white px-6 py-2 font-medium">
        List Your Restaurant
      </button>
    </main>
  );
}
