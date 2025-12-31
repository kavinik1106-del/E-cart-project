import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Total sales
    const [salesResult] = await pool.query(`
      SELECT COALESCE(SUM(total_amount), 0) as totalSales
      FROM orders
      WHERE status != 'cancelled'
    `);

    // Total orders
    const [ordersResult] = await pool.query(`
      SELECT COUNT(*) as totalOrders
      FROM orders
      WHERE status != 'cancelled'
    `);

    // Total products
    const [productsResult] = await pool.query(`
      SELECT COUNT(*) as totalProducts
      FROM products
      WHERE is_active = true
    `);

    // Total customers
    const [customersResult] = await pool.query(`
      SELECT COUNT(DISTINCT user_id) as totalCustomers
      FROM orders
    `);

    const stats = {
      totalSales: parseFloat(salesResult[0].totalSales),
      totalOrders: ordersResult[0].totalOrders,
      totalProducts: productsResult[0].totalProducts,
      totalCustomers: customersResult[0].totalCustomers
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// Get recent orders
router.get('/dashboard/recent-orders', async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT
        o.id,
        o.order_number,
        CONCAT(u.first_name, ' ', u.last_name) as customer,
        o.total_amount as total,
        o.status,
        DATE_FORMAT(o.created_at, '%Y-%m-%d') as date
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 5
    `);

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent orders'
    });
  }
});

// Get top products
router.get('/dashboard/top-products', async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT
        p.id,
        p.name,
        COALESCE(SUM(oi.quantity), 0) as sales,
        COALESCE(SUM(oi.quantity * oi.price), 0) as revenue
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id AND o.status != 'cancelled'
      WHERE p.is_active = true
      GROUP BY p.id, p.name
      ORDER BY sales DESC
      LIMIT 5
    `);

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top products'
    });
  }
});

// Get sales overview (monthly data for current year)
router.get('/dashboard/sales-overview', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const [salesData] = await pool.query(`
      SELECT
        MONTH(created_at) as month,
        COALESCE(SUM(total_amount), 0) as sales
      FROM orders
      WHERE YEAR(created_at) = ? AND status != 'cancelled'
      GROUP BY MONTH(created_at)
      ORDER BY MONTH(created_at)
    `, [currentYear]);

    // Create array with all 12 months, filling missing months with 0
    const monthlySales = Array.from({ length: 12 }, (_, i) => {
      const monthData = salesData.find(item => item.month === i + 1);
      return {
        month: i + 1,
        sales: monthData ? parseFloat(monthData.sales) : 0
      };
    });

    res.json({
      success: true,
      data: monthlySales
    });
  } catch (error) {
    console.error('Error fetching sales overview:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales overview'
    });
  }
});

// Get all products for admin management
router.get('/products', async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT * FROM products
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// Create new product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, mrp, category, image, stock_quantity } = req.body;

    const [result] = await pool.query(`
      INSERT INTO products (name, description, price, mrp, category, image, stock_quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, description, price, mrp, category, image, stock_quantity]);

    res.json({
      success: true,
      message: 'Product created successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, mrp, category, image, stock_quantity, is_active } = req.body;

    await pool.query(`
      UPDATE products
      SET name = ?, description = ?, price = ?, mrp = ?, category = ?, image = ?, stock_quantity = ?, is_active = ?
      WHERE id = ?
    `, [name, description, price, mrp, category, image, stock_quantity, is_active, id]);

    res.json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM products WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    });
  }
});

// Get all orders for admin
router.get('/orders', async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT
        o.*,
        CONCAT(u.first_name, ' ', u.last_name) as customer_name,
        u.email as customer_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// Update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    res.json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
});

// Get all customers
router.get('/customers', async (req, res) => {
  try {
    const [customers] = await pool.query(`
      SELECT
        u.*,
        COUNT(o.id) as total_orders,
        COALESCE(SUM(o.total_amount), 0) as total_spent
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id AND o.status != 'cancelled'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);

    res.json({
      success: true,
      data: customers
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers'
    });
  }
});

export default router;