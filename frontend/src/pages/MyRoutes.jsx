
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { routesAPI } from '../services/api';
import { 
  ArrowLeft, MapPin, Clock, Calendar, Star, Trash2, Download, Loader, 
  Edit, BookOpen, Fuel, DollarSign, Home, Filter, Search, X, Share2,
  TrendingUp, Users, Lock, Globe, Check, Copy, MessageCircle, Eye,
  ChevronDown, Heart, Navigation, Menu, Sparkles, Receipt, ThumbsUp,
  ThumbsDown, ExternalLink, User, Award, TrendingDown, Info
} from 'lucide-react';
import { formatDistance, formatDuration, formatDate } from '../utils/helpers';
import { calculateTripCost, formatCurrency } from '../utils/routeCalculations';
import logo from '../assets/images/logo.png';

const MyRoutes = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [routes, setRoutes] = useState([]);
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareRoute, setShareRoute] = useState(null);
  const [shareMessage, setShareMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  
  const [voteStates, setVoteStates] = useState({});
  
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVisibility, setFilterVisibility] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('my-routes');
  const [popularSortBy, setPopularSortBy] = useState('popularity');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRoutes();
    }
    fetchPopularRoutes(); 
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'popular') {
      fetchPopularRoutes();
    }
  }, [popularSortBy]);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await routesAPI.getAll();
      if (response.success) {
        setRoutes(response.data);
      }
    } catch (error) {
      console.error('Fetch routes error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularRoutes = async () => {
    setLoading(true);
    try {
      const response = await routesAPI.getPopular({ sortBy: popularSortBy, limit: 30 });
      if (response.success) {
        setPopularRoutes(response.data);
        
        
        if (isAuthenticated) {
          const votePromises = response.data.map(route => 
            routesAPI.getVoteStatus(route._id).catch(() => null)
          );
          const voteResults = await Promise.all(votePromises);
          
          const newVoteStates = {};
          response.data.forEach((route, index) => {
            if (voteResults[index]?.success) {
              newVoteStates[route._id] = voteResults[index].data;
            }
          });
          setVoteStates(newVoteStates);
        }
      }
    } catch (error) {
      console.error('Fetch popular routes error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this route?')) return;
    try {
      await routesAPI.delete(id);
      setRoutes(routes.filter(r => r._id !== id));
    } catch (error) {
      console.error('Delete route error:', error);
      alert('Failed to delete route');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const response = await routesAPI.toggleFavorite(id);
      if (response.success) {
        setRoutes(routes.map(r => 
          r._id === id ? { ...r, isFavorite: response.isFavorite } : r
        ));
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
    }
  };

   const handleViewInGoogleMaps = (route) => {
    if (!route.places || route.places.length === 0) {
      alert('No places found in this route');
      return;
    }

    try {
      
      let mapsUrl = 'https://www.google.com/maps/dir/';
      
      
      route.places.forEach((place, index) => {
        if (place.place?.coordinates) {
          
          const { lat, lng } = place.place.coordinates;
          mapsUrl += `${lat},${lng}/`;
        } else if (place.place?.name) {
          
          mapsUrl += `${encodeURIComponent(place.place.name)}/`;
        }
      });

      
      window.open(mapsUrl, '_blank');
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      alert('Failed to open Google Maps');
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const response = await routesAPI.updateStatus(id, newStatus);
      if (response.success) {
        setRoutes(routes.map(r => 
          r._id === id ? { ...r, status: newStatus } : r
        ));
      }
    } catch (error) {
      console.error('Update status error:', error);
    }
  };

  const handleToggleVisibility = async (id, isPublic) => {
    try {
      const response = await routesAPI.updateVisibility(id, isPublic);
      if (response.success) {
        setRoutes(routes.map(r => 
          r._id === id ? { ...r, isPublic } : r
        ));
        if (isPublic) {
          alert('✨ Route is now public! Others can see it in Popular Routes.');
        } else {
          alert('🔒 Route is now private.');
        }
      }
    } catch (error) {
      console.error('Toggle visibility error:', error);
      alert('Failed to update visibility');
    }
  };

  const handleSavePopularRoute = async (routeId) => {
    if (!isAuthenticated) {
      alert('Please login to save routes');
      navigate('/login');
      return;
    }
    
    try {
      const response = await routesAPI.cloneRoute(routeId);
      if (response.success) {
        alert('✅ Route saved to your collection!');
        fetchRoutes();
      }
    } catch (error) {
      console.error('Save popular route error:', error);
      if (error.message?.includes('already saved')) {
        alert('You have already saved this route');
      } else {
        alert('Failed to save route');
      }
    }
  };

  const handleVote = async (routeId, voteType) => {
    if (!isAuthenticated) {
      alert('Please login to vote');
      navigate('/login');
      return;
    }

    try {
      const response = voteType === 'upvote' 
        ? await routesAPI.upvote(routeId)
        : await routesAPI.downvote(routeId);
      
      if (response.success) {
        
        setVoteStates(prev => ({
          ...prev,
          [routeId]: {
            upvoted: voteType === 'upvote' ? response.data.upvoted : false,
            downvoted: voteType === 'downvote' ? response.data.downvoted : false,
            stats: response.data.stats
          }
        }));

        
        setPopularRoutes(prev => prev.map(route => 
          route._id === routeId 
            ? { ...route, interactions: response.data.stats }
            : route
        ));
      }
    } catch (error) {
      console.error('Vote error:', error);
      alert('Failed to vote');
    }
  };

  const handleExport = async (id, name) => {
    try {
      const response = await routesAPI.export(id);
      const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name.replace(/\s+/g, '_')}_route.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export route error:', error);
      alert('Failed to export route');
    }
  };

  const handleWriteNote = (route) => {
    navigate('/my-journal', { state: { prefillRoute: route } });
  };

  const handleShareRoute = (route) => {
    const costDetails = getCostDetails(route);
    const message = generateShareMessage(route, costDetails);
    setShareRoute(route);
    setShareMessage(message);
    setShowShareModal(true);
  };

  const generateShareMessage = (route, costDetails) => {
    const places = route.places?.map((p, idx) => `${idx + 1}. ${p.place?.name || 'Unknown'}`).join('\n') || '';
    
    return `🗺️ *${route.name}* 🗺️

${route.description || 'An amazing journey through India'}

📍 *Route Details:*
• Places: ${route.routeMetrics?.numberOfPlaces || 0}
• Distance: ${formatDistance(route.routeMetrics?.totalDistance || 0)}
• Duration: ${formatDuration(route.routeMetrics?.totalDuration || 0)}
• Days: ${route.routeMetrics?.estimatedDays || 1} days

💰 *Estimated Cost:*
• Fuel: ${formatCurrency(costDetails.fuelCost)}
• Accommodation: ${formatCurrency(costDetails.accommodationCost)} (${costDetails.nights || 0} nights)
• Food: ${formatCurrency(costDetails.foodCost)}
• Tolls: ${formatCurrency(costDetails.tollCost)}
• Total: ${formatCurrency(costDetails.totalCost)}

🎯 *Places to Visit:*
${places}

Plan your journey with Bharat Yatra! 🚗✨`;
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const encodedMessage = encodeURIComponent(shareMessage);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const getCostDetails = (route) => {
    if (route.costEstimates && route.costEstimates.totalCost > 0) {
      return route.costEstimates;
    }
    return calculateTripCost(
      route.routeMetrics?.totalDistance || 0, 
      route.routeMetrics?.estimatedDays || 1
    );
  };

  const getFilteredRoutes = () => {
    let filtered = routes;

    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(r => r.status === filterStatus);
    }

    if (filterVisibility !== 'all') {
      const isPublic = filterVisibility === 'public';
      filtered = filtered.filter(r => r.isPublic === isPublic);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'distance':
        filtered.sort((a, b) => (b.routeMetrics?.totalDistance || 0) - (a.routeMetrics?.totalDistance || 0));
        break;
      case 'favorites':
        filtered.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
        break;
    }

    return filtered;
  };

  if (!isAuthenticated && activeTab === 'my-routes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#021E1B] via-[#033830] to-[#021E1B] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-w-md w-full text-center p-8"
        >
          <Lock className="w-16 h-16 text-[#FF8C42] mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-white mb-4">Login Required</h1>
          <p className="text-white/70 mb-6">Please login to view your saved routes</p>
          <div className="space-y-3">
            <Link to="/login" className="block w-full px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
              Go to Login
            </Link>
            <button
              onClick={() => setActiveTab('popular')}
              className="block w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all border border-white/20"
            >
              View Popular Routes
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const filteredRoutes = getFilteredRoutes();

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

        <div className="hidden md:flex items-center space-x-8 text-[16px] font-medium text-white">
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
          <Link to="/my-journal" className="hover:text-[#FF8C42] transition relative group">
            Journal
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/my-routes" className="text-[#FF8C42] relative group">
            Routes
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF8C42]"></span>
          </Link>
        </div>

        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-4">
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
                <Link to="/my-routes" className="block px-4 py-2 hover:bg-gray-50 text-[#FF8C42] font-semibold transition">My Routes</Link>
                <Link to="/my-journal" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 transition">My Journal</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-200 transition">Logout</button>
              </div>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all border border-white/20">
              Login
            </Link>
          </div>
        )}

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
            className="fixed inset-0 bg-[#021E1B] z-40 md:hidden pt-[70px]"
          >
            <div className="flex flex-col h-full px-6 py-8">
              <div className="flex flex-col space-y-6 text-white text-lg font-medium">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Home</Link>
                <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Explore</Link>
                <Link to="/plan-trip" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Plan Trip</Link>
                <Link to="/my-journal" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Journal</Link>
                <Link to="/my-routes" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FF8C42] py-2 border-b border-white/10">Routes</Link>
              </div>
              {isAuthenticated && (
                <div className="mt-auto flex flex-col space-y-4">
                  <div className="px-4 py-3 bg-white/10 rounded-xl">
                    <p className="font-semibold text-white">{user?.name}</p>
                    <p className="text-xs text-white/70">{user?.email}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full py-3 text-center font-semibold bg-red-500 text-white rounded-xl hover:brightness-110 transition">
                    Logout
                  </button>
                </div>
              )}
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="text-white hover:text-[#FF8C42] transition">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg">
                  {activeTab === 'my-routes' ? 'My Routes' : 'Popular Routes'}
                </h1>
                <p className="text-white/80 text-sm md:text-base">
                  {activeTab === 'my-routes' 
                    ? `${routes.length} saved ${routes.length === 1 ? 'route' : 'routes'}`
                    : `Discover amazing routes from the community`
                  }
                </p>
              </div>
            </div>

            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/plan-trip')}
                className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span className="hidden md:inline">Plan New Trip</span>
                <span className="md:hidden">New</span>
              </motion.button>
            )}
          </div>

          {}
          <div className="flex gap-2 mb-6">
            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('my-routes')}
                className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'my-routes'
                    ? 'bg-[#FF8C42] text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  My Routes
                </span>
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab('popular');
                if (!popularRoutes.length) fetchPopularRoutes();
              }}
              className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'popular'
                  ? 'bg-[#FF8C42] text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Popular
              </span>
            </motion.button>
          </div>

          {}
          {activeTab === 'my-routes' && isAuthenticated ? (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search routes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center gap-2 text-white font-medium border border-white/20"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 pt-4 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Status</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:border-[#FF8C42] focus:outline-none"
                      >
                        <option value="all" className="bg-[#021E1B]">All Status</option>
                        <option value="planned" className="bg-[#021E1B]">Planned</option>
                        <option value="in-progress" className="bg-[#021E1B]">In Progress</option>
                        <option value="completed" className="bg-[#021E1B]">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Visibility</label>
                      <select
                        value={filterVisibility}
                        onChange={(e) => setFilterVisibility(e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:border-[#FF8C42] focus:outline-none"
                      >
                        <option value="all" className="bg-[#021E1B]">All Routes</option>
                        <option value="private" className="bg-[#021E1B]">Private</option>
                        <option value="public" className="bg-[#021E1B]">Public</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:border-[#FF8C42] focus:outline-none"
                      >
                        <option value="newest" className="bg-[#021E1B]">Newest First</option>
                        <option value="oldest" className="bg-[#021E1B]">Oldest First</option>
                        <option value="distance" className="bg-[#021E1B]">By Distance</option>
                        <option value="favorites" className="bg-[#021E1B]">Favorites First</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : activeTab === 'popular' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg mb-6"
            >
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-white whitespace-nowrap">Sort By:</label>
                <select
                  value={popularSortBy}
                  onChange={(e) => setPopularSortBy(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:border-[#FF8C42] focus:outline-none"
                >
                  <option value="popularity" className="bg-[#021E1B]">Most Popular</option>
                  <option value="newest" className="bg-[#021E1B]">Newest First</option>
                  <option value="clones" className="bg-[#021E1B]">Most Cloned</option>
                  <option value="votes" className="bg-[#021E1B]">Highest Rated</option>
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader className="w-12 h-12 text-[#FF8C42] animate-spin" />
            </div>
          ) : activeTab === 'my-routes' && filteredRoutes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 text-center py-16"
            >
              <MapPin className="w-20 h-20 text-white/30 mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                {searchQuery || filterStatus !== 'all' || filterVisibility !== 'all' 
                  ? 'No Routes Found' 
                  : 'No Routes Yet'}
              </h3>
              <p className="text-white/70 mb-6">
                {searchQuery || filterStatus !== 'all' || filterVisibility !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Start planning your first trip!'}
              </p>
              {!searchQuery && filterStatus === 'all' && filterVisibility === 'all' && (
                <Link to="/plan-trip" className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                  Plan a Trip
                </Link>
              )}
            </motion.div>
          ) : activeTab === 'popular' && popularRoutes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 text-center py-16"
            >
              <Globe className="w-20 h-20 text-white/30 mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold text-white mb-2">No Public Routes Yet</h3>
              <p className="text-white/70 mb-6">Be the first to share your amazing journey!</p>
              {isAuthenticated && (
                <Link to="/plan-trip" className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                  Create & Share Route
                </Link>
              )}
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === 'my-routes' ? filteredRoutes : popularRoutes).map((route, idx) => {
                const costDetails = getCostDetails(route);
                const hasValidData = route.routeMetrics?.totalDistance > 0;
                const isMyRoute = activeTab === 'my-routes';
                const voteState = voteStates[route._id] || {};
                const interactions = route.interactions || {};
                
                return (
                  <motion.div
                    key={route._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden group"
                  >
                    <div className="p-6">
                      {}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-serif font-bold text-white truncate mb-2">
                            {route.name}
                          </h3>
                          {route.description && (
                            <p className="text-sm text-white/70 line-clamp-2">
                              {route.description}
                            </p>
                          )}
                          
                          {}
                          {!isMyRoute && route.user && (
                            <div className="flex items-center gap-2 mt-2">
                              <User className="w-3 h-3 text-white/50" />
                              <span className="text-xs text-white/50">
                                by {route.user.name || 'Anonymous'}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {isMyRoute && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleToggleFavorite(route._id)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 ml-2"
                          >
                            <Heart 
                              className={`w-6 h-6 ${
                                route.isFavorite 
                                  ? 'text-red-500 fill-red-500' 
                                  : 'text-white/50'
                              }`}
                            />
                          </motion.button>
                        )}
                      </div>

                      {}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-[#FF8C42]" />
                            <span className="text-xs text-white/70">Places</span>
                          </div>
                          <p className="text-xl font-bold text-white">
                            {route.routeMetrics?.numberOfPlaces || route.places?.length || 0}
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Navigation className="w-4 h-4 text-[#FF8C42]" />
                            <span className="text-xs text-white/70">Distance</span>
                          </div>
                          <p className="text-xl font-bold text-white">
                            {hasValidData ? formatDistance(route.routeMetrics.totalDistance) : 'N/A'}
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-[#FF8C42]" />
                            <span className="text-xs text-white/70">Duration</span>
                          </div>
                          <p className="text-xl font-bold text-white">
                            {hasValidData ? formatDuration(route.routeMetrics.totalDuration) : 'N/A'}
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className="text-xs text-white/70">Cost</span>
                          </div>
                          <p className="text-xl font-bold text-white">
                            {hasValidData ? formatCurrency(costDetails.totalCost) : 'N/A'}
                          </p>
                        </div>
                      </div>

                      {}
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {isMyRoute && (
                          <div className="relative group/status">
                            <button className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
                              route.status === 'completed' 
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                : route.status === 'in-progress'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            }`}>
                              {route.status === 'completed' ? '✓' : route.status === 'in-progress' ? '→' : '○'}
                              <span className="capitalize">{route.status.replace('-', ' ')}</span>
                            </button>
                            
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[150px] opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all z-10">
                              <button
                                onClick={() => handleChangeStatus(route._id, 'planned')}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                              >
                                <span>○</span> Planned
                              </button>
                              <button
                                onClick={() => handleChangeStatus(route._id, 'in-progress')}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                              >
                                <span>→</span> In Progress
                              </button>
                              <button
                                onClick={() => handleChangeStatus(route._id, 'completed')}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                              >
                                <span>✓</span> Completed
                              </button>
                            </div>
                          </div>
                        )}

                        {isMyRoute ? (
                          <div className="relative group/visibility">
                            <button className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
                              route.isPublic
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                            }`}>
                              {route.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                              {route.isPublic ? 'Public' : 'Private'}
                            </button>
                            
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[150px] opacity-0 invisible group-hover/visibility:opacity-100 group-hover/visibility:visible transition-all z-10">
                              <button
                                onClick={() => handleToggleVisibility(route._id, false)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                              >
                                <Lock className="w-3 h-3" /> Private
                              </button>
                              <button
                                onClick={() => handleToggleVisibility(route._id, true)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                              >
                                <Globe className="w-3 h-3" /> Public
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            Popular
                          </span>
                        )}

                        <span className="text-xs text-white/50 ml-auto">
                          {formatDate(route.createdAt, 'relative')}
                        </span>
                      </div>

                      {}
                      {!isMyRoute && (
                        <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleVote(route._id, 'upvote')}
                              disabled={!isAuthenticated}
                              className={`p-2 rounded-lg transition-colors ${
                                voteState.upvoted
                                  ? 'bg-green-500 text-white'
                                  : 'bg-white/10 text-white hover:bg-white/20'
                              } ${!isAuthenticated && 'opacity-50 cursor-not-allowed'}`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </motion.button>
                            <span className="text-sm font-bold text-white">
                              {interactions.upvoteCount || 0}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleVote(route._id, 'downvote')}
                              disabled={!isAuthenticated}
                              className={`p-2 rounded-lg transition-colors ${
                                voteState.downvoted
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white/10 text-white hover:bg-white/20'
                              } ${!isAuthenticated && 'opacity-50 cursor-not-allowed'}`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </motion.button>
                            <span className="text-sm font-bold text-white">
                              {interactions.downvoteCount || 0}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 ml-auto text-xs text-white/70">
                            <Users className="w-3 h-3" />
                            <span>{interactions.cloneCount || 0} saves</span>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-white/70">
                            <Eye className="w-3 h-3" />
                            <span>{interactions.viewCount || 0}</span>
                          </div>
                        </div>
                      )}

                      {}
                      {route.places && route.places.length > 0 && (
                        <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                          <p className="text-xs font-semibold text-white/70 mb-2">Route Preview:</p>
                          <div className="space-y-1.5">
                            {route.places.slice(0, 3).map((place, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs text-white/80">
                                <div className="w-5 h-5 bg-[#FF8C42] text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span className="truncate">{place.place?.name || 'Unknown'}</span>
                              </div>
                            ))}
                            {route.places.length > 3 && (
                              <p className="text-xs text-white/50 ml-7">
                                +{route.places.length - 3} more places
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {}
                      {route.isCloned && route.clonedFrom && (
                        <div className="mb-4 p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                          <div className="flex items-center gap-2">
                            <Info className="w-3 h-3 text-blue-300" />
                            <span className="text-xs text-blue-300">
                              Saved from {route.clonedFrom.username}'s route
                            </span>
                          </div>
                        </div>
                      )}

                      {}
                      <div className="space-y-2">
                        {isMyRoute ? (
                          <>
                            <div className="grid grid-cols-2 gap-2">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedRoute(route)}
                                className="px-4 py-2.5 bg-[#FF8C42] hover:bg-[#ff7a2e] text-white rounded-xl transition-all font-medium shadow-lg flex items-center justify-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleShareRoute(route)}
                                className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all font-medium shadow-lg flex items-center justify-center gap-2"
                              >
                                <Share2 className="w-4 h-4" />
                                Share
                              </motion.button>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleWriteNote(route)}
                                className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
                                title="Write Note"
                              >
                                <BookOpen className="w-4 h-4 mx-auto text-white" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/plan-trip', { state: { editRoute: route } })}
                                className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4 mx-auto text-white" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleViewInGoogleMaps(route)}
                                className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
                                title="View in Google Maps"
                              >
                                <ExternalLink className="w-4 h-4 mx-auto text-white" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(route._id)}
                                className="p-2.5 bg-red-500/20 hover:bg-red-500 border border-red-500/30 hover:border-red-500 rounded-xl transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 mx-auto text-red-300 group-hover:text-white" />
                              </motion.button>
                            </div>
                          </>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedRoute(route)}
                              className="px-4 py-2.5 bg-[#FF8C42] hover:bg-[#ff7a2e] text-white rounded-xl transition-all font-medium shadow-lg flex items-center justify-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSavePopularRoute(route._id)}
                              disabled={!isAuthenticated}
                              className={`px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all font-medium shadow-lg flex items-center justify-center gap-2 ${
                                !isAuthenticated && 'opacity-50 cursor-not-allowed'
                              }`}
                            >
                              <Download className="w-4 h-4" />
                              Save
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {}
      <AnimatePresence>
        {selectedRoute && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRoute(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-start justify-center pt-20"
            >
              <div className="bg-gradient-to-br from-[#021E1B] to-[#033830] rounded-2xl shadow-2xl max-w-4xl w-full border-2 border-[#FF8C42]/50 max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                  {}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-3xl font-serif font-bold text-white mb-2">
                        {selectedRoute.name}
                      </h2>
                      {selectedRoute.description && (
                        <p className="text-white/70">{selectedRoute.description}</p>
                      )}
                      {selectedRoute.user && activeTab === 'popular' && (
                        <div className="flex items-center gap-2 mt-2">
                          <User className="w-4 h-4 text-white/50" />
                          <span className="text-sm text-white/50">
                            Created by {selectedRoute.user.name || 'Anonymous'}
                          </span>
                        </div>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedRoute(null)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>

                  {}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <MapPin className="w-8 h-8 text-[#FF8C42] mb-2" />
                      <p className="text-2xl font-bold text-white mb-1">
                        {selectedRoute.routeMetrics?.numberOfPlaces || 0}
                      </p>
                      <p className="text-xs text-white/70">Places</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <Navigation className="w-8 h-8 text-[#FF8C42] mb-2" />
                      <p className="text-2xl font-bold text-white mb-1">
                        {formatDistance(selectedRoute.routeMetrics?.totalDistance || 0)}
                      </p>
                      <p className="text-xs text-white/70">Distance</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <Clock className="w-8 h-8 text-[#FF8C42] mb-2" />
                      <p className="text-2xl font-bold text-white mb-1">
                        {formatDuration(selectedRoute.routeMetrics?.totalDuration || 0)}
                      </p>
                      <p className="text-xs text-white/70">Duration</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <Calendar className="w-8 h-8 text-[#FF8C42] mb-2" />
                      <p className="text-2xl font-bold text-white mb-1">
                        {selectedRoute.routeMetrics?.estimatedDays || 1}
                      </p>
                      <p className="text-xs text-white/70">Days</p>
                    </div>
                  </div>

                  {}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-green-400" />
                      Cost Breakdown
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Fuel className="w-4 h-4 text-[#FF8C42]" />
                          <span className="text-sm text-white/70">Fuel</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {formatCurrency(getCostDetails(selectedRoute).fuelCost)}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Home className="w-4 h-4 text-[#FF8C42]" />
                          <span className="text-sm text-white/70">Stay</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {formatCurrency(getCostDetails(selectedRoute).accommodationCost)}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Receipt className="w-4 h-4 text-[#FF8C42]" />
                          <span className="text-sm text-white/70">Food</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {formatCurrency(getCostDetails(selectedRoute).foodCost)}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-white/70">Total</span>
                        </div>
                        <p className="text-xl font-bold text-green-400">
                          {formatCurrency(getCostDetails(selectedRoute).totalCost)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {}
                  {activeTab === 'popular' && selectedRoute.interactions && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-[#FF8C42]" />
                        Community Stats
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <ThumbsUp className="w-5 h-5 text-green-400" />
                          </div>
                          <p className="text-2xl font-bold text-white">
                            {selectedRoute.interactions.upvoteCount || 0}
                          </p>
                          <p className="text-xs text-white/70">Upvotes</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Users className="w-5 h-5 text-blue-400" />
                          </div>
                          <p className="text-2xl font-bold text-white">
                            {selectedRoute.interactions.cloneCount || 0}
                          </p>
                          <p className="text-xs text-white/70">Saves</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Eye className="w-5 h-5 text-purple-400" />
                          </div>
                          <p className="text-2xl font-bold text-white">
                            {selectedRoute.interactions.viewCount || 0}
                          </p>
                          <p className="text-xs text-white/70">Views</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-[#FF8C42]" />
                          </div>
                          <p className="text-2xl font-bold text-white">
                            {selectedRoute.interactions.popularityScore || 0}
                          </p>
                          <p className="text-xs text-white/70">Score</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Complete Route</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {selectedRoute.places?.map((place, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                          <div className="w-8 h-8 bg-[#FF8C42] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{place.place?.name || 'Unknown'}</h4>
                            <p className="text-sm text-white/70">{place.place?.location?.city}</p>
                            {place.distanceFromPrevious > 0 && (
                              <p className="text-xs text-[#FF8C42] mt-1">
                                {formatDistance(place.distanceFromPrevious)} from previous
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {}
                  <div className="grid grid-cols-2 gap-3">
                    {activeTab === 'popular' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          handleSavePopularRoute(selectedRoute._id);
                          setSelectedRoute(null);
                        }}
                        disabled={!isAuthenticated}
                        className={`px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                          !isAuthenticated && 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <Download className="w-5 h-5" />
                        Save to My Routes
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedRoute(null)}
                      className={`px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all border border-white/20 ${
                        activeTab === 'popular' ? '' : 'col-span-2'
                      }`}
                    >
                      Close
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
        {showShareModal && shareRoute && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-gradient-to-br from-[#021E1B] to-[#033830] rounded-2xl shadow-2xl max-w-lg w-full border-2 border-[#FF8C42]/50">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-500 rounded-xl">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white">
                        Share Route
                      </h3>
                      <p className="text-sm text-white/70">
                        Share your journey with friends
                      </p>
                    </div>
                  </div>

                  {}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-white mb-2">
                      Message Preview
                    </label>
                    <textarea
                      value={shareMessage}
                      onChange={(e) => setShareMessage(e.target.value)}
                      rows={12}
                      className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50 resize-none font-mono text-sm"
                    />
                  </div>

                  {}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopyMessage}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20 font-medium flex items-center justify-center gap-2"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShareWhatsApp}
                      className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowShareModal(false)}
                    className="w-full mt-3 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20 font-medium"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyRoutes;