const Restaurant = require("../models/restaurantModel.js");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.getAll();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error: error.message });
  }
};

const createRestaurant = async (req, res) => {
  try {
    const { street, city, postal_code, rating_list = [], items = [], image } = req.body;

    const newRestaurant = await Restaurant.addOne(street, city, postal_code, rating_list, items, image);

    if (newRestaurant) {
      res.status(201).json(newRestaurant);
    } else {
      res.status(400).json({ message: "Invalid restaurant data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating restaurant", error: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant", error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const updateData = req.body;
    const updated = await Restaurant.updateOneById(restaurantId, updateData);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error: error.message });
  }
};

const newRating = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const updateData = req.body;
    const updated = await Restaurant.addRating(restaurantId, updateData);
    if (updated != null) {
      res.json(updated);
    } else {
      res.status(400).json({ message: "Invalid rating data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding rating", error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const isDeleted = await Restaurant.deleteOne(restaurantId);
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant", error: error.message });
  }
};

const removeImage = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const updated = await Restaurant.removeImage(restaurantId);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing image", error: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  newRating,
  removeImage,
};
