import  { useState } from "react";
import RestaurantViewCard from "../components/RestaurantViewCard";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  UserIcon,
  MapPinIcon,
  CreditCardIcon,
  ClockIcon,
  HeartIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import pizzaPalaceImg from "../assets/restuimg/pizzaPalace.png";
import burgershopImg from "../assets/restuimg/burgershop.jpg";
import sushishopImg from "../assets/restuimg/sushi_shop.png";
import organicsImg from "../assets/restuimg/organics.jpg";



const categories = [
  { id: "A", label: "All" },
  { id: "B", label: "Burger" },
  { id: "P", label: "Pizza" },
  { id: "S", label: "Sushi" },
  { id: "H", label: "Healthy" },
];

// dummy restaurants 
const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    category: "Pizza",
    tags: "Pizza, Italian",
    rating: 4.5,
    eta: "25-35 min",
    price: "€2.99",
    status: "CLOSED",
    opensAt: "5:00 PM",
    showSchedule: false,
    image: pizzaPalaceImg,
  },
  {
    id: 2,
    name: "Sushi Master",
    category: "Sushi",
    tags: "Sushi, Japanese",
    rating: 4.7,
    eta: "30-40 min",
    price: "€3.99",
    status: "CLOSED",
    opensAt: "5:00 PM",
    showSchedule: true,
    image: sushishopImg,
  },
  
   
  {
    id: 3,
    name: "Burger Barn",
    category: "Burger",
    tags: "Burger, American",
    rating: 4.0,
    eta: "20-30 min",
    price: "€1.99",
    status: "CLOSED",
    opensAt: "6:00 PM",
    showSchedule: false,
    image: burgershopImg, 

  },
{
  id: 4,
    name: "Healthy Greens",
    category: "Healthy",
    tags: "Healthy, Salad",
    rating: 4.2,
    eta: "20-30 min",
    price: "€1.99",
    status: "CLOSED",
    opensAt: "6:00 PM",
    showSchedule: false,
    image: organicsImg, 
},
];

const iconButtons = [
  { icon: UserIcon },
  { icon: MapPinIcon },
  { icon: CreditCardIcon },
  { icon: ClockIcon },
  { icon: HeartIcon },
];

const RestaurantView = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showIcons, setShowIcons] = useState(false);
  const [search, setSearch] = useState("");

const filteredRestaurants = restaurants.filter((r) => {
  const matchesCategory =
    selectedCategory === "All" ||
    r.category.toLowerCase() === selectedCategory.toLowerCase();

  const matchesSearch =
    r.name.toLowerCase().includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});


  return (
    <div className="min-h-screen bg-linear-to-r from-orange-700 to-green-600 text-black px-10 py-8 transition-all duration-300 font-mono">
      {/* categories + buttons + icons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Categories + restaurant cards */}
        <section className="lg:col-span-5 col-span-12">
          <h2 className="text-2xl font-semibold mb-6">Categories</h2>

          {/* Category bubbles */}
          <div className="flex items-start gap-5 flex-wrap">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.label;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`group flex flex-col items-center gap-3 px-4 py-3 
                    rounded-2xl transition-all cursor-pointer 
                    ${isActive ? "bg-white/30 shadow-lg" : "hover:bg-white/20"}`}
                >
                  <span
                    className={`h-16 w-16 rounded-full border text-lg 
                      font-semibold flex items-center justify-center transition-colors
                      ${
                        isActive
                          ? "bg-white text-black border-white"
                          : "bg-neutral-800 text-white border-neutral-400 group-hover:bg-white group-hover:text-black"
                      }`}
                  >
                    {cat.id}
                  </span>
                  <span
                    className={
                      "text-sm transition-colors " +
                      (isActive
                        ? "font-semibold"
                        : "font-normal group-hover:font-semibold")
                    }
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

{/* Cards filtered by category */}
  <div className="mt-8 ">
      <h3 className="text-xl font-semibold mb-4">
          {selectedCategory
            ? `${selectedCategory} restaurants`
            : "All restaurants"}
      </h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-96 gap-y-10">
      {filteredRestaurants.length > 0 ? (
        filteredRestaurants.map((restaurant) => (
          <RestaurantViewCard
            key={restaurant.id}
            restaurant={restaurant}
            />
            ))
          ) : (
    <p className="text-sm text-neutral-900">
          No restaurants found for this category.
    </p>
    )}
    </div>
    </div>
</section>

{/* Buttons */}
<section className="lg:col-span-5 col-span-12">
  <h2 className="text-2xl font-semibold mb-6">Buttons</h2>

  <div className="max-w-md bg-neutral-900 border border-white/10 rounded-2xl shadow-lg shadow-black/30 p-6">
    
    <div className="grid grid-cols-2 gap-4">

      {/* Search */}
    <div className="col-span-2 flex items-center bg-white rounded-xl px-4 py-3">
        <MagnifyingGlassIcon className="w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-black placeholder-neutral-400"/>
</div>

      {/* Register */}
      <button className="bg-neutral-800 text-white py-3 rounded-xl hover:bg-neutral-700 transition">
        Register
      </button>

      {/* Login */}
      <button className="bg-neutral-800 text-white py-3 rounded-xl 
                         hover:bg-neutral-700 transition">
        Login
      </button>

      {/* Delivery */}
      <button className="col-span-2 bg-neutral-800 text-white py-3 rounded-xl 
                         hover:bg-neutral-700 transition">
        Delivery Address
      </button>

      {/* Closed */}
      <button className="col-span-2 bg-black text-white py-3 rounded-xl 
                         border border-white/10 flex justify-between px-4">
        <span className="font-semibold">CLOSED</span>
        <span className="text-xs text-neutral-400">
          Opens at 10:00 AM
        </span>
      </button>

    </div>
  </div>
</section>

<section className="lg:col-span-2 col-span-12">
  <button
    onClick={() => setShowIcons(!showIcons)}
    className="flex items-center gap-2 text-xl font-semibold mb-6 bg-neutral-900 text-white px-4 py-2 rounded-lg
      border border-white/20 hover:bg-white hover:text-black transition">
    <Squares2X2Icon className="w-6 h-6" />
    Icons
  </button>

  {showIcons && (
    <>
      <div className="flex gap-4 mb-6 flex-wrap">
        {iconButtons.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              className="h-14 w-14 border border-white bg-gray-800 
                flex items-center justify-center text-white 
                rounded-xl hover:bg-white hover:text-black transition"
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
      <div className="h-14 w-14 border border-white bg-gray-800 flex items-center justify-center text-white rounded-lg  hover:bg-white hover:text-black transition">
          +
        </div>
      
      </div>
    </>
  )}
    </section>
    </div>
    </div>
  );
};

export default RestaurantView;
