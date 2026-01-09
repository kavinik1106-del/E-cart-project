import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiCall, API_ENDPOINTS } from './config/apiConfig.js';
import Navbar from './Navbar.jsx';
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
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';

export default function OrderTrackingPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusSteps = [
    { id: 1, name: 'Order Placed', icon: ShoppingBag, color: 'blue' },
    { id: 2, name: 'Processing', icon: Clock, color: 'yellow' },
    { id: 3, name: 'Shipped', icon: Truck, color: 'purple' },
    { id: 4, name: 'Out for Delivery', icon: MapPin, color: 'orange' },
    { id: 5, name: 'Delivered', icon: CheckCircle, color: 'green' }
  ];

  const statusMap = {
    'pending': 1,
    'processing': 2,
    'shipped': 3,
    'out_for_delivery': 4,
    'delivered': 5,
    'cancelled': 0
  };

  const fetchOrderDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(`${API_ENDPOINTS.USER_ORDERS}/${orderId}`);
      
      if (response.success) {
        setOrder(response.data);
      } else {
        setError(response.message || 'Failed to load order');
      }
    } catch (error) {
      console.error('Error loading order:', error);
      setError(error.message || 'Error loading order details');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, fetchOrderDetails]);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCurrentStepIndex = (status) => {
    return statusMap[status?.toLowerCase()] || 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100"
          >
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
            <p className="text-gray-600 mb-8">{error || 'We couldn\'t find the order you\'re looking for.'}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/my-orders')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to My Orders
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentStep = getCurrentStepIndex(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/order')}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Orders
        </motion.button>

        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl p-8 shadow-xl mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Order Tracking</h1>
              <p className="text-blue-100 text-lg">Order #{order.order_number}</p>
              <p className="text-blue-100 text-sm mt-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            <div className="text-right">
              <span className={`px-6 py-3 rounded-full text-lg font-bold inline-block border-2 ${getStatusColor(order.status)}`}>
                {order.status.toUpperCase().replace('_', ' ')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tracking Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Truck className="w-6 h-6 text-blue-600" />
            Delivery Timeline
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-12 top-0 bottom-0 w-1 bg-gray-200"></div>
            <div 
              className="absolute left-6 md:left-12 top-0 w-1 bg-green-500 transition-all duration-500"
              style={{ height: `${(currentStep / statusSteps.length) * 100}%` }}
            ></div>

            {/* Timeline Steps */}
            <div className="space-y-8 ml-20 md:ml-32">
              {statusSteps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep - 1;
                const IconComponent = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute -left-20 md:-left-32 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 border-green-300'
                          : isCurrent
                          ? 'bg-blue-500 border-blue-300 animate-pulse'
                          : 'bg-gray-200 border-gray-300'
                      }`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Step Content */}
                    <div
                      className={`pb-8 p-4 rounded-xl border-2 transition-all duration-300 ${
                        isCurrent
                          ? 'bg-blue-50 border-blue-300 shadow-lg'
                          : isCompleted
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <h3 className={`text-lg font-bold mb-1 ${isCompleted ? 'text-green-700' : isCurrent ? 'text-blue-700' : 'text-gray-500'}`}>
                        {step.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {isCompleted && 'Completed'}
                        {isCurrent && 'In Progress'}
                        {!isCompleted && !isCurrent && 'Pending'}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            Order Items ({order.items?.length || 0})
          </h2>

          <div className="space-y-4">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                      {item.product_image ? (
                        <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{item.product_name}</h4>
                    <p className="text-sm text-gray-600">Quantity: <span className="font-semibold text-gray-900">{item.quantity}</span></p>
                    <p className="text-sm text-gray-600">Price: <span className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</span></p>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-blue-600">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No items in this order</p>
            )}
          </div>
        </motion.div>

        {/* Delivery Address & Order Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Delivery Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              Delivery Address
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
              <p className="text-gray-900 font-semibold text-lg leading-relaxed">{order.shipping_address || 'Address not provided'}</p>
              <div className="mt-4 pt-4 border-t border-blue-200 space-y-2 text-sm text-gray-600">
                <p>📱 Expected delivery within 3-5 business days</p>
                <p>✓ Free shipping on this order</p>
              </div>
            </div>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Payment Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold text-gray-900 capitalize">{order.payment_method || 'Not specified'}</span>
              </div>
              <div className="flex justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-600">Payment Status</span>
                <span className={`font-semibold ${order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'} capitalize`}>
                  {order.payment_status || 'Pending'}
                </span>
              </div>
              <div className="flex justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-gray-900 font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">₹{order.total_amount.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8 border-2 border-blue-200 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-blue-600" />
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">₹{((order.total_amount - (order.tax_amount || 0) - (order.shipping_amount || 0) + (order.discount_amount || 0))).toLocaleString()}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span className="font-semibold">-₹{order.discount_amount.toLocaleString()}</span>
              </div>
            )}
            {order.tax_amount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax (GST)</span>
                <span className="font-semibold text-gray-900">₹{order.tax_amount.toLocaleString()}</span>
              </div>
            )}
            {order.shipping_amount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">₹{order.shipping_amount.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t-2 border-blue-300 pt-3 flex justify-between text-lg">
              <span className="font-bold text-gray-900">Total Amount</span>
              <span className="text-3xl font-bold text-blue-600">₹{order.total_amount.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Invoice
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigator.share && navigator.share({
              title: 'Order Tracking',
              text: `Check out my order #${order.order_number}`,
              url: window.location.href
            })}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Order
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/order')}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            View All Orders
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
