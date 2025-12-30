import React, { useState, useEffect, useCallback } from 'react';
import './OrderPage.css';
import { apiCall, API_ENDPOINTS } from './config/apiConfig.js';
import { apiCall, API_ENDPOINTS } from './config/apiConfig.js';

export default function OrderPageAPI() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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

  // Sample products
  const sampleProducts = [
    { id: 1, name: 'Laptop', price: 39999 },
    { id: 2, name: 'Smartphone', price: 12499 },
    { id: 3, name: 'Headphones', price: 1499 },
    { id: 4, name: 'Kurta', price: 1299 },
    { id: 5, name: 'Saree', price: 1899 },
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

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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

      const data = await response.json();

      if (data.success) {
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
        setMessage(data.message || 'Failed to create order');
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
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Order cancelled successfully');
        setMessageType('success');
        fetchOrders();
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage(data.message || 'Failed to cancel order');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setMessageType('error');
    }
  };

  const { subtotal, tax, shipping, total } = calculateTotals();

  return (
    <div className="order-page">
      <div className="order-header">
        <h1>Orders & Checkout</h1>
        <button 
          className="new-order-btn"
          onClick={() => setShowOrderForm(!showOrderForm)}
        >
          {showOrderForm ? 'View Orders' : 'Place New Order'}
        </button>
      </div>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      {/* NEW ORDER FORM */}
      {showOrderForm && (
        <div className="order-form-container">
          <div className="form-section">
            <h2>Select Products</h2>
            <div className="products-list">
              {sampleProducts.map(product => (
                <div key={product.id} className="product-item">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">₹{product.price.toLocaleString()}</p>
                  </div>
                  <button
                    className="add-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="empty-cart">No items selected</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.product_id} className="cart-item">
                    <div className="item-details">
                      <h4>{item.product_name}</h4>
                      <p>₹{item.price.toLocaleString()} x {item.quantity}</p>
                    </div>
                    <div className="item-actions">
                      <p className="item-total">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.product_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleCreateOrder} className="checkout-form">
              <div className="form-group">
                <label>Shipping Address</label>
                <textarea
                  value={orderForm.shipping_address}
                  onChange={(e) => setOrderForm({ ...orderForm, shipping_address: e.target.value })}
                  placeholder="Enter your complete shipping address"
                  rows={3}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    value={orderForm.payment_method}
                    onChange={(e) => setOrderForm({ ...orderForm, payment_method: e.target.value })}
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    value={orderForm.coupon_code}
                    onChange={(e) => setOrderForm({ ...orderForm, coupon_code: e.target.value })}
                    placeholder="Enter coupon code"
                  />
                </div>
              </div>

              <div className="price-summary">
                <div className="price-row">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>Tax (18%):</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : '₹' + shipping}</span>
                </div>
                {orderForm.discount_amount > 0 && (
                  <div className="price-row discount">
                    <span>Discount:</span>
                    <span>-₹{orderForm.discount_amount.toLocaleString()}</span>
                  </div>
                )}
                <div className="price-row total">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ORDERS LIST */}
      {!showOrderForm && (
        <div className="orders-container">
          {loading ? (
            <div className="loading">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="no-orders">
              <p>No orders yet</p>
              <button 
                className="new-order-btn"
                onClick={() => setShowOrderForm(true)}
              >
                Place Your First Order
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header-info">
                    <div>
                      <h3>Order #{order.order_number}</h3>
                      <p className="order-date">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="order-details">
                    <div className="detail-item">
                      <span>Amount:</span>
                      <strong>₹{order.total_amount.toLocaleString()}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Payment Status:</span>
                      <span className={`payment-status ${order.payment_status}`}>
                        {order.payment_status}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span>Items:</span>
                      <span>{order.total_items || 0}</span>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button
                      className="view-btn"
                      onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    >
                      {selectedOrder?.id === order.id ? 'Hide Details' : 'View Details'}
                    </button>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>

                  {selectedOrder?.id === order.id && (
                    <div className="order-expanded">
                      <h4>Shipping Address:</h4>
                      <p>{order.shipping_address}</p>
                      <h4>Payment Method:</h4>
                      <p>{order.payment_method}</p>
                      {order.coupon_code && (
                        <>
                          <h4>Coupon Code:</h4>
                          <p>{order.coupon_code}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
