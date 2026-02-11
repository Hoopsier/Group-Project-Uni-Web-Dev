import RestaurantGrid from "./RestaurantGrid";

export default function RestaurantListSection({
  title = "Featured Restaurants",
  restaurants = [],
  isLoading = false,
  onSelectRestaurant,
}) {

    const isEmpty = !isLoading && restaurants.length === 0;

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold">{title}</h2>

      {isEmpty ? (
        <div className="mt-4 border border-gray-200 bg-gray-50 p-6 text-gray-600">
          No restaurants found.
        </div>
      ) : (
        <RestaurantGrid
          restaurants={restaurants}
          isLoading={isLoading}
          onSelect={onSelectRestaurant}
        />
      )}
    </section>
  );
}