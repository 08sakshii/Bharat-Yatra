

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: String,
    state: String,
    country: {
      type: String,
      default: 'India'
    }
  },
category: {
  type: String,
  enum: [
    'temple',
    'fort',
    'palace',
    'monument',
    'beach',
    'sports',
    'art gallery',
    'hill-station',
    'wildlife',
    'museum',
    'lake',
    'waterfall',
    'heritage',
    'other',
    'wildlife sancturary'
  ],
  required: true
},

  images: [{
    url: String,
    caption: String,
    source: String
  }],
  details: {
    historicalSignificance: String,
    bestTimeToVisit: String,
    entryFee: {
      indian: String,
      foreign: String
    },
    timings: {
      opening: String,
      closing: String,
      weeklyOff: String
    },
    duration: String, 
    accessibility: String
  },
  amenities: {
    parking: { type: Boolean, default: false },
    restrooms: { type: Boolean, default: false },
    restaurant: { type: Boolean, default: false },
    guide: { type: Boolean, default: false },
    wheelchairAccessible: { type: Boolean, default: false }
  },
  nearbyPlaces: {
    hotels: [{
      name: String,
      distance: Number, 
      rating: Number,
      priceRange: String
    }],
    restaurants: [{
      name: String,
      cuisine: String,
      distance: Number
    }],
    attractions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
    }]
  },
  famousFor: [String], 
  localFood: [String], 
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  source: {
    type: String,
    enum: ['manual', 'osm', 'opentripmap', 'wikipedia'],
    default: 'manual'
  },
  externalIds: {
    osmId: String,
    wikiDataId: String,
    openTripMapId: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  visitCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});


placeSchema.index({ location: '2dsphere' });
placeSchema.index({ category: 1 });
placeSchema.index({ 'location.city': 1 });
placeSchema.index({ 'ratings.average': -1 });


placeSchema.virtual('distance').get(function() {
  return this._distance;
});

module.exports = mongoose.model('Place', placeSchema);