import React, { useState, useEffect, useCallback } from 'react';
import './OrderPage.css';
import { apiCall, API_ENDPOINTS } from './config/apiConfig.js';
import Navbar from './Navbar.jsx';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  ShoppingBag,
  Calendar,
  DollarSign,
  RefreshCw,
  AlertCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Eye,
  X
} from 'lucide-react';

export default function OrderPageAPI() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Form state for creating new order
  const [orderForm, setOrderForm] = useState({
    items: [],
    total_amount: 0,
    tax_amount: 0,
    shipping_amount: 0,
    coupon_code: '',
    discount_amount: 0,
    shipping_address: '',
    payment_method: 'card'
  });

  // Sample products with proper pricing
  const sampleProducts = [
    { id: 1, name: 'Premium Laptop', price: 39999, image: '/laptop.webp', category: 'electronics' },
    { id: 2, name: 'iPhone 15 Pro', price: 124999, image: '/mobile.jpg', category: 'electronics' },
    { id: 3, name: 'Wireless Headphones', price: 4999, image: '/noicehead.jpg', category: 'electronics' },
    { id: 4, name: 'Designer Kurta', price: 1299, image: '/dress1.webp', category: 'fashion' },
    { id: 5, name: 'Silk Wedding Saree', price: 1899, image: '/saree2.jpg', category: 'fashion' },
  ];

  // Get current user from localStorage
  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  // Fetch user orders
  const fetchOrders = useCallback(async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        setMessage('Please login first');
        setMessageType('error');
        setLoading(false);
        return;
      }

      const response = await apiCall(`${API_ENDPOINTS.USER_ORDERS}/user/${user.id}`);
      
      if (response.success) {
        setOrders(response.data);
      } else {
        setMessage('Failed to load orders');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle adding item to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.product_id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product_id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
  };

  // Handle removing item from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.product_id !== productId));
  };
    const shipping = subtotal > 500 ? 0 : 99; // Free shipping for orders > 500
    const discount = orderForm.discount_amount;
    const total = subtotal + tax + shipping - discount;
    
    return { subtotal, tax, shipping, discount, total };
  };

  // Handle creating new order
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      setMessage('Please add items to cart');
      setMessageType('error');
      return;
    }

    if (!orderForm.shipping_address) {
      setMessage('Please enter shipping address');
      setMessageType('error');
      return;
    }

    try {
      const user = getCurrentUser();
      if (!user) {
        setMessage('Please login first');
        setMessageType('error');
        return;
      }

      const { tax, shipping, total } = calculateTotals();

      const data = await apiCall(API_ENDPOINTS.USER_ORDERS, {
        method: 'POST',
        body: JSON.stringify({
          user_id: user.id,
          items: cartItems,
          total_amount: total,
          tax_amount: tax,
          shipping_amount: shipping,
          coupon_code: orderForm.coupon_code,
          discount_amount: orderForm.discount_amount,
          shipping_address: orderForm.shipping_address,
          payment_method: orderForm.payment_method
        })
      });

      if (data && data.success) {
        setMessage(`Order placed successfully! Order #${data.data.orderNumber}`);
        setMessageType('success');
        
        // Reset form
        setCartItems([]);
        setOrderForm({
          items: [],
          total_amount: 0,
          tax_amount: 0,
          shipping_amount: 0,
          coupon_code: '',
          discount_amount: 0,
          shipping_address: '',
          payment_method: 'card'
        });
        setShowOrderForm(false);

        // Refresh orders
        setTimeout(() => {
          fetchOrders();
          setMessage('');
        }, 2000);
      } else {
        setMessage(data?.message || 'Failed to create order');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setMessageType('error');
    }
  };

  // Handle canceling order
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      const data = await apiCall(`${API_ENDPOINTS.USER_ORDERS}/${orderId}/cancel`, {
        method: 'PUT'
      });

      if (data && data.success) {
        setMessage('Order cancelled successfully');
        setMessageType('success');
        fetchOrders();
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage(data?.message || 'Failed to cancel order');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setMessageType('error');
    }
  };

  const { subtotal, tax, shipping, total } = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
            >
              My Orders
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Track your orders, manage deliveries, and place new orders with ease
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              onClick={() => setShowOrderForm(!showOrderForm)}
            >
              {showOrderForm ? 'View My Orders' : 'Place New Order'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-2xl border-l-4 shadow-lg ${
              messageType === 'success'
                ? 'bg-green-50 border-green-500 text-green-700'
                : 'bg-red-50 border-red-500 text-red-700'
            }`}
          >
            <div className="flex items-center gap-3">
              {messageType === 'success' ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500" />
              )}
              {message}
            </div>
          </motion.div>
        )}

        {/* NEW ORDER FORM */}
        {showOrderForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-12 mb-12"
          >
            {/* Product Selection */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Products</h2>
                <p className="text-gray-600">Choose items to add to your order</p>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {sampleProducts.map(product => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-2xl font-bold text-blue-600">₹{product.price.toLocaleString()}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary & Checkout */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Summary</h2>
                <p className="text-gray-600">Review your items and complete checkout</p>
              </div>

              {/* Cart Items */}
              <div className="mb-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {cartItems.map(item => (
                      <div key={item.product_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.product_name}</h4>
                          <p className="text-sm text-gray-600">₹{item.price.toLocaleString()} × {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-blue-600">₹{(item.price * item.quantity).toLocaleString()}</span>
                          <button
                            className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                            onClick={() => removeFromCart(item.product_id)}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCreateOrder} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Shipping Address *
                  </label>
                  <textarea
                    value={orderForm.shipping_address}
                    onChange={(e) => setOrderForm({ ...orderForm, shipping_address: e.target.value })}
                    placeholder="Enter your complete shipping address"
                    rows={3}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      Payment Method *
                    </label>
                    <select
                      value={orderForm.payment_method}
                      onChange={(e) => setOrderForm({ ...orderForm, payment_method: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                      <option value="card">💳 Credit/Debit Card</option>
                      <option value="upi">📱 UPI</option>
                      <option value="netbanking">🏦 Net Banking</option>
                      <option value="cod">💵 Cash on Delivery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Star className="w-4 h-4 inline mr-2" />
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      value={orderForm.coupon_code}
                      onChange={(e) => setOrderForm({ ...orderForm, coupon_code: e.target.value })}
                      placeholder="Enter coupon code"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Price Breakdown
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (18%):</span>
                      <span className="font-medium">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                        {shipping === 0 ? 'FREE' : '₹' + shipping}
                      </span>
                    </div>
                    {orderForm.discount_amount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span className="font-medium">-₹{orderForm.discount_amount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-2 mt-3">
                      <div className="flex justify-between text-lg font-bold text-blue-600">
                        <span>Total:</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
                >
                  <Package className="w-6 h-6" />
                  Place Order
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ORDERS LIST */}
        {!showOrderForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Loading your orders...</p>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl shadow-xl border border-gray-100">
                <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
                  onClick={() => setShowOrderForm(true)}
                >
                  Place Your First Order
                </motion.button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Order #{order.order_number}</h3>
                          <p className="text-gray-600 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-6">
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="text-lg font-bold text-gray-900">₹{order.total_amount.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Payment</p>
                            <p className="text-sm font-medium text-gray-900 capitalize">{order.payment_status}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Items</p>
                            <p className="text-lg font-bold text-gray-900">{order.total_items || 0}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                          onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                        >
                          <Eye className="w-4 h-4" />
                          {selectedOrder?.id === order.id ? 'Hide Details' : 'View Details'}
                        </motion.button>

                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            <X className="w-4 h-4" />
                            Cancel Order
                          </motion.button>
                        )}
                      </div>

                      {/* Expanded Details */}
                      {selectedOrder?.id === order.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-gray-200 space-y-4"
                        >
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                Shipping Address
                              </h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{order.shipping_address}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-blue-600" />
                                Payment Method
                              </h4>
                              <p className="text-gray-600 text-sm capitalize">{order.payment_method}</p>
                              {order.coupon_code && (
                                <div className="mt-3">
                                  <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    Coupon Code
                                  </h4>
                                  <p className="text-gray-600 text-sm">{order.coupon_code}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Professional Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                StyleNest
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted online shopping destination for fashion, lifestyle, and more. Quality products, exceptional service.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Twitter className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">Collections</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">New Arrivals</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">Best Sellers</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Customer Care</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">Shipping Info</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">Returns</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">Size Guide</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact Info</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>support@stylenest.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 StyleNest. All rights reserved. Made with ❤️ in India
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-yellow-400 transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
