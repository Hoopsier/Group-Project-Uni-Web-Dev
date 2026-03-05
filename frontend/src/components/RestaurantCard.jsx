import { useCart } from "../Cartcontext/CartContext";
export default function RestaurantCard({ restaurant }) {
    const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: restaurant.id,
      name: restaurant.name,
      price: parseFloat(restaurant.price?.replace("€", "")) || 10,
      image: restaurant.image,
    });

    openCart(); // optional: open cart automatically
  };
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="h-90 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">
          {restaurant.name}
        </h3>
        <p className="text-xs text-black-500 truncate">
          {restaurant.type}
        </p>
        <p className="text-xs mt-1">
          ⭐ {restaurant.rating} • {restaurant.time} • {restaurant.price}
        </p>
      
       {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-sky-500 text-black text-xs font-semibold py-2 rounded hover:bg-sky-400 transition"
        >
          Add to cart
        </button>
      
      </div>
    </div>
  );
}
