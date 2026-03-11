const mongoose = require('mongoose');

const { Schema } = mongoose;

const calculateAverageRating = (ratings = {}) => {
  const ones = Number(ratings.ones || 0);
  const twos = Number(ratings.twos || 0);
  const threes = Number(ratings.threes || 0);
  const fours = Number(ratings.fours || 0);
  const fives = Number(ratings.fives || 0);

  const totalRatings = ones + twos + threes + fours + fives;
  if (totalRatings === 0) {
    return 0;
  }

  const mean =
    (1 * ones + 2 * twos + 3 * threes + 4 * fours + 5 * fives) / totalRatings;
  return Math.round(mean * 10) / 10;
};

const menuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      default: 'All Items',
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { _id: true },
);

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cuisine: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postal_code: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: String,
      default: '',
      trim: true,
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    minOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      default: null,
    },
    coverImage: {
      type: String,
      default: null,
    },
    ratings: {
      ones: { type: Number, default: 0 },
      twos: { type: Number, default: 0 },
      threes: { type: Number, default: 0 },
      fours: { type: Number, default: 0 },
      fives: { type: Number, default: 0 },
    },
    rating: {
      type: Number,
      default: 0,
    },
    items: {
      type: [menuItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Calculate average rating before saving
restaurantSchema.pre('save', function () {
  this.rating = calculateAverageRating(this.ratings);
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const getAll = async () => {
  return await Restaurant.find();
};

const addOne = async (
  name,
  street,
  city,
  postal_code,
  items = [],
  image = null,
  cuisine = '',
  deliveryTime = '',
  deliveryFee = 0,
  minOrder = 0,
  coverImage = null,
  description = '',
) => {
  if (!name || !street || !city || !postal_code) {
    return false;
  }

  const safeRatings = Array.isArray(rating_list) ? rating_list.map(Number).filter(n => !Number.isNaN(n) && n >= 0 && n <= 5) : [];

  const newRestaurant = new Restaurant({
    name,
    cuisine,
    description,
    street,
    city,
    postal_code,
    deliveryTime,
    deliveryFee,
    minOrder,
    items,
    image,
    coverImage,
  });

  await newRestaurant.save();
  return newRestaurant;
};

const findById = async (id) => {
  const restaurant = await Restaurant.findById(id);
  return restaurant || false;
};

const updateOneById = async (id, updateData) => {
  const restaurant = await Restaurant.findById(id);
  if (restaurant) {
    if (updateData.name !== undefined) restaurant.name = updateData.name;
    if (updateData.cuisine !== undefined)
      restaurant.cuisine = updateData.cuisine;
    if (updateData.description !== undefined)
      restaurant.description = updateData.description;
    if (updateData.street !== undefined) restaurant.street = updateData.street;
    if (updateData.city !== undefined) restaurant.city = updateData.city;
    if (updateData.postal_code !== undefined)
      restaurant.postal_code = updateData.postal_code;
    if (updateData.deliveryTime !== undefined)
      restaurant.deliveryTime = updateData.deliveryTime;
    if (updateData.deliveryFee !== undefined)
      restaurant.deliveryFee = updateData.deliveryFee;
    if (updateData.minOrder !== undefined)
      restaurant.minOrder = updateData.minOrder;
    if (updateData.items !== undefined) restaurant.items = updateData.items;
    if (updateData.image !== undefined) restaurant.image = updateData.image;
    if (updateData.coverImage !== undefined)
      restaurant.coverImage = updateData.coverImage;

    if (updateData.rating_list !== undefined) {
      const safeRatings = Array.isArray(updateData.rating_list) ? updateData.rating_list.map(Number).filter(n => !Number.isNaN(n) && n >= 0 && n <= 5) : [];
      restaurant.rating_list = safeRatings;
    }

    await restaurant.save();
    return restaurant;
  }
  return false;
};

const addRating = async (id, updateData) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant || updateData.addRating == undefined) {
    return null;
  }
  const r = Number(updateData.addRating);
  if (Number.isNaN(r) || r < 1 || r > 5) {
    console.log('Get your numbers right! 1-5 please.');
    return null;
  }
  let resRats = restaurant.ratings;
  switch (r) {
    case 1:
      resRats.ones += 1;
      break;
    case 2:
      resRats.twos += 1;
      break;
    case 3:
      resRats.threes += 1;
      break;
    case 4:
      resRats.fours += 1;
      break;
    case 5:
      resRats.fives += 1;
      break;
  }
  restaurant.ratings = resRats;
  await restaurant.save();
  return restaurant;
};

const removeImage = async (id) => {
  const restaurant = await Restaurant.findById(id);
  if (restaurant) {
    restaurant.image = null;
    await restaurant.save();
    return restaurant;
  }
  return false;
};

const deleteOne = async (id) => {
  const result = await Restaurant.findByIdAndDelete(id);
  return result !== null;
};

/// Returns a strting of id: items list NOTE: O(2n)
const getAllItems = async () => {
  const restaurants = await Restaurant.find(
    { 'items.0': { $exists: true } }, // get only **sexist** restaurants with items. Also where the hell is the documentation for this?
    'items _id rating',
  );
  let data = '{';
  let itemSwap;
  for (let i = 0; i < restaurants.length; i++) {
    itemSwap = '';
    const id = restaurants[i]._id;
    const rating = JSON.stringify(restaurants[i].rating);
    let items = restaurants[i].items;
    items.forEach((item) => {
      itemSwap += item.name + ', ';
    });
    const itemNames = itemSwap;
    data += 'id: ' + id + ' rating: ' + rating + ' items: ' + itemNames;
  }
  data += '}';
  return data;
};

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOne,
  addRating,
  removeImage,
  calculateAverageRating,
  getAllItems,
};
