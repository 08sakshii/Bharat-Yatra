

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, X, Navigation, Zap, Save, Trash2, AlertCircle } from 'lucide-react';
import { formatDistance, formatDuration } from '../../utils/helpers';

const RouteBuilder = ({ 
  selectedPlaces = [], 
  onRemovePlace,
  onReorderPlaces,
  onOptimize,
  onSaveRoute,
  onClearAll,
  userLocation
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(selectedPlaces);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorderPlaces(items);
  };
  
  const handleOptimize = async () => {
    if (!userLocation) {
      alert('Please enable location to optimize route');
      return;
    }

    setIsOptimizing(true);
    try {
      const result = await onOptimize();
      setOptimizedRoute(result);
      setShowComparison(true);
    } catch (error) {
      console.error('Optimization error:', error);
      alert('Failed to optimize route');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleUseOptimized = () => {
    if (optimizedRoute && optimizedRoute.optimized) {
      const reordered = optimizedRoute.optimized.places.map(p => p.placeData);
      onReorderPlaces(reordered);
      setShowComparison(false);
    }
  };

  const handleKeepOriginal = () => {
    setShowComparison(false);
  };

  const calculateTotalDistance = (places) => {
    if (!places || places.length === 0) return 0;
    return places.reduce((sum, place) => sum + (place.distanceFromPrevious || 0), 0);
  };

  const calculateTotalTime = (places) => {
    if (!places || places.length === 0) return 0;
    return places.reduce((sum, place) => sum + (place.estimatedTime || 0), 0);
  };

  if (selectedPlaces.length === 0) {
    return (
      <div className="card text-center py-12">
        <Navigation className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-neutral-700 mb-2">
          No Places Selected
        </h3>
        <p className="text-sm text-neutral-500">
          Click on map markers or cards to add places to your route
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-bold text-neutral-900">
              Your Route
            </h3>
            <p className="text-sm text-neutral-600">
              {selectedPlaces.length} places selected
            </p>
          </div>
          <button
            onClick={handleOptimize}
            disabled={isOptimizing || selectedPlaces.length < 2}
            className="btn-accent flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>{isOptimizing ? 'Optimizing...' : 'Optimize Route'}</span>
          </button>
        </div>

        {}
        <div className="bg-accent/10 border-l-4 border-accent p-3 rounded mb-4">
          <p className="text-sm text-neutral-700">
            <strong>Tip:</strong> Drag and drop to reorder places, or click "Optimize" for the shortest route
          </p>
        </div>
      </div>

      {}
      {showComparison && optimizedRoute && (
        <div className="card bg-primary/5 border-2 border-primary">
          <div className="flex items-start space-x-2 mb-4">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-neutral-900 mb-1">Route Optimized!</h4>
              <p className="text-sm text-neutral-600">
                Choose which route to use:
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {}
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-neutral-900 mb-3">Original Order</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Distance:</span>
                  <span className="font-semibold">
                    {formatDistance(optimizedRoute.original.metrics.totalDistance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Time:</span>
                  <span className="font-semibold">
                    {formatDuration(optimizedRoute.original.metrics.totalDuration)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleKeepOriginal}
                className="btn-secondary w-full mt-3"
              >
                Keep This
              </button>
            </div>

            {}
            <div className="bg-primary p-4 rounded-lg text-white">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold">Optimized Route</h5>
                <span className="badge bg-accent text-neutral-900">
                  -{optimizedRoute.savings.percentage}%
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-light">Distance:</span>
                  <span className="font-semibold">
                    {formatDistance(optimizedRoute.optimized.metrics.totalDistance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-light">Time:</span>
                  <span className="font-semibold">
                    {formatDuration(optimizedRoute.optimized.metrics.totalDuration)}
                  </span>
                </div>
                <div className="pt-2 mt-2 border-t border-primary-light">
                  <p className="text-xs text-primary-light">You save:</p>
                  <p className="font-semibold">
                    {formatDistance(optimizedRoute.savings.distance)} &
                    {formatDuration(optimizedRoute.savings.time)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleUseOptimized}
                className="btn-accent w-full mt-3"
              >
                Use Optimized
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <div className="card">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="places">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {selectedPlaces.map((place, index) => (
                  <Draggable
                    key={place._id}
                    draggableId={place._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg border-2 transition-all ${
                          snapshot.isDragging
                            ? 'border-primary shadow-lg'
                            : 'border-transparent hover:border-neutral-300'
                        }`}
                      >
                        <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-5 h-5 text-neutral-400" />
                        </div>

                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-neutral-900 truncate">
                            {place.name}
                          </p>
                          <p className="text-xs text-neutral-600 truncate">
                            {place.location.city}, {place.location.state}
                          </p>
                        </div>

                        <button
                          onClick={() => onRemovePlace(place._id)}
                          className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onSaveRoute(selectedPlaces)}
          disabled={selectedPlaces.length < 2}
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Route</span>
        </button>
        <button
          onClick={onClearAll}
          disabled={selectedPlaces.length === 0}
          className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            selectedPlaces.length === 0 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white border-2 border-red-500/30 hover:border-red-500'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};

export default RouteBuilder;