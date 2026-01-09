import React, { useState } from 'react';
import './OrderPage.css';
import { useCart } from './contexts/CartContext';
import Navbar from './Navbar.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  ShoppingBag,
  Facebook,
  Instagram,
  Twitter,
  ArrowLeft,
  AlertCircle,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';

export default function OrderPageAPI() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Get current user from localStorage
  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  // Handle Proceed to Checkout
  const handleProceedToCheckout = () => {
    const user = getCurrentUser();
    if (!user) {
      setMessage('Please login first to proceed');
      setMessageType('error');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    if (cart.length === 0) {
      setMessage('Please add items to cart first');
      setMessageType('error');
      return;
    }

    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              Your Cart
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Review your items and proceed to checkout
            </motion.p>
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

        {/* Cart Display */}
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="mb-6">
              <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add products to your cart to place an order</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-2xl font-bold mb-6">Shopping Cart ({cart.length} items)</h3>
                  
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900">{item.name}</h4>
                        <p className="text-primary font-bold text-lg">₹{item.price.toLocaleString('en-IN')}</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300 font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm underline hover:no-underline transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                  <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">₹{getCartTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (18%):</span>
                      <span className="font-semibold">₹{(getCartTotal() * 0.18).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">₹{(getCartTotal() * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleProceedToCheckout}
                    className="w-full bg-secondary hover:opacity-90 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-3"
                  >
                    <Package className="w-5 h-5" />
                    Proceed to Checkout
                  </motion.button>

                  <Link
                    to="/"
                    className="block text-center text-primary hover:opacity-80 transition-colors font-semibold"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Professional Footer */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                StyleNest
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted online shopping destination for fashion, lifestyle, and more. Quality products, exceptional service.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
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
