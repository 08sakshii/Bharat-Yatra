



const express = require('express');
const router = express.Router();
const {
  createEntry,
  getAllEntries,
  getPublicEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
  toggleFavorite,
  togglePrivacy,
  likeEntry,
  addComment,
  getEntriesByPlace,
  getEntriesByRoute,
  getFavoriteEntries,
  getStats,
  uploadImage
} = require('../controllers/notebookController');
const { protect, optionalAuth } = require('../middleware/auth');


router.get('/public', getPublicEntries); 


router.use(protect);

router.post('/', createEntry);
router.get('/', getAllEntries);
router.get('/stats', getStats);
router.get('/favorites', getFavoriteEntries);
router.get('/place/:placeId', getEntriesByPlace);
router.get('/route/:routeId', getEntriesByRoute);
router.get('/:id', getEntryById);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);
router.post('/:id/favorite', toggleFavorite);
router.post('/:id/privacy', togglePrivacy);
router.post('/:id/like', likeEntry);
router.post('/:id/comment', addComment);
router.post('/upload-image', uploadImage);

module.exports = router;






exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    }

    next();
  } catch (error) {
    
    next();
  }
};