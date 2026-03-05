const STORAGE_KEY = 'yumdrop_restaurants_v1';
import pizzaCover from '../assets/restaurants/pizza-palace.jpg';
import burgerCover from '../assets/restaurants/burger-house.jpg';
import healthyCover from '../assets/restaurants/healthy-bowl.jpg';
import asianCover from '../assets/restaurants/asian-fusion.jpg';

import margImg from '../assets/menu/margherita.jpg';
import pepImg from '../assets/menu/pepperoni.jpg';
import ramenImg from '../assets/menu/ramen.jpg';
import gyozaImg from '../assets/menu/gyoza.jpg';
import garlicimg from '../assets/menu/garlicimg.jpg';
import colaImg from '../assets/menu/colaImg.jpg';
import friesImg from '../assets/menu/friesImg.jpg';
import classicBurgerImg from '../assets/menu/classicBurgerImg.jpg';
import avocadoImg from '../assets/menu/avocadoImg.jpg';
import kombuchaImg from '../assets/menu/kombuchaImg.jpg';
import tofuImg from '../assets/menu/tofuImg.jpg';
import teaImg from '../assets/menu/teaImg.jpg';

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
    coverImage: pizzaCover,
    menu: {
      tabs: ['All Items', 'Pizzas', 'Starters', 'Drinks'],
      items: [
        {
          id: 'marg',
          tab: 'Pizzas',
          name: 'Margherita',
          desc: 'Tomato, mozzarella, basil',
          price: 12.99,
          image: margImg,
        },
        {
          id: 'pep',
          tab: 'Pizzas',
          name: 'Pepperoni',
          desc: 'Mozzarella, pepperoni',
          price: 14.99,
          image: pepImg,
        },
        {
          id: 'garlic',
          tab: 'Starters',
          name: 'Garlic Bread',
          desc: 'Garlic butter, herbs',
          price: 5.99,
          image: garlicimg,
        },
        {
          id: 'cola',
          tab: 'Drinks',
          name: 'Coca Cola',
          desc: '500ml',
          price: 2.99,
          image: colaImg,
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
    coverImage: burgerCover,
    menu: {
      tabs: ['All Items', 'Burgers', 'Sides', 'Drinks'],
      items: [
        {
          id: 'classic',
          tab: 'Burgers',
          name: 'Classic Burger',
          desc: 'Beef, cheese, pickles',
          price: 11.5,
          image: classicBurgerImg,
        },
        {
          id: 'fries',
          tab: 'Sides',
          name: 'Fries',
          desc: 'Crispy fries',
          price: 3.5,
          image: friesImg,
        },
        {
          id: 'cola',
          tab: 'Drinks',
          name: 'Cola',
          desc: '500ml',
          price: 2.0,
          image: colaImg,
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
    coverImage: healthyCover,
    menu: {
      tabs: ['All Items', 'Bowls', 'Drinks'],
      items: [
        {
          id: 'avocado',
          tab: 'Bowls',
          name: 'Avocado Bowl',
          desc: 'Avocado, quinoa, greens',
          price: 12.5,
          image: avocadoImg,
        },
        {
          id: 'tofu',
          tab: 'Bowls',
          name: 'Tofu Bowl',
          desc: 'Tofu, rice, veggies',
          price: 11.0,
          image: tofuImg,
        },
        {
          id: 'kombucha',
          tab: 'Drinks',
          name: 'Kombucha',
          desc: '330ml',
          price: 3.5,
          image: kombuchaImg,
        },
      ],
    },
  },
  {
    id: 4,
    name: 'Asian Fusion',
    cuisine: 'Asian, Fusion',
    categoryId: 'asian',
    rating: 4.9,
    eta: '35–45 min',
    deliveryFee: '$3.49',
    isClosed: false,
    coverImage: asianCover,
    menu: {
      tabs: ['All Items', 'Mains', 'Starters', 'Drinks'],
      items: [
        {
          id: 'ramen',
          tab: 'Mains',
          name: 'Ramen',
          desc: 'Broth, noodles, egg',
          price: 14.5,
          image: ramenImg,
        },
        {
          id: 'gyoza',
          tab: 'Starters',
          name: 'Gyoza',
          desc: 'Pan-fried dumplings',
          price: 6.9,
          image: gyozaImg,
        },
        {
          id: 'tea',
          tab: 'Drinks',
          name: 'Iced Tea',
          desc: '500ml',
          price: 2.5,
          image: teaImg,
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

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('restaurants:updated'));
  }

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
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('restaurants:updated'));
  }
}
