

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { routesAPI } from '../services/api';
import RouteMap from '../components/routes/RouteMap';
import { MapIcon } from 'lucide-react'; 
import { 
  MapPin, Clock, Calendar, Edit, BookOpen,
  Navigation, Share2, Download, Loader, DollarSign,
  Fuel, Receipt, TrendingUp
} from 'lucide-react';
import { formatDistance, formatDuration, formatDate } from '../utils/helpers';
import { ROUTE_STATUS } from '../utils/constants';

const RouteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditDates, setShowEditDates] = useState(false);
  const [tripDates, setTripDates] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchRoute();
  }, [id]);

  const fetchRoute = async () => {
    setLoading(true);
    try {
      const response = await routesAPI.getById(id);
      if (response.success) {
        setRoute(response.data);
        if (response.data.tripDates) {
          setTripDates({
            startDate: response.data.tripDates.startDate ? 
              new Date(response.data.tripDates.startDate).toISOString().split('T')[0] : '',
            endDate: response.data.tripDates.endDate ? 
              new Date(response.data.tripDates.endDate).toISOString().split('T')[0] : ''
          });
        }
      }
    } catch (error) {
      console.error('Fetch route error:', error);
      alert('Failed to load route');
      navigate('/my-routes');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await routesAPI.update(id, { status: newStatus });
      if (response.success) {
        setRoute(response.data);
      }
    } catch (error) {
      console.error('Update status error:', error);
    }
  };

  const handleUpdateDates = async () => {
    try {
      const response = await routesAPI.update(id, { tripDates });
      if (response.success) {
        setRoute(response.data);
        setShowEditDates(false);
      }
    } catch (error) {
      console.error('Update dates error:', error);
    }
  };

  const handleWriteNote = () => {
    navigate('/my-journal', { 
      state: { 
        prefillRoute: route 
      } 
    });
  };

  const handleExport = async () => {
    try {
      await routesAPI.export(id, route.name);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading route details...</p>
        </div>
      </div>
    );
  }

  if (!route) {
    return null;
  }

  const statusInfo = ROUTE_STATUS.find(s => s.value === route.status) || ROUTE_STATUS[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {}
      <header className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/my-routes')}
              className="hover:text-primary-light"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-heading font-bold">{route.name}</h1>
              {route.description && (
                <p className="text-sm text-primary-light mt-1">{route.description}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {}
          <div className="lg:col-span-1 space-y-6">
            {}
            <div className="card">
              <h3 className="font-semibold text-neutral-900 mb-3">Route Status</h3>
              <div className="space-y-2">
                {ROUTE_STATUS.map(status => (
                  <button
                    key={status.value}
                    onClick={() => handleUpdateStatus(status.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      route.status === status.value
                        ? 'border-current shadow-md'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    style={{ 
                      color: route.status === status.value ? status.color : 'inherit',
                      backgroundColor: route.status === status.value ? `${status.color}10` : 'white'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{status.label}</span>
                      {route.status === status.value && <span>✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {}
            <div className="card">
              <h3 className="font-semibold text-neutral-900 mb-4">Route Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-sm text-neutral-700">Places</span>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {route.routeMetrics.numberOfPlaces}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-secondary" />
                    <span className="text-sm text-neutral-700">Distance</span>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {formatDistance(route.routeMetrics.totalDistance)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-sm text-neutral-700">Duration</span>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {formatDuration(route.routeMetrics.totalDuration)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-neutral-100 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-neutral-600" />
                    <span className="text-sm text-neutral-700">Est. Days</span>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {route.routeMetrics.estimatedDays}
                  </span>
                </div>
              </div>
            </div>

            {}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-neutral-900">Trip Dates</h3>
                <button
                  onClick={() => setShowEditDates(!showEditDates)}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              {showEditDates ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={tripDates.startDate}
                      onChange={(e) => setTripDates({ ...tripDates, startDate: e.target.value })}
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={tripDates.endDate}
                      onChange={(e) => setTripDates({ ...tripDates, endDate: e.target.value })}
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateDates}
                      className="btn-primary flex-1 text-sm py-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowEditDates(false)}
                      className="btn-secondary flex-1 text-sm py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  {route.tripDates?.startDate ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Start:</span>
                        <span className="font-semibold">
                          {formatDate(route.tripDates.startDate, 'long')}
                        </span>
                      </div>
                      {route.tripDates.endDate && (
                        <div className="flex justify-between">
                          <span className="text-neutral-600">End:</span>
                          <span className="font-semibold">
                            {formatDate(route.tripDates.endDate, 'long')}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-neutral-500 text-center py-2">
                      No dates set
                    </p>
                  )}
                </div>
              )}
            </div>

            {}
            <div className="space-y-2">
              <button
                onClick={handleWriteNote}
                className="btn-accent w-full flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Write Journal Entry</span>
              </button>

              <button
                onClick={handleExport}
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Export Route</span>
              </button>

              <button
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard.writeText(url);
                  alert('Link copied!');
                }}
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Route</span>
              </button>
            </div>
          </div>

          {}
          <div className="lg:col-span-2 space-y-6">
            {}
            <div className="card p-0 overflow-hidden">
              <div className="h-[400px]">
                <RouteMap
                  places={route.places.map(p => ({
                    ...p.place,
                    distanceFromPrevious: p.distanceFromPrevious,
                    estimatedTime: p.estimatedTime
                  }))}
                  showRoute={true}
                />
              </div>
            </div>

            {}
            <div className="card">
              <h3 className="text-xl font-heading font-bold text-neutral-900 mb-4">
                Route Details
              </h3>
              
              <div className="space-y-3">
                {route.places.map((placeStop, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    {}
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {placeStop.order}
                    </div>

                    {}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-900 mb-1">
                        {placeStop.place?.name || 'Unknown Place'}
                      </h4>
                      <p className="text-sm text-neutral-600 mb-2">
                        {placeStop.place?.location?.city}, {placeStop.place?.location?.state}
                      </p>

                      {placeStop.distanceFromPrevious > 0 && (
                        <div className="flex items-center space-x-4 text-xs text-neutral-600">
                          <div className="flex items-center space-x-1">
                            <Navigation className="w-3 h-3" />
                            <span>{formatDistance(placeStop.distanceFromPrevious)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDuration(placeStop.estimatedTime)}</span>
                          </div>
                        </div>
                      )}

                      {placeStop.notes && (
                        <p className="text-sm text-neutral-700 mt-2 italic">
                          "{placeStop.notes}"
                        </p>
                      )}
                    </div>

                    {}
                    {placeStop.place?.images?.[0] && (
                      <img
                        src={placeStop.place.images[0].url}
                        alt={placeStop.place.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RouteDetails;