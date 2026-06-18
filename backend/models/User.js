

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  avatar: {
    type: String,
    default: 'https://cdn.dribbble.com/userupload/5179788/file/original-4aba0544323a8476f0939dbb5111fe0d.png?resize=752x&vertical=center'
  },
  
  currentLocation: {
    latitude: Number,
    longitude: Number,
    city: String,
    state: String,
    country: String,
    address: String,
    updatedAt: Date
  },
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    units: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    }
  },
  savedPlaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }],
  savedRoutes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.pre('save', function(next) {
  if (this.isNew && !this.avatar.includes('dribbble') && !this.avatar.includes('uploaded')) {
    this.avatar = `https://cdn.dribbble.com/userupload/5179788/file/original-4aba0544323a8476f0939dbb5111fe0d.png?resize=752x&vertical=center`;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);