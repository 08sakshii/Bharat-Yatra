const calculateDistance = (lat1, lon1, lat2, lon2) => {
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
  const distance = R * c;

  return Math.round(distance * 10) / 10;
};

const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

const formatDistance = (distanceKm) => {
  if (!distanceKm || distanceKm === 0) return "0 km";

  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }

  return `${Math.round(distanceKm * 10) / 10} km`;
};

const formatDuration = (minutes) => {
  if (!minutes || minutes === 0) return "0 min";

  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;

  return `${hours} hr ${mins} min`;
};

const formatDate = (date, format = "full") => {
  if (!date) return "Unknown";

  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (format === "relative") {
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  if (format === "short") {
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const getStatusColor = (status) => {
  const colors = {
    planned: "yellow",
    "in-progress": "blue",
    completed: "green",
  };
  return colors[status] || "gray";
};

const getStatusIcon = (status) => {
  const icons = {
    planned: "○",
    "in-progress": "→",
    completed: "✓",
  };
  return icons[status] || "○";
};

const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  return phone;
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const sortBy = (array, property, direction = "asc") => {
  return [...array].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];

    if (direction === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
};

const groupBy = (array, property) => {
  return array.reduce((acc, item) => {
    const key = item[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

const uniqueBy = (array, property) => {
  const seen = new Set();
  return array.filter((item) => {
    const key = item[property];
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

module.exports = {
  calculateDistance,
  formatDistance,
  formatDuration,
  formatDate,
  truncateText,
  debounce,
  getStatusColor,
  getStatusIcon,
  formatPhoneNumber,
  validateEmail,
  generateId,
  getGreeting,
  sortBy,
  groupBy,
  uniqueBy,
};
