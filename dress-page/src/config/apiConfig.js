// ================= API BASE URLS =================
export const USER_API_BASE_URL =
  import.meta.env.VITE_USER_API_URL || "http://localhost:5000/api";

export const ADMIN_API_BASE_URL =
  import.meta.env.VITE_ADMIN_API_URL || "http://localhost:5001/api";

// ================= API ENDPOINTS =================
export const API_ENDPOINTS = {
  // USER
  LOGIN: `${USER_API_BASE_URL}/auth/login`,
  REGISTER: `${USER_API_BASE_URL}/auth/register`,
  CONTACT: `${USER_API_BASE_URL}/contact`,
  USER_ORDERS: `${USER_API_BASE_URL}/orders`,
  USER_ORDER: (id) => `${USER_API_BASE_URL}/orders/${id}`,
  CART: `${USER_API_BASE_URL}/cart`,
  WISHLIST: `${USER_API_BASE_URL}/wishlist`,
  LOGOUT: `${USER_API_BASE_URL}/auth/logout`,

  // ADMIN
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
  HEALTH: `${ADMIN_API_BASE_URL}/health`,
};

// ================= API CALL HELPER =================
export const apiCall = async (url, options = {}) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Attach admin token
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken && url.startsWith(ADMIN_API_BASE_URL)) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  // Attach user token
  const userToken = localStorage.getItem("token");
  if (userToken && url.startsWith(USER_API_BASE_URL)) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  try {
    const response = await fetch(url, config);

    let data = null;
    const contentType = response.headers.get("content-type");

    // Parse JSON ONLY if response is JSON
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    // Always return a consistent object
    if (!response.ok) {
      return {
        success: false,
        message: data?.message || `Request failed (${response.status})`,
      };
    }

    return (
      data || {
        success: true,
        message: "Request successful",
      }
    );
  } catch (error) {
    console.error("API Call Error:", error);
    return {
      success: false,
      message: "Server not reachable. Please try again later.",
    };
  }
};
