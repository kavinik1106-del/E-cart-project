import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper functions to read/write JSON
const readJSON = (filename) => {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
    return [];
  }
};

const writeJSON = (filename, data) => {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error.message);
    return false;
  }
};

// Initialize data files
const initializeDataFiles = () => {
  const sampleProducts = [
    { id: 1, name: 'Formal Suit', type: 'mens', price: 5000, stock: 20, image: 'formalsuit.avif', description: 'Professional formal suit' },
    { id: 2, name: 'Pink Dress', type: 'womens', price: 3000, stock: 15, image: 'pinkdress.avif', description: 'Elegant pink dress' },
    { id: 3, name: 'Chino Pants', type: 'mens', price: 2000, stock: 30, image: 'chino.avif', description: 'Comfortable chino pants' }
  ];

  const sampleOrders = [
    { id: 'ORD001', customer: 'John Doe', email: 'john@example.com', amount: 5000, status: 'delivered', items: ['Formal Suit'], address: '123 Main St' },
    { id: 'ORD002', customer: 'Jane Smith', email: 'jane@example.com', amount: 3000, status: 'processing', items: ['Pink Dress'], address: '456 Oak Ave' },
    { id: 'ORD003', customer: 'Mike Wilson', email: 'mike@example.com', amount: 2000, status: 'pending', items: ['Chino Pants'], address: '789 Pine Rd' }
  ];

  const sampleCustomers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '9876543210', location: 'New York', orders: 5, spent: 25000 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', location: 'Los Angeles', orders: 3, spent: 15000 },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', phone: '9876543212', location: 'Chicago', orders: 2, spent: 8000 }
  ];

  const sampleSettings = {
    id: 1,
    storeName: 'Fashion Store',
    storeEmail: 'store@fashion.com',
    storePhone: '1234567890',
    currency: 'INR',
    taxRate: 18,
    notificationEmail: true,
    notificationSMS: false,
    notificationPush: true
  };

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(path.join(DATA_DIR, 'products.json'))) {
    writeJSON('products.json', sampleProducts);
  }
  if (!fs.existsSync(path.join(DATA_DIR, 'orders.json'))) {
    writeJSON('orders.json', sampleOrders);
  }
  if (!fs.existsSync(path.join(DATA_DIR, 'customers.json'))) {
    writeJSON('customers.json', sampleCustomers);
  }
  if (!fs.existsSync(path.join(DATA_DIR, 'settings.json'))) {
    writeJSON('settings.json', sampleSettings);
  }
};

// Initialize data files on startup
initializeDataFiles();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API is running (JSON fallback mode - MySQL not connected)',
    timestamp: new Date().toISOString(),
    mode: 'fallback'
  });
});

// ========== PRODUCTS ENDPOINTS ==========
app.get('/api/products', (req, res) => {
  try {
    const products = readJSON('products.json');
    res.json({ success: true, data: products, count: products.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const products = readJSON('products.json');
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const products = readJSON('products.json');
    const newProduct = { id: Math.max(...products.map(p => p.id), 0) + 1, ...req.body };
    products.push(newProduct);
    writeJSON('products.json', products);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const products = readJSON('products.json');
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, error: 'Product not found' });
    products[index] = { ...products[index], ...req.body };
    writeJSON('products.json', products);
    res.json({ success: true, data: products[index] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const products = readJSON('products.json');
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, error: 'Product not found' });
    const deleted = products.splice(index, 1);
    writeJSON('products.json', products);
    res.json({ success: true, data: deleted[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== ORDERS ENDPOINTS ==========
app.get('/api/orders', (req, res) => {
  try {
    const orders = readJSON('orders.json');
    res.json({ success: true, data: orders, count: orders.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/orders/:id', (req, res) => {
  try {
    const orders = readJSON('orders.json');
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const orders = readJSON('orders.json');
    const newId = `ORD${String(parseInt(orders[orders.length - 1]?.id.slice(3) || 0) + 1).padStart(3, '0')}`;
    const newOrder = { id: newId, ...req.body };
    orders.push(newOrder);
    writeJSON('orders.json', orders);
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/orders/:id', (req, res) => {
  try {
    const orders = readJSON('orders.json');
    const index = orders.findIndex(o => o.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: 'Order not found' });
    orders[index] = { ...orders[index], ...req.body };
    writeJSON('orders.json', orders);
    res.json({ success: true, data: orders[index] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== CUSTOMERS ENDPOINTS ==========
app.get('/api/customers', (req, res) => {
  try {
    const customers = readJSON('customers.json');
    res.json({ success: true, data: customers, count: customers.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/customers/:id', (req, res) => {
  try {
    const customers = readJSON('customers.json');
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).json({ success: false, error: 'Customer not found' });
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== SETTINGS ENDPOINTS ==========
app.get('/api/settings', (req, res) => {
  try {
    const settings = readJSON('settings.json');
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/settings', (req, res) => {
  try {
    const currentSettings = readJSON('settings.json');
    const updated = { ...currentSettings, ...req.body };
    writeJSON('settings.json', updated);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== DASHBOARD ENDPOINTS ==========
app.get('/api/dashboard/stats', (req, res) => {
  try {
    const products = readJSON('products.json');
    const orders = readJSON('orders.json');
    const customers = readJSON('customers.json');

    const totalSales = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const totalOrders = orders.length;
    const totalCustomers = customers.length;
    const totalProducts = products.length;

    res.json({
      success: true,
      data: {
        totalSales,
        totalOrders,
        totalCustomers,
        totalProducts,
        recentOrders: orders.slice(-5),
        topProducts: products.slice(0, 3)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log('\n🚀 ========================================');
      console.log('✅ API Server Running Successfully!');
      console.log('========================================');
      console.log(`📍 Server: http://localhost:${PORT}`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📦 Products: http://localhost:${PORT}/api/products`);
      console.log(`📋 Orders: http://localhost:${PORT}/api/orders`);
      console.log(`👥 Customers: http://localhost:${PORT}/api/customers`);
      console.log(`⚙️  Settings: http://localhost:${PORT}/api/settings`);
      console.log(`📊 Dashboard: http://localhost:${PORT}/api/dashboard/stats`);
      console.log('========================================');
      console.log('📝 Mode: JSON Fallback (MySQL not available)');
      console.log('💾 Data stored in: server/data/');
      console.log('========================================\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✋ Server shutting down...');
  process.exit(0);
});
