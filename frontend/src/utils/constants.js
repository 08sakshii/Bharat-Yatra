


export const PLACE_CATEGORIES = [
  { value: 'temple', label: 'Temple', icon: '🛕', color: '#FF8C42' },
  { value: 'fort', label: 'Fort', icon: '🏰', color: '#F4B400' },
  { value: 'palace', label: 'Palace', icon: '🏛️', color: '#0B6E66' },
  { value: 'monument', label: 'Monument', icon: '🗿', color: '#8B4513' },
  { value: 'beach', label: 'Beach', icon: '🏖️', color: '#00CED1' },
  { value: 'hill-station', label: 'Hill Station', icon: '⛰️', color: '#228B22' },
  { value: 'wildlife', label: 'Wildlife', icon: '🦁', color: '#32CD32' },
  { value: 'museum', label: 'Museum', icon: '🏛️', color: '#8B008B' },
  { value: 'lake', label: 'Lake', icon: '🏞️', color: '#4682B4' },
  { value: 'waterfall', label: 'Waterfall', icon: '💧', color: '#1E90FF' },
  { value: 'heritage', label: 'Heritage Site', icon: '🏺', color: '#D2691E' },
  { value: 'other', label: 'Other', icon: '📍', color: '#808080' }
];


export const MAP_CONFIG = {
  defaultCenter: [20.5937, 78.9629], 
  defaultZoom: 5,
  maxZoom: 18,
  minZoom: 4,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};


export const MARKER_ICONS = {
  user: '📍',
  place: '🎯',
  temple: '🛕',
  fort: '🏰',
  beach: '🏖️',
  mountain: '⛰️',
  default: '📌'
};


export const MOOD_OPTIONS = [
  { value: 'excited', label: 'Excited', emoji: '🤩', color: '#FF6B6B' },
  { value: 'happy', label: 'Happy', emoji: '😊', color: '#4ECDC4' },
  { value: 'peaceful', label: 'Peaceful', emoji: '😌', color: '#95E1D3' },
  { value: 'adventurous', label: 'Adventurous', emoji: '🤠', color: '#F38181' },
  { value: 'tired', label: 'Tired', emoji: '😴', color: '#AA96DA' },
  { value: 'amazed', label: 'Amazed', emoji: '😲', color: '#FCBAD3' },
  { value: 'nostalgic', label: 'Nostalgic', emoji: '🥲', color: '#FFFFD2' }
];


export const WEATHER_OPTIONS = [
  { value: 'sunny', label: 'Sunny', icon: '☀️' },
  { value: 'cloudy', label: 'Cloudy', icon: '☁️' },
  { value: 'rainy', label: 'Rainy', icon: '🌧️' },
  { value: 'foggy', label: 'Foggy', icon: '🌫️' },
  { value: 'snowy', label: 'Snowy', icon: '❄️' },
  { value: 'windy', label: 'Windy', icon: '💨' }
];


export const ROUTE_STATUS = [
  { value: 'planned', label: 'Planned', color: '#F4B400' },
  { value: 'in-progress', label: 'In Progress', color: '#FF8C42' },
  { value: 'completed', label: 'Completed', color: '#0B6E66' }
];


export const DISTANCE_FILTERS = [
  { value: 10, label: 'Within 10 km' },
  { value: 25, label: 'Within 25 km' },
  { value: 50, label: 'Within 50 km' },
  { value: 100, label: 'Within 100 km' },
  { value: 200, label: 'Within 200 km' }
];

export const RATING_FILTERS = [
  { value: 4, label: '4+ Stars' },
  { value: 3, label: '3+ Stars' },
  { value: 2, label: '2+ Stars' }
];


export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];


export const REGIONAL_CUISINES = {
  north: ['Butter Chicken', 'Dal Makhani', 'Tandoori', 'Chole Bhature', 'Rajma Chawal'],
  south: ['Dosa', 'Idli', 'Sambar', 'Biryani', 'Appam', 'Uttapam'],
  east: ['Rasgulla', 'Sandesh', 'Momos', 'Fish Curry', 'Litti Chokha'],
  west: ['Vada Pav', 'Dhokla', 'Pav Bhaji', 'Misal Pav', 'Thali'],
  central: ['Poha', 'Dal Bafla', 'Kebabs', 'Biryani']
};


export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  AUTH_REQUIRED: 'Please login to continue.',
  LOCATION_DENIED: 'Location access denied. Please enable location services.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  NOT_FOUND: 'Resource not found.'
};


export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful! Please login.',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PLACE_SAVED: 'Place saved to your favorites!',
  ROUTE_CREATED: 'Route created successfully!',
  ENTRY_SAVED: 'Journal entry saved!'
};


export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  LAST_LOCATION: 'lastLocation',
  THEME: 'theme',
  MAP_VIEW: 'mapView'
};


export const RATE_LIMITS = {
  NOMINATIM: 1000, 
  WIKIPEDIA: 500,
  WEATHER: 60 
};


export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_REGEX: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, 
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
};

export default {
  PLACE_CATEGORIES,
  MAP_CONFIG,
  MARKER_ICONS,
  MOOD_OPTIONS,
  WEATHER_OPTIONS,
  ROUTE_STATUS,
  DISTANCE_FILTERS,
  RATING_FILTERS,
  INDIAN_STATES,
  REGIONAL_CUISINES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  RATE_LIMITS,
  VALIDATION
};