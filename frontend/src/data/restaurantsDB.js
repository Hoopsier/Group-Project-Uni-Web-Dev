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
  {
    id: 3,
    name: 'Healthy Bowl',
    cuisine: 'Healthy, Vegan',
    categoryId: 'healthy',
    rating: 4.7,
    eta: '30–40 min',
    deliveryFee: '$3.49',
    isClosed: false,
    menu: {
      tabs: ['All Items', 'Bowls', 'Drinks'],
      items: [
        {
          id: 'avocado',
          tab: 'Bowls',
          name: 'Avocado Bowl',
          desc: 'Avocado, quinoa, greens',
          price: 12.5,
        },
        {
          id: 'tofu',
          tab: 'Bowls',
          name: 'Tofu Bowl',
          desc: 'Tofu, rice, veggies',
          price: 11.0,
        },
        {
          id: 'kombucha',
          tab: 'Drinks',
          name: 'Kombucha',
          desc: '330ml',
          price: 3.5,
        },
      ],
    },
  },
];

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seed;
  try {
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getRestaurants() {
  return load();
}

export function getRestaurantById(id) {
  return load().find((r) => r.id === Number(id));
}

export function addRestaurant(restaurantInput) {
  const data = load();
  const nextId = data.reduce((max, r) => Math.max(max, r.id), 0) + 1;

  const newRestaurant = {
    id: nextId,
    name: restaurantInput.name,
    cuisine: restaurantInput.cuisine,
    categoryId: restaurantInput.categoryId,
    rating: restaurantInput.rating ?? 0,
    eta: restaurantInput.eta ?? '30–40 min',
    deliveryFee: restaurantInput.deliveryFee ?? '$0.00',
    isClosed: restaurantInput.isClosed ?? false,
    menu: restaurantInput.menu ?? { tabs: ['All Items'], items: [] },
  };

  const updated = [newRestaurant, ...data];
  save(updated);
  return newRestaurant;
}

export function addMenuItem(restaurantId, item) {
  const data = load();
  const idNum = Number(restaurantId);

  const updated = data.map((r) => {
    if (r.id !== idNum) return r;

    const menu = r.menu ?? { tabs: ['All Items'], items: [] };
    const tab = item.tab ?? 'All Items';

    const tabs = menu.tabs.includes(tab) ? menu.tabs : [...menu.tabs, tab];

    return {
      ...r,
      menu: {
        tabs,
        items: [{ ...item, id: item.id ?? crypto.randomUUID() }, ...menu.items],
      },
    };
  });

  save(updated);
}
