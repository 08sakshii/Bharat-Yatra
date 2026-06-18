



const mongoose = require('mongoose');

const notebookEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route'
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  
  formattedContent: {
    type: String, 
    maxlength: 10000
  },
  images: [{
    url: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  visitDate: {
    type: Date,
    default: Date.now
  },
  mood: {
    type: String,
    enum: ['excited', 'happy', 'peaceful', 'adventurous', 'tired', 'amazed', 'nostalgic'],
    default: 'happy'
  },
  weather: {
    type: String,
    enum: ['sunny', 'cloudy', 'rainy', 'foggy', 'snowy', 'windy']
  },
  companions: [String],
  highlights: [String],
  tips: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  tags: [String],
  isPrivate: {
    type: Boolean,
    default: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  
  shareSettings: {
    allowComments: {
      type: Boolean,
      default: false
    },
    allowLikes: {
      type: Boolean,
      default: false
    }
  },
  
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});


notebookEntrySchema.index({ user: 1, createdAt: -1 });
notebookEntrySchema.index({ user: 1, place: 1 });
notebookEntrySchema.index({ user: 1, route: 1 });
notebookEntrySchema.index({ user: 1, visitDate: -1 });
notebookEntrySchema.index({ isPrivate: 1, createdAt: -1 }); 
notebookEntrySchema.index({ tags: 1 }); 

module.exports = mongoose.model('Notebook', notebookEntrySchema);

