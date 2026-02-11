export const restaurantsData = [
  {
    id: 1,
    name: 'Pizza Palace',
    cuisine: 'Pizza, Italian',
    categoryId: 'pizza',
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
          id: 'garlic',
          tab: 'Starters',
          name: 'Garlic Bread',
          desc: 'With herbs',
          price: 5.99,
        },
      ],
    },
  },
  {
    id: 2,
    name: 'Burger House',
    cuisine: 'Burgers, Fast Food',
    categoryId: 'burger',
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
      ],
    },
  },
  {
    id: 4,
    name: 'Asian Fusion',
    cuisine: 'Asian, Fusion',
    categoryId: 'asian',
    eta: '35–45 min',
    deliveryFee: '$3.49',
    isClosed: false,
    menu: {
      tabs: ['All Items', 'Mains', 'Starters', 'Drinks'],
      items: [
        {
          id: 'ramen',
          tab: 'Mains',
          name: 'Ramen',
          desc: 'Broth, noodles, egg',
          price: 14.5,
        },
        {
          id: 'gyoza',
          tab: 'Starters',
          name: 'Gyoza',
          desc: 'Pan-fried dumplings',
          price: 6.9,
        },
        {
          id: 'tea',
          tab: 'Drinks',
          name: 'Iced Tea',
          desc: '500ml',
          price: 2.5,
        },
      ],
    },
  },
];
