

import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentLocation, storage, STORAGE_KEYS } from '../utils/helpers';
import { externalAPI } from '../services/api';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const [needsPermission, setNeedsPermission] = useState(false);

  useEffect(() => {
    const savedLocation = storage.get(STORAGE_KEYS.LAST_LOCATION);
    if (savedLocation) {
      setLocation(savedLocation);
      setNeedsPermission(false);
    } else {
      setNeedsPermission(true);
    }
    
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionStatus(result.state);
        result.addEventListener('change', () => {
          setPermissionStatus(result.state);
        });
      });
    }
  }, []);

  const requestLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const position = await getCurrentLocation();
      setLocation(position);
      storage.set(STORAGE_KEYS.LAST_LOCATION, position);
      
      await getAddressFromCoords(position.lat, position.lng);
      
      setPermissionStatus('granted');
      setNeedsPermission(false);
      return position;
    } catch (err) {
      const errorMessage = err.code === 1 
        ? 'Location access denied. Please enable location services.'
        : 'Unable to get your location. Please try again.';
      
      setError(errorMessage);
      setPermissionStatus('denied');
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const data = await externalAPI.reverseGeocode(lat, lng);
      if (data && data.address) {
        const formattedAddress = {
          city: data.address.city || data.address.town || data.address.village,
          state: data.address.state,
          country: data.address.country,
          display: data.display_name
        };
        setAddress(formattedAddress);
        return formattedAddress;
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
    }
  };

  const updateLocation = async (newLocation, displayName = null) => {
    setLocation(newLocation);
    storage.set(STORAGE_KEYS.LAST_LOCATION, newLocation);
    setNeedsPermission(false);
    
    if (displayName) {
      setAddress({ display: displayName });
    } else if (newLocation.lat && newLocation.lng) {
      await getAddressFromCoords(newLocation.lat, newLocation.lng);
    }
  };

  const clearLocation = () => {
    setLocation(null);
    setAddress(null);
    storage.remove(STORAGE_KEYS.LAST_LOCATION);
    setNeedsPermission(true);
  };

  const value = {
    location,
    address,
    loading,
    error,
    permissionStatus,
    hasLocation: !!location,
    needsPermission,
    requestLocation,
    updateLocation,
    clearLocation,
    getAddressFromCoords
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;