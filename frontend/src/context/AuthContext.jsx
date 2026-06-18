

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { storage, STORAGE_KEYS } from '../utils/helpers';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        const response = await authAPI.getProfile();
        if (response.success) {
          setUser(response.data);
        } else {
          storage.remove(STORAGE_KEYS.AUTH_TOKEN);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      return response;
    } catch (error) {
      setError(error.message || 'Registration failed');
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      
      if (response.success) {
        storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token);
        setUser(response.data);
        return response;
      }
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      setUser(null);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.updateProfile(userData);
      
      if (response.success) {
        setUser(response.data);
      }
      return response;
    } catch (error) {
      setError(error.message || 'Profile update failed');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};