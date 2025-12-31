import React, { createContext, useContext, useState, useEffect } from "react";
import { apiCall, API_ENDPOINTS } from "../config/apiConfig.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1, size = "M", color = "Default") => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size && item.color === color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, size, color }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showToast(`${product.name} removed from wishlist`, "warning");
        return prev.filter((item) => item.id !== product.id);
      }
      showToast(`${product.name} added to wishlist`, "success");
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // API Sync Functions
  const syncCartWithServer = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; // Only sync if user is logged in

    try {
      await apiCall(API_ENDPOINTS.CART, {
        method: 'POST',
        body: JSON.stringify({ items: cart })
      });
    } catch (error) {
      console.error('Failed to sync cart with server:', error);
    }
  };

  const syncWishlistWithServer = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; // Only sync if user is logged in

    try {
      await apiCall(API_ENDPOINTS.WISHLIST, {
        method: 'POST',
        body: JSON.stringify({ items: wishlist })
      });
    } catch (error) {
      console.error('Failed to sync wishlist with server:', error);
    }
  };

  const loadCartFromServer = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await apiCall(API_ENDPOINTS.CART);
      if (response.success && response.data) {
        setCart(response.data.items || []);
      }
    } catch (error) {
      console.error('Failed to load cart from server:', error);
    }
  };

  const loadWishlistFromServer = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await apiCall(API_ENDPOINTS.WISHLIST);
      if (response.success && response.data) {
        setWishlist(response.data.items || []);
      }
    } catch (error) {
      console.error('Failed to load wishlist from server:', error);
    }
  };

  // Sync with server when cart/wishlist changes
  useEffect(() => {
    if (cart.length > 0) {
      syncCartWithServer();
    }
  }, [cart]);

  useEffect(() => {
    if (wishlist.length > 0) {
      syncWishlistWithServer();
    }
  }, [wishlist]);

  // Load data from server on mount if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadCartFromServer();
      loadWishlistFromServer();
    }
  }, []);

  return (
    <CartContext.Provider value={{ 
      cart, 
      wishlist,
      toast,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      getCartTotal, 
      getCartCount,
      showToast,
      syncCartWithServer,
      syncWishlistWithServer,
      loadCartFromServer,
      loadWishlistFromServer
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
