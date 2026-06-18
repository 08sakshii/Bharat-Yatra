

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { User, Mail, Calendar, MapPin, Edit2, Save, X, Navigation, RefreshCw, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';

const Profile = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const { location, address, requestLocation, loading: locationLoading } = useLocation();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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
    if (!isAuthenticated) {
      navigate('/test-auth');
    } else if (user) {
      setFormData({
        name: user.name || '',
        avatar: user.avatar || ''
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const handleUpdateLocation = async () => {
    try {
      await requestLocation();
    } catch (error) {
      console.error('Location error:', error);
    }
  };

  if (!user) return null;

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
          <Link to="/plan-trip" className="hover:text-[#FF8C42] transition relative group">
            Plan Trip
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/my-journal" className="hover:text-[#FF8C42] transition relative group">
            Journal
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/my-routes" className="hover:text-[#FF8C42] transition relative group">
            Routes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

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
              <Link to="/my-routes" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 transition">My Routes</Link>
              <Link to="/my-journal" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 transition">My Journal</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-200 transition">Logout</button>
            </div>
          </div>
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
                <Link to="/plan-trip" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Plan Trip</Link>
                <Link to="/my-journal" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Journal</Link>
                <Link to="/my-routes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">Routes</Link>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FF8C42] py-2 border-b border-white/10">Profile</Link>
              </div>

              <div className="mt-auto pt-8 flex flex-col space-y-4">
                <div className="px-4 py-3 bg-white/10 rounded-xl">
                  <p className="font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-white/70">{user?.email}</p>
                </div>
                <button onClick={handleLogout} className="w-full py-3 text-center font-semibold bg-red-500 text-white rounded-xl hover:brightness-110 transition">
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <div className="pt-[90px] pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden mb-6"
          >
            <div className="h-32 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f]"></div>
            <div className="relative px-8 pb-8">
              <div className="absolute -top-16 left-8">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="https://static.vecteezy.com/system/resources/thumbnails/050/086/393/small/orange-man-profile-icon-png.png"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-[#021E1B] shadow-2xl"
                />
              </div>
              <div className="pt-20 flex flex-col md:flex-row items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-white drop-shadow-lg">{user.name}</h1>
                  <p className="text-white/70 mt-1">{user.email}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="inline-flex items-center px-3 py-1 bg-[#FF8C42]/20 text-[#FF8C42] rounded-full text-sm font-semibold border border-[#FF8C42]/30">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl hover:shadow-lg transition flex items-center space-x-2 shadow-md"
                >
                  {isEditing ? (
                    <><X className="w-4 h-4" /><span>Cancel</span></>
                  ) : (
                    <><Edit2 className="w-4 h-4" /><span>Edit Profile</span></>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {}
          {isEditing ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Edit Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50 backdrop-blur-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email (Cannot be changed)
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white/50 cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Save className="w-5 h-5" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-white/10 border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6"
              >
                <h3 className="text-xl font-serif font-bold text-white mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl">
                    <User className="w-5 h-5 text-[#FF8C42] mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Full Name</p>
                      <p className="font-semibold text-white">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl">
                    <Mail className="w-5 h-5 text-[#FF8C42] mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Email</p>
                      <p className="font-semibold text-white">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl">
                    <Calendar className="w-5 h-5 text-[#FF8C42] mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Member Since</p>
                      <p className="font-semibold text-white">
                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-serif font-bold text-white">Current Location</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleUpdateLocation}
                    disabled={locationLoading}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Update Location"
                  >
                    {locationLoading ? (
                      <RefreshCw className="w-5 h-5 text-[#FF8C42] animate-spin" />
                    ) : (
                      <Navigation className="w-5 h-5 text-[#FF8C42]" />
                    )}
                  </motion.button>
                </div>

                {location ? (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-[#FF8C42]/10 border border-[#FF8C42]/20 rounded-xl">
                      <MapPin className="w-5 h-5 text-[#FF8C42] mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/60 mb-1">Address</p>
                        <p className="text-sm text-white break-words">
                          {address?.display || 'Location detected'}
                        </p>
                      </div>
                    </div>

                    {address?.city && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white/5 rounded-xl">
                          <p className="text-xs text-white/60 mb-1">City</p>
                          <p className="font-semibold text-white text-sm">
                            {address.city}
                          </p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl">
                          <p className="text-xs text-white/60 mb-1">State</p>
                          <p className="font-semibold text-white text-sm">
                            {address.state}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="p-3 bg-white/5 rounded-xl">
                      <p className="text-xs text-white/60 mb-1">Coordinates</p>
                      <p className="font-mono text-xs text-white/80">
                        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MapPin className="w-12 h-12 text-white/30 mx-auto mb-3" />
                    <p className="text-white/60 text-sm mb-4">No location set</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleUpdateLocation}
                      disabled={locationLoading}
                      className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl text-sm font-semibold hover:shadow-lg transition inline-flex items-center space-x-2 shadow-md"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>{locationLoading ? 'Detecting...' : 'Set Location'}</span>
                    </motion.button>
                  </div>
                )}
              </motion.div>

              {}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 md:col-span-2"
              >
                <h3 className="text-xl font-serif font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/my-routes"
                      className="block px-4 py-3 bg-[#FF8C42]/10 hover:bg-[#FF8C42]/20 border border-[#FF8C42]/30 rounded-xl transition text-[#FF8C42] font-semibold text-center"
                    >
                      📍 My Routes
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/my-journal"
                      className="block px-4 py-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl transition text-purple-400 font-semibold text-center"
                    >
                      📔 My Journal
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/plan-trip"
                      className="block px-4 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-xl transition text-green-400 font-semibold text-center"
                    >
                      🗺️ Plan Trip
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition text-red-400 font-semibold"
                    >
                      🚪 Logout
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;