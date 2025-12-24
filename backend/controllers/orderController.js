import OrderModel from '../models/OrderModel.js';
import logger from '../utils/logger.js';

// Generate unique order number
const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// Create new order
export const createOrder = async (req, res, next) => {
  try {
    const { user_id, items, total_amount, tax_amount, shipping_amount, coupon_code, discount_amount, shipping_address, payment_method } = req.body;

    // Validation
    if (!user_id || !items || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID and order items are required' 
      });
    }

    if (!total_amount || total_amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid order total amount' 
      });
    }

    // Create order
    const orderNumber = generateOrderNumber();
    const result = await OrderModel.create({
      user_id,
      order_number: orderNumber,
      total_amount,
      tax_amount: tax_amount || 0,
      shipping_amount: shipping_amount || 0,
      coupon_code: coupon_code || null,
      discount_amount: discount_amount || 0,
      shipping_address: shipping_address || '',
      payment_method: payment_method || 'card'
    });

    const orderId = result.insertId;

    // Add order items
    await OrderModel.addItems(orderId, items);

    logger.info(`New order created: ${orderNumber} for user ${user_id}`);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId,
        orderNumber,
        totalAmount: total_amount
      }
    });
  } catch (error) {
    logger.error('Create order error:', error);
    next(error);
  }
};

// Get order by ID
export const getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await OrderModel.getById(orderId);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    logger.error('Get order error:', error);
    next(error);
  }
};

// Get user's orders
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const orders = await OrderModel.getByUserId(userId);

    res.status(200).json({
      success: true,
      data: orders,
      total: orders.length
    });
  } catch (error) {
    logger.error('Get user orders error:', error);
    next(error);
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.getAll();

    res.status(200).json({
      success: true,
      data: orders,
      total: orders.length
    });
  } catch (error) {
    logger.error('Get all orders error:', error);
    next(error);
  }
};

// Update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Status is required' 
      });
    }

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }

    const result = await OrderModel.updateStatus(orderId, status);
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    logger.info(`Order ${orderId} status updated to ${status}`);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    logger.error('Update order status error:', error);
    next(error);
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { payment_status } = req.body;

    if (!payment_status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment status is required' 
      });
    }

    const validStatuses = ['pending', 'completed', 'failed'];
    if (!validStatuses.includes(payment_status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid payment status' 
      });
    }

    const result = await OrderModel.updatePaymentStatus(orderId, payment_status);
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    logger.info(`Order ${orderId} payment status updated to ${payment_status}`);

    res.status(200).json({
      success: true,
      message: 'Payment status updated successfully'
    });
  } catch (error) {
    logger.error('Update payment status error:', error);
    next(error);
  }
};

// Cancel order
export const cancelOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const result = await OrderModel.cancel(orderId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    logger.info(`Order ${orderId} cancelled`);

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    logger.error('Cancel order error:', error);
    next(error);
  }
};

// Get order by order number
export const getOrderByNumber = async (req, res, next) => {
  try {
    const orderNumber = req.params.orderNumber;

    const order = await OrderModel.getByOrderNumber(orderNumber);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    logger.error('Get order by number error:', error);
    next(error);
  }
};
