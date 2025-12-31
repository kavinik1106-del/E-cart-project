import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import sequelize from './config/database.js';
import { initializeModels } from './models/index.js';
import initializeDatabase from './utils/initializeDatabase.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Initialize models
const { Product, Order, Customer, Setting } = initializeModels(sequelize);

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Initialize database (sync, seed data)
    await initializeDatabase();

// ========== AUTH ENDPOINTS ==========

    // Admin login
    app.post('/api/auth/login', async (req, res) => {
      try {
        const { username, password } = req.body;

        // Simple admin credentials (in production, use proper user management)
        if (username === 'admin' && password === 'admin123') {
          const token = jwt.sign(
            { username: 'admin', role: 'admin' },
            JWT_SECRET,
            { expiresIn: '24h' }
          );

          res.json({
            success: true,
            message: 'Login successful',
            data: {
              token,
              user: { username: 'admin', role: 'admin' }
            }
          });
        } else {
          res.status(401).json({
            success: false,
            error: 'Invalid credentials'
          });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // Verify token
    app.get('/api/auth/verify', authenticateToken, (req, res) => {
      res.json({
        success: true,
        data: { user: req.user }
      });
    });

// ========== PRODUCTS ENDPOINTS ==========

    // GET all products (public for frontend)
    app.get('/api/products', async (req, res) => {
      try {
        const products = await Product.findAll();
        res.json({
          success: true,
          data: products,
          count: products.length,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // GET single product
    app.get('/api/products/:id', authenticateToken, async (req, res) => {
      try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, data: product });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // CREATE product
    app.post('/api/products', authenticateToken, async (req, res) => {
      try {
        const product = await Product.create({
          name: req.body.name,
          type: req.body.type,
          price: parseFloat(req.body.price),
          stock: parseInt(req.body.stock),
          image: req.body.image || '',
          description: req.body.description || '',
        });
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // UPDATE product
    app.put('/api/products/:id', authenticateToken, async (req, res) => {
      try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
        await product.update({
          name: req.body.name || product.name,
          type: req.body.type || product.type,
          price: req.body.price !== undefined ? parseFloat(req.body.price) : product.price,
          stock: req.body.stock !== undefined ? parseInt(req.body.stock) : product.stock,
          image: req.body.image || product.image,
          description: req.body.description || product.description,
        });
        res.json({ success: true, data: product });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // DELETE product
    app.delete('/api/products/:id', authenticateToken, async (req, res) => {
      try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
        await product.destroy();
        res.json({ success: true, data: product });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // ========== ORDERS ENDPOINTS ==========

    // GET all orders
    app.get('/api/orders', authenticateToken, async (req, res) => {
      try {
        const orders = await Order.findAll();
        res.json({
          success: true,
          data: orders,
          count: orders.length,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // GET single order
    app.get('/api/orders/:id', authenticateToken, async (req, res) => {
      try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
          return res.status(404).json({ success: false, error: 'Order not found' });
        }
        res.json({ success: true, data: order });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // CREATE order
    app.post('/api/orders', authenticateToken, async (req, res) => {
      try {
        // Generate order ID
        const lastOrder = await Order.findOne({
          order: [['id', 'DESC']],
        });
        const newId = lastOrder 
          ? `ORD${String(parseInt(lastOrder.id.replace('ORD', '')) + 1).padStart(3, '0')}`
          : 'ORD001';

        const order = await Order.create({
          id: newId,
          customer: req.body.customer,
          email: req.body.email,
          amount: parseFloat(req.body.amount),
          status: req.body.status || 'pending',
          items: parseInt(req.body.items) || 1,
          address: req.body.address,
        });
        res.status(201).json({ success: true, data: order });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // UPDATE order
    app.put('/api/orders/:id', authenticateToken, async (req, res) => {
      try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
          return res.status(404).json({ success: false, error: 'Order not found' });
        }
        await order.update({
          customer: req.body.customer || order.customer,
          email: req.body.email || order.email,
          amount: req.body.amount !== undefined ? parseFloat(req.body.amount) : order.amount,
          status: req.body.status || order.status,
          items: req.body.items !== undefined ? parseInt(req.body.items) : order.items,
          address: req.body.address || order.address,
        });
        res.json({ success: true, data: order });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // ========== CUSTOMERS ENDPOINTS ==========

    // GET all customers
    app.get('/api/customers', authenticateToken, async (req, res) => {
      try {
        const customers = await Customer.findAll();
        res.json({
          success: true,
          data: customers,
          count: customers.length,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // GET single customer
    app.get('/api/customers/:id', authenticateToken, async (req, res) => {
      try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
          return res.status(404).json({ success: false, error: 'Customer not found' });
        }
        res.json({ success: true, data: customer });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // ========== SETTINGS ENDPOINTS ==========

    // GET settings
    app.get('/api/settings', async (req, res) => {
      try {
        let settings = await Setting.findByPk(1);
        if (!settings) {
          settings = await Setting.create({ id: 1 });
        }
        res.json({ success: true, data: settings });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // UPDATE settings
    app.put('/api/settings', async (req, res) => {
      try {
        let settings = await Setting.findByPk(1);
        if (!settings) {
          settings = await Setting.create({ id: 1 });
        }
        await settings.update({
          storeName: req.body.storeName || settings.storeName,
          storeEmail: req.body.storeEmail || settings.storeEmail,
          storePhone: req.body.storePhone || settings.storePhone,
          currency: req.body.currency || settings.currency,
          taxRate: req.body.taxRate !== undefined ? parseFloat(req.body.taxRate) : settings.taxRate,
          notificationsEmail: req.body.notifications?.email !== undefined ? req.body.notifications.email : settings.notificationsEmail,
          notificationsOrders: req.body.notifications?.orders !== undefined ? req.body.notifications.orders : settings.notificationsOrders,
          notificationsLowStock: req.body.notifications?.lowStock !== undefined ? req.body.notifications.lowStock : settings.notificationsLowStock,
        });
        res.json({ success: true, data: settings });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // ========== DASHBOARD STATS ENDPOINT ==========

    // GET dashboard statistics
    app.get('/api/dashboard/stats', async (req, res) => {
      try {
        const products = await Product.findAll();
        const orders = await Order.findAll();
        const customers = await Customer.findAll();

        const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.amount), 0);
        const totalOrders = orders.length;
        const totalProducts = products.length;
        const totalCustomers = customers.length;

        res.json({
          success: true,
          data: {
            totalSales,
            totalOrders,
            totalProducts,
            totalCustomers,
            recentOrders: orders.slice(-5).reverse(),
            topProducts: products.slice(0, 5),
          },
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // ========== HEALTH CHECK ==========

    app.get('/api/health', (req, res) => {
      res.json({ success: true, message: 'API is running', database: 'MySQL' });
    });

    // ========== ERROR HANDLING ==========

    app.use((req, res) => {
      res.status(404).json({ success: false, error: 'Route not found' });
    });

    // Start listening
    app.listen(PORT, () => {
      console.log(`✅ API Server running on http://localhost:${PORT}`);
      console.log(`📦 Products: GET /api/products`);
      console.log(`📋 Orders: GET /api/orders`);
      console.log(`👥 Customers: GET /api/customers`);
      console.log(`⚙️  Settings: GET /api/settings`);
      console.log(`📊 Dashboard: GET /api/dashboard/stats`);
      console.log(`🗄️  Database: MySQL (admin_panel_db)`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
