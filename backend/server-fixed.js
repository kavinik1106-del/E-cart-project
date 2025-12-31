import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Create database pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// LOGIN API
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT id, email, first_name, last_name FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        token: 'sample-jwt-token-' + user.id
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// GET ALL ORDERS API
app.get('/api/orders', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [orders] = await connection.query(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT 10'
    );
    connection.release();

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// CREATE ORDER API
app.post('/api/orders', async (req, res) => {
  try {
    const {
      user_id,
      total_amount,
      tax_amount = 0,
      shipping_amount = 0,
      coupon_code = null,
      discount_amount = 0,
      shipping_address,
      payment_method = 'credit_card',
      items = []
    } = req.body;

    if (!user_id || !total_amount) {
      return res.status(400).json({
        success: false,
        message: 'user_id and total_amount are required'
      });
    }

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Insert order
      const [orderResult] = await connection.query(
        `INSERT INTO orders (user_id, order_number, total_amount, tax_amount, shipping_amount, 
          coupon_code, discount_amount, shipping_address, payment_method, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [user_id, orderNumber, total_amount, tax_amount, shipping_amount, coupon_code, discount_amount, shipping_address, payment_method]
      );

      const orderId = orderResult.insertId;

      // Insert order items
      if (items && items.length > 0) {
        for (const item of items) {
          await connection.query(
            `INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
             VALUES (?, ?, ?, ?, ?)`,
            [orderId, item.product_id, item.product_name, item.quantity, item.price]
          );
        }
      }

      await connection.commit();
      connection.release();

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          orderId: orderId,
          orderNumber: orderNumber,
          totalAmount: total_amount,
          status: 'pending'
        }
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n[✓] Server running on http://localhost:${PORT}`);
  console.log('[✓] Database connected');
  console.log('\nAvailable APIs:');
  console.log('  GET    /api/health');
  console.log('  POST   /api/auth/login');
  console.log('  GET    /api/orders');
  console.log('  POST   /api/orders\n');
});

export default app;
