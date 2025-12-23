import pool from '../config/database.js';

class OrderModel {
  // Create a new order
  static async create(orderData) {
    const { user_id, order_number, total_amount, tax_amount, shipping_amount, coupon_code, discount_amount, shipping_address, payment_method } = orderData;
    const query = `
      INSERT INTO orders (user_id, order_number, total_amount, tax_amount, shipping_amount, coupon_code, discount_amount, shipping_address, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [user_id, order_number, total_amount, tax_amount, shipping_amount, coupon_code, discount_amount, shipping_address, payment_method]);
    return result;
  }

  // Add items to order
  static async addItems(orderId, items) {
    const query = `
      INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    for (const item of items) {
      await pool.query(query, [orderId, item.product_id, item.product_name, item.quantity, item.price]);
    }
  }

  // Get order by ID with items
  static async getById(orderId) {
    const orderQuery = 'SELECT * FROM orders WHERE id = ?';
    const itemsQuery = 'SELECT * FROM order_items WHERE order_id = ?';
    
    const [orders] = await pool.query(orderQuery, [orderId]);
    const [items] = await pool.query(itemsQuery, [orderId]);
    
    if (orders.length === 0) return null;
    
    return {
      ...orders[0],
      items
    };
  }

  // Get orders by user ID
  static async getByUserId(userId) {
    const query = `
      SELECT o.*, COUNT(oi.id) as total_items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
    const [rows] = await pool.query(query, [userId]);
    return rows;
  }

  // Get all orders (admin)
  static async getAll() {
    const query = `
      SELECT o.*, u.email, u.first_name, u.last_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `;
    const [rows] = await pool.query(query);
    return rows;
  }

  // Update order status
  static async updateStatus(orderId, status) {
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    const [result] = await pool.query(query, [status, orderId]);
    return result;
  }

  // Update payment status
  static async updatePaymentStatus(orderId, payment_status) {
    const query = 'UPDATE orders SET payment_status = ? WHERE id = ?';
    const [result] = await pool.query(query, [payment_status, orderId]);
    return result;
  }

  // Get order by order number
  static async getByOrderNumber(orderNumber) {
    const query = 'SELECT * FROM orders WHERE order_number = ?';
    const [rows] = await pool.query(query, [orderNumber]);
    return rows[0];
  }

  // Cancel order
  static async cancel(orderId) {
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    const [result] = await pool.query(query, ['cancelled', orderId]);
    return result;
  }
}

export default OrderModel;
