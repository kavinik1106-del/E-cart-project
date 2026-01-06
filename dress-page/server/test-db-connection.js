import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Testing database connection...');
    console.log('Host:', process.env.DB_HOST || 'localhost');
    console.log('User:', process.env.DB_USER || 'root');
    console.log('Database:', process.env.DB_NAME || 'admin_panel_db');
    
    const connection = await mysql2.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'admin_panel_db'
    });

    console.log('✅ Database connection successful!');

    // Check products table
    const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
    console.log('Products in database:', products[0].count);

    // Get first 5 products
    const [productList] = await connection.query('SELECT id, name, price FROM products LIMIT 5');
    console.log('\nFirst 5 products:');
    productList.forEach(p => {
      console.log(`  - ${p.id}: ${p.name} (₹${p.price})`);
    });

    await connection.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

testConnection();
