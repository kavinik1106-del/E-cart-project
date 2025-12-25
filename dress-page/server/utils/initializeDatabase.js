import sequelize from '../config/database.js';
import { initializeModels } from '../models/index.js';

const initializeDatabase = async () => {
  try {
    const { Product, Order, Customer, Setting } = initializeModels(sequelize);

    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully');

    // Check if data exists
    const productCount = await Product.count();
    const orderCount = await Order.count();
    const customerCount = await Customer.count();
    const settingCount = await Setting.count();

    // Seed initial data if empty
    if (productCount === 0) {
      await Product.bulkCreate([
        {
          name: 'Premium Casual Shirt',
          type: 'shirts',
          price: 1500,
          stock: 45,
          image: 'shirt1.avif',
          description: 'Premium quality casual shirt',
        },
        {
          name: 'Formal Business Suit',
          type: 'suits',
          price: 8500,
          stock: 12,
          image: 'formalsuit.avif',
          description: 'Professional formal suit',
        },
        {
          name: 'Chino Pants',
          type: 'pants',
          price: 2500,
          stock: 38,
          image: 'chino.avif',
          description: 'Comfortable chino pants',
        },
      ]);
      console.log('✅ Sample products seeded');
    }

    if (orderCount === 0) {
      await Order.bulkCreate([
        {
          id: 'ORD001',
          customer: 'John Doe',
          email: 'john@example.com',
          amount: 12500,
          status: 'delivered',
          date: new Date('2025-12-20'),
          items: 3,
          address: '123 Main St, City',
        },
        {
          id: 'ORD002',
          customer: 'Jane Smith',
          email: 'jane@example.com',
          amount: 8500,
          status: 'processing',
          date: new Date('2025-12-22'),
          items: 2,
          address: '456 Oak Ave, Town',
        },
        {
          id: 'ORD003',
          customer: 'Mike Johnson',
          email: 'mike@example.com',
          amount: 15000,
          status: 'shipped',
          date: new Date('2025-12-21'),
          items: 4,
          address: '789 Pine Rd, City',
        },
        {
          id: 'ORD004',
          customer: 'Emma Davis',
          email: 'emma@example.com',
          amount: 5500,
          status: 'pending',
          date: new Date('2025-12-23'),
          items: 1,
          address: '321 Elm St, Town',
        },
        {
          id: 'ORD005',
          customer: 'Alex Brown',
          email: 'alex@example.com',
          amount: 9800,
          status: 'delivered',
          date: new Date('2025-12-19'),
          items: 2,
          address: '654 Maple Dr, City',
        },
        {
          id: 'ORD006',
          customer: 'Lisa Wilson',
          email: 'lisa@example.com',
          amount: 22000,
          status: 'processing',
          date: new Date('2025-12-18'),
          items: 5,
          address: '987 Cedar Ln, Town',
        },
      ]);
      console.log('✅ Sample orders seeded');
    }

    if (customerCount === 0) {
      await Customer.bulkCreate([
        {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1-555-0100',
          location: 'New York',
          orders: 12,
          spent: 45000,
          joined: new Date('2024-01-15'),
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1-555-0101',
          location: 'Los Angeles',
          orders: 8,
          spent: 32000,
          joined: new Date('2024-02-20'),
        },
        {
          name: 'Mike Johnson',
          email: 'mike@example.com',
          phone: '+1-555-0102',
          location: 'Chicago',
          orders: 15,
          spent: 58900,
          joined: new Date('2024-01-05'),
        },
        {
          name: 'Emma Davis',
          email: 'emma@example.com',
          phone: '+1-555-0103',
          location: 'Houston',
          orders: 5,
          spent: 18500,
          joined: new Date('2024-03-10'),
        },
        {
          name: 'Alex Brown',
          email: 'alex@example.com',
          phone: '+1-555-0104',
          location: 'Phoenix',
          orders: 10,
          spent: 42000,
          joined: new Date('2023-12-20'),
        },
      ]);
      console.log('✅ Sample customers seeded');
    }

    if (settingCount === 0) {
      await Setting.create({
        storeName: 'Fashion Hub',
        storeEmail: 'contact@fashionhub.com',
        storePhone: '+1-555-1000',
        currency: 'USD',
        taxRate: 5,
        notificationsEmail: true,
        notificationsOrders: true,
        notificationsLowStock: true,
      });
      console.log('✅ Settings initialized');
    }

    console.log('✅ Database initialization complete');
    return true;
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  }
};

export default initializeDatabase;
