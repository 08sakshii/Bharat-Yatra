

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, Star, Edit, Trash2, MoreVertical, 
  BookOpen, Share2, Copy, Navigation, Calendar, DollarSign, TrendingUp 
} from 'lucide-react';
import { formatDistance, formatDuration, formatDate } from '../../utils/helpers';
import { ROUTE_STATUS } from '../../utils/constants';

const RouteCard = ({ route, onEdit, onDelete, onToggleFavorite, onUpdateStatus, onDuplicate, onWriteNote }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statusInfo = ROUTE_STATUS.find(s => s.value === route.status) || ROUTE_STATUS[0];
  
  
  const completionPercentage = route.status === 'completed' ? 100 : 
                               route.status === 'in-progress' ? 50 : 0;

  
  const fuelCost = Math.round((route.routeMetrics.totalDistance / 15) * 100);
  
  
  const estimatedTolls = Math.floor(route.routeMetrics.totalDistance / 100);
  const tollCost = estimatedTolls * 50;
  
  const totalCost = fuelCost + tollCost;

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(route._id, newStatus);
    setShowStatusMenu(false);
  };

  const handleWriteNote = () => {
    onWriteNote(route);
  };

  const handleViewDetails = () => {
    navigate(`/route-details/${route._id}`);
  };

  return (
    <div className="card hover:shadow-2xl transition-all relative">
      {}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className="px-3 py-1 rounded-full text-xs font-semibold transition-colors hover:opacity-80"
          style={{ 
            backgroundColor: `${statusInfo.color}20`,
            color: statusInfo.color,
            border: `2px solid ${statusInfo.color}`
          }}
        >
          {statusInfo.label}
        </button>

        {}
        {showStatusMenu && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 w-48 z-20">
            {ROUTE_STATUS.map(status => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-sm flex items-center space-x-2"
                style={{ color: status.color }}
              >
                <span>•</span>
                <span>{status.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {}
      {completionPercentage > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-200 rounded-t-xl overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      )}

      {}
      <div className="flex items-start justify-between mb-4 mt-2">
        <div className="flex-1 min-w-0 pr-12">
          <h3 className="text-lg font-heading font-bold text-neutral-900 truncate mb-1">
            {route.name}
          </h3>
          {route.description && (
            <p className="text-sm text-neutral-600 line-clamp-2">
              {route.description}
            </p>
          )}
        </div>

        {}
        <button
          onClick={() => onToggleFavorite(route._id)}
          className="absolute top-12 right-4"
        >
          <Star 
            className={`w-5 h-5 ${
              route.isFavorite 
                ? 'text-accent fill-accent' 
                : 'text-neutral-400'
            }`}
          />
        </button>
      </div>

      {}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-primary/5 rounded-lg">
          <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-lg font-bold text-neutral-900">
            {route.routeMetrics?.numberOfPlaces || 0}
          </p>
          <p className="text-xs text-neutral-600">Places</p>
        </div>
        
        <div className="text-center p-3 bg-secondary/5 rounded-lg">
          <Navigation className="w-5 h-5 text-secondary mx-auto mb-1" />
          <p className="text-lg font-bold text-neutral-900">
            {route.routeMetrics?.totalDistance ? formatDistance(route.routeMetrics.totalDistance) : '0 km'}
          </p>
          <p className="text-xs text-neutral-600">Distance</p>
        </div>
        
        <div className="text-center p-3 bg-accent/5 rounded-lg">
          <Clock className="w-5 h-5 text-accent mx-auto mb-1" />
          <p className="text-lg font-bold text-neutral-900">
            {route.routeMetrics?.totalDuration ? formatDuration(route.routeMetrics.totalDuration) : '0h'}
          </p>
          <p className="text-xs text-neutral-600">Time</p>
        </div>

        <div className="text-center p-3 bg-green-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-neutral-900">
            ₹{totalCost}
          </p>
          <p className="text-xs text-neutral-600">Est. Cost</p>
        </div>
      </div>

      {}
      {totalCost > 0 && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-neutral-700">⛽ Fuel Cost:</span>
            <span className="font-semibold">₹{fuelCost}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-700">🛣️ Tolls ({estimatedTolls}):</span>
            <span className="font-semibold">₹{tollCost}</span>
          </div>
        </div>
      )}

      {}
      {(route.tripDates?.startDate || route.tripDates?.endDate) && (
        <div className="flex items-center space-x-2 mb-4 text-sm text-neutral-600">
          <Calendar className="w-4 h-4" />
          <span>
            {route.tripDates.startDate && formatDate(route.tripDates.startDate, 'short')}
            {route.tripDates.endDate && ` - ${formatDate(route.tripDates.endDate, 'short')}`}
          </span>
        </div>
      )}

      {}
      <div className="mb-4 flex items-center justify-between">
        <select
          value={route.status}
          onChange={async (e) => {
            try {
              const response = await routesAPI.updateStatus(route._id, e.target.value);
              if (response.success) {
                setRoutes(routes.map(r => 
                  r._id === route._id ? { ...r, status: e.target.value } : r
                ));
              }
            } catch (error) {
              console.error('Update status error:', error);
            }
          }}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 cursor-pointer transition-all ${
            route.status === 'completed' 
              ? 'bg-primary/10 text-primary border-primary' 
              : route.status === 'in-progress'
              ? 'bg-secondary/10 text-secondary border-secondary'
              : 'bg-accent/10 text-accent border-accent'
          }`}
        >
          <option value="planned">○ Planned</option>
          <option value="in-progress">→ In Progress</option>
          <option value="completed">✓ Completed</option>
        </select>
        <span className="text-xs text-neutral-500">
          {formatDate(route.createdAt, 'relative')}
        </span>
      </div>
      {}
      <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
        <p className="text-xs font-semibold text-neutral-700 mb-2">Route:</p>
        <div className="space-y-1">
          {route.places && route.places.slice(0, 3).map((place, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div className="w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                {place.order}
              </div>
              <span className="truncate text-neutral-700">
                {place.place?.name || 'Unknown'}
              </span>
              {place.distanceFromPrevious > 0 && (
                <span className="text-neutral-500 text-[10px]">
                  ({formatDistance(place.distanceFromPrevious)})
                </span>
              )}
            </div>
          ))}
          {route.places && route.places.length > 3 && (
            <p className="text-xs text-neutral-500 ml-6">
              +{route.places.length - 3} more places
            </p>
          )}
        </div>
      </div>

      {}
      <p className="text-xs text-neutral-500 mb-4">
        Created {formatDate(route.createdAt, 'relative')}
      </p>

      {}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleViewDetails}
          className="btn-primary text-sm py-2"
        >
          View Details
        </button>
        
        <button
          onClick={handleWriteNote}
          className="btn-accent text-sm py-2 flex items-center justify-center space-x-1"
        >
          <BookOpen className="w-4 h-4" />
          <span>Write Note</span>
        </button>
      </div>

      {}
      <div className="relative mt-2">
        <button
          onClick={() => setShowActions(!showActions)}
          className="w-full btn-secondary text-sm py-2 flex items-center justify-center space-x-2"
        >
          <MoreVertical className="w-4 h-4" />
          <span>More Actions</span>
        </button>

        {showActions && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-20">
            <button
              onClick={() => {
                onEdit(route);
                setShowActions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-sm flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Route</span>
            </button>
            
            <button
              onClick={() => {
                onDuplicate(route._id);
                setShowActions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-sm flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Duplicate</span>
            </button>
            
            <button
              onClick={() => {
                const url = `${window.location.origin}/route-details/${route._id}`;
                navigator.clipboard.writeText(url);
                alert('Route link copied to clipboard!');
                setShowActions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-sm flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Link</span>
            </button>
            
            <button
              onClick={() => {
                onDelete(route._id);
                setShowActions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm flex items-center space-x-2 text-red-600 border-t border-neutral-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteCard;