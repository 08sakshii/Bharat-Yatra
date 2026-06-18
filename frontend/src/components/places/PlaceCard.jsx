

import { MapPin, Star, Clock, Navigation } from 'lucide-react';
import { formatDistance } from '../../utils/helpers';

const PlaceCard = ({ place, onClick, showDistance = false }) => {
  
  const getImageUrl = () => {
    if (place.images && place.images.length > 0 && place.images[0].url) {
      return place.images[0].url;
    }
    
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div 
      className="card hover:shadow-xl transition-all cursor-pointer"
      onClick={onClick}
    >
      {}
      {imageUrl && (
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-neutral-100">
          <img
            src={imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              
              e.target.style.display = 'none';
            }}
          />
          {place.category && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">
              {place.category}
            </div>
          )}
        </div>
      )}

      {}
      {!imageUrl && (
        <div className="h-48 mb-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          <MapPin className="w-16 h-16 text-neutral-300" />
        </div>
      )}

      {}
      <div>
        <h3 className="text-lg font-heading font-bold text-neutral-900 mb-2 line-clamp-2">
          {place.name}
        </h3>

        {}
        <div className="flex items-center text-sm text-neutral-600 mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">
            {place.location?.city && place.location?.state
              ? `${place.location.city}, ${place.location.state}`
              : place.location?.address || 'Location not available'}
          </span>
        </div>

        {}
        {place.ratings?.average > 0 && (
          <div className="flex items-center text-sm mb-3">
            <Star className="w-4 h-4 text-accent fill-accent mr-1" />
            <span className="font-semibold text-neutral-900">
              {place.ratings.average.toFixed(1)}
            </span>
            <span className="text-neutral-600 ml-1">
              ({place.ratings.count || 0} reviews)
            </span>
          </div>
        )}

        {}
        {showDistance && place.distance && (
          <div className="flex items-center text-sm text-primary font-semibold">
            <Navigation className="w-4 h-4 mr-1" />
            <span>{formatDistance(place.distance)} away</span>
          </div>
        )}

        {}
        {place.description && (
          <p className="text-sm text-neutral-600 line-clamp-2 mt-2">
            {place.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;