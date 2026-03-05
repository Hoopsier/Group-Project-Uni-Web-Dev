import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRestaurantById } from "../data/restaurantsDB";

function parseMoney(value = "") {
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function RestaurantPage() {
  const { restaurantId } = useParams();
  const restaurant = useMemo(() => getRestaurantById(restaurantId), [restaurantId]);

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

  const menu = restaurant.menu ?? { tabs: ["All Items"], items: [] };
  const [activeTab, setActiveTab] = useState(menu.tabs?.[0] ?? "All Items");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (menu.items ?? []).filter((item) => {
      const matchesTab = activeTab === "All Items" ? true : item.tab === activeTab;
      const matchesQuery =
        q.length === 0 ||
        String(item.name ?? "").toLowerCase().includes(q) ||
        String(item.desc ?? "").toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [menu.items, activeTab, query]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <Link className="underline text-sm" to="/">
        ← Back to Home
      </Link>

      <section className="mt-4 border border-gray-200 bg-gray-100 h-44 overflow-hidden relative">
        {restaurant.coverImage ? (
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full grid place-items-center text-gray-400">×</div>
        )}

        <button
          type="button"
          className="absolute top-3 right-3 border border-gray-300 bg-white w-10 h-10 grid place-items-center"
          aria-label="Favorite"
        >
          ♡
        </button>
      </section>

      <section className="mt-6">
        <h1 className="text-2xl font-semibold">{restaurant.name}</h1>
        <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
      </section>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Delivery Time</p>
          <p className="font-semibold mt-1">{restaurant.eta}</p>
        </div>
        <div className="border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Min Order</p>
          <p className="font-semibold mt-1">$15.00</p>
        </div>
        <div className="border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Delivery Fee</p>
          <p className="font-semibold mt-1">{restaurant.deliveryFee}</p>
        </div>
      </section>

      <div className="mt-6 border-t border-gray-200" />

      <section className="mt-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full"
          placeholder="Search menu items..."
        />
      </section>

      <section className="mt-4 border-b border-gray-200">
        <div className="flex gap-6 overflow-x-auto">
          {(menu.tabs ?? ["All Items"]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={[
                "py-3 text-sm whitespace-nowrap",
                activeTab === tab
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-600",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">{activeTab}</h2>

        <div className="mt-4 space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 border border-gray-200 overflow-hidden grid place-items-center text-gray-400">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    "×"
                  )}
                </div>

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                  <p className="font-semibold mt-1">${parseMoney(item.price).toFixed(2)}</p>
                </div>
              </div>

              <button
                type="button"
                className="border border-gray-300 w-10 h-10 grid place-items-center hover:border-black"
                aria-label={`Add ${item.name}`}
              >
                +
              </button>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="border border-gray-200 bg-gray-50 p-6 text-gray-600">
              No items match your search.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
