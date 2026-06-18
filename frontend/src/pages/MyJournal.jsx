

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notebookAPI, placesAPI, routesAPI } from '../services/api';
import EntryCard from '../components/notebook/EntryCard';
import EntryForm from '../components/notebook/EntryForm';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';
import { 
  ArrowLeft, BookOpen, Plus, Search, Filter, Heart, 
  Calendar, Loader, TrendingUp, MapPin, Route as RouteIcon, Home, Menu, X,
  Lock, Globe, Sparkles
} from 'lucide-react';
import { MOOD_OPTIONS } from '../utils/constants';

const MyJournal = () => {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  
  const STORAGE_KEY = 'bharatYatra_journalState';
  const STORAGE_EXPIRY = 20 * 60 * 1000; 

  
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { data, timestamp } = JSON.parse(stored);
        const now = Date.now();
        
        
        if (now - timestamp < STORAGE_EXPIRY) {
          console.log('✅ Loaded journal state from localStorage');
          return data;
        } else {
          console.log('⏰ localStorage data expired, clearing...');
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('❌ Error loading from localStorage:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
    return null;
  };

  const savedState = loadFromStorage();

  
  const [entries, setEntries] = useState(savedState?.entries || []);
  const [publicEntries, setPublicEntries] = useState(savedState?.publicEntries || []);
  const [places, setPlaces] = useState(savedState?.places || []);
  const [routes, setRoutes] = useState(savedState?.routes || []);
  const [loading, setLoading] = useState(!savedState);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchQuery, setSearchQuery] = useState(savedState?.searchQuery || '');
  const [filterMood, setFilterMood] = useState(savedState?.filterMood || '');
  const [filterPrivacy, setFilterPrivacy] = useState(savedState?.filterPrivacy || 'all');
  const [sortBy, setSortBy] = useState(savedState?.sortBy || '-createdAt');
  const [stats, setStats] = useState(savedState?.stats || null);
  const [showFilters, setShowFilters] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(savedState?.activeTab || 'my-journal');

  
  useEffect(() => {
    if (isAuthenticated) {
      const stateToSave = {
        entries,
        publicEntries,
        places,
        routes,
        stats,
        searchQuery,
        filterMood,
        filterPrivacy,
        sortBy,
        activeTab
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          data: stateToSave,
          timestamp: Date.now()
        }));
        console.log('💾 Saved journal state to localStorage');
      } catch (error) {
        console.error('❌ Error saving to localStorage:', error);
      }
    }
  }, [entries, publicEntries, places, routes, stats, searchQuery, filterMood, filterPrivacy, sortBy, activeTab, isAuthenticated]);

  
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem(STORAGE_KEY);
      console.log('🔒 Cleared localStorage on logout');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (routerLocation.state?.prefillRoute) {
      setShowForm(true);
    }
  }, [routerLocation.state]);

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
    if (isAuthenticated) {
      
      if (!savedState) {
        fetchEntries();
        fetchPlaces();
        fetchRoutes();
        fetchStats();
      }
    }
    if (!savedState || activeTab === 'public-feed') {
      fetchPublicEntries();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'my-journal') {
      fetchEntries();
    } else if (activeTab === 'public-feed') {
      fetchPublicEntries();
    }
  }, [filterPrivacy, sortBy, searchQuery, filterMood, activeTab]);

  const fetchEntries = async (filters = {}) => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        search: searchQuery || undefined,
        mood: filterMood || undefined,
        visibility: filterPrivacy !== 'all' ? filterPrivacy : undefined,
        sortBy: sortBy
      };
      
      const response = await notebookAPI.getAll(params);
      if (response.success) {
        setEntries(response.data);
      }
    } catch (error) {
      console.error('Fetch entries error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem(STORAGE_KEY);
    await logout();
    window.location.href = "/";
  };
  
  const fetchPublicEntries = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery || undefined,
        mood: filterMood || undefined,
        sortBy: sortBy
      };
      
      const response = await notebookAPI.getPublicFeed(params);
      if (response.success) {
        setPublicEntries(response.data);
      }
    } catch (error) {
      console.error('Fetch public entries error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaces = async () => {
    try {
      const response = await placesAPI.getSavedPlaces();
      if (response.success) {
        setPlaces(response.data);
      }
    } catch (error) {
      console.error('Fetch places error:', error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await routesAPI.getAll();
      if (response.success) {
        setRoutes(response.data);
      }
    } catch (error) {
      console.error('Fetch routes error:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await notebookAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  const handleCreateEntry = async (formData) => {
    try {
      const response = editingEntry
        ? await notebookAPI.update(editingEntry._id, formData)
        : await notebookAPI.create(formData);
      
      if (response.success) {
        await fetchEntries();
        await fetchStats();
        setShowForm(false);
        setEditingEntry(null);
      }
    } catch (error) {
      console.error('Create/Update entry error:', error);
      alert('Failed to save entry');
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
    setSelectedEntry(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      await notebookAPI.delete(id);
      setEntries(entries.filter(e => e._id !== id));
      await fetchStats();
    } catch (error) {
      console.error('Delete entry error:', error);
      alert('Failed to delete entry');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const response = await notebookAPI.toggleFavorite(id);
      if (response.success) {
        setEntries(entries.map(e => 
          e._id === id ? { ...e, isFavorite: response.isFavorite } : e
        ));
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
    }
  };

  const handleView = (entry) => {
    setSelectedEntry(entry);
  };

  const handleSearch = () => {
    if (activeTab === 'my-journal') {
      fetchEntries();
    } else {
      fetchPublicEntries();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#021E1B] via-[#033830] to-[#021E1B] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <BookOpen className="w-20 h-20 text-[#FF8C42] mx-auto mb-6 drop-shadow-[0_0_20px_rgba(255,140,66,0.5)]" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Login Required
          </h1>
          <p className="text-white/70 mb-8 text-lg">
            Please login to access your travel journal and start documenting your adventures! ✨
          </p>
          <Link to="/login" className="px-8 py-4 bg-gradient-to-r from-[#FF8C42] to-[#FF9F5F] text-white rounded-xl font-semibold shadow-[0_8px_20px_rgba(255,140,66,0.4)] hover:shadow-[0_12px_30px_rgba(255,140,66,0.5)] transition-all inline-block">
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021E1B] via-[#033830] to-[#021E1B] text-white overflow-x-hidden">
      {}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full h-[70px] backdrop-blur-xl bg-[#021E1B]/95 border-b border-white/10 z-50 flex items-center justify-between px-4 md:px-12 transition-all duration-300"
        style={{
          boxShadow: scrollY > 50 ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          background: scrollY > 50 ? 'rgba(2, 30, 27, 0.98)' : 'rgba(2, 30, 27, 0.95)'
        }}
      >
        <Link to="/" className="flex items-center space-x-2 group z-50">
          <motion.div 
            className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full overflow-hidden bg-black flex items-center justify-center shadow-lg border border-white/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
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

        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[15px] lg:text-[16px] font-medium text-white">
          <Link to="/" className="hover:text-[#FF8C42] transition relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/explore" className="hover:text-[#FF8C42] transition relative group">
            Explore
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/plan-trip" className="hover:text-[#FF8C42] transition relative group">
            Plan Trip
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/my-journal" className="text-[#FF8C42] relative group">
            Journal
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF8C42]"></span>
          </Link>
          <Link to="/my-routes" className="hover:text-[#FF8C42] transition relative group">
            Routes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
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
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-200 transition">
                  Logout
                </button>
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

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-50 text-white p-2"
        >
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
            className="fixed inset-0 bg-[#021E1B] z-40 md:hidden pt-[70px]"
          >
            <div className="flex flex-col h-full px-6 py-8">
              <div className="flex flex-col space-y-6 text-white text-lg font-medium">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Home</Link>
                <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Explore</Link>
                <Link to="/plan-trip" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Plan Trip</Link>
                <Link to="/my-journal" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FF8C42] transition py-2 border-b border-white/10">Journal</Link>
                <Link to="/my-routes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Routes</Link>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[100px]">
        {}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF8C42]/5 via-transparent to-[#0B6E66]/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center space-x-3">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#FF8C42] drop-shadow-[0_0_10px_rgba(255,140,66,0.5)]" />
              </motion.div>
              <span className="bg-gradient-to-r from-white via-white to-[#FF8C42] bg-clip-text text-transparent">
                Travel Journal
              </span>
            </h1>
            <p className="text-white/60 text-base md:text-lg pl-14 font-light">
              {activeTab === 'my-journal' 
                ? 'Document your adventures and cherish every moment ✨'
                : 'Discover inspiring travel stories from the community 🌍'
              }
            </p>
          </div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex gap-2 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 shadow-2xl">
            <button
              onClick={() => setActiveTab('my-journal')}
              className={`flex-1 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'my-journal'
                  ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF9F5F] text-white shadow-[0_8px_20px_rgba(255,140,66,0.4)] scale-[1.02]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>My Journal</span>
            </button>
            <button
              onClick={() => setActiveTab('public-feed')}
              className={`flex-1 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'public-feed'
                  ? 'bg-gradient-to-r from-[#0B6E66] to-[#0B8E80] text-white shadow-[0_8px_20px_rgba(11,110,102,0.4)] scale-[1.02]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Public Feed</span>
            </button>
          </div>
        </motion.div>

        {}
        {stats && activeTab === 'my-journal' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF8C42]/10 via-[#0B6E66]/10 to-[#FF8C42]/10 rounded-3xl backdrop-blur-xl border border-white/20"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-8 px-6 py-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-4 group cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-[#FF8C42]/30 rounded-full blur-xl group-hover:bg-[#FF8C42]/50 transition-all duration-300"></div>
                  <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FF8C42] to-[#FF9F5F] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                    <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                </motion.div>
                <div className="flex flex-col">
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-[#FF8C42] to-white bg-clip-text text-transparent"
                  >
                    {stats.totalEntries}
                  </motion.p>
                  <p className="text-sm md:text-base text-white/70 font-medium">Total Entries</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, type: "spring" }}
                className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-4 group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-red-400/30 rounded-full blur-xl group-hover:bg-red-400/50 transition-all duration-300"></div>
                  <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                    <Heart className="w-7 h-7 md:w-8 md:h-8 text-white fill-white" />
                  </div>
                </motion.div>
                <div className="flex flex-col">
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-red-400 to-white bg-clip-text text-transparent"
                  >
                    {stats.favoriteEntries}
                  </motion.p>
                  <p className="text-sm md:text-base text-white/70 font-medium">Favorites</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.45, type: "spring" }}
                className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"
              />

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-4 group cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, -15, 0] }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-[#0B6E66]/30 rounded-full blur-xl group-hover:bg-[#0B6E66]/50 transition-all duration-300"></div>
                  <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#0B6E66] to-[#0B8E80] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                    <RouteIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                </motion.div>
                <div className="flex flex-col">
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-[#0B6E66] to-white bg-clip-text text-transparent"
                  >
                    {stats.routesCompleted || 0}
                  </motion.p>
                  <p className="text-sm md:text-base text-white/70 font-medium">Routes Completed</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 md:p-7 mb-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-[#FF8C42] transition-colors" />
              <input
                type="text"
                placeholder="Search your memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl focus:border-[#FF8C42] focus:bg-white/15 focus:outline-none text-white placeholder-white/40 transition-all duration-300 shadow-inner"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl focus:border-[#FF8C42] focus:bg-white/15 focus:outline-none text-white appearance-none cursor-pointer transition-all duration-300 shadow-inner"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="-createdAt" className="bg-[#021E1B]">Newest First</option>
              <option value="createdAt" className="bg-[#021E1B]">Oldest First</option>
              <option value="title" className="bg-[#021E1B]">Title A-Z</option>
              <option value="-rating" className="bg-[#021E1B]">Highest Rated</option>
            </select>
            
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3.5 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold ${
                showFilters 
                  ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF9F5F] text-white border-[#FF8C42] shadow-[0_8px_20px_rgba(255,140,66,0.4)]' 
                  : 'bg-white/10 text-white border-white/20 hover:border-[#FF8C42] hover:bg-white/15 shadow-inner'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden md:inline">Filters</span>
            </motion.button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/20"
            >
              <div className="grid md:grid-cols-3 gap-4">
                {activeTab === 'my-journal' && (
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Privacy Filter
                    </label>
                    <select
                      value={filterPrivacy}
                      onChange={(e) => setFilterPrivacy(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white"
                    >
                      <option value="all" className="bg-[#021E1B]">All Entries</option>
                      <option value="private" className="bg-[#021E1B]">Private Only</option>
                      <option value="public" className="bg-[#021E1B]">Public Only</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Filter by Mood
                  </label>
                  <select
                    value={filterMood}
                    onChange={(e) => setFilterMood(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white"
                  >
                    <option value="" className="bg-[#021E1B]">All Moods</option>
                    {MOOD_OPTIONS.map(mood => (
                      <option key={mood.value} value={mood.value} className="bg-[#021E1B]">
                        {mood.emoji} {mood.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterMood('');
                      setFilterPrivacy('all');
                      if (activeTab === 'my-journal') {
                        fetchEntries();
                      } else {
                        fetchPublicEntries();
                      }
                    }}
                    className="w-full px-4 py-2 bg-white/10 text-white border-2 border-white/20 rounded-lg hover:bg-white/20 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Loader className="w-14 h-14 text-[#FF8C42] mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,140,66,0.5)]" />
              </motion.div>
              <p className="text-white/70 text-lg">Loading your memories...</p>
            </div>
          </div>
        ) : (activeTab === 'my-journal' ? entries : publicEntries).length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-center py-16 px-6 shadow-2xl"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <BookOpen className="w-20 h-20 text-white/20 mx-auto mb-6 drop-shadow-lg" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {activeTab === 'my-journal' ? 'No Journal Entries Yet' : 'No Public Entries'}
            </h3>
            <p className="text-white/60 mb-8 text-lg max-w-md mx-auto">
              {activeTab === 'my-journal' 
                ? 'Start documenting your travel experiences and create lasting memories! ✨'
                : 'Be the first to share your travel story with the community! 🌍'}
            </p>
            {activeTab === 'my-journal' && (
              <motion.button
                onClick={() => setShowForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#FF8C42] to-[#FF9F5F] text-white rounded-xl font-semibold shadow-[0_8px_20px_rgba(255,140,66,0.4)] hover:shadow-[0_12px_30px_rgba(255,140,66,0.5)] transition-all inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create First Entry</span>
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {(activeTab === 'my-journal' ? entries : publicEntries).map((entry, index) => (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <EntryCard
                  entry={entry}
                  onView={handleView}
                  onEdit={activeTab === 'my-journal' ? handleEdit : undefined}
                  onDelete={activeTab === 'my-journal' ? handleDelete : undefined}
                  onToggleFavorite={activeTab === 'my-journal' ? handleToggleFavorite : undefined}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#021E1B] border border-white/20 rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <EntryForm
              entry={editingEntry}
              places={places}
              routes={routes}
              prefillRoute={routerLocation.state?.prefillRoute}
              onSubmit={handleCreateEntry}
              onCancel={() => {
                setShowForm(false);
                setEditingEntry(null);
              }}
            />
          </motion.div>
        </div>
      )}

      {}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#021E1B] border border-white/20 rounded-2xl max-w-3xl w-full my-8 shadow-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">
                {selectedEntry.title}
              </h3>
              <button
                onClick={() => setSelectedEntry(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {selectedEntry.images && selectedEntry.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {selectedEntry.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={img.caption || `Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <p className="text-xs text-white/60 mb-1">Date</p>
                  <p className="font-semibold text-white">
                    {new Date(selectedEntry.visitDate || selectedEntry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {selectedEntry.place && (
                  <div>
                    <p className="text-xs text-white/60 mb-1">Place</p>
                    <p className="font-semibold text-white">{selectedEntry.place.name}</p>
                  </div>
                )}
                {selectedEntry.route && (
                  <div>
                    <p className="text-xs text-white/60 mb-1">Route</p>
                    <p className="font-semibold text-white">{selectedEntry.route.name}</p>
                  </div>
                )}
                {selectedEntry.mood && (
                  <div>
                    <p className="text-xs text-white/60 mb-1">Mood</p>
                    <p className="font-semibold text-white">
                      {MOOD_OPTIONS.find(m => m.value === selectedEntry.mood)?.emoji}{' '}
                      {MOOD_OPTIONS.find(m => m.value === selectedEntry.mood)?.label}
                    </p>
                  </div>
                )}
                {selectedEntry.rating > 0 && (
                  <div>
                    <p className="text-xs text-white/60 mb-1">Rating</p>
                    <div className="flex">
                      {[...Array(selectedEntry.rating)].map((_, i) => (
                        <span key={i} className="text-[#FF8C42]">⭐</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {selectedEntry.formattedContent ? (
                  <div 
                    className="text-white/90 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedEntry.formattedContent }}
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  />
                ) : (
                  <p className="text-white/90 whitespace-pre-wrap">
                    {selectedEntry.content}
                  </p>
                )}
              </div>

              {selectedEntry.companions && selectedEntry.companions.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-white mb-2">Companions:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.companions.map((companion, index) => (
                      <span
                        key={index}
                        className="bg-[#FF8C42]/20 text-[#FF8C42] px-3 py-1 rounded-full text-sm"
                      >
                        {companion}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedEntry.highlights && selectedEntry.highlights.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-white mb-2">Highlights:</p>
                  <ul className="space-y-1">
                    {selectedEntry.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-[#FF8C42] mt-1">•</span>
                        <span className="text-sm text-white/90">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEntry.tips && (
                <div className="p-4 bg-[#FF8C42]/10 rounded-lg border border-[#FF8C42]/20">
                  <p className="text-sm font-semibold text-[#FF8C42] mb-2">💡 Tips:</p>
                  <p className="text-sm text-white/90">{selectedEntry.tips}</p>
                </div>
              )}

              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#FF8C42]/20 text-[#FF8C42] px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6 pt-6 border-t border-white/20">
              <button
                onClick={() => setSelectedEntry(null)}
                className="flex-1 px-4 py-3 bg-white/10 text-white border-2 border-white/20 rounded-lg hover:bg-white/20 transition"
              >
                Close
              </button>
              {activeTab === 'my-journal' && (
                <button
                  onClick={() => {
                    handleEdit(selectedEntry);
                  }}
                  className="flex-1 px-4 py-3 bg-[#FF8C42] text-white rounded-lg font-semibold hover:bg-[#FF8C42]/90 transition"
                >
                  Edit Entry
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {}
      {activeTab === 'my-journal' && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.5
          }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            onClick={() => {
              setShowForm(true);
              setEditingEntry(null);
            }}
            whileHover={{ 
              scale: 1.15, 
              rotate: 90
            }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FF9F5F] text-white shadow-[0_10px_30px_rgba(255,140,66,0.5)] hover:shadow-[0_15px_40px_rgba(255,140,66,0.7)] transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#FF9F5F] to-[#FF8C42] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(255,140,66,0.3)",
                  "0 0 40px rgba(255,140,66,0.6)",
                  "0 0 20px rgba(255,140,66,0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <motion.div
              className="relative z-10"
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Plus className="w-8 h-8 md:w-9 md:h-9 stroke-[3]" />
            </motion.div>
            
            <div className="absolute inset-0 rounded-full bg-[#FF8C42]/50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </motion.button>
          
          {}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-white text-[#021E1B] px-4 py-2 rounded-lg shadow-xl whitespace-nowrap font-semibold pointer-events-none"
          >
            Create New Entry
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MyJournal;