const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  newRating,
  removeImage,
} = require('../controllers/restaurantController');

router.get('/', getAllRestaurants);
router.put('/rate/:restaurantId', newRating);
router.get('/:restaurantId', getRestaurantById);
router.post('/', createRestaurant);
router.put('/:restaurantId', updateRestaurant);
router.put('/:restaurantId/image', removeImage);
router.delete('/:restaurantId', deleteRestaurant);

module.exports = router;
