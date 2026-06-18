

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, MapPin, Route, BookOpen, Sparkles, 
  TrendingUp, Navigation, Heart, ArrowRight, ChevronRight
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Discover Places",
      description: "Find amazing tourist destinations across India based on your location"
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: "Optimize Routes",
      description: "AI-powered route planning that saves time and covers the best spots"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Keep a Journal",
      description: "Document your travels with photos, notes, and memories"
    }
  ];

  const sampleRoutes = [
    { name: "Golden Triangle", places: 3, time: "5 days", image: "🕌" },
    { name: "Kerala Backwaters", places: 4, time: "7 days", image: "🌴" },
    { name: "Rajasthan Heritage", places: 6, time: "10 days", image: "🏰" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      {}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white text-xl font-bold">
              🗺️
            </div>
            <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              India Tourism
            </span>
          </Link>

          {}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/explore" className="text-neutral-700 hover:text-primary font-semibold transition-colors">
              Explore
            </Link>
            <Link to="/plan-trip" className="text-neutral-700 hover:text-primary font-semibold transition-colors">
              Plan Trip
            </Link>
            <Link to="/my-journal" className="text-neutral-700 hover:text-primary font-semibold transition-colors">
              Journal
            </Link>
            <Link to="/test-auth" className="btn-primary">
              Get Started
            </Link>
          </div>

          {}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-xl border-t border-neutral-200">
            <div className="flex flex-col p-4 space-y-3">
              <Link to="/explore" className="p-3 hover:bg-neutral-50 rounded-lg font-semibold">
                Explore Places
              </Link>
              <Link to="/plan-trip" className="p-3 hover:bg-neutral-50 rounded-lg font-semibold">
                Plan Trip
              </Link>
              <Link to="/my-journal" className="p-3 hover:bg-neutral-50 rounded-lg font-semibold">
                My Journal
              </Link>
              <Link to="/test-auth" className="btn-primary text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">AI-Powered Trip Planning</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-neutral-900 leading-tight">
                Discover India's
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Hidden Gems</span>
              </h1>
              
              <p className="text-lg text-neutral-600">
                Plan perfect trips, optimize routes with AI, and document your journey. 
                Everything you need to explore India's incredible destinations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/explore')}
                  className="btn-primary flex items-center justify-center space-x-2 text-lg py-4"
                >
                  <span>Start Exploring</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigate('/plan-trip')}
                  className="btn-secondary flex items-center justify-center space-x-2 text-lg py-4"
                >
                  <Route className="w-5 h-5" />
                  <span>Plan a Trip</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-primary">1000+</p>
                  <p className="text-sm text-neutral-600">Tourist Places</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">50+</p>
                  <p className="text-sm text-neutral-600">Routes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">4.8★</p>
                  <p className="text-sm text-neutral-600">User Rating</p>
                </div>
              </div>
            </div>

            {}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/India_Gate_in_New_Delhi_03-2016.jpg/800px-India_Gate_in_New_Delhi_03-2016.jpg"
                  alt="India Tourism"
                  className="w-full h-full object-cover"
                />
              </div>
              {}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">Taj Mahal</p>
                    <p className="text-sm text-neutral-600">Agra, UP</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <span className="font-bold text-neutral-900">Saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600">
              Three simple steps to your perfect Indian adventure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-2">
                Popular Routes
              </h2>
              <p className="text-neutral-600">Hand-picked journeys across India</p>
            </div>
            <Link to="/explore" className="btn-secondary flex items-center space-x-2">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {sampleRoutes.map((route, index) => (
              <div 
                key={index}
                className="card hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform">
                  {route.image}
                </div>
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
                  {route.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-neutral-600">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{route.places} places</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Navigation className="w-4 h-4" />
                    <span>{route.time}</span>
                  </span>
                </div>
                <button className="btn-primary w-full mt-4 group-hover:bg-primary-dark transition-colors">
                  Explore Route
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-light mb-8">
            Join thousands of travelers discovering India's beauty
          </p>
          <button 
            onClick={() => navigate('/test-auth')}
            className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center space-x-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {}
      <footer className="bg-neutral-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  🗺️
                </div>
                <span className="text-xl font-heading font-bold">India Tourism</span>
              </div>
              <p className="text-neutral-400 text-sm">
                Your perfect companion for exploring India
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-neutral-400">
                <Link to="/explore" className="block hover:text-white">Explore</Link>
                <Link to="/plan-trip" className="block hover:text-white">Plan Trip</Link>
                <Link to="/my-journal" className="block hover:text-white">Journal</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-neutral-400">
                <a href="#" className="block hover:text-white">About</a>
                <a href="#" className="block hover:text-white">Contact</a>
                <a href="#" className="block hover:text-white">Privacy</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <div className="space-y-2 text-sm text-neutral-400">
                <a href="#" className="block hover:text-white">Twitter</a>
                <a href="#" className="block hover:text-white">Instagram</a>
                <a href="#" className="block hover:text-white">GitHub</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm text-neutral-400">
            <p>&copy; 2025 India Tourism. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;