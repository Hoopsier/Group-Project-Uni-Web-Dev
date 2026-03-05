export default function RestaurantCard({ restaurant, onSelect }) {
  const {
    name,
    cuisine,
    rating,
    eta,
    deliveryFee,
    isClosed,
    opensAt,
  } = restaurant;

  return (
    <button
      type="button"
      onClick={() => {
      console.log("clicked:", restaurant.id);
      onSelect?.(restaurant);
      }}
      className="text-left border border-gray-200 bg-white w-full hover:border-gray-400 transition"
    >
      <div className="h-36 bg-gray-100 border-b border-gray-200 overflow-hidden">
  {restaurant.coverImage ? (
    <img
      src={restaurant.coverImage}
      alt={`${restaurant.name} cover`}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full grid place-items-center text-gray-400">×</div>
  )}
</div>

      <div className="p-4">
        <h3 className="font-semibold text-base">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{cuisine}</p>

        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center gap-4 text-gray-700">
            <span className="flex items-center gap-1">
              <span aria-hidden="true">★</span>
              <span>{rating}</span>
            </span>
            <span className="flex items-center gap-1">
              <span aria-hidden="true">🕒</span>
              <span>{eta}</span>
            </span>
          </div>

          <span className="text-gray-700">{deliveryFee}</span>
        </div>
      </div>
    </button>
  );
}