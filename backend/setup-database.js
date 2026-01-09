import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import pool from './config/database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple password hashing (same as auth controller)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database...\n');

    const connection = await pool.getConnection();

    // List of SQL files to execute
    const sqlFiles = [
      'users.sql',
      'contacts.sql',
      'orders.sql',
      'order_items.sql',
      'login_sessions.sql',
      'products.sql'
    ];

    for (const sqlFileName of sqlFiles) {
      try {
        const sqlFile = path.join(__dirname, '..', 'database', sqlFileName);
        const sql = fs.readFileSync(sqlFile, 'utf8');

        // Split by semicolon and execute each statement
        const statements = sql.split(';').filter(stmt => stmt.trim());

        for (const statement of statements) {
          if (statement.trim()) {
            console.log(`📝 Executing ${sqlFileName}:`, statement.substring(0, 50) + '...');
            await connection.query(statement);
          }
        }

        console.log(`✓ ${sqlFileName} executed successfully`);
      } catch (error) {
        console.log(`⚠️  ${sqlFileName} may already exist or has issues:`, error.message);
      }
    }

    console.log('✓ All tables created successfully\n');

    // Check if test user exists
    const [users] = await connection.query(
      'SELECT COUNT(*) as count FROM users WHERE email = ?',
      ['admin@example.com']
    );

    if (users[0].count === 0) {
      console.log('➕ Adding test user...');
      await connection.query(
        'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
        ['admin@example.com', hashPassword('admin123'), 'Admin', 'User']
      );
      console.log('✓ Test user created: admin@example.com / admin123\n');
    } else {
      console.log('✓ Test user already exists\n');
    }

    // Display summary
    const [userCount] = await connection.query('SELECT COUNT(*) as count FROM users');
    const [orderCount] = await connection.query('SELECT COUNT(*) as count FROM orders');
    const [productCount] = await connection.query('SELECT COUNT(*) as count FROM products');

    console.log('📊 Database Summary:');
    console.log(`  Users: ${userCount[0].count}`);
    console.log(`  Orders: ${orderCount[0].count}`);
    console.log(`  Products: ${productCount[0].count}\n`);

    console.log('✅ Database setup completed!\n');
    connection.release();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
