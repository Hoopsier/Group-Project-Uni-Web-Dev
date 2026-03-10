import { useEffect, useMemo, useState } from "react";
import { useCart } from "../Cartcontext/CartContext";
import { useParams } from "react-router-dom";

function RestaurantPage() {
  const { restaurantId } = useParams();
  const { addToCart, openCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = (item) => {
    addToCart({
      id: item._id,
      name: item.name,
      price: Number(item.price) || 0,
      image: item.image || restaurant.image || restaurant.coverImage || "",
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
    });

    openCart();
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:4000/api/restaurants/${restaurantId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch restaurant");
        }

        const data = await response.json();
        setRestaurant(data);
      } catch (err) {
        setError(err.message || "Something went wrong while loading the restaurant");
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchRestaurant();
    }
  }, [restaurantId]);

  const categories = useMemo(() => {
    if (!restaurant?.items?.length) {
      return ["All"];
    }

    const uniqueCategories = restaurant.items
      .map((item) => item.category || "Other")
      .filter((category, index, array) => array.indexOf(category) === index);

    return ["All", ...uniqueCategories];
  }, [restaurant]);

  const filteredItems = useMemo(() => {
    if (!restaurant?.items) {
      return [];
    }

    if (selectedCategory === "All") {
      return restaurant.items;
    }

    return restaurant.items.filter(
      (item) => (item.category || "Other") === selectedCategory
    );
  }, [restaurant, selectedCategory]);

  if (loading) {
    return (
      <div className="px-6 py-10">
        <p className="text-sm text-gray-500">Loading restaurant...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-10">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="px-6 py-10">
        <p className="text-sm text-gray-500">Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black px-4 py-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
          <div className="h-64 md:h-80 bg-gray-200">
            <img
              src={restaurant.coverImage || restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {restaurant.cuisine || "Restaurant"}
                </p>
                <p className="text-sm text-gray-600 mt-3 max-w-2xl">
                  {restaurant.description || "No description available yet."}
                </p>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p>⭐ {restaurant.rating ?? 0}</p>
                <p>{restaurant.deliveryTime || "Delivery time unavailable"}</p>
                <p>Delivery fee: €{restaurant.deliveryFee ?? 0}</p>
                <p>Minimum order: €{restaurant.minOrder ?? 0}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-700">
              <p>
                {restaurant.street}, {restaurant.city} {restaurant.postal_code}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors duration-200 ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Menu</h2>

            {filteredItems.length === 0 ? (
              <p className="text-sm text-gray-500">No menu items available in this category.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredItems.map((item) => (
                  <article
                    key={item._id}
                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                  >
                    <div className="h-48 bg-gray-100">
                      {item.image || restaurant.image || restaurant.coverImage ? (
                        <img
                          src={item.image || restaurant.image || restaurant.coverImage}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                          No image available
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.category || "Other"}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">€{item.price}</p>
                      </div>

                      <p className="text-sm text-gray-600 mt-3">
                        {item.description || "No description available."}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="mt-4 w-full bg-black text-white text-sm font-medium py-2.5 rounded-xl hover:opacity-90 transition"
                      >
                        Add to cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default RestaurantPage;