

const mongoose = require('mongoose');

const routeInteractionSchema = new mongoose.Schema({
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  
  upvotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  downvotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  clones: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    clonedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  views: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    viewedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  stats: {
    upvoteCount: {
      type: Number,
      default: 0
    },
    downvoteCount: {
      type: Number,
      default: 0
    },
    netVotes: {
      type: Number,
      default: 0
    },
    cloneCount: {
      type: Number,
      default: 0
    },
    viewCount: {
      type: Number,
      default: 0
    },
    popularityScore: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});


routeInteractionSchema.index({ route: 1 });
routeInteractionSchema.index({ 'upvotes.user': 1 });
routeInteractionSchema.index({ 'downvotes.user': 1 });
routeInteractionSchema.index({ 'stats.popularityScore': -1 });


routeInteractionSchema.methods.calculatePopularityScore = function() {
  const upvoteWeight = 2;
  const cloneWeight = 5;
  const viewWeight = 0.1;
  
  this.stats.popularityScore = 
    (this.stats.upvoteCount * upvoteWeight) +
    (this.stats.cloneCount * cloneWeight) +
    (this.stats.viewCount * viewWeight) -
    (this.stats.downvoteCount * 1);
  
  return this.stats.popularityScore;
};


routeInteractionSchema.methods.updateStats = function() {
  this.stats.upvoteCount = this.upvotes.length;
  this.stats.downvoteCount = this.downvotes.length;
  this.stats.netVotes = this.stats.upvoteCount - this.stats.downvoteCount;
  this.stats.cloneCount = this.clones.length;
  this.stats.viewCount = this.views.length;
  this.calculatePopularityScore();
};


routeInteractionSchema.pre('save', function(next) {
  this.updateStats();
  next();
});

module.exports = mongoose.model('RouteInteraction', routeInteractionSchema);