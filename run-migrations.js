import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'kavi1106',
    database: 'ecommerce'
  });

  try {
    console.log('Starting database migrations...');
    const databaseDir = path.join(__dirname, 'database');
    const sqlFiles = fs.readdirSync(databaseDir).filter(f => f.endsWith('.sql')).sort();
    
    for (const file of sqlFiles) {
      console.log(`Running migration: ${file}`);
      const filePath = path.join(databaseDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');
      
      // Split by semicolon and execute each statement
      const statements = sql.split(';').filter(stmt => stmt.trim());
      for (const statement of statements) {
        if (statement.trim()) {
          await pool.query(statement);
        }
      }
      console.log(`✓ ${file} completed`);
    }
    
    console.log('\n✓ All migrations completed successfully!');
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

runMigrations();
