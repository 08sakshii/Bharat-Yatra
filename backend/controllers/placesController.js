

const Place = require('../models/Place');
const axios = require('axios');
const { calculateDistance } = require('../utils/helpers');

exports.getNearbyPlaces = async (req, res) => {
  try {
    const { lat, lng, radius = 50, category, limit = 1000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const radiusInKm = parseFloat(radius);

    
    const query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radiusInKm * 5000 
        }
      }
    };

    
    if (category && category !== 'all') {
      query.category = category;
    }

    
    let places = await Place.find(query).limit(parseInt(limit));

    
    places = places.map(place => {
      const distance = calculateDistance(
        latitude,
        longitude,
        place.location.coordinates[1],
        place.location.coordinates[0]
      );
      
      return {
        ...place.toObject(),
        distance: Math.round(distance * 10) / 10
      };
    });

    res.status(200).json({
      success: true,
      count: places.length,
      data: places
    });
  } catch (error) {
    console.error('Get nearby places error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
      .populate('nearbyPlaces.attractions')
      .populate('reviews.user', 'name avatar');

    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }

    
    place.visitCount += 1;
    await place.save();

    res.status(200).json({
      success: true,
      data: place
    });
  } catch (error) {
    console.error('Get place by ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.searchPlaces = async (req, res) => {
  try {
    const { query, category, state, minRating } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    
    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'location.city': { $regex: query, $options: 'i' } },
        { 'location.state': { $regex: query, $options: 'i' } }
      ]
    };

    
    if (category && category !== 'all') {
      searchQuery.category = category;
    }
    if (state) {
      searchQuery['location.state'] = state;
    }
    if (minRating) {
      searchQuery['ratings.average'] = { $gte: parseFloat(minRating) };
    }

    const places = await Place.find(searchQuery).limit(1000);

    res.status(200).json({
      success: true,
      count: places.length,
      data: places
    });
  } catch (error) {
    console.error('Search places error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find().limit(1000); 
    res.status(200).json({
      success: true,
      count: places.length,
      data: places,
    });
  } catch (error) {
    console.error('Get all places error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};





exports.getCategories = async (req, res) => {
  try {
    const categories = await Place.distinct('category');
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: 'Rating is required'
      });
    }

    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }

    
    const existingReview = place.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this place'
      });
    }

    
    place.reviews.push({
      user: req.user.id,
      rating,
      comment
    });

    
    const totalRating = place.reviews.reduce((sum, review) => sum + review.rating, 0);
    place.ratings.average = totalRating / place.reviews.length;
    place.ratings.count = place.reviews.length;

    await place.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: place
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.toggleSavePlace = async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id);
    const placeId = req.params.id;

    const placeExists = await Place.findById(placeId);
    if (!placeExists) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }

    const isSaved = user.savedPlaces.includes(placeId);

    if (isSaved) {
      
      user.savedPlaces = user.savedPlaces.filter(
        id => id.toString() !== placeId
      );
    } else {
      
      user.savedPlaces.push(placeId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: isSaved ? 'Place removed from saved' : 'Place saved successfully',
      isSaved: !isSaved
    });
  } catch (error) {
    console.error('Toggle save place error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.getSavedPlaces = async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id).populate('savedPlaces');

    res.status(200).json({
      success: true,
      count: user.savedPlaces.length,
      data: user.savedPlaces
    });
  } catch (error) {
    console.error('Get saved places error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};