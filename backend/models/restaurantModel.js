const mongoose = require("mongoose");

/*
 * Object model:
 * id: ObjectId (MongoDB)
 * street: string
 * city: string
 * postal_code: int
 * ratings: double[] (0.0 - 5.0)
 * rating: double
 * items: Item[]
 */

// (1*ones+2*twos+3*threes+4*fours+5*fives)/(ones+twos+threes+fours+fives)
const calculateAverageRating = (ratings) => {
  const mean = (1 * ratings.ones + 2 * ratings.twos + 3 * ratings.threes + 4 * ratings.fours + 5 * ratings.fives)
    / (ratings.ones + ratings.twos + ratings.threes + ratings.fours + ratings.fives)
  return Math.round(mean * 10) / 10;
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
  ratings: {
    ones: { type: Number, default: 0 },
    twos: { type: Number, default: 0 },
    threes: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    fives: { type: Number, default: 0 },
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
  this.rating = Math.round(calculateAverageRating(this.ratings) * 10) / 10;
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

const getAll = async () => {
  return await Restaurant.find();
};

const addOne = async (street, city, postal_code, items = [], image = null) => {
  if (!street || !city || !postal_code) {
    return false;
  }

  const newRestaurant = new Restaurant({
    street,
    city,
    postal_code,
    items: items,
    image: image,
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

    if (updateData.ratings !== undefined) {
      const safeRatings = updateData.ratings;
      restaurant.ratings = safeRatings;
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
  if (Number.isNaN(r) || r < 0 || r > 5) { console.log("Get your numbers right! 1-5 please."); return null; }
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

