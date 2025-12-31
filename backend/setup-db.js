import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kavi1106',
    multipleStatements: true
  });

  try {
    console.log('🔧 Creating database...');
    
    // Create database
    await connection.query('CREATE DATABASE IF NOT EXISTS ecommerce');
    console.log('✅ Database created');

    // Select database  
    await connection.query('USE ecommerce');
    
    // Read and execute SQL files
    const sqlFiles = [
      'users.sql',
      'contacts.sql', 
      'products.sql',
      'orders.sql',
      'order_items.sql',
      'login_sessions.sql'
    ];

    for (const file of sqlFiles) {
      const filePath = path.join(__dirname, '..', 'database', file);
      console.log(`📝 Setting up ${file}...`);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      try {
        await connection.query(sql);
        console.log(`✅ ${file} completed`);
      } catch (err) {
        console.log(`⚠️  ${file}: ${err.message.substring(0, 80)}`);
      }
    }

    console.log('\n✅ Database setup complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

setupDatabase();
