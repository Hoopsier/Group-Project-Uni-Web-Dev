import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { getRestaurants } from "../data/restaurantsDB";

function parseEtaMin(eta = "") {
  const nums = String(eta).match(/\d+/g);
  if (!nums || nums.length === 0) return Number.POSITIVE_INFINITY;
  if (nums.length === 1) return Number(nums[0]);
  return (Number(nums[0]) + Number(nums[1])) / 2;
}

function parseMoney(value = "") {
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
}

export default function Home() {
  const [sortKey, setSortKey] = useState("feature");

  const restaurants = useMemo(() => getRestaurants(), []);

  const sortedRestaurants = useMemo(() => {
    const list = [...restaurants];

    if (sortKey === "rating") {
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortKey === "deliveryTime") {
      list.sort((a, b) => parseEtaMin(a.eta) - parseEtaMin(b.eta));
    } else if (sortKey === "price") {
      list.sort((a, b) => parseMoney(a.deliveryFee) - parseMoney(b.deliveryFee));
    }

    return list;
  }, [restaurants, sortKey]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <Hero sortKey={sortKey} onChangeSort={setSortKey} />

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Restaurants</h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedRestaurants.map((r) => (
            <Link
              key={r.id}
              to={`/restaurants/${r.id}`}
              className="block border border-gray-200 bg-white hover:border-gray-400 transition"
            >
              <div className="h-36 bg-gray-100 border-b border-gray-200 overflow-hidden">
                {r.coverImage ? (
                  <img
                    src={r.coverImage}
                    alt={r.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full grid place-items-center text-gray-400">×</div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-base">{r.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{r.cuisine}</p>

                <div className="flex items-center justify-between mt-3 text-sm">
                  <div className="flex items-center gap-4 text-gray-700">
                    <span className="flex items-center gap-1">
                      <span aria-hidden="true">★</span>
                      <span>{r.rating}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span aria-hidden="true">🕒</span>
                      <span>{r.eta}</span>
                    </span>
                  </div>

                  <span className="text-gray-700">{r.deliveryFee}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {sortedRestaurants.length === 0 && (
          <div className="mt-4 border border-gray-200 bg-gray-50 p-6 text-gray-600">
            No restaurants found.
          </div>
        )}
      </section>
    </main>
  );
}
