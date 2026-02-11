import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addRestaurant } from "../data/restaurantsDB";

const CATEGORY_OPTIONS = [
  { id: "burger", label: "Burger" },
  { id: "pizza", label: "Pizza" },
  { id: "sushi", label: "Sushi" },
  { id: "healthy", label: "Healthy" },
  { id: "tacos", label: "Tacos" },
  { id: "asian", label: "Asian" },
];

export default function MerchantLanding() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [categoryId, setCategoryId] = useState("burger");
  const [eta, setEta] = useState("30–40 min");
  const [deliveryFee, setDeliveryFee] = useState("$2.99");

  const canSubmit = name.trim().length >= 2 && cuisine.trim().length >= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const created = addRestaurant({
      name: name.trim(),
      cuisine: cuisine.trim(),
      categoryId,
      rating: 0,
      eta,
      deliveryFee,
      menu: { tabs: ["All Items"], items: [] }, // placeholder menu
    });
      // Después de registrar, lo mandamos al perfil del restaurante
    navigate(`/restaurants/${created.id}`);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link className="underline text-sm" to="/">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-semibold mt-4">List your restaurant</h1>
      <p className="text-gray-600 mt-2">
        Placeholder form. For now it saves locally (no backend yet).
      </p>

      <form onSubmit={handleSubmit} className="mt-8 border border-gray-200 p-6 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-600">Restaurant name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full border border-gray-300 px-4 py-2"
              placeholder="e.g. Asian Fusion"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Cuisine</span>
            <input
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="mt-2 w-full border border-gray-300 px-4 py-2"
              placeholder="e.g. Asian, Fusion"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Category</span>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-2 w-full border border-gray-300 px-4 py-2 bg-white"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">Delivery time (ETA)</span>
            <input
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              className="mt-2 w-full border border-gray-300 px-4 py-2"
              placeholder="e.g. 35–45 min"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm text-gray-600">Delivery fee</span>
            <input
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
              className="mt-2 w-full border border-gray-300 px-4 py-2"
              placeholder="e.g. $3.49"
            />
          </label>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit}
            className={[
              "px-6 py-2 font-medium",
              canSubmit ? "bg-black text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed",
            ].join(" ")}
          >
            Create restaurant
          </button>

          <span className="text-sm text-gray-500">
            This will create a restaurant + empty menu.
          </span>
        </div>
      </form>
    </main>
  );
}