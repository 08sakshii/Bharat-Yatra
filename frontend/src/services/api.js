import axios from "axios";

const API_BASE_URL = import.meta.env.PROD
  ? ""
  : import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          break;
        case 403:
          console.error("Access forbidden");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error("API Error:", error.response.data.message);
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error("Network error - no response received");
      return Promise.reject({
        message: "Network error. Please check your connection.",
      });
    } else {
      console.error("Error:", error.message);
      return Promise.reject({ message: error.message });
    }
  },
);

export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (userData) => api.put("/auth/profile", userData),
  updateLocation: (locationData) => api.put("/auth/location", locationData),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post("/auth/reset-password", { token, password }),
};

export const placesAPI = {
  getNearby: (lat, lng, radius = 50, category = null) =>
    api.get("/places/nearby", { params: { lat, lng, radius, category } }),
  getById: (id) => api.get(`/places/${id}`),
  search: (query, filters) =>
    api.get("/places/search", { params: { query, ...filters } }),
  getCategories: () => api.get("/places/categories"),
  addReview: (placeId, review) => api.post(`/places/${placeId}/review`, review),
  toggleSave: (placeId) => api.post(`/places/${placeId}/save`),
  getSavedPlaces: () => api.get("/places/saved"),
};

export const routesAPI = {
  create: (routeData) => api.post("/routes", routeData),

  getAll: () => api.get("/routes"),

  getPopular: (params = {}) => {
    const publicApi = axios.create({
      baseURL: `${API_BASE_URL}/api`,
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
      timeout: 10000,
    });

    return publicApi
      .get("/routes/popular", { params })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Get popular routes error:", error);
        throw error;
      });
  },

  getById: (id) => api.get(`/routes/${id}`),

  update: (id, routeData) => api.put(`/routes/${id}`, routeData),

  delete: (id) => api.delete(`/routes/${id}`),

  optimize: (placeIds, startLocation) =>
    api.post("/routes/optimize", { placeIds, startLocation }),

  toggleFavorite: (id) => api.post(`/routes/${id}/favorite`),

  export: (id) => api.get(`/routes/${id}/export`),

  updateStatus: (id, status) => api.patch(`/routes/${id}/status`, { status }),

  updateVisibility: (id, isPublic) =>
    api.patch(`/routes/${id}/visibility`, { isPublic }),

  cloneRoute: (id) => api.post(`/routes/${id}/clone`),

  upvote: (id) => api.post(`/routes/${id}/upvote`),

  downvote: (id) => api.post(`/routes/${id}/downvote`),

  getVoteStatus: (id) => api.get(`/routes/${id}/vote-status`),
};

export const notebookAPI = {
  create: (entry) => api.post("/notebook", entry),
  getAll: (filters) => api.get("/notebook", { params: filters }),
  getPublicFeed: (filters) => api.get("/notebook/public", { params: filters }),
  getById: (id) => api.get(`/notebook/${id}`),
  update: (id, entry) => api.put(`/notebook/${id}`, entry),
  delete: (id) => api.delete(`/notebook/${id}`),
  toggleFavorite: (id) => api.post(`/notebook/${id}/favorite`),
  togglePrivacy: (id) => api.post(`/notebook/${id}/privacy`),
  likeEntry: (id) => api.post(`/notebook/${id}/like`),
  addComment: (id, comment) => api.post(`/notebook/${id}/comment`, { comment }),
  getByPlace: (placeId) => api.get(`/notebook/place/${placeId}`),
  getByRoute: (routeId) => api.get(`/notebook/route/${routeId}`),
  getFavorites: () => api.get("/notebook/favorites"),
  getStats: () => api.get("/notebook/stats"),
  uploadImage: (imageData) => api.post("/notebook/upload-image", imageData),
};

export const externalAPI = {
  geocode: async (query) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Geocoding error:", error);
      throw error;
    }
  },

  reverseGeocode: async (lat, lon) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat,
            lon,
            format: "json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      throw error;
    }
  },

  getWeather: async (lat, lon) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    if (!API_KEY) return null;

    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: "metric",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Weather API error:", error);
      return null;
    }
  },

  getWikipediaInfo: async (title) => {
    try {
      const response = await axios.get(
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
          encodeURIComponent(title),
      );
      return response.data;
    } catch (error) {
      console.error("Wikipedia API error:", error);
      return null;
    }
  },
};

export default api;
