import { Link } from "react-router-dom";
import {
  Compass,
  MapPin,
  Route,
  NotebookPen,
  Navigation,
  Camera,
  Map,
  Clock,
  Star,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import logo from "../assets/images/logo.png";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user, logout } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/08sakshii" },
    { icon: <FaTwitter />, url: "https://twitter.com/YOUR_USERNAME" },
    { icon: <FaInstagram />, url: "https://instagram.com/YOUR_USERNAME" },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/sakshi-vaidya08",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FB] via-[#EAF7F6] to-[#DFF2F0] text-neutral-900 overflow-x-hidden">
      {}
      <nav
        className="fixed top-0 left-0 w-full h-[70px] backdrop-blur-md bg-[#021E1B]/80 border-b border-white/10 z-50 flex items-center justify-between px-4 md:px-12 transition-all duration-300"
        style={{
          boxShadow: scrollY > 50 ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
        }}>
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

        <div className="hidden md:flex items-center space-x-8 text-[16px] font-medium text-white">
          <Link
            to="/"
            className="hover:text-[#FF8C42] transition relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/explore"
            className="hover:text-[#FF8C42] transition relative group">
            Explore
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C42] group-hover:w-full transition-all duration-300"></span>
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
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
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
                  onClick={logout}
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
                  className="px-5 py-2 text-sm font-semibold border-2 border-[#FF8C42] text-[#FF8C42] rounded-xl hover:bg-[#FF8C42] hover:text-white shadow-md transition">
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-semibold bg-[#FF8C42] text-white rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition">
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-50 text-white p-2">
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-[#021E1B] z-40 md:hidden pt-[70px]">
            <div className="flex flex-col h-full px-6 py-8">
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
                  className="hover:text-[#FF8C42] transition py-2 border-b border-white/10">
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
              </div>
              <div className="mt-auto flex flex-col space-y-4">
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 text-center font-semibold bg-[#FF8C42] text-white rounded-xl hover:brightness-110 transition">
                    Logout
                  </button>
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
      <section className="flex flex-col md:flex-row items-center justify-between max-w-[1440px] mx-auto px-4 md:px-12 pt-[100px] md:pt-[120px] pb-[60px] md:pb-[80px] relative">
        <motion.div
          className="absolute top-20 left-5 w-48 h-48 md:w-72 md:h-72 bg-[#0B6E66]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-5 w-64 h-64 md:w-96 md:h-96 bg-[#FF8C42]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 relative z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-3 md:mb-4">
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-[#0B6E66]/10 border border-[#0B6E66]/30 rounded-full text-[#0B6E66] font-semibold text-xs md:text-sm flex items-center gap-2">
              <MapPin className="w-3 h-3 md:w-4 md:h-4" />
              Smart Location-Based Travel Planning
            </div>
          </motion.div>

          <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold leading-tight text-[#0B6E66] drop-shadow-sm">
            Discover India's{" "}
            <span className="text-[#FF8C42] relative">
              Hidden Treasures
              <motion.div
                className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-0.5 md:h-1 bg-[#FF8C42]/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>{" "}
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block">
              🌄
            </motion.span>
          </h1>

          <p className="text-[15px] md:text-[18px] lg:text-[22px] text-gray-700 mt-4 md:mt-6 max-w-md mx-auto md:mx-0 leading-relaxed">
            India's first{" "}
            <span className="font-semibold text-[#0B6E66]">
              intelligent travel companion
            </span>{" "}
            that creates optimal routes from your location, showing you the
            nearest tourist gems with complete travel details.
          </p>

          <motion.div
            className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}>
            <div className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white rounded-full text-xs md:text-sm text-gray-700 shadow-sm flex items-center gap-1.5 md:gap-2">
              <Navigation className="w-3 h-3 md:w-4 md:h-4 text-[#0B6E66]" />
              Location Routes
            </div>
            <div className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white rounded-full text-xs md:text-sm text-gray-700 shadow-sm flex items-center gap-1.5 md:gap-2">
              <Clock className="w-3 h-3 md:w-4 md:h-4 text-[#0B6E66]" />
              Optimized Time
            </div>
            <div className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white rounded-full text-xs md:text-sm text-gray-700 shadow-sm flex items-center gap-1.5 md:gap-2">
              <NotebookPen className="w-3 h-3 md:w-4 md:h-4 text-[#0B6E66]" />
              Travel Journal
            </div>
          </motion.div>

          <motion.div
            className="mt-6 md:mt-10 flex justify-center md:justify-start flex-wrap gap-3 md:gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/explore"
                className="w-[160px] md:w-[220px] h-[50px] md:h-[60px] flex items-center justify-center gap-2 rounded-[14px] bg-[#0B6E66] text-white text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                Explore Now
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/plan-trip"
                className="w-[160px] md:w-[220px] h-[50px] md:h-[60px] flex items-center justify-center gap-2 rounded-[14px] border-2 border-[#0B6E66] text-[#0B6E66] text-sm md:text-base font-semibold hover:bg-[#0B6E66]/10 shadow-sm transition-all duration-300">
                <Map className="w-4 h-4 md:w-5 md:h-5" />
                Plan Trip
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center relative z-10 mt-8 md:mt-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}>
          <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[320px] md:w-[500px] md:h-[400px] lg:w-[600px] lg:h-[480px] rounded-[28px] bg-[#0B6E66] blur-3xl opacity-20"></div>
          <motion.div
            className="w-[280px] h-[280px] sm:w-[400px] sm:h-[320px] md:w-[500px] md:h-[400px] lg:w-[600px] lg:h-[480px] bg-gradient-to-br from-white to-gray-50 rounded-[20px] md:rounded-[28px] shadow-2xl border border-gray-200 flex items-center justify-center overflow-hidden relative p-4"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <img
              src={logo}
              alt="Bharat Yatra Visual"
              className="w-full h-full object-contain rounded-[20px] md:rounded-[28px]"
            />
            <motion.div
              className="hidden sm:flex absolute top-4 left-4 md:top-6 md:left-6 bg-white/90 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 rounded-xl shadow-lg border border-gray-200"
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#FF8C42]" />
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500">
                    Current Location
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-[#0B6E66]">
                    Varanasi, UP
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="hidden sm:flex absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white/90 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 rounded-xl shadow-lg border border-gray-200"
              animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}>
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 md:w-5 md:h-5 text-[#0B6E66]" />
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500">
                    Nearby Places
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-[#0B6E66]">
                    12 Destinations
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {}
      <section className="max-w-[1200px] mx-auto py-[60px] md:py-[100px] px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16">
          <h2 className="text-[28px] md:text-[40px] font-bold text-[#0B6E66] mb-3 md:mb-4 drop-shadow-sm">
            How Bharat Yatra Works{" "}
            <motion.span
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block">
              ✨
            </motion.span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
            Experience intelligent travel planning powered by your location
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {howItWorksData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}>
              <HowCard {...item} index={index} />
            </motion.div>
          ))}
        </div>
      </section>

      {}
      <section className="bg-gradient-to-br from-[#0B6E66] to-[#084F49] py-[60px] md:py-[100px] relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16">
            <h2 className="text-[28px] md:text-[40px] font-bold text-white mb-3 md:mb-4">
              Why Choose Bharat Yatra? 🎯
            </h2>
            <p className="text-white/80 text-base md:text-lg px-4">
              Your complete travel companion for exploring India
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FF8C42] rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-[60px] md:py-[100px] bg-[#EAF7F6]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-8 md:mb-12">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#0B6E66] mb-3 md:mb-4">
              Featured Travel Routes 🛣️
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Popular journeys curated by fellow travelers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredRoutes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <div className="relative overflow-hidden h-[160px] md:h-[180px]">
                  <motion.img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3">
                    <div className="flex items-center gap-1 text-white text-xs md:text-sm">
                      <Star className="w-3 h-3 md:w-4 md:h-4 fill-[#FF8C42] text-[#FF8C42]" />
                      <span className="font-semibold">4.8</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-bold text-[#0B6E66] text-base md:text-lg mb-1">
                    {route.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    {route.desc}
                  </p>
                  <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {route.places} places
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {route.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 md:mt-12">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#0B6E66] text-white text-sm md:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#084F49] transition-all duration-300 group">
              View All Routes
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {}
      <section className="py-[60px] md:py-[120px] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/20 to-[#0B6E66]/20"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="max-w-[900px] mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold text-[#0B6E66] mb-4 md:mb-6 leading-tight px-4">
              Ready to Start Your{" "}
              <span className="text-[#FF8C42]">Indian Adventure</span>?
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto px-4">
              Join thousands of travelers discovering India's beauty through
              smart, personalized routes. Your next unforgettable journey starts
              here.
            </p>
            <div className="flex justify-center gap-3 md:gap-4 flex-wrap px-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="px-8 md:px-10 py-3 md:py-4 bg-[#FF8C42] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:brightness-110 transition-all duration-300 text-base md:text-lg">
                  Get Started Free
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  to="/explore"
                  className="px-8 md:px-10 py-3 md:py-4 bg-white text-[#0B6E66] font-bold rounded-xl shadow-lg hover:shadow-xl border-2 border-[#0B6E66] transition-all duration-300 text-base md:text-lg">
                  Explore Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {}
      <footer className="bg-gradient-to-br from-[#021E1B] to-[#0B6E66] text-white py-12 md:py-16 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#FF8C42]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-4 md:px-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg md:text-xl font-bold">Bharat Yatra</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your intelligent companion for discovering and experiencing the
              incredible beauty of India.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-base md:text-lg mb-4 text-[#FF8C42]">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/explore"
                  className="hover:text-[#FF8C42] transition flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/plan-trip"
                  className="hover:text-[#FF8C42] transition flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  Plan Trip
                </Link>
              </li>
              <li>
                <Link
                  to="/my-journal"
                  className="hover:text-[#FF8C42] transition flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  Travel Journal
                </Link>
              </li>
              <li>
                <Link
                  to="/my-routes"
                  className="hover:text-[#FF8C42] transition flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  My Routes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-base md:text-lg mb-4 text-[#FF8C42]">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-[#FF8C42] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FF8C42] transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FF8C42] transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FF8C42] transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-base md:text-lg mb-4 text-[#FF8C42]">
              Contact
            </h4>
            <p className="text-white/70 text-sm mb-2">Email:</p>
            <a
              href="mailto:sakshivaidya2706@gmail.com"
              className="text-sm hover:text-[#FF8C42] transition break-all">
              sakshivaidya2706@gmail.com
            </a>
            <div className="mt-6">
              <p className="text-white/70 text-sm mb-3">Follow Us:</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF8C42] transition-colors text-white text-lg">
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-white/50 text-xs md:text-sm mt-12 pt-8 border-t border-white/10 relative z-10 px-4">
          © {new Date().getFullYear()} Bharat Yatra. Crafted with ❤️ for
          travelers. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const HowCard = ({ icon, title, text, index }) => (
  <motion.div
    className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
    whileHover={{ y: -8 }}>
    <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-[#FF8C42]/10 rounded-full flex items-center justify-center">
      <span className="text-[#FF8C42] font-bold text-base md:text-lg">
        {index + 1}
      </span>
    </div>
    <motion.div className="absolute inset-0 bg-gradient-to-br from-[#0B6E66]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <motion.div
        className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#0B6E66] to-[#084F49] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}>
        {icon}
      </motion.div>
      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-[#0B6E66] group-hover:text-[#FF8C42] transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
        {text}
      </p>
    </div>
  </motion.div>
);

const howItWorksData = [
  {
    icon: <Navigation className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    title: "Share Location",
    text: "Enable location access and we'll instantly find the nearest tourist attractions from where you are, creating a personalized discovery experience.",
  },
  {
    icon: <Route className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    title: "Smart Routes",
    text: "Our intelligent algorithm creates optimized travel routes connecting nearby destinations, minimizing travel time while maximizing experiences.",
  },
  {
    icon: <Camera className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    title: "Document Journey",
    text: "Capture memories in your private travel journal with photos, notes, and experiences. Your personal travel diary accessible anytime, anywhere.",
  },
];

const features = [
  {
    icon: <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    title: "Location-Based Discovery",
    description:
      "Automatically discovers tourist spots near your current location and suggests the best route to explore them efficiently.",
  },
  {
    icon: <Route className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    title: "Optimized Travel Routes",
    description:
      "Smart algorithms calculate the shortest path covering maximum destinations, saving you time and making travel planning effortless.",
  },
  {
    icon: <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    title: "Complete Travel Info",
    description:
      "Get comprehensive details including nearby hotels, local cuisine, historical significance, and user ratings for each destination.",
  },
  {
    icon: <NotebookPen className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    title: "Private Travel Journal",
    description:
      "Document your adventures with photos and notes in a secure, personal journal. Relive your memories anytime you want.",
  },
  {
    icon: <Compass className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    title: "Hidden Gems",
    description:
      "Discover off-beat locations and lesser-known attractions that other tourists might miss, making your journey truly unique.",
  },
  {
    icon: <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    title: "Real-Time Updates",
    description:
      "Get live information about opening hours, weather conditions, crowd levels, and special events at destinations.",
  },
];

const featuredRoutes = [
  {
    name: "Goa Beaches",
    desc: "Sun, sand & sea adventures",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=400&q=60",
    places: "8",
    duration: "3-4 days",
  },
  {
    name: "Himalayan Trails",
    desc: "Majestic mountains & serenity",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=60",
    places: "12",
    duration: "7-10 days",
  },
  {
    name: "Rajasthan Forts",
    desc: "Royal heritage & desert charm",
    image:
      "https://www.shikhar.com/blog/wp-content/uploads/2019/02/Mehrangarh-Fort.jpg",
    places: "15",
    duration: "5-7 days",
  },
  {
    name: "Kerala Backwaters",
    desc: "Peaceful houseboat journeys",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=60",
    places: "6",
    duration: "4-5 days",
  },
];

export default HomePage;
