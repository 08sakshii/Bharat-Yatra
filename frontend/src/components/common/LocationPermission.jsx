import { useState } from "react";
import { MapPin, Navigation, RefreshCw, Search } from "lucide-react";
import { externalAPI } from "../../services/api";

const LocationPermission = ({ onLocationGranted, onManualLocation }) => {
  const [mode, setMode] = useState("auto"); // 'auto' | 'manual'
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleAutoDetect = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(
        "Your browser does not support location. Please use manual entry.",
      );
      setLoading(false);
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
      });

      onLocationGranted({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (err) {
      if (err.code === 1) {
        setError(
          "Location permission denied. Allow it in your browser settings or use manual entry.",
        );
      } else if (err.code === 2) {
        setError(
          "Location is unavailable on this device. Please use manual entry.",
        );
      } else if (err.code === 3) {
        setError(
          "Location request timed out. Please try again or use manual entry.",
        );
      } else {
        setError("Unable to determine your location. Please use manual entry.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await externalAPI.geocode(searchQuery);
      setSearchResults(results || []);

      if (!results || results.length === 0) {
        setError("No locations found. Try a different search.");
      }
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (result) => {
    onManualLocation(
      { lat: parseFloat(result.lat), lng: parseFloat(result.lon) },
      result.display_name,
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B6E66] to-[#0D8078] p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">Set Your Location</h2>
            <button
              onClick={() => {
                setMode(mode === "auto" ? "manual" : "auto");
                setError(null);
              }}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="Switch Mode">
              <RefreshCw className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/90 text-sm">
            {mode === "auto"
              ? "Enable location access to discover places nearby"
              : "Search and select your location manually"}
          </p>
        </div>

        {/* Body */}
        {mode === "auto" ? (
          <div className="p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0B6E66]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-10 h-10 text-[#0B6E66]" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Auto-Detect Location
              </h3>

              <p className="text-gray-600 mb-6 text-sm">
                We'll use your device's location to show you nearby tourist
                attractions and plan your perfect trip.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleAutoDetect}
              disabled={loading}
              className="w-full bg-[#0B6E66] text-white py-3 rounded-xl font-semibold hover:bg-[#095952] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Detecting...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5" />
                  <span>Enable Location</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setMode("manual");
                setError(null);
              }}
              className="w-full mt-3 text-[#0B6E66] py-2 text-sm font-semibold hover:underline">
              Enter location manually instead
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#F4B400]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-[#F4B400]" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Manual Location Entry
              </h3>

              <p className="text-gray-600 mb-4 text-sm">
                Search for your city or area
              </p>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Enter city or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B6E66] focus:outline-none text-gray-900 placeholder:text-gray-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <button
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim()}
              className="w-full bg-[#F4B400] text-[#021E1B] py-3 rounded-xl font-semibold hover:brightness-110 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4">
              {loading ? "Searching..." : "Search Location"}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectLocation(result)}
                    className="w-full text-left p-3 border-2 border-gray-200 hover:border-[#0B6E66] rounded-lg transition-colors">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 text-[#0B6E66] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">
                          {result.display_name.split(",")[0]}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {result.display_name}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setMode("auto");
                setError(null);
              }}
              className="w-full mt-3 text-[#0B6E66] py-2 text-sm font-semibold hover:underline">
              Use auto-detect instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPermission;
