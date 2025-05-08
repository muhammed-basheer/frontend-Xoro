import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Only apply token refresh for authenticated routes, not for login/signup
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Don't attempt to refresh token for auth endpoints
    const isAuthEndpoint = originalRequest.url.includes('/auth/signin') || 
                          originalRequest.url.includes('/auth/signup');
    
    if (error.response.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh-token');
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        console.log('Token refresh failed, redirecting to login');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;