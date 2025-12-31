import mysql from 'mysql2/promise';
import crypto from 'crypto';

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

async function createAdmin() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kavi1106',
    database: 'ecommerce'
  });

  try {
    const email = 'admin@example.com';
    const password = 'admin123';
    const hashedPassword = hashPassword(password);

    // Insert admin user
    await connection.query(
      'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, 'Admin', 'User']
    );

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔐 Password: admin123');
    
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('⚠️  Admin user already exists');
      console.log('📧 Email: admin@example.com');
      console.log('🔐 Password: admin123');
    } else {
      console.error('❌ Error:', error.message);
    }
  } finally {
    await connection.end();
  }
}

createAdmin();
