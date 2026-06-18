

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_CONFIG, PLACE_CATEGORIES } from '../../utils/constants';
import { formatDistance, formatDuration } from '../../utils/helpers';
import 'leaflet-polylinedecorator';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const createNumberedIcon = (number, color = '#0B6E66') => {
  return L.divIcon({
    className: 'numbered-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
      ">
        ${number}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const userLocationIcon = L.divIcon({
  className: 'user-marker',
  html: `
    <div style="
      background-color: #FF8C42;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: 0 0 10px rgba(255, 140, 66, 0.5);
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const RouteMap = ({ 
  places = [], 
  userLocation = null,
  onPlaceClick,
  showRoute = true
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);
  const isInitializedRef = useRef(false);

  
  useEffect(() => {
    if (!mapContainerRef.current || isInitializedRef.current) return;

    const mapCenter = userLocation 
      ? [userLocation.lat, userLocation.lng] 
      : MAP_CONFIG.defaultCenter;

    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom: 10,
      scrollWheelZoom: true,
      zoomControl: true
    });

    L.tileLayer(MAP_CONFIG.tileLayer, {
      attribution: MAP_CONFIG.attribution,
      maxZoom: MAP_CONFIG.maxZoom,
      minZoom: MAP_CONFIG.minZoom
    }).addTo(map);

    mapRef.current = map;
    isInitializedRef.current = true;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, []);

  
  useEffect(() => {
    if (!mapRef.current) return;

    
    markersRef.current.forEach(marker => marker.remove());
    polylinesRef.current.forEach(polyline => polyline.remove());
    markersRef.current = [];
    polylinesRef.current = [];

    
    if (userLocation) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userLocationIcon,
        zIndexOffset: 1000
      }).addTo(mapRef.current);

      userMarker.bindPopup(`
        <div class="text-center p-2">
          <p class="font-semibold text-secondary">Starting Point</p>
          <p class="text-xs text-neutral-600">Your current location</p>
        </div>
      `);

      markersRef.current.push(userMarker);
    }

    if (places.length === 0) return;

    
    const coordinates = [];
    if (userLocation) {
      coordinates.push([userLocation.lat, userLocation.lng]);
    }

    places.forEach((place, index) => {
      const lat = place.location.coordinates[1];
      const lng = place.location.coordinates[0];
      coordinates.push([lat, lng]);

      const marker = L.marker([lat, lng], {
        icon: createNumberedIcon(index + 1)
      }).addTo(mapRef.current);

      const popupContent = `
        <div class="p-2 min-w-[200px]">
          <div class="flex items-center space-x-2 mb-2">
            <div class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
              ${index + 1}
            </div>
            <h4 class="font-bold text-neutral-900">${place.name}</h4>
          </div>
          <p class="text-xs text-neutral-600 mb-2">${place.location.city}, ${place.location.state}</p>
          ${place.distanceFromPrevious ? `
            <div class="bg-neutral-100 p-2 rounded text-xs space-y-1">
              <div class="flex justify-between">
                <span class="text-neutral-600">Distance:</span>
                <span class="font-semibold">${formatDistance(place.distanceFromPrevious)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Time:</span>
                <span class="font-semibold">${formatDuration(place.estimatedTime)}</span>
              </div>
            </div>
          ` : ''}
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 250 });

      if (onPlaceClick) {
        marker.on('click', () => onPlaceClick(place));
      }

      markersRef.current.push(marker);
    });

    
    if (showRoute && coordinates.length > 1) {
      const polyline = L.polyline(coordinates, {
        color: '#0B6E66',
        weight: 4,
        opacity: 0.7,
        smoothFactor: 1
      }).addTo(mapRef.current);

      polylinesRef.current.push(polyline);

      
      const decorator = L.polylineDecorator(polyline, {
        patterns: [
          {
            offset: 25,
            repeat: 100,
            symbol: L.Symbol.arrowHead({
              pixelSize: 12,
              pathOptions: {
                fillOpacity: 1,
                weight: 0,
                color: '#0B6E66'
              }
            })
          }
        ]
      }).addTo(mapRef.current);

      polylinesRef.current.push(decorator);

      
      mapRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    } else if (coordinates.length > 0) {
      
      const bounds = L.latLngBounds(coordinates);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [places, userLocation, showRoute, onPlaceClick]);

  return (
    <div className="w-full h-full relative">
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-xl"
        style={{ zIndex: 1 }}
      />

      {}
      {places.length > 0 && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000] max-w-xs">
          <h4 className="font-semibold text-neutral-900 mb-2">Route Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Places:</span>
              <span className="font-semibold">{places.length}</span>
            </div>
            {places.length > 0 && places[0].distanceFromPrevious !== undefined && (
              <>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Total Distance:</span>
                  <span className="font-semibold">
                    {formatDistance(
                      places.reduce((sum, p) => sum + (p.distanceFromPrevious || 0), 0)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Total Time:</span>
                  <span className="font-semibold">
                    {formatDuration(
                      places.reduce((sum, p) => sum + (p.estimatedTime || 0), 0)
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <p className="text-xs font-semibold text-neutral-900 mb-2">Legend</p>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary border-2 border-white"></div>
            <span className="text-xs">Start Point</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary border-2 border-white"></div>
            <span className="text-xs">Destinations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-0.5 bg-primary"></div>
            <span className="text-xs">Route Path</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;