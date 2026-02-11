import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

export default function RestaurantGrid({
  restaurants = [],
  isLoading = false,
  onSelect,
}) {
  if (isLoading) {
    return (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} onSelect={onSelect} />
      ))}
    </div>
  );
}