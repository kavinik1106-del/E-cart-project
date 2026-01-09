import React, { useState, useEffect, useCallback } from 'react';
import { apiCall, API_ENDPOINTS } from './config/apiConfig.js';
import Navbar from './Navbar.jsx';
import { useNavigate, Link } from 'react-router-dom';
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
  ChevronDown,
  ChevronUp,
  Eye,
  X,
  Facebook,
  Instagram,
  Twitter,
  Star,
  ArrowRight,
  Download
} from 'lucide-react';

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

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
        navigate('/login');
        return;
      }

      const response = await apiCall(`${API_ENDPOINTS.USER_ORDERS}/user/${user.id}`);
      
      if (response.success) {
        setOrders(response.data || []);
      } else {
        setMessage(response.message || 'Failed to load orders');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Get status color
  const getStatusColor = (status) => {
    const statusMap = {
      'delivered': 'bg-green-50 border-green-200 text-green-700',
      'shipped': 'bg-blue-50 border-blue-200 text-blue-700',
      'processing': 'bg-yellow-50 border-yellow-200 text-yellow-700',
      'pending': 'bg-orange-50 border-orange-200 text-orange-700',
      'cancelled': 'bg-red-50 border-red-200 text-red-700'
    };
    return statusMap[status?.toLowerCase()] || 'bg-gray-50 border-gray-200 text-gray-700';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const iconMap = {
      'delivered': <CheckCircle className="w-5 h-5" />,
      'shipped': <Truck className="w-5 h-5" />,
      'processing': <Clock className="w-5 h-5" />,
      'pending': <Package className="w-5 h-5" />,
      'cancelled': <X className="w-5 h-5" />
    };
    return iconMap[status?.toLowerCase()] || <Package className="w-5 h-5" />;
  };

  // Filter orders by status and exclude cancelled orders from main display
  const activeOrders = orders.filter(order => order.status?.toLowerCase() !== 'cancelled');
  const filteredOrders = filterStatus === 'all' 
    ? activeOrders 
    : activeOrders.filter(order => order.status?.toLowerCase() === filterStatus.toLowerCase());

  // Cancel order
  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      const response = await apiCall(`${API_ENDPOINTS.USER_ORDERS}/${orderId}/cancel`, {
        method: 'PUT'
      });

      if (response.success) {
        setMessage('Order cancelled successfully');
        setMessageType('success');
        fetchOrders();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(response.message || 'Failed to cancel order');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-3">My Orders</h1>
            <p className="text-blue-100 text-lg">Track and manage all your orders in one place</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Alert Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg border-l-4 flex items-center gap-3 ${
              messageType === 'success'
                ? 'bg-green-50 border-green-500 text-green-700'
                : 'bg-red-50 border-red-500 text-red-700'
            }`}
          >
            {messageType === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message}</span>
          </motion.div>
        )}

        {/* Filter Section */}
        {activeOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
              }`}
            >
              All Orders ({activeOrders.length})
            </button>
            <button
              onClick={() => setFilterStatus('delivered')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filterStatus === 'delivered'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-500'
              }`}
            >
              Delivered ({activeOrders.filter(o => o.status?.toLowerCase() === 'delivered').length})
            </button>
            <button
              onClick={() => setFilterStatus('shipped')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filterStatus === 'shipped'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
              }`}
            >
              Shipped ({activeOrders.filter(o => o.status?.toLowerCase() === 'shipped').length})
            </button>
            <button
              onClick={() => setFilterStatus('processing')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filterStatus === 'processing'
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-yellow-500'
              }`}
            >
              Processing ({activeOrders.filter(o => o.status?.toLowerCase() === 'processing').length})
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Loading your orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-lg border border-gray-200"
          >
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-8">
              {filterStatus === 'all' 
                ? 'Start shopping to place your first order'
                : `No ${filterStatus} orders`
              }
            </p>
            {filterStatus === 'all' && (
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Order Header - Modern Card Style */}
                <div
                  className="p-4 md:p-6 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors"
                  onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          Order #{order.order_number}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:gap-8">
                      <div className="text-right">
                        <p className="text-xs text-gray-600 uppercase tracking-wider font-medium">Items</p>
                        <p className="text-2xl font-bold text-gray-900">{order.total_items || 0}</p>
                      </div>

                      <div className="text-right min-w-[120px]">
                        <p className="text-xs text-gray-600 uppercase tracking-wider font-medium">Amount</p>
                        <p className="text-2xl font-bold text-blue-600">₹{(order.total_amount || 0).toLocaleString('en-IN')}</p>
                      </div>

                      <div className="hidden md:flex text-gray-400">
                        {expandedOrderId === order.id ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrderId === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-100"
                  >
                    {/* Order Items */}
                    <div className="p-4 md:p-6 border-b border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                        Order Items ({order.total_items || 0})
                      </h4>
                      <div className="space-y-3">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, itemIdx) => (
                            <motion.div
                              key={itemIdx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: itemIdx * 0.05 }}
                              className="flex gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                            >
                              {/* Product Image */}
                              <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                                  {item.product_image ? (
                                    <img
                                      src={item.product_image}
                                      alt={item.product_name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Package className="w-8 h-8 text-gray-300" />
                                  )}
                                </div>
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-gray-900 text-sm line-clamp-2">
                                  {item.product_name}
                                </h5>
                                <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
                                  <span>Qty: <span className="font-semibold text-gray-900">{item.quantity}</span></span>
                                  <span>Price: <span className="font-semibold text-gray-900">₹{(item.price || 0).toLocaleString('en-IN')}</span></span>
                                </div>
                              </div>

                              {/* Item Total */}
                              <div className="text-right whitespace-nowrap">
                                <p className="text-xs text-gray-600 mb-1">Subtotal</p>
                                <p className="text-lg font-bold text-blue-600">
                                  ₹{((item.price || 0) * (item.quantity || 0)).toLocaleString('en-IN')}
                                </p>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-gray-600 text-sm">No items in this order</p>
                        )}
                      </div>
                    </div>

                    {/* Two Column Grid for Delivery & Summary */}
                    <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6 border-b border-gray-100">
                      {/* Delivery Address */}
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">Delivery Address</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            {order.shipping_address}
                          </p>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-gray-900 text-sm mb-3">Order Summary</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900 font-medium">
                              ₹{((order.total_amount || 0) - (order.tax_amount || 0) - (order.shipping_amount || 0) + (order.discount_amount || 0)).toLocaleString('en-IN')}
                            </span>
                          </div>
                          {(order.discount_amount || 0) > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Discount</span>
                              <span className="text-green-600 font-medium">
                                −₹{(order.discount_amount || 0).toLocaleString('en-IN')}
                              </span>
                            </div>
                          )}
                          {(order.tax_amount || 0) > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tax</span>
                              <span className="text-gray-900 font-medium">₹{(order.tax_amount || 0).toLocaleString('en-IN')}</span>
                            </div>
                          )}
                          {(order.shipping_amount || 0) > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Shipping</span>
                              <span className="text-gray-900 font-medium">₹{(order.shipping_amount || 0).toLocaleString('en-IN')}</span>
                            </div>
                          )}
                          <div className="border-t border-blue-200 pt-2 flex justify-between font-bold">
                            <span className="text-gray-900">Total</span>
                            <span className="text-blue-600">₹{(order.total_amount || 0).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="p-4 md:p-6 border-b border-gray-100">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">Payment Details</h4>
                          <p className="text-gray-600 text-xs capitalize mb-1">
                            Method: {order.payment_method?.replace(/_/g, ' ')}
                          </p>
                          <p className={`text-xs font-semibold ${
                            order.payment_status === 'completed' ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            Status: Payment {order.payment_status}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 md:p-6 bg-gray-50 flex flex-wrap gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                        onClick={() => navigate(`/order/${order.id}/track`)}
                      >
                        <Truck className="w-4 h-4" />
                        Track Order
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                      >
                        <Download className="w-4 h-4" />
                        Invoice
                      </motion.button>

                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md ml-auto"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-400">StyleNest</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted online shopping destination for fashion, lifestyle, and more.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Collections</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Best Sellers</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Customer Care</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact Info</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>support@stylenest.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 StyleNest. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
