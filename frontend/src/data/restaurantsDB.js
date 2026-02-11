const STORAGE_KEY = 'yumdrop_restaurants_v1';

const seed = [
  {
    id: 1,
    name: 'Pizza Palace',
    cuisine: 'Pizza, Italian',
    categoryId: 'pizza',
    rating: 4.5,
    eta: '25–35 min',
    deliveryFee: '$2.99',
    isClosed: false,
    menu: {
      tabs: ['All Items', 'Pizzas', 'Starters', 'Drinks'],
      items: [
        {
          id: 'marg',
          tab: 'Pizzas',
          name: 'Margherita',
          desc: 'Tomato, mozzarella, basil',
          price: 12.99,
        },
        {
          id: 'pep',
          tab: 'Pizzas',
          name: 'Pepperoni',
          desc: 'Mozzarella, pepperoni',
          price: 14.99,
        },
        {
          id: 'garlic',
          tab: 'Starters',
          name: 'Garlic Bread',
          desc: 'Garlic butter, herbs',
          price: 5.99,
        },
        {
          id: 'cola',
          tab: 'Drinks',
          name: 'Coca Cola',
          desc: '500ml',
          price: 2.99,
        },
      ],
    },
  },
  {
    id: 2,
    name: 'Burger House',
    cuisine: 'Burgers, Fast Food',
    categoryId: 'burger',
    rating: 4.8,
    eta: '20–30 min',
    deliveryFee: '$1.99',
    isClosed: false,
    menu: {
      tabs: ['All Items', 'Burgers', 'Sides', 'Drinks'],
      items: [
        {
          id: 'classic',
          tab: 'Burgers',
          name: 'Classic Burger',
          desc: 'Beef, cheese, pickles',
          price: 11.5,
        },
        {
          id: 'fries',
          tab: 'Sides',
          name: 'Fries',
          desc: 'Crispy fries',
          price: 3.5,
        },
        {
          id: 'water',
          tab: 'Drinks',
          name: 'Water',
          desc: '500ml',
          price: 2.0,
        },
      ],
    },
  },
];
