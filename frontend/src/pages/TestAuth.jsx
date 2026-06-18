

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, LogIn, UserPlus, LogOut, ArrowRight, Sparkles, Shield, CheckCircle, Loader, Eye, EyeOff, Home } from 'lucide-react';

const TestAuth = () => {
  const { user, loading, error, isAuthenticated, register, login, logout } = useAuth();
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      if (mode === 'register') {
        await register(formData);
        setMessage({ type: 'success', text: 'Registration successful! Please login.' });
        setMode('login');
        setFormData({ ...formData, name: '', password: '' });
      } else {
        await login({ email: formData.email, password: formData.password });
        setMessage({ type: 'success', text: 'Login successful!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Operation failed' });
    }
  };

  const handleLogout = async () => {
    await logout();
    setMessage({ type: 'success', text: 'Logged out successfully!' });
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021E1B] via-[#033830] to-[#021E1B] relative overflow-hidden">
      {}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FF8C42] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s ease-in-out ${Math.random() * 5}s infinite`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(10px, -20px) scale(1.5); opacity: 0.6; }
        }
        @keyframes rotateGradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF8C42]/10 rounded-full blur-3xl" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{ animation: 'pulse 4s ease-in-out infinite' }} />

      {}
      <nav className="fixed top-0 left-0 w-full h-[70px] backdrop-blur-md bg-[#021E1B]/90 border-b border-white/10 z-50 flex items-center justify-between px-4 md:px-12">
        <div className="flex items-center space-x-2 group z-50">
          <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-gradient-to-br from-[#FF8C42] to-[#ff6b1f] flex items-center justify-center shadow-lg border border-white/10 transition-transform hover:scale-110">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-serif italic font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] tracking-wide group-hover:text-[#FF8C42] transition-colors">
            Bharat Yatra
          </span>
        </div>

        <Link to="/">
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition backdrop-blur-sm hover:scale-105 active:scale-95 flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </Link>
      </nav>

      {}
      <main className="pt-[100px] pb-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          

          {}
          <div className="max-w-2xl mx-auto">
            <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden transition-transform hover:scale-[1.02]">
              {}
              <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, #FF8C42 0%, transparent 50%)',
                  animation: 'rotateGradient 4s linear infinite'
                }}
              />

              <div className="relative p-8 md:p-12">
                {!isAuthenticated ? (
                  <div>
                    {}
                    <div className="flex gap-4 mb-8">
                      <button
                        onClick={() => {
                          setMode('login');
                          setMessage(null);
                        }}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 ${
                          mode === 'login'
                            ? 'bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white shadow-lg shadow-[#FF8C42]/50'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                      >
                        <LogIn className="w-5 h-5 inline mr-2" />Login
                      </button>
                      <button
                        onClick={() => {
                          setMode('register');
                          setMessage(null);
                        }}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 ${
                          mode === 'register'
                            ? 'bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white shadow-lg shadow-[#FF8C42]/50'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                      >
                        <UserPlus className="w-5 h-5 inline mr-2" />Register
                      </button>
                    </div>

                    {}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {mode === 'register' && (
                        <div style={{ animation: 'slideDown 0.3s ease-out' }}>
                          <label className="block text-sm font-semibold text-white mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:border-[#FF8C42] focus:outline-none focus:scale-[1.02] transition backdrop-blur-sm"
                            placeholder="Enter your full name"
                            required={mode === 'register'}
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:border-[#FF8C42] focus:outline-none focus:scale-[1.02] transition backdrop-blur-sm"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          <Lock className="w-4 h-4 inline mr-2" />
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:border-[#FF8C42] focus:outline-none focus:scale-[1.02] transition backdrop-blur-sm pr-12"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition hover:scale-110"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {}
                      {(message || error) && (
                        <div
                          className={`p-4 rounded-xl flex items-center gap-3 ${
                            message?.type === 'success' || !error
                              ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                              : 'bg-red-500/20 border border-red-500/50 text-red-300'
                          }`}
                          style={{ animation: 'slideDown 0.3s ease-out' }}
                        >
                          {message?.type === 'success' || !error ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          ) : (
                            <Sparkles className="w-5 h-5 flex-shrink-0" />
                          )}
                          <span className="font-medium">{error || message?.text}</span>
                        </div>
                      )}

                      {}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-bold text-lg shadow-2xl shadow-[#FF8C42]/50 hover:shadow-[#FF8C42]/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group hover:scale-105 active:scale-95"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {loading ? (
                            <><Loader className="w-5 h-5 animate-spin" />Processing...</>
                          ) : mode === 'login' ? (
                            <><LogIn className="w-5 h-5" />Login to Account</>
                          ) : (
                            <><UserPlus className="w-5 h-5" />Create Account</>
                          )}
                        </span>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="text-center">
                    {}
                    <div className="mb-6">
                      <div
                        className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#ff6b1f] flex items-center justify-center shadow-2xl"
                        style={{ animation: 'float 2s ease-in-out infinite' }}
                      >
                        <CheckCircle className="w-12 h-12 text-white animate-pulse" />
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">
                      Welcome Back, {user?.name?.split(' ')[0]}!
                    </h2>
                    <p className="text-white/70 mb-8">
                      You're successfully authenticated
                    </p>

                    {}
                    <div className="space-y-4 mb-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-4 mb-4">
                          <img
                            src={user?.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/050/086/393/small/orange-man-profile-icon-png.png'}
                            alt={user?.name}
                            className="w-16 h-16 rounded-full border-4 border-[#FF8C42] shadow-lg transition-transform hover:scale-110 hover:rotate-6"
                          />
                          <div className="text-left">
                            <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                            <p className="text-sm text-white/60">{user?.email}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-white/5 p-3 rounded-xl">
                            <p className="text-white/60 mb-1">User ID</p>
                            <p className="text-white font-mono text-xs">{user?._id?.slice(0, 10)}...</p>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl">
                            <p className="text-white/60 mb-1">Status</p>
                            <p className="text-white font-semibold">
                              {user?.isVerified ? '✅ Verified' : '⏳ Pending'}
                            </p>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl col-span-2">
                            <p className="text-white/60 mb-1">Member Since</p>
                            <p className="text-white font-semibold">
                              {new Date(user?.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {}
                    <div className="space-y-3">
                      <Link to="/explore">
                        <button className="w-full py-4 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-bold text-lg shadow-2xl shadow-[#FF8C42]/50 hover:shadow-[#FF8C42]/70 transition-all group hover:scale-105 active:scale-95">
                          <span className="flex items-center justify-center gap-2">
                            Go to Dashboard
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full py-3 bg-white/10 hover:bg-red-500/20 border-2 border-white/20 hover:border-red-500/50 text-white rounded-xl font-semibold transition-all group hover:scale-105 active:scale-95"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                          Logout
                        </span>
                      </button>
                    </div>

                    {message && (
                      <div className="mt-4 p-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-300">
                        {message.text}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestAuth;