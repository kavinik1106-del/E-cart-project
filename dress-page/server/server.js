import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Admin panel DB
import sequelize from './config/database.js';
import { initializeModels } from './models/index.js';
import initializeDatabase from './utils/initializeDatabase.js';
import adminCustomerRoutes from "./customer/routes/adminCustomer.routes.js";
import mainBackendAPI from './utils/mainBackendClient.js';

// Customer DB
import customerDB from "./config/customerDatabase.js";
import Customer from './customer/models/Customer.model.js';
import customerAuthRoutes from './customer/routes/customerAuth.routes.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ 
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5000', 'http://localhost:5001'], 
  credentials: true 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/admin/customers", adminCustomerRoutes);

// Customer login route
app.use('/api/customer/auth', customerAuthRoutes);

// ========== ADMIN AUTH ENDPOINTS ==========
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Demo admin credentials
    if ((username === 'admin' || username === 'admin@example.com') && password === 'admin123') {
      const token = 'admin-jwt-token-' + Date.now();
      return res.json({
        success: true,
        message: 'Admin login successful',
        data: {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin',
          token: token
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid admin credentials'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token && token.startsWith('admin-jwt-token-')) {
      return res.json({
        success: true,
        message: 'Token valid',
        data: { valid: true, role: 'admin' }
      });
    }
    return res.status(401).json({ success: false, message: 'Invalid token' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

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

    // ========== PRODUCTS ENDPOINTS (Connected to Main Backend) ==========
    app.get('/api/products', async (req, res) => {
      try {
        console.log('📥 Admin /api/products request received');
        console.log('   Query params:', req.query);
        
        // Try to fetch from main backend first
        try {
          console.log('🔄 Proxying to main backend...');
          const result = await mainBackendAPI.getProducts(req.query);
          console.log('✅ Main backend returned:', result.data?.length || 0, 'products');
          return res.json(result);
        } catch (mainError) {
          console.warn('⚠️ Main backend products unavailable, using local data:', mainError.message);
        }

        // Fallback to local database
        console.log('💾 Using local database fallback');
        const products = await Product.findAll();
        const formattedProducts = products.map(product => ({
          id: product.id,
          name: product.name,
          type: product.type,
          category: product.category,
          brand: product.brand,
          price: parseFloat(product.price),
          mrp: product.mrp ? parseFloat(product.mrp) : null,
          stock: product.stock,
          image: product.image,
          description: product.description,
          rating: product.rating,
          reviews: product.reviews,
          discount: product.discount,
          colors: product.colors,
          sizeGuide: product.sizeGuide,
          tag: product.tag,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        }));
        console.log('📦 Returning', formattedProducts.length, 'products from local database');
        res.json({ 
          success: true, 
          data: formattedProducts, 
          count: formattedProducts.length 
        });
      } catch (error) {
        console.error('❌ Error fetching products:', error);
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
        const {
          name,
          type,
          category,
          brand,
          price,
          mrp,
          stock,
          image,
          description,
          rating,
          reviews,
          discount,
          colors,
          sizeGuide,
          tag,
        } = req.body;

        // Validate required fields
        if (!name || !type || price === undefined) {
          return res.status(400).json({ 
            success: false, 
            error: 'Missing required fields: name, type, price' 
          });
        }

        // Try to create product in main backend first so it's permanently stored
        try {
          console.log('🔁 Forwarding product create to main backend');
          const backendResponse = await mainBackendAPI.createProduct(req.body);
          // If main backend responded with success, return that response
          if (backendResponse && backendResponse.success) {
            return res.status(201).json(backendResponse);
          }
          // If main backend returned but indicated failure, fallback to local DB
          console.warn('Main backend create returned non-success, falling back to local DB');
        } catch (mainErr) {
          console.warn('⚠️ Main backend create failed, falling back to admin DB:', mainErr.message || mainErr);
        }

        // Fallback: create in admin panel local DB
        const product = await Product.create({
          name,
          type,
          category: category || '',
          brand: brand || '',
          price: parseFloat(price),
          mrp: mrp ? parseFloat(mrp) : null,
          stock: parseInt(stock) || 0,
          image: image || '',
          description: description || '',
          rating: rating || 4.5,
          reviews: parseInt(reviews) || 0,
          discount: discount || 0,
          colors: colors || ['Default'],
          sizeGuide: sizeGuide || { S: {}, M: {}, L: {}, XL: {} },
          tag: tag || 'In Stock',
        });

        res.status(201).json({ success: true, data: product, createdIn: 'admin_db' });
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.put('/api/products/:id', async (req, res) => {
      try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

        const {
          name,
          type,
          category,
          brand,
          price,
          mrp,
          stock,
          image,
          description,
          rating,
          reviews,
          discount,
          colors,
          sizeGuide,
          tag,
        } = req.body;

        await product.update({
          name: name !== undefined ? name : product.name,
          type: type !== undefined ? type : product.type,
          category: category !== undefined ? category : product.category,
          brand: brand !== undefined ? brand : product.brand,
          price: price !== undefined ? parseFloat(price) : product.price,
          mrp: mrp !== undefined ? parseFloat(mrp) : product.mrp,
          stock: stock !== undefined ? parseInt(stock) : product.stock,
          image: image !== undefined ? image : product.image,
          description: description !== undefined ? description : product.description,
          rating: rating !== undefined ? rating : product.rating,
          reviews: reviews !== undefined ? parseInt(reviews) : product.reviews,
          discount: discount !== undefined ? discount : product.discount,
          colors: colors !== undefined ? colors : product.colors,
          sizeGuide: sizeGuide !== undefined ? sizeGuide : product.sizeGuide,
          tag: tag !== undefined ? tag : product.tag,
        });

        res.json({ success: true, data: product });
      } catch (error) {
        console.error('Error updating product:', error);
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
    // ========== ORDERS ENDPOINTS (Synced with Main Backend) ==========
    app.get('/api/orders', async (req, res) => {
      try {
        // Try to fetch from main backend first
        try {
          const result = await mainBackendAPI.getOrders();
          if (result.success && result.data) {
            return res.json(result);
          }
        } catch (mainError) {
          console.warn('Main backend orders unavailable, using local data:', mainError.message);
        }

        // Fallback to local database
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
        // Get the last order ID
        const lastOrder = await Order.findOne({ order: [['id', 'DESC']] });
        const newId = lastOrder
          ? `ORD${String(parseInt(lastOrder.id.replace('ORD', '')) + 1).padStart(3, '0')}`
          : 'ORD001';

        // Create or update customer
        let customer = await Customer.findOne({ where: { email: req.body.email } });
        if (!customer) {
          customer = await Customer.create({
            name: req.body.customer,
            email: req.body.email,
            phone: req.body.phone || '',
            location: req.body.city ? `${req.body.city}, ${req.body.state}` : '',
            orders: 1,
            spent: parseFloat(req.body.amount),
          });
        } else {
          // Update existing customer
          await customer.update({
            orders: (customer.orders || 0) + 1,
            spent: parseFloat(customer.spent || 0) + parseFloat(req.body.amount),
          });
        }

        // Create order with all details
        const order = await Order.create({
          id: newId,
          customer: req.body.customer,
          email: req.body.email,
          phone: req.body.phone || '',
          address: req.body.address,
          city: req.body.city || '',
          state: req.body.state || '',
          pincode: req.body.pincode || '',
          amount: parseFloat(req.body.amount),
          items_count: req.body.items_count || 1,
          items_details: req.body.items_details || [],
          status: 'pending',
          payment_status: req.body.payment_status || 'unpaid',
          payment_method: req.body.payment_method || 'cod',
          notes: req.body.notes || '',
        });

        res.status(201).json({ 
          success: true, 
          data: order,
          message: 'Order created successfully'
        });
      } catch (error) {
        console.error('Order creation error:', error);
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
          phone: req.body.phone !== undefined ? req.body.phone : order.phone,
          address: req.body.address || order.address,
          city: req.body.city !== undefined ? req.body.city : order.city,
          state: req.body.state !== undefined ? req.body.state : order.state,
          pincode: req.body.pincode !== undefined ? req.body.pincode : order.pincode,
          amount: req.body.amount !== undefined ? parseFloat(req.body.amount) : order.amount,
          items_count: req.body.items_count !== undefined ? parseInt(req.body.items_count) : order.items_count,
          items_details: req.body.items_details !== undefined ? req.body.items_details : order.items_details,
          status: req.body.status || order.status,
          payment_status: req.body.payment_status || order.payment_status,
          payment_method: req.body.payment_method || order.payment_method,
          notes: req.body.notes !== undefined ? req.body.notes : order.notes,
        });

        res.json({ success: true, data: order });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // ========== CUSTOMERS ENDPOINTS (Synced with Main Backend) ==========
    app.get('/api/customers', async (req, res) => {
      try {
        // Try to fetch from main backend first
        try {
          const result = await mainBackendAPI.getAllUsers();
          if (result.success && result.data) {
            // Transform backend users to admin customer format
            const transformedCustomers = result.data.map(user => ({
              id: user.id,
              name: `${user.first_name} ${user.last_name}`.trim() || user.email,
              email: user.email,
              phone: user.phone || 'N/A',
              location: `${user.city || ''} ${user.state || ''}`.trim() || 'N/A',
              created_at: user.created_at,
              createdAt: user.created_at,
              source: 'main_backend'
            }));
            return res.json({ success: true, data: transformedCustomers, count: transformedCustomers.length });
          }
        } catch (mainError) {
          console.warn('Main backend users unavailable, using local data:', mainError.message);
        }

        // Fallback to local database
        const customers = await Customer.findAll({
          order: [['createdAt', 'DESC']],
        });
        res.json({ success: true, data: customers, count: customers.length });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.get('/api/customers/:id', async (req, res) => {
      try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json({ success: false, error: 'Customer not found' });
        
        // Get customer orders
        const orders = await Order.findAll({
          where: { email: customer.email },
          order: [['createdAt', 'DESC']],
        });

        res.json({ success: true, data: { ...customer.dataValues, orders } });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.post('/api/customers', async (req, res) => {
      try {
        const customer = await Customer.create({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone || '',
          location: req.body.location || '',
          orders: req.body.orders || 0,
          spent: parseFloat(req.body.spent) || 0,
        });

        res.status(201).json({ success: true, data: customer });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.put('/api/customers/:id', async (req, res) => {
      try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json({ success: false, error: 'Customer not found' });

        await customer.update({
          name: req.body.name || customer.name,
          email: req.body.email || customer.email,
          phone: req.body.phone !== undefined ? req.body.phone : customer.phone,
          location: req.body.location !== undefined ? req.body.location : customer.location,
          orders: req.body.orders !== undefined ? parseInt(req.body.orders) : customer.orders,
          spent: req.body.spent !== undefined ? parseFloat(req.body.spent) : customer.spent,
        });

        res.json({ success: true, data: customer });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });

    app.delete('/api/customers/:id', async (req, res) => {
      try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json({ success: false, error: 'Customer not found' });

        await customer.destroy();
        res.json({ success: true, message: 'Customer deleted' });
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
