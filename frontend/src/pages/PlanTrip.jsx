import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';
import { useLocation as useRouterLocation } from 'react-router-dom';
import { placesAPI, routesAPI } from '../services/api';
import RouteBuilder from '../components/routes/RouteBuilder';
import RouteMap from '../components/routes/RouteMap';
import AIChatbot from '../components/ai/AIChatbot';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapIcon, List, Search, Plus, Loader, X, Menu, Save, Sparkles, Navigation, Clock, MapPin, TrendingUp, Hotel, ChevronLeft, ChevronRight, ExternalLink, Globe, Lock, DollarSign, AlertCircle } from 'lucide-react';
import { calculateTripCost, formatCurrency } from '../utils/routeCalculations';
import logo from '../assets/images/logo.png';

const STORAGE_KEY = 'bharat_yatra_plan_trip_state';
const STORAGE_DURATION = 20 * 60 * 1000; 

const PlanTrip = () => {
  const navigate = useNavigate();
  const { location, requestLocation, hasLocation } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [viewMode, setViewMode] = useState('builder');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [routeName, setRouteName] = useState('');
  const [routeDescription, setRouteDescription] = useState('');
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [showOptimizeModal, setShowOptimizeModal] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showMobilePlaces, setShowMobilePlaces] = useState(false);

  
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [hotelError, setHotelError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [hotelPage, setHotelPage] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelBookingComplete, setHotelBookingComplete] = useState(false);
  
  
  const [showQuickStats, setShowQuickStats] = useState(true);
  const [estimatedBudget, setEstimatedBudget] = useState(null);
  const [budgetNeedsUpdate, setBudgetNeedsUpdate] = useState(false);

  const routerLocation = useRouterLocation();
  const hotelsPerPage = 10;

  
  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const { data, timestamp } = JSON.parse(stored);
          const now = Date.now();
          
          
          if (now - timestamp < STORAGE_DURATION) {
            console.log('Restoring state from localStorage');
            setSelectedPlaces(data.selectedPlaces || []);
            setViewMode(data.viewMode || 'builder');
            setShowQuickStats(data.showQuickStats !== undefined ? data.showQuickStats : true);
            setEstimatedBudget(data.estimatedBudget || null);
            setBudgetNeedsUpdate(data.budgetNeedsUpdate || false);
          } else {
            
            console.log('LocalStorage data expired, clearing...');
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    loadFromLocalStorage();
  }, []);

  
  useEffect(() => {
    const saveToLocalStorage = () => {
      try {
        const stateToSave = {
          selectedPlaces,
          viewMode,
          showQuickStats,
          estimatedBudget,
          budgetNeedsUpdate
        };

        const dataToStore = {
          data: stateToSave,
          timestamp: Date.now()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    };

    
    if (selectedPlaces.length > 0 || viewMode !== 'builder') {
      saveToLocalStorage();
    }
  }, [selectedPlaces, viewMode, showQuickStats, estimatedBudget, budgetNeedsUpdate]);

  
  useEffect(() => {
    return () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const { timestamp } = JSON.parse(stored);
          const now = Date.now();
          if (now - timestamp >= STORAGE_DURATION) {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Error cleaning localStorage:', error);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (location) {
      fetchPlaces();
    }
  }, [location]);

  useEffect(() => {
    if (routerLocation.state?.selectedPlace) {
      const place = routerLocation.state.selectedPlace;
      if (!selectedPlaces.find(p => p._id === place._id)) {
        setSelectedPlaces([place]);
      }
      window.history.replaceState({}, document.title);
    }
  }, [routerLocation.state]);

  const fetchPlaces = async () => {
    setLoading(true);
    setSearchLoading(true);
    try {
      const response = await placesAPI.getNearby(location.lat, location.lng, 5000);
      if (response.success) {
        setAvailablePlaces(response.data);
      }
    } catch (error) {
      console.error('Fetch places error:', error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleAddPlace = (place) => {
    if (!selectedPlaces.find(p => p._id === place._id)) {
      setSelectedPlaces([...selectedPlaces, place]);
      setShowMobilePlaces(false);
      setBudgetNeedsUpdate(true);
    }
  };

  const handleRemovePlace = (placeId) => {
    setSelectedPlaces(selectedPlaces.filter(p => p._id !== placeId));
    setBudgetNeedsUpdate(true);
  };

  const handleClearAllPlaces = () => {
    if (selectedPlaces.length === 0) {
      return;
    }
    if (confirm('Are you sure you want to clear all selected places?')) {
      setSelectedPlaces([]);
      setEstimatedBudget(null);
      setBudgetNeedsUpdate(false);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleReorderPlaces = (reorderedPlaces) => {
    setSelectedPlaces(reorderedPlaces);
    setBudgetNeedsUpdate(true);
  };

  const totalDistance = selectedPlaces.reduce((sum, place, idx) => {
    if (idx === 0) return place.distance || 0;
    return sum + (place.distanceFromPrevious || place.distance || 0);
  }, 0);

  const totalDuration = selectedPlaces.reduce((sum, place) => {
    return sum + (place.estimatedTime || 0);
  }, 0);

  const extractCities = () => {
    const cities = selectedPlaces
      .map(place => place.location?.city)
      .filter((city, index, self) => city && self.indexOf(city) === index);
    setAvailableCities(cities);
    if (cities.length > 0 && !selectedCity) {
      setSelectedCity(cities[0]);
    }
  };

  const fetchHotelsFromOverpass = async (cityName) => {
  setLoadingHotels(true);
  setHotelError(null);
  setHotels([]);

  try {
    // Step 1: find coordinates from selected places OR geocode the city
    let lat, lng;

    const cityPlace = selectedPlaces.find(p =>
      p.location?.city === cityName ||
      p.name === cityName ||
      p.location?.state === cityName
    );

    if (cityPlace?.location?.coordinates?.length === 2) {
      lng = cityPlace.location.coordinates[0];
      lat = cityPlace.location.coordinates[1];
    } else if (cityPlace?.coordinates) {
      lat = cityPlace.coordinates.lat;
      lng = cityPlace.coordinates.lng;
    } else {
      // Fallback: geocode via Nominatim
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)},India&format=json&limit=1`,
        { headers: { 'User-Agent': 'BharatYatraApp/1.0' } }
      );
      const geoData = await geoRes.json();
      if (!geoData?.length) throw new Error(`Could not find coordinates for ${cityName}`);
      lat = parseFloat(geoData[0].lat);
      lng = parseFloat(geoData[0].lon);
    }

    console.log(`Fetching hotels for ${cityName} at: ${lat}, ${lng}`);

    // Step 2: fetch from Overpass
const query = `[out:json][timeout:30];(node["tourism"="hotel"](around:20000,${lat},${lng});way["tourism"="hotel"](around:20000,${lat},${lng});node["tourism"="guest_house"](around:20000,${lat},${lng});way["tourism"="guest_house"](around:20000,${lat},${lng});node["tourism"="hostel"](around:20000,${lat},${lng});node["amenity"="hotel"](around:20000,${lat},${lng}););out center 50;`;
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!response.ok) throw new Error('Overpass API failed');

    const data = await response.json();

    if (data.elements?.length > 0) {
      const formattedHotels = data.elements.map(element => ({
        id: element.id,
        name: element.tags?.name || 'Unnamed Hotel',
        address: element.tags?.['addr:street']
          ? `${element.tags['addr:street']}, ${element.tags['addr:city'] || cityName}`
          : element.tags?.['addr:full'] || cityName,
        phone: element.tags?.phone || element.tags?.['contact:phone'] || 'N/A',
        website: element.tags?.website || element.tags?.['contact:website'] || null,
        stars: element.tags?.stars || 'N/A',
        lat: element.lat || element.center?.lat,
        lon: element.lon || element.center?.lon,
        email: element.tags?.email || null,
description: element.tags?.description || `${element.tags?.tourism || element.tags?.amenity || 'Hotel'} in ${cityName}`      }));
      setHotels(formattedHotels);
      setHotelPage(0);
    } else {
      setHotelError(`No hotels found near ${cityName}. Try selecting a different city.`);
    }
  } catch (err) {
    console.error('Hotel fetch error:', err);
    setHotelError(`Unable to load hotels: ${err.message}`);
  } finally {
    setLoadingHotels(false);
  }
};
  const handleCityChange = (city) => {
    setSelectedCity(city);
    fetchHotelsFromOverpass(city);
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    
    if (hotel.website) {
      window.open(hotel.website, '_blank');
    } else {
      const searchQuery = encodeURIComponent(`${hotel.name} ${hotel.address} hotel booking`);
      window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
    }
    
    setHotelBookingComplete(true);
  };

  const handleSaveRoute = () => {
    if (!isAuthenticated) {
      alert('Please login to save routes');
      navigate('/login');
      return;
    }
    
    if (selectedPlaces.length === 0) {
      alert('Please add some places to your route first');
      return;
    }
    
    extractCities();
    setShowHotelModal(true);
    setHotelBookingComplete(false);
    setSelectedHotel(null);
    
    const cities = selectedPlaces
      .map(place => place.location?.city)
      .filter((city, index, self) => city && self.indexOf(city) === index);
    
    if (cities.length > 0) {
      setSelectedCity(cities[0]);
      fetchHotelsFromOverpass(cities[0]);
    }
  };

  const handleContinueWithoutBooking = () => {
    setShowHotelModal(false);
    setShowSaveModal(true);
  };

  const handleAfterHotelBooking = () => {
    setShowHotelModal(false);
    setShowSaveModal(true);
  };

  const calculateBudget = () => {
    const distance = totalDistance;
    const days = Math.max(1, Math.ceil(totalDuration / 360));
    
    const costDetails = calculateTripCost(distance, days, 'mid');
    
    return {
      fuel: costDetails.fuelCost,
      accommodation: costDetails.accommodationCost,
      food: costDetails.foodCost,
      miscellaneous: costDetails.miscellaneousCost,
      toll: costDetails.tollCost,
      total: costDetails.totalCost,
      days: costDetails.days,
      nights: costDetails.nights
    };
  };

  const handleRecalculateBudget = () => {
    if (selectedPlaces.length > 0) {
      setEstimatedBudget(calculateBudget());
      setBudgetNeedsUpdate(false);
    }
  };

  useEffect(() => {
    if (selectedPlaces.length > 0 && !estimatedBudget) {
      setEstimatedBudget(calculateBudget());
      setBudgetNeedsUpdate(false);
    } else if (selectedPlaces.length === 0) {
      setEstimatedBudget(null);
      setBudgetNeedsUpdate(false);
    }
  }, [selectedPlaces.length]);

  const handleQuickAddNearby = (radius = 2000) => {
    if (availablePlaces.length === 0) return;
    
    const nearby = availablePlaces
      .filter(p => p.distance && p.distance <= radius / 1000)
      .slice(0, 5);
    
    const newPlaces = nearby.filter(
      p => !selectedPlaces.find(sp => sp._id === p._id)
    );
    
    if (newPlaces.length > 0) {
      setSelectedPlaces([...selectedPlaces, ...newPlaces]);
      setBudgetNeedsUpdate(true);
      alert(`Added ${newPlaces.length} nearby places to your route!`);
    } else {
      alert('All nearby places are already in your route');
    }
  };

  const handleOptimize = async () => {
    if (!isAuthenticated) {
      alert('Please login to optimize routes');
      return;
    }

    if (!selectedPlaces || selectedPlaces.length === 0) {
      alert('Select some places before optimizing');
      return;
    }

    try {
      setOptimizing(true);
      const placeIds = selectedPlaces.map(p => p._id);
      const response = await routesAPI.optimize(placeIds, location);

      if (response && response.success && response.data) {
        setOptimizationResult(response.data);
        setShowOptimizeModal(true);
      } else {
        alert('Optimization failed. Please try again.');
      }
    } catch (error) {
      console.error('Optimize error:', error);
      alert('Failed to optimize route');
    } finally {
      setOptimizing(false);
    }
  };

  const applyOptimizedPlaces = () => {
    if (!optimizationResult?.optimized?.places) return;

    const optimizedPlaces = optimizationResult.optimized.places.map(p => {
      const placeData = p.placeData || {};
      return {
        ...placeData,
        distanceFromPrevious: p.distanceFromPrevious,
        estimatedTime: p.estimatedTime,
        order: p.order,
      };
    });

    setSelectedPlaces(optimizedPlaces);
    setShowOptimizeModal(false);
    setOptimizationResult(null);
    setBudgetNeedsUpdate(true);
  };

  const handleConfirmSave = async () => {
    if (!routeName.trim()) {
      alert('Please enter a route name');
      return;
    }

    try {
      const routeData = {
        name: routeName,
        description: routeDescription,
        isPublic: false, 
        places: selectedPlaces.map((place, index) => ({
          place: place._id,
          order: index + 1,
          distanceFromPrevious: place.distanceFromPrevious || 0,
          estimatedTime: place.estimatedTime || 0,
        })),
        startLocation: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
          address: 'Current Location',
        },
      };

      const response = await routesAPI.create(routeData);

      if (response.success) {
        alert('✅ Route saved successfully!');
        setShowSaveModal(false);
        setRouteName('');
        setRouteDescription('');
        localStorage.removeItem(STORAGE_KEY); 
        navigate('/my-routes');
      }
    } catch (error) {
      console.error('Save route error:', error);
      alert('Failed to save route');
    }
  };

  const handleAIRouteSelect = (places) => {
    setSelectedPlaces(places);
    setViewMode('builder');
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem(STORAGE_KEY); 
    window.location.href = "/";
  };

  const filteredPlaces = availablePlaces.filter(
    (place) =>
      !selectedPlaces.find((p) => p._id === place._id) &&
      (place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const paginatedHotels = hotels.slice(hotelPage * hotelsPerPage, (hotelPage + 1) * hotelsPerPage);
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  if (!hasLocation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#021E1B] via-[#033830] to-[#021E1B] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-w-md w-full text-center p-8"
        >
          <MapPin className="w-16 h-16 text-[#FF8C42] mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-white mb-4">
            Enable Location
          </h1>
          <p className="text-white/70 mb-6">
            We need your location to help plan your trip
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={requestLocation} 
            className="w-full px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Enable Location
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021E1B] via-[#033830] to-[#021E1B]">
      {}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full h-[70px] backdrop-blur-md bg-[#021E1B]/90 border-b border-white/10 z-50 flex items-center justify-between px-4 md:px-12 transition-all duration-300"
        style={{
          boxShadow: scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        <Link to="/" className="flex items-center space-x-2 group z-50">
          <motion.div 
            className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full overflow-hidden bg-black flex items-center justify-center shadow-lg border border-white/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={logo} alt="Bharat Yatra Logo" className="w-full h-full object-cover" />
          </motion.div>
          <span className="text-xl md:text-2xl font-serif italic font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] tracking-wide group-hover:text-[#FF8C42] transition-colors">
            Bharat Yatra
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[15px] lg:text-[16px] font-medium text-white">
          <Link to="/" className="hover:text-[#FF8C42] transition relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/explore" className="hover:text-[#FF8C42] transition relative group">
            Explore
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/plan-trip" className="text-[#FF8C42] relative group">
            Plan Trip
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF8C42]"></span>
          </Link>
          <Link to="/my-journal" className="hover:text-[#FF8C42] transition relative group">
            Journal
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/my-routes" className="hover:text-[#FF8C42] transition relative group">
            Routes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <div className="flex rounded-xl p-1 bg-white/10 backdrop-blur-sm">
            <motion.button
              onClick={() => setViewMode('builder')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'builder'
                  ? 'bg-[#FF8C42] text-white'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <List className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('map')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'map'
                  ? 'bg-[#FF8C42] text-white'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <MapIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src="https://static.vecteezy.com/system/resources/thumbnails/050/086/393/small/orange-man-profile-icon-png.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-[#FF8C42] shadow-lg"
                />
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 transition">Profile</Link>
                <Link to="/my-routes" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 transition">My Routes</Link>
                <Link to="/my-journal" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 transition">My Journal</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-200 transition">Logout</button>
              </div>
            </div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="px-4 lg:px-5 py-2 text-sm font-semibold border-2 border-[#FF8C42] text-[#FF8C42] rounded-xl hover:bg-[#FF8C42] hover:text-white shadow-md transition">
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="px-4 lg:px-5 py-2 text-sm font-semibold bg-[#FF8C42] text-white rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition">
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden z-50 text-white p-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-[#021E1B] z-40 md:hidden pt-[70px] overflow-y-auto"
          >
            <div className="flex flex-col min-h-[calc(100vh-70px)] px-6 py-8">
              <div className="flex flex-col space-y-6 text-white text-lg font-medium">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Home</Link>
                <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Explore</Link>
                <Link to="/plan-trip" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FF8C42] py-2 border-b border-white/10">Plan Trip</Link>
                <Link to="/my-journal" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Journal</Link>
                <Link to="/my-routes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Routes</Link>

                <div className="py-2 border-b border-white/10">
                  <p className="text-sm text-white/60 mb-3">View Mode</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setViewMode("builder"); setIsMobileMenuOpen(false); }}
                      className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        viewMode === "builder" ? "bg-[#FF8C42] text-white" : "bg-white/10 text-white"
                      }`}
                    >
                      <List className="w-5 h-5" />
                      <span>Builder</span>
                    </button>
                    <button
                      onClick={() => { setViewMode("map"); setIsMobileMenuOpen(false); }}
                      className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        viewMode === "map" ? "bg-[#FF8C42] text-white" : "bg-white/10 text-white"
                      }`}
                    >
                      <MapIcon className="w-5 h-5" />
                      <span>Map</span>
                    </button>
                  </div>
                </div>

                {isAuthenticated && (
                  <Link 
                    to="/profile" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="hover:text-[#FF8C42] transition py-2 border-b border-white/10"
                  >
                    Profile
                  </Link>
                )}
              </div>

              <div className="mt-auto pt-8 flex flex-col space-y-4">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3 bg-white/10 rounded-xl">
                      <p className="font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-white/70">{user?.email}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full py-3 text-center font-semibold bg-red-500 text-white rounded-xl hover:brightness-110 transition">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center font-semibold border-2 border-[#FF8C42] text-[#FF8C42] rounded-xl hover:bg-[#FF8C42] hover:text-white transition">
                      Login
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center font-semibold bg-[#FF8C42] text-white rounded-xl hover:brightness-110 transition">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <div className="pt-[70px] min-h-screen">
        {}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link to="/explore" className="text-white hover:text-[#FF8C42] transition">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg"
              >
                Plan Your Journey
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/80 text-sm md:text-base"
              >
                Select places and optimize your perfect route
              </motion.p>
            </div>
          </div>

          {}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C42]" />
                <span className="text-white/70 text-xs md:text-sm">Places</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">{selectedPlaces.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C42]" />
                <span className="text-white/70 text-xs md:text-sm">Distance</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">{totalDistance.toFixed(1)}<span className="text-lg ml-1">km</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C42]" />
                <span className="text-white/70 text-xs md:text-sm">Duration</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">{totalDuration}<span className="text-lg ml-1">min</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C42]" />
                <span className="text-white/70 text-xs md:text-sm">Status</span>
              </div>
              <p className="text-lg md:text-xl font-bold text-white">{selectedPlaces.length > 0 ? 'Active' : 'Empty'}</p>
            </div>
          </motion.div>

          {}
          {estimatedBudget && showQuickStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mt-4 backdrop-blur-md rounded-xl p-4 border shadow-lg relative ${
                budgetNeedsUpdate 
                  ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/40' 
                  : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30'
              }`}
            >
              <button
                onClick={() => setShowQuickStats(false)}
                className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
              
              {budgetNeedsUpdate && (
                <div className="mb-3 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="text-xs text-yellow-200">Route changed! Budget needs recalculation</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">Estimated Budget</h3>
                  <p className="text-xs text-white/70">For {estimatedBudget.days} day trip ({estimatedBudget.nights} nights)</p>
                </div>
                {budgetNeedsUpdate && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRecalculateBudget}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-lg text-xs font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Recalculate
                  </motion.button>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-xs text-white/70">Fuel</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(estimatedBudget.fuel)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-xs text-white/70">Stay</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(estimatedBudget.accommodation)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-xs text-white/70">Food</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(estimatedBudget.food)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-xs text-white/70">Tolls</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(estimatedBudget.toll)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-xs text-white/70">Misc</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(estimatedBudget.miscellaneous)}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-3 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Total Estimated Cost</span>
                  <span className="text-2xl font-bold text-green-400">{formatCurrency(estimatedBudget.total)}</span>
                </div>
                <p className="text-xs text-white/60 mt-1">*Approximate values, actual costs may vary</p>
              </div>
            </motion.div>
          )}

          {}
          {selectedPlaces.length < 5 && availablePlaces.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg"
            >
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF8C42]" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickAddNearby(2000)}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Nearby (2km)
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickAddNearby(5000)}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Nearby (5km)
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowQuickStats(!showQuickStats)}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  {showQuickStats ? 'Hide' : 'Show'} Budget
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block lg:col-span-1"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-6 border-b border-white/20 bg-white/5">
                  <h3 className="font-serif font-bold text-xl text-white mb-4">Available Places</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    {searchLoading && (
                      <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF8C42] animate-spin" />
                    )}
                    <input
                      type="text"
                      placeholder="Search places..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="p-4 h-[calc(100vh-400px)] overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader className="w-8 h-8 text-[#FF8C42] animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPlaces.map((place, idx) => (
                        <motion.div
                          key={place._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          className="relative group"
                        >
                          <div
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer border border-white/20 shadow-lg hover:shadow-2xl"
                            onClick={() => handleAddPlace(place)}
                          >
                            <div className="flex items-start space-x-3">
                              {place.images?.[0]?.url && (
                                <img
                                  src={place.images[0].url}
                                  alt={place.name}
                                  className="w-16 h-16 object-cover rounded-lg shadow-md"
                                  onError={(e) => (e.target.style.display = 'none')}
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white truncate">{place.name}</h4>
                                <p className="text-sm text-white/70 truncate">{place.location.city}</p>
                                {place.distance && (
                                  <p className="text-sm text-[#FF8C42] font-semibold mt-1">
                                    {place.distance.toFixed(1)} km away
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleAddPlace(place)}
                            className="absolute top-2 right-2 p-2 bg-[#FF8C42] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                {viewMode === 'builder' ? (
                  <div className="h-full overflow-y-auto p-4 md:p-6">
                    <RouteBuilder
                      selectedPlaces={selectedPlaces}
                      onRemovePlace={handleRemovePlace}
                      onReorderPlaces={handleReorderPlaces}
                      onOptimize={handleOptimize}
                      onSaveRoute={handleSaveRoute}
                      onClearAll={handleClearAllPlaces}
                      userLocation={location}
                      optimizing={optimizing}
                    />
                  </div>
                ) : (
                  <div className="h-[600px] md:h-[700px] w-full">
                    <RouteMap
                      places={selectedPlaces}
                      userLocation={location}
                      showRoute={true}
                      onPlaceClick={(place) => {
                        console.log('Place clicked:', place);
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowMobilePlaces(true)}
        className="lg:hidden fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-[#FF8C42] to-[#ff6b1f] text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <Plus className="w-8 h-8" />
      </motion.button>

      {}
      <AnimatePresence>
        {showMobilePlaces && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobilePlaces(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#021E1B] rounded-t-3xl shadow-2xl z-50 max-h-[80vh] flex flex-col border-t-2 border-[#FF8C42]"
            >
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-xl text-white">Add Places</h3>
                  <button onClick={() => setShowMobilePlaces(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  {searchLoading && (
                    <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF8C42] animate-spin" />
                  )}
                  <input
                    type="text"
                    placeholder="Search places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader className="w-8 h-8 text-[#FF8C42] animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredPlaces.map((place, idx) => (
                      <motion.div
                        key={place._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg active:shadow-xl"
                        onClick={() => handleAddPlace(place)}
                      >
                        <div className="flex items-start space-x-3">
                          {place.images?.[0]?.url && (
                            <img
                              src={place.images[0].url}
                              alt={place.name}
                              className="w-16 h-16 object-cover rounded-lg shadow-md"
                              onError={(e) => (e.target.style.display = 'none')}
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white">{place.name}</h4>
                            <p className="text-sm text-white/70">{place.location.city}</p>
                            {place.distance && (
                              <p className="text-sm text-[#FF8C42] font-semibold mt-1">
                                {place.distance.toFixed(1)} km away
                              </p>
                            )}
                          </div>
                          <Plus className="w-6 h-6 text-[#FF8C42] flex-shrink-0" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {showHotelModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            >
              <div className="bg-gradient-to-br from-[#021E1B] to-[#033830] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] border-2 border-[#FF8C42]/50 pointer-events-auto flex flex-col">
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#FF8C42] rounded-lg">
                        <Hotel className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                          Find Hotels Near Your Route
                        </h3>
                        <p className="text-sm text-white/70">
                          Book accommodation for your journey
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowHotelModal(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  {availableCities.length > 0 && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-semibold text-white whitespace-nowrap">
                        Select City:
                      </label>
                      <select
                        value={selectedCity}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="flex-1 px-4 py-2 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:border-[#FF8C42] focus:outline-none"
                      >
                        {availableCities.map((city, index) => (
                          <option key={index} value={city} className="bg-[#021E1B]">
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {loadingHotels ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Hotel className="w-16 h-16 text-[#FF8C42] mb-4" />
                      </motion.div>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <p className="text-white/70 text-lg mb-2">Finding best hotels for you...</p>
                        <p className="text-white/50 text-sm">Searching in {selectedCity}</p>
                      </motion.div>
                      
                      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 rounded-xl p-4 border border-white/10"
                          >
                            <div className="animate-pulse space-y-3">
                              <div className="h-4 bg-white/10 rounded w-3/4"></div>
                              <div className="h-3 bg-white/10 rounded w-1/2"></div>
                              <div className="h-8 bg-white/10 rounded"></div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : hotelError ? (
                    <div className="text-center py-20">
                      <div className="inline-block p-4 bg-red-500/20 rounded-full mb-4">
                        <X className="w-12 h-12 text-red-400" />
                      </div>
                      <p className="text-white/70 text-lg">{hotelError}</p>
                    </div>
                  ) : hotels.length === 0 ? (
                    <div className="text-center py-20">
                      <Hotel className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <p className="text-white/70 text-lg">No hotels found</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedHotels.map((hotel, index) => (
                          <motion.div
                            key={hotel.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-2xl transition-all"
                          >
                            <div className="flex items-start gap-2 mb-3">
                              <Hotel className="w-5 h-5 text-[#FF8C42] flex-shrink-0 mt-1" />
                              <h4 className="font-semibold text-white text-base leading-tight">
                                {hotel.name}
                              </h4>
                            </div>
                            
                            <p className="text-sm text-white/60 mb-2 line-clamp-2">
                              {hotel.address}
                            </p>

                            <div className="space-y-1 mb-3">
                              {hotel.phone !== 'N/A' && (
                                <p className="text-xs text-white/50">📞 {hotel.phone}</p>
                              )}
                              {hotel.stars !== 'N/A' && (
                                <p className="text-xs text-yellow-400">⭐ {hotel.stars} Stars</p>
                              )}
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSelectHotel(hotel)}
                              className="w-full py-2.5 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Details
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>

                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-3 mt-6">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setHotelPage(Math.max(0, hotelPage - 1))}
                            disabled={hotelPage === 0}
                            className={`p-2 rounded-lg transition-colors ${
                              hotelPage === 0
                                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </motion.button>

                          <span className="text-white font-medium">
                            Page {hotelPage + 1} of {totalPages}
                          </span>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setHotelPage(Math.min(totalPages - 1, hotelPage + 1))}
                            disabled={hotelPage === totalPages - 1}
                            className={`p-2 rounded-lg transition-colors ${
                              hotelPage === totalPages - 1
                                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="p-4 border-t border-white/20 bg-white/5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={hotelBookingComplete ? handleAfterHotelBooking : handleContinueWithoutBooking}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all border border-white/20"
                  >
                    {hotelBookingComplete ? 'Continue to Save Route' : 'Continue Without Booking'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {showOptimizeModal && optimizationResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptimizeModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            >
              <div className="bg-gradient-to-br from-[#021E1B] to-[#033830] rounded-2xl shadow-2xl max-w-lg w-full border-2 border-[#FF8C42]/50 pointer-events-auto">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                        Route Optimized!
                      </h3>
                      <p className="text-sm text-white/70">
                        Choose the best route for your journey
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
                    >
                      <h4 className="text-sm font-semibold text-white/70 mb-2">Original Route</h4>
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-white">
                          {optimizationResult.original?.metrics?.totalDistance ?? '—'} km
                        </p>
                        <p className="text-sm text-white/70">
                          {optimizationResult.original?.metrics?.totalDuration ?? '—'} min
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-br from-[#FF8C42]/20 to-[#ff6b1f]/20 backdrop-blur-sm rounded-xl border-2 border-[#FF8C42] shadow-lg"
                    >
                      <h4 className="text-sm font-semibold text-[#FF8C42] mb-2">Optimized Route</h4>
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-white">
                          {optimizationResult.optimized?.metrics?.totalDistance ?? '—'} km
                        </p>
                        <p className="text-sm text-white/70">
                          {optimizationResult.optimized?.metrics?.totalDuration ?? '—'} min
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {optimizationResult.savings && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="font-semibold text-green-400">You'll Save:</span>
                      </div>
                      <div className="text-white space-y-1">
                        <p className="text-lg font-bold">
                          {optimizationResult.savings.distance ?? 0} km • {optimizationResult.savings.time ?? 0} min
                        </p>
                        <p className="text-sm text-white/70">
                          ({optimizationResult.savings.percentage ?? 0}% improvement)
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-col md:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowOptimizeModal(false);
                        setOptimizationResult(null);
                      }}
                      className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20 font-medium shadow-lg"
                    >
                      Keep Original
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={applyOptimizedPlaces}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Use Optimized
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {showSaveModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSaveModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            >
              <div className="bg-gradient-to-br from-[#021E1B] to-[#033830] rounded-2xl shadow-2xl max-w-md w-full border-2 border-[#FF8C42]/50 pointer-events-auto">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-[#FF8C42] rounded-xl shadow-lg">
                      <Save className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                        Save Your Route
                      </h3>
                      <p className="text-sm text-white/70">
                        Give your route a name
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Route Name *
                      </label>
                      <input
                        type="text"
                        value={routeName}
                        onChange={(e) => setRouteName(e.target.value)}
                        placeholder="e.g., North India Heritage Tour"
                        className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Description (optional)
                      </label>
                      <textarea
                        value={routeDescription}
                        onChange={(e) => setRouteDescription(e.target.value)}
                        placeholder="Add notes about your trip..."
                        rows={3}
                        className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50 backdrop-blur-sm resize-none"
                      />
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowSaveModal(false)}
                        className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20 font-medium shadow-lg"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleConfirmSave}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                      >
                        Save Route
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {}
      <AIChatbot onRouteSelect={handleAIRouteSelect} />
    </div>
  );
};

export default PlanTrip;