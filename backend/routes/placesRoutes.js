const express = require('express');
const router = express.Router();
const {
  getNearbyPlaces,
  getPlaceById,
  searchPlaces,
  getCategories,
  addReview,
  toggleSavePlace,
  getSavedPlaces,
  getAllPlaces,
} = require('../controllers/placesController');
const { protect } = require('../middleware/auth');


router.get('/', getAllPlaces);
router.get('/nearby', getNearbyPlaces);
router.get('/search', searchPlaces);
router.get('/categories', getCategories);


router.get('/saved', protect, getSavedPlaces);
router.post('/:id/review', protect, addReview);
router.post('/:id/save', protect, toggleSavePlace);


router.get('/:id', getPlaceById);

module.exports = router;
