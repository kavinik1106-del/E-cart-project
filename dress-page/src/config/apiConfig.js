// API Configuration
export const USER_API_BASE_URL = import.meta.env.VITE_USER_API_URL || 'http://localhost:5000/api';
export const ADMIN_API_BASE_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:5001/api';

export const API_ENDPOINTS = {
  // User endpoints (main backend - port 5000)
  LOGIN: `${USER_API_BASE_URL}/auth/login`,
  REGISTER: `${USER_API_BASE_URL}/auth/register`,
  CONTACT: `${USER_API_BASE_URL}/contact`,
  USER_ORDERS: `${USER_API_BASE_URL}/orders`,
  USER_ORDER: (id) => `${USER_API_BASE_URL}/orders/${id}`,
  CART: `${USER_API_BASE_URL}/cart`,
  WISHLIST: `${USER_API_BASE_URL}/wishlist`,

  // Admin endpoints (admin backend - port 5001)
  ADMIN_LOGIN: `${ADMIN_API_BASE_URL}/auth/login`,
  ADMIN_VERIFY: `${ADMIN_API_BASE_URL}/auth/verify`,
  PRODUCTS: `${ADMIN_API_BASE_URL}/products`,
  PRODUCT: (id) => `${ADMIN_API_BASE_URL}/products/${id}`,
  ORDERS: `${ADMIN_API_BASE_URL}/orders`,
  ORDER: (id) => `${ADMIN_API_BASE_URL}/orders/${id}`,
  CUSTOMERS: `${ADMIN_API_BASE_URL}/customers`,
  CUSTOMER: (id) => `${ADMIN_API_BASE_URL}/customers/${id}`,
  SETTINGS: `${ADMIN_API_BASE_URL}/settings`,
  DASHBOARD_STATS: `${ADMIN_API_BASE_URL}/dashboard/stats`,
  HEALTH: `${ADMIN_API_BASE_URL}/health`
};

// API Request Helper
export const apiCall = async (url, options = {}) => {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const config = { ...defaultOptions, ...options };

  // Add admin token if available and URL is admin endpoint
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken && url.includes(ADMIN_API_BASE_URL)) {
    config.headers['Authorization'] = `Bearer ${adminToken}`;
  }

  // Add user token if available and URL is user endpoint
  const userToken = localStorage.getItem('token');
  if (userToken && url.includes(USER_API_BASE_URL)) {
    config.headers['Authorization'] = `Bearer ${userToken}`;
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};
