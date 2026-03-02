const mongoose = require("mongoose");

/*
 * Object model:
 * id: ObjectId (MongoDB)
 * street: string
 * city: string
 * postal_code: int
 * rating_list: double[] (0.0 - 5.0)
 * rating: double
 * items: Item[]
 */

const calculateAverageRating = (ratings) => {
  if (!Array.isArray(ratings) || ratings.length === 0) return 0.0;
  const nums = ratings.map(Number).filter(n => !Number.isNaN(n) && n >= 0 && n <= 5);
  if (nums.length === 0) return 0.0;
  const sum = nums.reduce((a, b) => a + b, 0);
  // keep two decimal places
  return Math.round((sum / nums.length) * 10) / 10;
};

const restaurantSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal_code: {
    type: Number,
    required: true,
  },
  rating_list: {
    type: [Number],
    default: [],
    validate: {
      validator: function (ratings) {
        return ratings.every((r) => r >= 0 && r <= 5);
      },
      message: "All ratings must be between 0 and 5",
    },
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  items: {
    type: [Object],
    default: [],
  },
  image: {
    type: String,
    default: null,
  },
});

// Calculate average rating before saving
restaurantSchema.pre("save", function () {
  this.rating = Math.round(calculateAverageRating(this.rating_list) * 10) / 10;
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

const getAll = async () => {
  return await Restaurant.find();
};

const addOne = async (street, city, postal_code, rating_list = [], items = [], image = null) => {
  if (!street || !city || !postal_code) {
    return false;
  }

  const safeRatings = Array.isArray(rating_list) ? rating_list.map(Number).filter(n => !Number.isNaN(n) && n >= 0 && n <= 5) : [];

  const newRestaurant = new Restaurant({
    street,
    city,
    postal_code,
    rating_list: safeRatings,
    items,
    image,
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
    if (updateData.street) restaurant.street = updateData.street;
    if (updateData.city) restaurant.city = updateData.city;
    if (updateData.postal_code !== undefined) restaurant.postal_code = updateData.postal_code;
    if (updateData.items !== undefined) restaurant.items = updateData.items;
    if (updateData.image !== undefined) restaurant.image = updateData.image;

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
  if (restaurant && updateData.addRating !== undefined) {
    const r = Number(updateData.addRating);
    if (!Number.isNaN(r) && r >= 0 && r <= 5) {
      restaurant.rating_list = restaurant.rating_list || [];
      restaurant.rating_list.push(r);
      await restaurant.save();
      return restaurant;
    }
  }
  return null;
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

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOne,
  addRating,
  removeImage,
  calculateAverageRating,
};

