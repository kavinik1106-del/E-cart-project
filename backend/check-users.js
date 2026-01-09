#!/usr/bin/env node

import pool from './config/database.js';

async function checkUser() {
  try {
    console.log('\n📋 Checking database users...\n');
    
    const [users] = await pool.query('SELECT id, email, first_name FROM users');
    
    console.log(`Found ${users.length} users:`);
    users.forEach(u => {
      console.log(`  - ID: ${u.id}, Email: ${u.email}, Name: ${u.first_name || 'N/A'}`);
    });

    if (users.length > 0) {
      console.log('\n✅ Users found in database');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUser();
