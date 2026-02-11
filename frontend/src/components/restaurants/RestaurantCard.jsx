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
