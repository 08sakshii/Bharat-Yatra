

const express = require('express');
const router = express.Router();
const {
  optimizeRoute,
  createRoute,
  getUserRoutes,
  getPopularRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  toggleFavorite,
  exportRoute,
  updateStatus,
  updateVisibility,
  cloneRoute,
  upvoteRoute,
  downvoteRoute,
  getVoteStatus
} = require('../controllers/routesController');
const { protect } = require('../middleware/auth');




router.post('/optimize', optimizeRoute);
router.get('/popular', getPopularRoutes);






router.post('/', protect, createRoute);
router.get('/', protect, getUserRoutes);
router.get('/:id', protect, getRouteById); 
router.put('/:id', protect, updateRoute);
router.delete('/:id', protect, deleteRoute);


router.post('/:id/favorite', protect, toggleFavorite);
router.get('/:id/export', protect, exportRoute);
router.patch('/:id/status', protect, updateStatus);
router.patch('/:id/visibility', protect, updateVisibility);


router.post('/:id/clone', protect, cloneRoute);
router.post('/:id/upvote', protect, upvoteRoute);
router.post('/:id/downvote', protect, downvoteRoute);
router.get('/:id/vote-status', protect, getVoteStatus);

module.exports = router;