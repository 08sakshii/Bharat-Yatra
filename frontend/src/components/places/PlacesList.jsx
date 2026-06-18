

import { useState, useEffect } from 'react';
import PlaceCard from './PlaceCard';
import { Search, Filter, MapPin, Loader } from 'lucide-react';
import { PLACE_CATEGORIES, DISTANCE_FILTERS } from '../../utils/constants';

const PlacesList = ({
  places = [],
  loading = false,
  onViewDetails,
  onSave,
  savedPlaces = [],
  onFilterChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistance, setSelectedDistance] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 10;

  
  const filteredPlaces = places.filter(place => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (place.description && place.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || place.category === selectedCategory;

    const matchesDistance =
      selectedDistance === 'all' ||
      (place.distance && place.distance <= parseFloat(selectedDistance));

    return matchesSearch && matchesCategory && matchesDistance;
  });

  
  const totalPages = Math.ceil(filteredPlaces.length / placesPerPage);
  const startIndex = (currentPage - 1) * placesPerPage;
  const currentPlaces = filteredPlaces.slice(startIndex, startIndex + placesPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        category: selectedCategory,
        distance: selectedDistance,
        search: searchQuery
      });
    }
    setShowFilters(false);
    
    setCurrentPage(1);
  };

  useEffect(() => {
    
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredPlaces.length, totalPages, currentPage]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#021E1B] via-[#033830] to-[#021E1B] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
      {}
      <div className="p-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-lg border-2 transition-colors ${
              showFilters
                ? 'bg-[#FF8C42] text-white border-[#FF8C42]'
                : 'bg-white/10 text-white border-white/20 hover:border-[#FF8C42]'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {}
        {showFilters && (
          <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg space-y-4 border border-white/20">
            {}
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white"
              >
                <option value="all" className="bg-[#021E1B] text-white">All Categories</option>
                {PLACE_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value} className="bg-[#021E1B] text-white">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {}
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Distance
              </label>
              <select
                value={selectedDistance}
                onChange={(e) => {
                  setSelectedDistance(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white"
              >
                <option value="all" className="bg-[#021E1B] text-white">Any Distance</option>
                {DISTANCE_FILTERS.map(filter => (
                  <option key={filter.value} value={filter.value} className="bg-[#021E1B] text-white">
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>

            {}
            <button
              onClick={handleApplyFilters}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#ff6b1f] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>

      {}
      <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/80">
            <span className="font-semibold text-[#FF8C42]">{filteredPlaces.length}</span> places found
          </p>
          {selectedCategory !== 'all' || selectedDistance !== 'all' || searchQuery ? (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDistance('all');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-sm text-[#FF8C42] hover:text-[#ff6b1f] font-semibold transition"
            >
              Clear Filters
            </button>
          ) : null}
        </div>
      </div>

      {}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader className="w-12 h-12 text-[#FF8C42] animate-spin mx-auto mb-4" />
              <p className="text-white/80">Loading places...</p>
            </div>
          </div>
        ) : filteredPlaces.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No places found
              </h3>
              <p className="text-sm text-white/60">
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPlaces.map(place => (
                <PlaceCard
                  key={place._id || place.id}
                  place={place}
                  onClick={() => onViewDetails(place)}
                  onSave={onSave}
                  isSaved={savedPlaces.includes(place._id || place.id)}
                />
              ))}
            </div>

            {}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                <span className="text-white text-sm font-semibold">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlacesList;