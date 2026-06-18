

const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  updateLocation,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');


router.post('/register', register);
router.post('/login', login);


router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/location', protect, updateLocation);
router.post('/logout', protect, logout);

module.exports = router;