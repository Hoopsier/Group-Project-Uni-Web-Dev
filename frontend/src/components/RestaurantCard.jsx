import { useNavigate } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  const handleOpenRestaurant = () => {
    navigate(`/restaurants/${restaurant._id}`);
  };

  return (
    <div
      className="border rounded-md overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-lg"
      onClick={handleOpenRestaurant}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleOpenRestaurant();
        }
      }}
    >
      <div className="h-90 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
        <img
          src={restaurant.image || restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">{restaurant.name}</h3>
        <p className="text-xs text-black-500 truncate">
          {restaurant.cuisine || "Restaurant"}
        </p>
        <p className="text-xs mt-1">
          ⭐ {restaurant.rating ?? 0} • {restaurant.deliveryTime || "Delivery time unavailable"} • €{restaurant.deliveryFee ?? 0}
        </p>
      </div>
    </div>
  );
}
