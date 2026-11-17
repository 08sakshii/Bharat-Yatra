export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

const toRad = (degrees) => degrees * (Math.PI / 180);

export const formatDistance = (distance) => {
  if (distance < 1) return `${Math.round(distance * 1000)} m`;
  return `${distance.toFixed(1)} km`;
};

export const estimateTravelTime = (distance, avgSpeed = 50) => {
  return Math.round((distance / avgSpeed) * 60);
};

export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const getRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDate = (date, format = "short") => {
  try {
    const d = new Date(date);
    if (isNaN(d)) return "";
    if (format === "relative") return getRelativeTime(d);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return "";
  }
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  });
};

export const isValidEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 6)
    return {
      isValid: false,
      message: "Password must be at least 6 characters",
    };
  if (!/[A-Z]/.test(password))
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter",
    };
  if (!/[0-9]/.test(password))
    return {
      isValid: false,
      message: "Password must contain at least one number",
    };
  return { isValid: true, message: "Password is strong" };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

export const generateRandomColor = () => {
  const colors = [
    "#0B6E66",
    "#FF8C42",
    "#228B22",
    "#F4B400",
    "#8B4513",
    "#00CED1",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const sortPlacesByDistance = (places, origin) => {
  return places
    .map((place) => {
      const distance = calculateDistance(
        origin.lat,
        origin.lng,
        place.location.coordinates[1],
        place.location.coordinates[0],
      );
      return { ...place, distance };
    })
    .sort((a, b) => a.distance - b.distance);
};

export const optimizeRouteNearestNeighbor = (places, start) => {
  if (!places || places.length === 0) return [];
  const unvisited = [...places];
  const route = [];
  let current = start;

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let minDistance = Infinity;
    unvisited.forEach((place, index) => {
      const distance = calculateDistance(
        current.lat,
        current.lng,
        place.location.coordinates[1],
        place.location.coordinates[0],
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });
    const nearest = unvisited.splice(nearestIndex, 1)[0];
    route.push({
      ...nearest,
      distanceFromPrevious: minDistance,
      estimatedTime: estimateTravelTime(minDistance),
    });
    current = {
      lat: nearest.location.coordinates[1],
      lng: nearest.location.coordinates[0],
    };
  }
  return route;
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: "#F4B400",
  USER_DATA: "#8B4513",
  THEME: "#00CED1",
  LAST_LOCATION: "lastLocation",
};

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Storage get error", error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Storage set error", error);
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Storage remove error", error);
      return false;
    }
  },
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Storage clear error", error);
      return false;
    }
  },
};

export default {
  calculateDistance,
  formatDistance,
  estimateTravelTime,
  formatDuration,
  formatDate,
  truncateText,
  debounce,
  getCurrentLocation,
  isValidEmail,
  validatePassword,
  formatFileSize,
  generateRandomColor,
  sortPlacesByDistance,
  optimizeRouteNearestNeighbor,
  storage,
  STORAGE_KEYS,
};
