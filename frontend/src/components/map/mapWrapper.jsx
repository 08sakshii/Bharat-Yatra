

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-polylinedecorator';
import { MAP_CONFIG, PLACE_CATEGORIES } from '../../utils/constants';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const createCustomIcon = (category) => {
  const categoryData = PLACE_CATEGORIES.find(cat => cat.value === category) || PLACE_CATEGORIES[0];
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${categoryData.color};
        width: 35px;
        height: 35px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="transform: rotate(45deg); font-size: 18px;">${categoryData.icon}</span>
      </div>
    `,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });
};


const createNumberedIcon = (number, color = '#FF8C42') => {
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
        font-weight: bold;
        color: white;
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
      background-color: #0B6E66;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: 0 0 10px rgba(11, 110, 102, 0.5);
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const MapWrapper = ({ 
  center = MAP_CONFIG.defaultCenter,
  zoom = MAP_CONFIG.defaultZoom,
  places = [],
  userLocation = null,
  onPlaceClick,
  optimizedRoute = null 
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const routeLayerRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  
  useEffect(() => {
    if (!mapContainerRef.current || isInitialized) return;

    
    const mapCenter = userLocation 
      ? [userLocation.lat, userLocation.lng] 
      : center;

    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom: zoom,
      scrollWheelZoom: true,
      zoomControl: true
    });

    
    L.tileLayer(MAP_CONFIG.tileLayer, {
      attribution: MAP_CONFIG.attribution,
      maxZoom: MAP_CONFIG.maxZoom,
      minZoom: MAP_CONFIG.minZoom
    }).addTo(map);

    mapRef.current = map;
    setIsInitialized(true);

    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setIsInitialized(false);
      }
    };
  }, []);

  
  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], mapRef.current.getZoom(), {
        animate: true
      });
    }
  }, [userLocation]);

  
  useEffect(() => {
    if (!mapRef.current) {
      console.log('❌ Map not initialized yet');
      return;
    }

    console.log('🗺️ Updating markers. Places count:', places.length);
    console.log('📍 User location:', userLocation);
    console.log('🛣️ Optimized route:', optimizedRoute);

    
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    
    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    
    if (userLocation) {
      console.log('✅ Adding user marker at:', [userLocation.lat, userLocation.lng]);
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userLocationIcon,
        zIndexOffset: 1000
      }).addTo(mapRef.current);

      userMarker.bindPopup(`
        <div class="text-center p-2">
          <p class="font-semibold text-primary">You are here</p>
          <p class="text-xs text-neutral-600">Your current location</p>
        </div>
      `);

      markersRef.current.push(userMarker);
    }

    
    if (optimizedRoute && optimizedRoute.places && optimizedRoute.places.length > 0) {
      console.log('🛣️ Drawing route with', optimizedRoute.places.length, 'waypoints');
      
      
      const routeCoords = [];
      
      
      if (userLocation) {
        routeCoords.push([userLocation.lat, userLocation.lng]);
      }

      
      optimizedRoute.places.forEach((item, index) => {
        const place = item.placeDetails || item;
        const lat = place.location.coordinates[1];
        const lng = place.location.coordinates[0];
        
        routeCoords.push([lat, lng]);

        
        const marker = L.marker([lat, lng], {
          icon: createNumberedIcon(index + 1, '#FF8C42'),
          zIndexOffset: 500
        }).addTo(mapRef.current);

        
        const popupContent = `
          <div class="p-3 min-w-[250px]">
            <div class="flex items-center space-x-2 mb-2">
              <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold">
                ${index + 1}
              </span>
              <h3 class="font-heading font-bold text-lg text-neutral-900">${place.name}</h3>
            </div>
            ${place.images?.[0]?.url ? `
              <img 
                src="${place.images[0].url}" 
                alt="${place.name}"
                class="w-full h-32 object-cover rounded-lg mb-2"
                onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'"
              />
            ` : ''}
            <span class="badge text-xs mb-2 inline-block">${place.category}</span>
            <p class="text-sm text-neutral-600">${place.location.city}, ${place.location.state}</p>
            ${item.distanceFromPrevious !== undefined ? `
              <div class="mt-2 p-2 bg-primary/10 rounded">
                <p class="text-xs text-neutral-600">From previous:</p>
                <p class="text-sm font-semibold text-primary">${item.distanceFromPrevious.toFixed(1)} km • ${Math.round(item.estimatedTime)} min</p>
              </div>
            ` : ''}
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 300 });
        markersRef.current.push(marker);
      });

      
      const routeLine = L.polyline(routeCoords, {
        color: '#FF8C42',
        weight: 4,
        opacity: 0.7,
        smoothFactor: 1,
        dashArray: '10, 5'
      }).addTo(mapRef.current);

      
      const decorator = L.polylineDecorator(routeLine, {
        patterns: [
          {
            offset: '5%',
            repeat: 50,
            symbol: L.Symbol.arrowHead({
              pixelSize: 12,
              polygon: false,
              pathOptions: { 
                stroke: true,
                color: '#FF8C42',
                weight: 2
              }
            })
          }
        ]
      });

      routeLayerRef.current = L.layerGroup([routeLine, decorator]).addTo(mapRef.current);

      
      const bounds = L.latLngBounds(routeCoords);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });

    } else {
      
      places.forEach((place, index) => {
        const lat = place.location.coordinates[1];
        const lng = place.location.coordinates[0];
        
        console.log(`📌 Adding marker ${index + 1}:`, {
          name: place.name,
          lat,
          lng,
          category: place.category
        });

        const marker = L.marker([lat, lng], { 
          icon: createCustomIcon(place.category) 
        }).addTo(mapRef.current);

        
        const popupContent = `
          <div class="p-2 min-w-[250px]">
            ${place.images?.[0]?.url ? `
              <img 
                src="${place.images[0].url}" 
                alt="${place.name}"
                class="w-full h-32 object-cover rounded-lg mb-2"
                onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'"
              />
            ` : ''}
            <h3 class="font-heading font-bold text-lg text-neutral-900 mb-1">${place.name}</h3>
            <span class="badge text-xs">${place.category}</span>
            <p class="text-sm text-neutral-600 mt-2">${place.location.city}, ${place.location.state}</p>
            ${place.distance !== undefined ? `
              <p class="text-sm font-semibold text-primary mt-2">${place.distance.toFixed(1)} km away</p>
            ` : ''}
            ${place.ratings?.average ? `
              <div class="flex items-center space-x-2 mt-2">
                <span class="text-sm font-semibold">⭐ ${place.ratings.average.toFixed(1)}</span>
                <span class="text-xs text-neutral-600">(${place.ratings.count} reviews)</span>
              </div>
            ` : ''}
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 300 });

        if (onPlaceClick) {
          marker.on('click', () => onPlaceClick(place));
        }

        markersRef.current.push(marker);
      });
    }

    console.log(`✅ Total markers added: ${markersRef.current.length}`);
  }, [places, userLocation, onPlaceClick, optimizedRoute]);

  return (
    <div className="w-full h-full relative">
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-xl"
        style={{ zIndex: 1 }}
      />

      {}

      {}
      {optimizedRoute && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
          <h3 className="text-xs font-semibold text-neutral-900 mb-2">Route Summary</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-primary border-2 border-white">Distance:</span>
              <span className="text-xs">{optimizedRoute.metrics.totalDistance.toFixed(1)} km</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-secondary border-2 border-white">Duration:</span>
              <span className="text-xs">{Math.round(optimizedRoute.metrics.totalDuration / 60)}h {optimizedRoute.metrics.totalDuration % 60}m</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-0.5 bg-secondary">Places:</span>
              <span className="text-xs">{optimizedRoute.metrics.numberOfPlaces}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full border-2 border-white">Est. Days:</span>
              <span className="text-xs">{optimizedRoute.metrics.estimatedDays}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWrapper;