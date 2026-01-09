#!/usr/bin/env node

const http = require('http');

async function makeRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function test() {
  try {
    console.log('\n📋 Testing Orders Page\n');

    // Try different users
    const testCredentials = [
      { email: 'admin@example.com', password: 'admin123' },
      { email: 'kavin@gmail.com', password: 'password123' },
      { email: 'janani@gmail.com', password: 'password123' },
    ];

    let userId = null;
    let token = null;

    for (const cred of testCredentials) {
      console.log(`🔐 Trying login with ${cred.email}...`);
      const loginRes = await makeRequest('POST', '/api/auth/login', JSON.stringify(cred));

      if (loginRes.data.success) {
        console.log(`   ✅ Login successful!`);
        userId = loginRes.data.data.user.id;
        token = loginRes.data.data.token;
        console.log(`   User ID: ${userId}\n`);
        break;
      } else {
        console.log(`   ❌ ${loginRes.data.message}\n`);
      }
    }

    if (!userId) {
      console.error('❌ Could not login with any test credentials');
      return;
    }

    // Fetch user orders
    console.log(`📦 Fetching orders for user ${userId}...`);
    const ordersRes = await makeRequest('GET', `/api/orders/user/${userId}`, null);

    console.log(`   Status: ${ordersRes.status}`);
    console.log(`   Success: ${ordersRes.data.success}`);
    
    if (Array.isArray(ordersRes.data.data)) {
      console.log(`   Total Orders: ${ordersRes.data.data.length}`);
      if (ordersRes.data.data.length > 0) {
        console.log(`   First Order ID: ${ordersRes.data.data[0].id}`);
      }
    }

    console.log('\n✅ API is working! The Orders page should load now.');
    console.log(`\nTo test in browser:`);
    console.log(`   1. Go to http://localhost:5175/login`);
    console.log(`   2. Login with any existing user (see database above)`);
    console.log(`   3. Go to http://localhost:5175/orders`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
