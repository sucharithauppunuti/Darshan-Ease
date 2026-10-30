import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('darshanease_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('darshanease_token') || null);
  const [loading, setLoading] = useState(true);

  // Revalidate user on reload if token exists
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('darshanease_token');
      if (storedToken) {
        try {
          const res = await axiosClient.get('/auth/me');
          if (res.data.success && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('darshanease_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Session expired or invalid:', err?.message);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axiosClient.post('/auth/login', { email, password });
    if (res.data.success) {
      const { token: newToken, user: newUser } = res.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('darshanease_token', newToken);
      localStorage.setItem('darshanease_user', JSON.stringify(newUser));
      return newUser;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await axiosClient.post('/auth/register', userData);
    if (res.data.success) {
      const { token: newToken, user: newUser } = res.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('darshanease_token', newToken);
      localStorage.setItem('darshanease_user', JSON.stringify(newUser));
      return newUser;
    }
    throw new Error(res.data.message || 'Registration failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('darshanease_token');
    localStorage.removeItem('darshanease_user');
  };

  const updateCurrentUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('darshanease_user', JSON.stringify(updatedUser));
  };

  const isAdmin = user?.role === 'admin';
  const isDevotee = user?.role === 'devotee';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateCurrentUser,
        isAdmin,
        isDevotee,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
