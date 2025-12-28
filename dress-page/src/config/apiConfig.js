// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT: (id) => `${API_BASE_URL}/products/${id}`,
  
  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER: (id) => `${API_BASE_URL}/orders/${id}`,
  
  // Customers
  CUSTOMERS: `${API_BASE_URL}/customers`,
  CUSTOMER: (id) => `${API_BASE_URL}/customers/${id}`,
  
  // Settings
  SETTINGS: `${API_BASE_URL}/settings`,
  
  // Dashboard
  DASHBOARD_STATS: `${API_BASE_URL}/dashboard/stats`,
  
  // Health
  HEALTH: `${API_BASE_URL}/health`
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
