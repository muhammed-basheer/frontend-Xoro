import axios from 'axios';

// Create an axios instance with defaults
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

// Request interceptor to handle token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is not 401 or it's already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    
    // Check if the error is due to an expired token
    if (error.response?.data?.tokenExpired) {
      originalRequest._retry = true;
      
      if (isRefreshing) {
        // Wait for the current refresh to complete
        try {
          return new Promise(function(resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
          .then(() => {
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      
      isRefreshing = true;
      
      try {
        // Try to refresh the token
        const response = await api.post('/auth/refresh-token');
        if (response.data.success) {
          processQueue(null);
          return api(originalRequest);
        } else {
          processQueue(new Error('Failed to refresh token'));
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;