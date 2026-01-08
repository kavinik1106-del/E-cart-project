import mysql from 'mysql2/promise';
import sequelize from './config/database.js';
import { initializeModels } from './models/index.js';
import initializeDatabase from './utils/initializeDatabase.js';

const createDatabaseAndTables = async () => {
  try {
    console.log('🔄 Attempting to create database...');
    
    // Try to connect without database first (to create it)
    const connectionConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
    };

    try {
      const connection = await mysql.createConnection(connectionConfig);
      
      const dbName = process.env.DB_NAME || 'admin_panel_db';
      console.log(`✅ Creating database: ${dbName}`);
      
      await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
      console.log(`✅ Database '${dbName}' created successfully`);
      
      // Also ensure customer database exists (used by customer auth / orders)
      const customerDbName = process.env.CUSTOMER_DB_NAME || 'customer_db';
      await connection.execute(`CREATE DATABASE IF NOT EXISTS ${customerDbName}`);
      console.log(`✅ Database '${customerDbName}' created successfully`);
      
      await connection.end();
    } catch (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('❌ Could not connect to MySQL Server');
        console.error('\n⚠️  Please ensure:');
        console.error('   1. MySQL Server is installed');
        console.error('   2. MySQL Server is running');
        console.error('   3. Default credentials (user: root, password: root) are set');
        console.error('\n📥 Download MySQL: https://dev.mysql.com/downloads/mysql/');
        process.exit(1);
      }
      throw err;
    }

    // Initialize models and tables
    console.log('\n🔄 Initializing database tables...');
    const { Product, Order, Customer, Setting } = initializeModels(sequelize);

    // Test connection
    console.log('🔄 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful');

    // Initialize database (sync tables and seed)
    console.log('🔄 Creating tables and seeding data...');
    await initializeDatabase();
    console.log('✅ Database tables created and seeded');

    console.log('\n================================');
    console.log('✅ Setup Complete!');
    console.log('================================');
    console.log('\nDatabase Details:');
    console.log(`  Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`  Port: ${process.env.DB_PORT || 3306}`);
    console.log(`  Database: ${process.env.DB_NAME || 'admin_panel_db'}`);
    console.log(`  Tables: products, orders, customers, settings`);
    console.log('\nYou can now run: npm start');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.error('\nMake sure MySQL Server is installed and running.');
    console.error('Download: https://dev.mysql.com/downloads/mysql/');
    process.exit(1);
  }
};

createDatabaseAndTables();
