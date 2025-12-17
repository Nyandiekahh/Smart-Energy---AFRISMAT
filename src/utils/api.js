import axios from 'axios';

// Base URL for the Django REST Framework backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          break;
      }
    } else if (error.request) {
      console.error('Network error - no response received');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  // User registration
  register: (userData) => {
    return api.post('/auth/register/', userData);
  },

  // User login
  login: (credentials) => {
    return api.post('/auth/login/', credentials);
  },

  // User logout
  logout: () => {
    return api.post('/auth/logout/');
  },

  // Get current user profile
  getProfile: () => {
    return api.get('/auth/profile/');
  },

  // Update user profile
  updateProfile: (userData) => {
    return api.patch('/auth/profile/', userData);
  },

  // Password reset request
  requestPasswordReset: (email) => {
    return api.post('/auth/password-reset/', { email });
  },

  // Verify password reset token
  verifyResetToken: (token) => {
    return api.post('/auth/password-reset/verify/', { token });
  },

  // Reset password
  resetPassword: (token, newPassword) => {
    return api.post('/auth/password-reset/confirm/', {
      token,
      password: newPassword,
    });
  },
};

// Energy Logger API calls
export const energyAPI = {
  // Get all devices for current user
  getDevices: () => {
    return api.get('/devices/');
  },

  // Get specific device details
  getDevice: (deviceId) => {
    return api.get(`/devices/${deviceId}/`);
  },

  // Add new device
  addDevice: (deviceData) => {
    return api.post('/devices/', deviceData);
  },

  // Update device
  updateDevice: (deviceId, deviceData) => {
    return api.patch(`/devices/${deviceId}/`, deviceData);
  },

  // Delete device
  deleteDevice: (deviceId) => {
    return api.delete(`/devices/${deviceId}/`);
  },

  // Get device energy data
  getEnergyData: (deviceId, params = {}) => {
    return api.get(`/devices/${deviceId}/energy-data/`, { params });
  },

  // Get real-time device status
  getDeviceStatus: (deviceId) => {
    return api.get(`/devices/${deviceId}/status/`);
  },
};

// PAYGo API calls
export const paygoAPI = {
  // Get credit balance
  getBalance: (deviceId) => {
    return api.get(`/paygo/balance/${deviceId}/`);
  },

  // Initiate M-Pesa payment
  initiateMpesaPayment: (paymentData) => {
    return api.post('/paygo/mpesa/initiate/', paymentData);
  },

  // Check payment status
  checkPaymentStatus: (transactionId) => {
    return api.get(`/paygo/payment-status/${transactionId}/`);
  },

  // Get payment history
  getPaymentHistory: (params = {}) => {
    return api.get('/paygo/payment-history/', { params });
  },

  // Apply token/credit
  applyToken: (tokenData) => {
    return api.post('/paygo/apply-token/', tokenData);
  },

  // Get token details
  getTokenDetails: (tokenCode) => {
    return api.get(`/paygo/token/${tokenCode}/`);
  },
};

// Analytics API calls
export const analyticsAPI = {
  // Get dashboard summary
  getDashboardSummary: () => {
    return api.get('/analytics/dashboard/');
  },

  // Get energy usage statistics
  getUsageStats: (params = {}) => {
    return api.get('/analytics/usage-stats/', { params });
  },

  // Get device performance metrics
  getDeviceMetrics: (deviceId, params = {}) => {
    return api.get(`/analytics/device-metrics/${deviceId}/`, { params });
  },

  // Get cost analysis
  getCostAnalysis: (params = {}) => {
    return api.get('/analytics/cost-analysis/', { params });
  },

  // Export data
  exportData: (format, params = {}) => {
    return api.get(`/analytics/export/${format}/`, {
      params,
      responseType: 'blob',
    });
  },
};

// Notifications API calls
export const notificationsAPI = {
  // Get all notifications
  getNotifications: (params = {}) => {
    return api.get('/notifications/', { params });
  },

  // Mark notification as read
  markAsRead: (notificationId) => {
    return api.patch(`/notifications/${notificationId}/read/`);
  },

  // Delete notification
  deleteNotification: (notificationId) => {
    return api.delete(`/notifications/${notificationId}/`);
  },

  // Get notification settings
  getSettings: () => {
    return api.get('/notifications/settings/');
  },

  // Update notification settings
  updateSettings: (settings) => {
    return api.patch('/notifications/settings/', settings);
  },
};

export default api;