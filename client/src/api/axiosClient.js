import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: attach JWT
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('darshanease_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: handle 401 unauthorized / expired tokens
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired
      const token = localStorage.getItem('darshanease_token');
      if (token) {
        localStorage.removeItem('darshanease_token');
        localStorage.removeItem('darshanease_user');
        // If not already on login page, redirect
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
          window.location.href = '/login?sessionExpired=true';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
