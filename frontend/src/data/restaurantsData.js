export const restaurantsData = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Pizza, Italian",
    categoryId: "pizza",
    rating: 4.5,
    eta: "25–35 min",
    deliveryFee: "$2.99",
    isClosed: false,
    menu: {
      tabs: ["All Items", "Pizzas", "Starters", "Drinks"],
      items: [
        { id: "marg", tab: "Pizzas", name: "Margherita", desc: "Tomato, mozzarella, basil", price: 12.99 },
        { id: "garlic", tab: "Starters", name: "Garlic Bread", desc: "With herbs", price: 5.99 },
      ],
    },
  },