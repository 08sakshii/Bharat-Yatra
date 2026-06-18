

import { MapPin, Star, Clock, DollarSign } from 'lucide-react';
import { formatDistance } from '../../utils/helpers';

const PlacePopup = ({ place }) => {
  return (
    <div className="p-2 min-w-[250px]">
      {}
      {place.images && place.images.length > 0 && (
        <img 
          src={place.images[0].url} 
          alt={place.name}
          className="w-full h-32 object-cover rounded-lg mb-2"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      )}

      {}
      <h3 className="font-heading font-bold text-lg text-neutral-900 mb-1">
        {place.name}
      </h3>

      {}
      <div className="mb-2">
        <span className="badge text-xs">
          {place.category}
        </span>
      </div>

      {}
      <div className="flex items-start space-x-2 mb-2 text-sm">
        <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <span className="text-neutral-600 text-xs">
          {place.location.city}, {place.location.state}
        </span>
      </div>

      {}
      {place.distance !== undefined && (
        <div className="text-sm mb-2">
          <span className="font-semibold text-primary">
            {formatDistance(place.distance)} away
          </span>
        </div>
      )}

      {}
      {place.ratings && place.ratings.average > 0 && (
        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="font-semibold text-sm">
            {place.ratings.average.toFixed(1)}
          </span>
          <span className="text-xs text-neutral-600">
            ({place.ratings.count} reviews)
          </span>
        </div>
      )}

      {}
      {place.details?.entryFee && (
        <div className="flex items-center space-x-2 text-xs text-neutral-600 mb-2">
          <DollarSign className="w-3 h-3" />
          <span>Entry: {place.details.entryFee.indian}</span>
        </div>
      )}

      {}
      {place.details?.timings && (
        <div className="flex items-center space-x-2 text-xs text-neutral-600 mb-3">
          <Clock className="w-3 h-3" />
          <span>
            {place.details.timings.opening} - {place.details.timings.closing}
          </span>
        </div>
      )}

      {}
      <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
        {place.description}
      </p>

      {}
      <button className="btn-primary w-full text-sm py-2">
        View Details
      </button>
    </div>
  );
};

export default PlacePopup;