// Authentication Context for managing user login state
import { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../utils/api';

// Create the context
const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap our app and make auth object available to any child component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        const response = await authApi.getProfile();
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    setError(null);
    
    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to login');
      throw error;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setError(null);
    
    try {
      const response = await authApi.register({ name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register');
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Value object that will be passed to consumers of this context
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  };

  // Return the provider with the value object
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
