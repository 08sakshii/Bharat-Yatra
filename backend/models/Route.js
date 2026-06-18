

const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: String,
  startLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [Number],
    address: String
  },
  places: [{
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    distanceFromPrevious: Number,
    estimatedTime: Number,
    notes: String
  }],
  routeMetrics: {
    totalDistance: {
      type: Number,
      default: 0
    },
    totalDuration: {
      type: Number,
      default: 0
    },
    numberOfPlaces: {
      type: Number,
      default: 0
    },
    estimatedDays: {
      type: Number,
      default: 1
    }
  },
  costEstimates: {
    fuelCost: {
      type: Number,
      default: 0
    },
    accommodationCost: {
      type: Number,
      default: 0
    },
    foodCost: {
      type: Number,
      default: 0
    },
    tollCost: {
      type: Number,
      default: 0
    },
    totalCost: {
      type: Number,
      default: 0
    },
    nights: {
      type: Number,
      default: 0
    }
  },
  routePolyline: String,
  optimization: {
    algorithm: {
      type: String,
      enum: ['nearest-neighbor', 'manual', 'osrm'],
      default: 'nearest-neighbor'
    },
    optimizedAt: Date
  },
  preferences: {
    avoidHighways: {
      type: Boolean,
      default: false
    },
    preferScenic: {
      type: Boolean,
      default: false
    },
    maxDailyDistance: Number
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed'],
    default: 'planned'
  },
  tripDates: {
    startDate: Date,
    endDate: Date
  },
  
  isPublic: {
    type: Boolean,
    default: false
  },
  publicMetadata: {
    publishedAt: Date,
    featured: {
      type: Boolean,
      default: false
    },
    featuredAt: Date,
    visibility: {
      type: String,
      enum: ['public', 'unlisted', 'private'],
      default: 'private'
    }
  },
  
  originalRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route'
  },
  isCloned: {
    type: Boolean,
    default: false
  },
  clonedFrom: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    clonedAt: Date
  },
  tags: [String],
  isFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


routeSchema.index({ user: 1, createdAt: -1 });
routeSchema.index({ user: 1, status: 1 });
routeSchema.index({ startLocation: '2dsphere' });
routeSchema.index({ isPublic: 1, 'publicMetadata.publishedAt': -1 });
routeSchema.index({ isPublic: 1, 'publicMetadata.featured': 1 });
routeSchema.index({ originalRoute: 1 });


routeSchema.virtual('interactions', {
  ref: 'RouteInteraction',
  localField: '_id',
  foreignField: 'route',
  justOne: true
});


routeSchema.pre('save', function(next) {
  if (this.places && this.places.length > 0) {
    this.routeMetrics.numberOfPlaces = this.places.length;
    
    let totalDistance = 0;
    let totalDuration = 0;
    
    this.places.forEach(placeStop => {
      if (placeStop.distanceFromPrevious) {
        totalDistance += placeStop.distanceFromPrevious;
      }
      if (placeStop.estimatedTime) {
        totalDuration += placeStop.estimatedTime;
      }
    });
    
    this.routeMetrics.totalDistance = Math.round(totalDistance * 10) / 10;
    this.routeMetrics.totalDuration = Math.round(totalDuration);
    
    
    const daysFromDistance = totalDistance / 200;
    const daysFromTime = totalDuration / 360; 
    this.routeMetrics.estimatedDays = Math.max(1, Math.ceil(Math.max(daysFromDistance, daysFromTime)));
  }
  
  
  if (!this.publicMetadata) {
    this.publicMetadata = {
      visibility: 'private'
    };
  }
  
  
  if (this.isModified('isPublic') && this.isPublic) {
    if (!this.publicMetadata.publishedAt) {
      this.publicMetadata.publishedAt = new Date();
    }
    this.publicMetadata.visibility = 'public';
  }
  
  
  if (this.isModified('isPublic')) {
    this.publicMetadata.visibility = this.isPublic ? 'public' : 'private';
  }
  
  
  if (this.isNew) {
    this.publicMetadata.visibility = this.isPublic ? 'public' : 'private';
  }
  
  next();
});


routeSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'places.place',
    select: 'name location category images ratings description'
  }).populate({
    path: 'user',
    select: 'name email profileImage'
  });
  next();
});


routeSchema.methods.createClone = async function(userId, username) {
  const RouteModel = mongoose.model('Route');
  
  const clonedRoute = new RouteModel({
    user: userId,
    name: `${this.name} (Copy)`,
    description: this.description,
    startLocation: this.startLocation,
    places: this.places,
    routeMetrics: this.routeMetrics,
    costEstimates: this.costEstimates,
    routePolyline: this.routePolyline,
    optimization: this.optimization,
    preferences: this.preferences,
    tags: this.tags,
    isCloned: true,
    originalRoute: this._id,
    clonedFrom: {
      user: this.user._id || this.user,
      username: username,
      clonedAt: new Date()
    },
    isPublic: false,
    status: 'planned'
  });
  
  return await clonedRoute.save();
};

module.exports = mongoose.model('Route', routeSchema);