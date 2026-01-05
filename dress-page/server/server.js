import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Admin panel DB
import sequelize from './config/database.js';
import { initializeModels } from './models/index.js';
import initializeDatabase from './utils/initializeDatabase.js';
import adminCustomerRoutes from "./customer/routes/adminCustomer.routes.js";

// Customer DB
import customerDB from "./config/customerDatabase.js";
import Customer from './customer/models/Customer.model.js';
import customerAuthRoutes from './customer/routes/customerAuth.routes.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5000', 'http://localhost:5001'], credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/admin/customers", adminCustomerRoutes);

// Customer login route
app.use('/api/customer/auth', customerAuthRoutes);

// Initialize admin panel models
const { Product, Order, Setting } = initializeModels(sequelize);

// Function to initialize both DBs
const startServer = async () => {
  try {
    // Test connections
    await sequelize.authenticate();
    console.log('✅ Admin panel DB connected');

    await customerDB.authenticate();
    console.log('✅ Customer DB connected');

    // Sync tables
    await initializeDatabase();       // Admin panel tables
    await customerDB.sync({ alter: true }); // Customer tables

    // ========== PRODUCTS ENDPOINTS ==========
    app.get('/api/products', async (req, res) => {
      try {
        const products = await Product.findAll();
        res.json({ success: true, data: products, count: products.length });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.get('/api/products/:id', async (req, res) => {
      try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
        res.json({ success: true, data: product });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.post('/api/products', async (req, res) => {
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

    app.put('/api/products/:id', async (req, res) => {
      try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

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

    app.delete('/api/products/:id', async (req, res) => {
      try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
        await product.destroy();
        res.json({ success: true, data: product });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // ========== ORDERS ENDPOINTS ==========
    app.get('/api/orders', async (req, res) => {
      try {
        const orders = await Order.findAll();
        res.json({ success: true, data: orders, count: orders.length });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.get('/api/orders/:id', async (req, res) => {
      try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
        res.json({ success: true, data: order });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.post('/api/orders', async (req, res) => {
      try {
        const lastOrder = await Order.findOne({ order: [['id', 'DESC']] });
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

    app.put('/api/orders/:id', async (req, res) => {
      try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

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

    // ========== SETTINGS ENDPOINTS ==========
    app.get('/api/settings', async (req, res) => {
      try {
        let settings = await Setting.findByPk(1);
        if (!settings) settings = await Setting.create({ id: 1 });
        res.json({ success: true, data: settings });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.put('/api/settings', async (req, res) => {
      try {
        let settings = await Setting.findByPk(1);
        if (!settings) settings = await Setting.create({ id: 1 });

        await settings.update({
          storeName: req.body.storeName || settings.storeName,
          storeEmail: req.body.storeEmail || settings.storeEmail,
          storePhone: req.body.storePhone || settings.storePhone,
          currency: req.body.currency || settings.currency,
          taxRate: req.body.taxRate !== undefined ? parseFloat(req.body.taxRate) : settings.taxRate,
          notificationsEmail: req.body.notifications?.email ?? settings.notificationsEmail,
          notificationsOrders: req.body.notifications?.orders ?? settings.notificationsOrders,
          notificationsLowStock: req.body.notifications?.lowStock ?? settings.notificationsLowStock,
        });

        res.json({ success: true, data: settings });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // ========== DASHBOARD STATS ==========
    app.get('/api/dashboard/stats', async (req, res) => {
      try {
        const products = await Product.findAll();
        const orders = await Order.findAll();
        const customers = await Customer.findAll(); // from customer DB

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
      res.json({ success: true, message: 'API running', adminDB: 'admin_panel_db', customerDB: 'customer_db' });
    });

    // ========== 404 HANDLER ==========
    app.use((req, res) => {
      res.status(404).json({ success: false, error: 'Route not found' });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ API Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
