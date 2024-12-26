import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Your Laravel API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage if available
    const token = localStorage.getItem('authToken');
    if (token) {
      // If a token exists, attach it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // If there's an error before the request is sent, reject it
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response if needed (e.g., logging)
    return response;
  },
  (error) => {
    // Handle errors globally, for example, token expiry
    if (error.response && error.response.status === 401) {
      // If a 401 Unauthorized error occurs, log out the user
      localStorage.clear();  // Optionally clear all localStorage
      window.location.href = '/login';  // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// Utility functions for login/signup, etc. (same as your original code)

export const loginUser = (response) => {
  const { user, token } = response.data;
  localStorage.setItem('authToken', token);
  localStorage.setItem('userName', user.name);
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('userRole', user.role);
  localStorage.setItem('userId', user.id);

  // No need to manually set the Authorization header anymore, the request interceptor will handle it
};

export const signupUser = (response) => {
  const { user, token } = response.data;
  localStorage.setItem('authToken', token);
  localStorage.setItem('userName', user.name);
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('userRole', 'user');
  localStorage.setItem('userId', user.id);
};

// Logout function (clearing localStorage and resetting Authorization header)
export const logoutUser = () => {
  localStorage.clear();  // Clears all localStorage
  delete axiosInstance.defaults.headers['Authorization'];  // Reset Authorization header
};

export default axiosInstance;
