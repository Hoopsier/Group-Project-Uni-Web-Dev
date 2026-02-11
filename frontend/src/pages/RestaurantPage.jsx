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