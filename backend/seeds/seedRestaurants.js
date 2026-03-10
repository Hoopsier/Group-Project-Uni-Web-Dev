require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Registers the Restaurant model in mongoose
require('../models/restaurantModel');

const Restaurant = mongoose.model('Restaurant');

const restaurants = [
  {
    name: 'Burger House',
    cuisine: 'Burgers',
    description: 'Juicy burgers, crispy fries, and cold drinks delivered fast.',
    street: 'Mannerheimintie 10',
    city: 'Helsinki',
    postal_code: 100,
    deliveryTime: '20-30 min',
    deliveryFee: 2.9,
    minOrder: 10,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    coverImage:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    ratings: {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
    },
    items: [
      {
        name: 'Classic Burger',
        description: 'Beef patty, cheddar, lettuce, tomato, and house sauce.',
        price: 12.5,
        category: 'Burgers',
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Cheese Burger',
        description:
          'Beef patty, double cheese, pickles, onions, and mustard mayo.',
        price: 13.9,
        category: 'Burgers',
        image:
          'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Chicken Burger',
        description: 'Crispy chicken breast, lettuce, tomato, and spicy mayo.',
        price: 11.9,
        category: 'Burgers',
        image:
          'https://images.unsplash.com/photo-1692737349870-e3bfc704ebf9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Fries',
        description: 'Golden crispy fries with sea salt.',
        price: 4.5,
        category: 'Sides',
        image:
          'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Coca Cola',
        description: '330ml cold soft drink.',
        price: 2.9,
        category: 'Drinks',
        image:
          'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    name: 'Pizza Palace',
    cuisine: 'Pizza',
    description: 'Wood-fired pizza with classic Italian flavors.',
    street: 'Aleksanterinkatu 22',
    city: 'Helsinki',
    postal_code: 100,
    deliveryTime: '25-35 min',
    deliveryFee: 3.2,
    minOrder: 12,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    coverImage:
      'https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ratings: {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
    },
    items: [
      {
        name: 'Margherita',
        description: 'Tomato sauce, mozzarella, basil.',
        price: 11.9,
        category: 'Pizza',
        image:
          'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Pepperoni, mozzarella, tomato sauce.',
        price: 13.9,
        category: 'Pizza',
        image:
          'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter.',
        price: 5.5,
        category: 'Sides',
        image:
          'https://images.unsplash.com/photo-1593527270723-834c53a3fed4?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Tiramisu',
        description: 'Italian dessert with coffee and mascarpone.',
        price: 6.5,
        category: 'Desserts',
        image:
          'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Sparkling Water',
        description: '330ml sparkling water.',
        price: 2.5,
        category: 'Drinks',
        image:
          'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    name: 'Sushi Zen',
    cuisine: 'Sushi',
    description: 'Fresh sushi, maki, and Japanese favorites.',
    street: 'Kamppi 5',
    city: 'Helsinki',
    postal_code: 100,
    deliveryTime: '30-40 min',
    deliveryFee: 3.5,
    minOrder: 14,
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    coverImage:
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80',
    ratings: {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
    },
    items: [
      {
        name: 'Salmon Nigiri',
        description: 'Fresh salmon over sushi rice.',
        price: 8.9,
        category: 'Nigiri',
        image:
          'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'California Roll',
        description: 'Crab, avocado, cucumber.',
        price: 10.9,
        category: 'Rolls',
        image:
          'https://images.unsplash.com/photo-1607301405390-d831c242f59b?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Tempura Shrimp Roll',
        description: 'Shrimp tempura, cucumber, spicy mayo.',
        price: 12.5,
        category: 'Rolls',
        image:
          'https://images.unsplash.com/photo-1607247098789-6a43ebeaba4e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Miso Soup',
        description: 'Warm miso soup with tofu and seaweed.',
        price: 4.2,
        category: 'Sides',
        image:
          'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Green Tea',
        description: 'Traditional bottled green tea.',
        price: 3.0,
        category: 'Drinks',
        image:
          'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

const seedRestaurants = async () => {
  try {
    await connectDB();

    console.log('Deleting old restaurants...');
    await Restaurant.deleteMany({});

    console.log('Creating seed restaurants...');
    await Restaurant.create(restaurants);

    console.log('✅ Restaurants seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding restaurants:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedRestaurants();
