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

