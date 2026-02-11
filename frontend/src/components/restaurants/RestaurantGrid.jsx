import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";



  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} onSelect={onSelect} />
      ))}
    </div>
  );
}