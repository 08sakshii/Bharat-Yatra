
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) setUser(loggedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const getAvatar = (name) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#121212]/80 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-3 px-6">
        <Link to="/" className="text-2xl font-bold text-white">TravelMap</Link>

        <nav className="flex items-center space-x-6 text-gray-300">
          <Link to="/explore" className="hover:text-white">Explore</Link>
          <Link to="/about" className="hover:text-white">About</Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:text-white">Login</Link>
              <Link to="/signup" className="hover:text-white">Signup</Link>
            </>
          ) : (
            <div className="relative">
              <img
                src={getAvatar(user.name || "U")}
                alt="avatar"
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-full cursor-pointer border border-gray-500"
              />

              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 bg-[#1e1e1e] text-gray-300 rounded-lg shadow-lg w-40"
                >
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
