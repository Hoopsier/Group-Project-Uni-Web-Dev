import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../components/Hero";
import RestaurantListSection from "../components/restaurants/RestaurantListSection";
import { getRestaurants } from "../data/restaurantsDB";

export default function Home() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState(() => getRestaurants());

  useEffect(() => {
    const refresh = () => setRestaurants(getRestaurants());
    window.addEventListener("restaurants:updated", refresh);
    return () => window.removeEventListener("restaurants:updated", refresh);
  }, []);

  const handleSelectRestaurant = (restaurant) => {
    navigate(`/restaurants/${restaurant.id}`);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <Hero />

      <RestaurantListSection
        title="Restaurants"
        restaurants={restaurants}
        isLoading={false}
        onSelectRestaurant={handleSelectRestaurant}
      />
    </main>
  );
}