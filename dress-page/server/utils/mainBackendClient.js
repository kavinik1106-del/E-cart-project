/**
 * Main Backend API Client
 * Connects admin server to main backend (port 5000) for real data
 */

const MAIN_BACKEND_URL = 'http://localhost:5000/api';

export async function makeRequest(method, endpoint, data = null) {
  try {
    const url = `${MAIN_BACKEND_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    // Use global fetch if available (Node 18+), otherwise dynamically import node-fetch
    let fetchFn = globalThis.fetch;
    if (!fetchFn) {
      const nodeFetch = await import('node-fetch').then(m => m.default || m);
      fetchFn = nodeFetch;
    }
    const response = await fetchFn(url, options);
    const jsonData = await response.json();

    if (!response.ok) {
      throw new Error(jsonData.message || `API Error: ${response.status}`);
    }

    return jsonData;
  } catch (error) {
    console.error(`API Request Error (${method} ${endpoint}):`, error.message || error);
    throw error;
  }
}

export const mainBackendAPI = {
  // Products
  getProducts: (filters = {}) => {
    const query = new URLSearchParams();
    if (filters.category) query.append('category', filters.category);
    if (filters.search) query.append('search', filters.search);
    if (filters.minPrice !== undefined) query.append('minPrice', filters.minPrice);
    if (filters.maxPrice !== undefined) query.append('maxPrice', filters.maxPrice);
    if (filters.sortBy) query.append('sortBy', filters.sortBy);
    if (filters.limit) query.append('limit', filters.limit);
    
    return makeRequest('GET', `/products${query.toString() ? '?' + query.toString() : ''}`);
  },

  getProduct: (id) => makeRequest('GET', `/products/${id}`),

  // Normalize admin payload to main backend expected fields
  createProduct: (data) => {
    const payload = { ...data };
    if (payload.stock !== undefined && payload.stock_quantity === undefined) {
      payload.stock_quantity = payload.stock;
      delete payload.stock;
    }
    return makeRequest('POST', '/products', payload);
  },

  updateProduct: (id, data) => {
    const payload = { ...data };
    if (payload.stock !== undefined && payload.stock_quantity === undefined) {
      payload.stock_quantity = payload.stock;
      delete payload.stock;
    }
    return makeRequest('PUT', `/products/${id}`, payload);
  },

  deleteProduct: (id) => makeRequest('DELETE', `/products/${id}`),

  getProductsByCategory: (category) => makeRequest('GET', `/products/category/${category}`),

  getFeaturedProducts: (limit = 12) => makeRequest('GET', `/products/featured?limit=${limit}`),

  // Orders
  getOrders: (filters = {}) => {
    const query = new URLSearchParams();
    if (filters.status) query.append('status', filters.status);
    if (filters.userId) query.append('userId', filters.userId);
    
    return makeRequest('GET', `/orders${query.toString() ? '?' + query.toString() : ''}`);
  },

  getOrder: (id) => makeRequest('GET', `/orders/${id}`),

  createOrder: (data) => makeRequest('POST', '/orders', data),

  updateOrderStatus: (id, status) => makeRequest('PUT', `/orders/${id}/status`, { status }),

  cancelOrder: (id) => makeRequest('PUT', `/orders/${id}/cancel`),

  // Auth/Users
  getAllUsers: () => makeRequest('GET', '/auth/users'),

  getUserProfile: (id) => makeRequest('GET', `/auth/profile/${id}`),

  // Health
  health: () => makeRequest('GET', '/health'),
};

export default mainBackendAPI;
