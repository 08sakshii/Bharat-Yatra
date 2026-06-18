import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "../context/LocationContext";
import { useAuth } from "../context/AuthContext";
import { placesAPI } from "../services/api";
import MapWrapper from "../components/map/mapWrapper";
import logo from "../assets/images/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import PlacesList from "../components/places/PlacesList";
import LocationPermission from "../components/common/LocationPermission";
import {
  Map,
  List,
  Navigation,
  Loader,
  AlertCircle,
  Menu,
  X,
  MapPin,
  TrendingUp,
  Clock,
} from "lucide-react";

const Explore = () => {
  const {
    location,
    loading: locationLoading,
    requestLocation,
    updateLocation,
    hasLocation,
    needsPermission,
  } = useLocation();

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("map");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (location) fetchNearbyPlaces(5000);
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) fetchSavedPlaces();
  }, [isAuthenticated]);

  const fetchNearbyPlaces = async (radius = 5000, category = null) => {
    if (!location) return;
    setLoading(true);
    setError(null);
    try {
      const response = await placesAPI.getNearby(
        location.lat,
        location.lng,
        radius,
        category,
      );
      if (response.success) {
        setPlaces(response.data);
        setError(null);
      } else {
        setPlaces([]);
      }
    } catch (err) {
      console.error("fetchNearbyPlaces error:", err);
      // Don't show error if places already loaded
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedPlaces = async () => {
    try {
      const response = await placesAPI.getSavedPlaces();
      if (response.success)
        setSavedPlaces(response.data.map((place) => place._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePlace = async (place) => {
    if (!isAuthenticated) {
      alert("Please login to save places");
      navigate("/login");
      return;
    }
    try {
      const response = await placesAPI.toggleSave(place._id);
      if (response.success) {
        if (response.isSaved) setSavedPlaces([...savedPlaces, place._id]);
        else setSavedPlaces(savedPlaces.filter((id) => id !== place._id));
      }
    } catch (err) {
      alert("Failed to save place");
    }
  };

  const handleViewDetails = (place) => {
    setSelectedPlace(place);
  };

  const handleAddToRoute = (place) => {
    navigate("/plan-trip", { state: { selectedPlace: place } });
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const handleLocationGranted = async (locationData) => {
    await updateLocation(locationData);
  };

  const handleManualLocation = async (locationData, displayName) => {
    await updateLocation(locationData, displayName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021E1B] via-[#033830] to-[#021E1B] text-white overflow-x-hidden">
      {}
      {needsPermission && !hasLocation && (
        <LocationPermission
          onLocationGranted={handleLocationGranted}
          onManualLocation={handleManualLocation}
        />
      )}

      {}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full h-[70px] backdrop-blur-md bg-[#021E1B]/90 border-b border-white/10 z-50 flex items-center justify-between px-4 md:px-12 transition-all duration-300"
        style={{
          boxShadow: scrollY > 50 ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
        }}>
        {}
        <Link to="/" className="flex items-center space-x-2 group z-50">
          <motion.div
            className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full overflow-hidden bg-black flex items-center justify-center shadow-lg border border-white/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}>
            <img
              src={logo}
              alt="Bharat Yatra Logo"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <span className="text-xl md:text-2xl font-serif italic font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] tracking-wide group-hover:text-[#FF8C42] transition-colors">
            Bharat Yatra
          </span>
        </Link>

        {}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[15px] lg:text-[16px] font-medium text-white">
          <Link
            to="/"
            className="hover:text-[#FF8C42] transition relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/explore" className="text-[#FF8C42] relative group">
            Explore
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF8C42]"></span>
          </Link>
          <Link
            to="/plan-trip"
            className="hover:text-[#FF8C42] transition relative group">
            Plan Trip
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/my-journal"
            className="hover:text-[#FF8C42] transition relative group">
            Journal
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/my-routes"
            className="hover:text-[#FF8C42] transition relative group">
            Routes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>

          {}
          {hasLocation && (
            <div className="flex rounded-xl p-1 bg-white/10 backdrop-blur-sm">
              <motion.button
                onClick={() => setViewMode("map")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  viewMode === "map"
                    ? "bg-[#FF8C42] text-white"
                    : "text-white hover:bg-white/20"
                }`}>
                <Map className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode("list")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-[#FF8C42] text-white"
                    : "text-white hover:bg-white/20"
                }`}>
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>

        {}
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
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-50 text-gray-700 transition">
                  Profile
                </Link>
                <Link
                  to="/my-routes"
                  className="block px-4 py-2 hover:bg-gray-50 text-gray-700 transition">
                  My Routes
                </Link>
                <Link
                  to="/my-journal"
                  className="block px-4 py-2 hover:bg-gray-50 text-gray-700 transition">
                  My Journal
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-200 transition">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="px-4 lg:px-5 py-2 text-sm font-semibold border-2 border-[#FF8C42] text-[#FF8C42] rounded-xl hover:bg-[#FF8C42] hover:text-white shadow-md transition">
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="px-4 lg:px-5 py-2 text-sm font-semibold bg-[#FF8C42] text-white rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition">
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-50 text-white p-2">
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </motion.nav>

      {}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-[#021E1B] z-40 md:hidden pt-[70px] overflow-y-auto">
            <div className="flex flex-col min-h-[calc(100vh-70px)] px-6 py-8">
              <div className="flex flex-col space-y-6 text-white text-lg font-medium">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">
                  Home
                </Link>
                <Link
                  to="/explore"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#FF8C42] py-2 border-b border-white/10">
                  Explore
                </Link>
                <Link
                  to="/plan-trip"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">
                  Plan Trip
                </Link>
                <Link
                  to="/my-journal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">
                  Journal
                </Link>
                <Link
                  to="/my-routes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">
                  Routes
                </Link>

                {}
                {hasLocation && (
                  <div className="py-2 border-b border-white/10">
                    <p className="text-sm text-white/60 mb-3">View Mode</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setViewMode("map");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                          viewMode === "map"
                            ? "bg-[#FF8C42] text-white"
                            : "bg-white/10 text-white"
                        }`}>
                        <Map className="w-5 h-5 mx-auto" />
                      </button>
                      <button
                        onClick={() => {
                          setViewMode("list");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                          viewMode === "list"
                            ? "bg-[#FF8C42] text-white"
                            : "bg-white/10 text-white"
                        }`}>
                        <List className="w-5 h-5 mx-auto" />
                      </button>
                    </div>
                  </div>
                )}

                {}
                {isAuthenticated && (
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">
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
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 text-center font-semibold bg-red-500 text-white rounded-xl hover:brightness-110 transition">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3 text-center font-semibold border-2 border-[#FF8C42] text-[#FF8C42] rounded-xl hover:bg-[#FF8C42] hover:text-white transition">
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3 text-center font-semibold bg-[#FF8C42] text-white rounded-xl hover:brightness-110 transition">
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
      {hasLocation && (
        <div className="pt-[70px] min-h-screen">
          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="mb-6">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg mb-2">
                Explore Places
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/80 text-sm md:text-base">
                Discover amazing destinations around you
              </motion.p>
            </div>

            {}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C42]" />
                  <span className="text-white/70 text-xs md:text-sm">
                    Places Found
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {places.length}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C42]" />
                  <span className="text-white/70 text-xs md:text-sm">
                    View Mode
                  </span>
                </div>
                <p className="text-lg md:text-xl font-bold text-white capitalize">
                  {viewMode}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C42]" />
                  <span className="text-white/70 text-xs md:text-sm">
                    Saved
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {savedPlaces.length}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C42]" />
                  <span className="text-white/70 text-xs md:text-sm">
                    Status
                  </span>
                </div>
                <p className="text-lg md:text-xl font-bold text-white">
                  {loading ? "Loading" : "Ready"}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border-l-4 border-red-500 p-3 md:p-4 mb-4 md:mb-6 rounded-lg shadow-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                  <p className="text-red-200 text-sm md:text-base">{error}</p>
                </div>
              </motion.div>
            )}

            {}
            {viewMode === "map" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="h-[calc(100vh-300px)] md:h-[calc(100vh-300px)] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                style={{ position: "relative" }}>
                <style>{`
                  .leaflet-control-attribution {
                    display: none !important;
                  }
                `}</style>
                <MapWrapper
                  center={location ? [location.lat, location.lng] : undefined}
                  zoom={12}
                  places={places}
                  userLocation={location}
                  onPlaceClick={handleViewDetails}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}>
                <PlacesList
                  places={places}
                  loading={loading}
                  onViewDetails={handleViewDetails}
                  onSave={handleSavePlace}
                  savedPlaces={savedPlaces}
                  onFilterChange={(filters) => {
                    fetchNearbyPlaces(
                      filters.distance || 5000,
                      filters.category,
                    );
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      )}

      {}
      {(loading || locationLoading) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-[#021E1B] to-[#033830] rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
            <Loader className="w-10 h-10 md:w-12 md:h-12 text-[#FF8C42] animate-spin mx-auto mb-4" />
            <p className="text-white font-semibold text-sm md:text-base text-center">
              {locationLoading
                ? "Getting your location..."
                : "Loading places..."}
            </p>
          </motion.div>
        </motion.div>
      )}

      {}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-3 md:p-4"
            onClick={() => setSelectedPlace(null)}>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#021E1B] to-[#033830] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#FF8C42]/50">
              {selectedPlace.images?.[0]?.url && (
                <div className="relative h-48 md:h-64 rounded-t-2xl overflow-hidden">
                  <img
                    src={selectedPlace.images[0].url}
                    alt={selectedPlace.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h2 className="absolute bottom-3 md:bottom-4 left-4 md:left-6 text-2xl md:text-3xl font-bold text-white pr-4 drop-shadow-lg">
                    {selectedPlace.name}
                  </h2>
                </div>
              )}

              <div className="p-4 md:p-6">
                {!selectedPlace.images?.[0]?.url && (
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                    {selectedPlace.name}
                  </h2>
                )}

                <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                  {selectedPlace.description}
                </p>

                <div className="inline-block px-3 py-1 bg-[#FF8C42]/20 text-[#FF8C42] rounded-full text-xs md:text-sm font-semibold mb-4 border border-[#FF8C42]/30">
                  {selectedPlace.category}
                </div>

                {}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {selectedPlace.details?.bestTimeToVisit && (
                    <div className="flex items-start space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <span className="text-xl md:text-2xl">🌤️</span>
                      <div>
                        <p className="text-xs md:text-sm text-white/60 font-medium">
                          Best Time
                        </p>
                        <p className="font-semibold text-sm md:text-base text-white">
                          {selectedPlace.details.bestTimeToVisit}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedPlace.details?.timings?.opening && (
                    <div className="flex items-start space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <span className="text-xl md:text-2xl">🕐</span>
                      <div>
                        <p className="text-xs md:text-sm text-white/60 font-medium">
                          Timings
                        </p>
                        <p className="font-semibold text-sm md:text-base text-white">
                          {selectedPlace.details.timings.opening} -{" "}
                          {selectedPlace.details.timings.closing}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedPlace.details?.entryFee?.indian && (
                    <div className="flex items-start space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <span className="text-xl md:text-2xl">🎫</span>
                      <div>
                        <p className="text-xs md:text-sm text-white/60 font-medium">
                          Entry Fee
                        </p>
                        <p className="font-semibold text-sm md:text-base text-white">
                          {selectedPlace.details.entryFee.indian}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedPlace.details?.duration && (
                    <div className="flex items-start space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <span className="text-xl md:text-2xl">⏱️</span>
                      <div>
                        <p className="text-xs md:text-sm text-white/60 font-medium">
                          Duration
                        </p>
                        <p className="font-semibold text-sm md:text-base text-white">
                          {selectedPlace.details.duration}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToRoute(selectedPlace)}
                    className="flex-1 px-4 md:px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition text-sm md:text-base">
                    Add to Route
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlace(null)}
                    className="px-4 md:px-6 py-3 bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white rounded-xl font-semibold transition text-sm md:text-base">
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Explore;
