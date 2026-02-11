import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockRestaurants } from "../data/mockRestaurants";
import { mockRestaurantMenus } from "../data/mockRestaurantMenus";

export default function RestaurantPage() {
  const { restaurantId } = useParams();
  const restaurant = useMemo(() => {
    const id = Number(restaurantId);
    return mockRestaurants.find((r) => r.id === id);
  }, [restaurantId]);

  const menu = restaurant ? mockRestaurantMenus[restaurant.id] : null;

  const [activeTab, setActiveTab] = useState("All Items");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!menu) return [];
    const q = query.trim().toLowerCase();

    return menu.items.filter((item) => {
      const matchesTab = activeTab === "All Items" ? true : item.tab === activeTab;
      const matchesQuery =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q);

      return matchesTab && matchesQuery;
    });
  }, [menu, activeTab, query]);

  if (!restaurant) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-xl font-semibold">Restaurant not found</h1>
        <Link className="underline mt-4 inline-block" to="/">
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <Link className="underline text-sm" to="/">
        ← Back to Home
      </Link>

      {/* Hero image placeholder */}
      <section className="mt-4 border border-gray-200 bg-gray-100 h-40 grid place-items-center text-gray-400 relative">
        ×
        <button
          type="button"
          className="absolute top-3 right-3 border border-gray-300 bg-white w-10 h-10 grid place-items-center"
          aria-label="Favorite"
        >
          ♡
        </button>
      </section>

      {/* Title */}
      <section className="mt-6">
        <h1 className="text-2xl font-semibold">{restaurant.name}</h1>
        <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
      </section>

      {/* Stats row (estructura, luego lo conectas a datos reales) */}
      <section className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Delivery Time</p>
          <p className="font-semibold mt-1">{restaurant.eta}</p>
        </div>
