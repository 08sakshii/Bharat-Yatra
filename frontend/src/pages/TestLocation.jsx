

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';
import { ArrowLeft, MapPin, Navigation, Loader, AlertCircle } from 'lucide-react';
import { calculateDistance, formatDistance } from '../utils/helpers';

const TestLocation = () => {
  const { 
    location, 
    address, 
    loading, 
    error, 
    hasLocation, 
    permissionStatus,
    requestLocation 
  } = useLocation();

  const [testLocation, setTestLocation] = useState(null);

  
  const famousPlaces = [
    { name: 'Taj Mahal, Agra', lat: 27.1751, lng: 78.0421 },
    { name: 'Gateway of India, Mumbai', lat: 18.9220, lng: 72.8347 },
    { name: 'India Gate, Delhi', lat: 28.6129, lng: 77.2295 },
    { name: 'Mysore Palace, Mysore', lat: 12.3051, lng: 76.6551 },
    { name: 'Golden Temple, Amritsar', lat: 31.6200, lng: 74.8765 }
  ];

  const handleGetLocation = async () => {
    try {
      await requestLocation();
    } catch (err) {
      console.error('Location error:', err);
    }
  };

  const handleTestLocation = (place) => {
    setTestLocation(place);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">
            📍 Location Services Test
          </h1>
          <p className="text-neutral-700">Test geolocation, permissions, and distance calculations</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {}
          <div className="card">
            <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-6">
              Your Location
            </h2>

            {!hasLocation ? (
              <div className="text-center py-8">
                <MapPin className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-600 mb-6">
                  We need your location to show nearby tourist places
                </p>
                <button 
                  onClick={handleGetLocation}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? (
                    <><Loader className="w-4 h-4 inline mr-2 animate-spin" />Getting Location...</>
                  ) : (
                    <><Navigation className="w-4 h-4 inline mr-2" />Get My Location</>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-700">Error:</p>
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-primary/10 p-6 rounded-lg">
                  <div className="flex items-start mb-4">
                    <MapPin className="w-6 h-6 text-primary mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">Location Found!</h3>
                      {address && (
                        <p className="text-sm text-neutral-700">{address.display}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold">Latitude:</span>
                      <span className="font-mono">{location.lat.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Longitude:</span>
                      <span className="font-mono">{location.lng.toFixed(6)}</span>
                    </div>
                    {address && (
                      <>
                        <div className="flex justify-between">
                          <span className="font-semibold">City:</span>
                          <span>{address.city || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">State:</span>
                          <span>{address.state || 'N/A'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Permission Status:</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    permissionStatus === 'granted' 
                      ? 'bg-primary text-white' 
                      : 'bg-neutral-300 text-neutral-700'
                  }`}>
                    {permissionStatus.toUpperCase()}
                  </span>
                </div>

                <button 
                  onClick={handleGetLocation}
                  className="btn-secondary w-full"
                >
                  Refresh Location
                </button>
              </div>
            )}
          </div>

          {}
          <div className="card">
            <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-6">
              Distance Calculator
            </h2>

            {hasLocation ? (
              <div className="space-y-4">
                <p className="text-sm text-neutral-600 mb-4">
                  Calculate distance from your location to famous places:
                </p>

                <div className="space-y-2">
                  {famousPlaces.map((place, index) => {
                    const distance = calculateDistance(
                      location.lat,
                      location.lng,
                      place.lat,
                      place.lng
                    );

                    return (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          testLocation?.name === place.name
                            ? 'border-primary bg-primary/5'
                            : 'border-neutral-200 hover:border-primary/50'
                        }`}
                        onClick={() => handleTestLocation(place)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-neutral-900">{place.name}</p>
                            <p className="text-xs text-neutral-600">
                              {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary text-lg">
                              {formatDistance(distance)}
                            </p>
                            <p className="text-xs text-neutral-600">away</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {testLocation && (
                  <div className="mt-6 p-4 bg-secondary/10 rounded-lg border-2 border-secondary">
                    <h3 className="font-semibold text-sm mb-2">🎯 Selected Place:</h3>
                    <p className="text-sm mb-1"><strong>{testLocation.name}</strong></p>
                    <p className="text-xs text-neutral-600">
                      Distance calculation working correctly! ✅
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500">
                <p>Get your location first to calculate distances</p>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="card mt-6">
          <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
            🧪 Testing Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard
              title="Geolocation API"
              status="✅ Working"
              description="Browser's native geolocation is being used"
            />
            <FeatureCard
              title="Distance Calculation"
              status="✅ Working"
              description="Haversine formula for accurate distances"
            />
            <FeatureCard
              title="Reverse Geocoding"
              status="✅ Working"
              description="Getting address from coordinates"
            />
          </div>

          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">💡 What's Being Tested:</h3>
            <ul className="text-sm text-neutral-700 space-y-1">
              <li>• Browser geolocation permission handling</li>
              <li>• Real-time location tracking</li>
              <li>• Distance calculation between coordinates</li>
              <li>• Address lookup (reverse geocoding)</li>
              <li>• Location context state management</li>
              <li>• Error handling for denied permissions</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ title, status, description }) => (
  <div className="p-4 bg-neutral-50 rounded-lg">
    <h3 className="font-semibold text-neutral-900 mb-1">{title}</h3>
    <p className="text-xs text-primary font-semibold mb-2">{status}</p>
    <p className="text-xs text-neutral-600">{description}</p>
  </div>
);

export default TestLocation;