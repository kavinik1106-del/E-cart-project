#!/usr/bin/env node

const http = require('http');

async function createTestUser() {
  const userData = JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    first_name: 'Test',
    last_name: 'User',
    phone: '9876543210'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': userData.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('\n✅ Test User Created Successfully');
          console.log('Email:', 'test@example.com');
          console.log('Password:', 'password123');
          console.log('Response:', result);
          resolve(result);
        } catch (e) {
          console.error('Failed to parse response:', data);
          reject(e);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Error:', error.message);
      reject(error);
    });

    console.log('📝 Creating test user...');
    req.write(userData);
    req.end();
  });
}

createTestUser().catch(console.error);
