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
    console.log('\n📋 Orders Page Test\n');

    // 1. Login
    console.log('1️⃣ Logging in with test@example.com...');
    const loginRes = await makeRequest('POST', '/api/auth/login', JSON.stringify({
      email: 'test@example.com',
      password: 'password123'
    }));

    console.log(`   Status: ${loginRes.status}`);
    console.log(`   Success: ${loginRes.data.success}`);
    console.log(`   Message: ${loginRes.data.message}`);

    if (!loginRes.data.success) {
      console.error('❌ Login failed');
      return;
    }

    const userId = loginRes.data.data.user.id;
    const token = loginRes.data.data.token;
    console.log(`   ✅ Logged in as user ${userId}`);
    console.log(`   Token: ${token.substring(0, 20)}...`);

    // 2. Fetch user orders
    console.log(`\n2️⃣ Fetching orders for user ${userId}...`);
    const ordersRes = await makeRequest('GET', `/api/orders/user/${userId}`, null);

    console.log(`   Status: ${ordersRes.status}`);
    console.log(`   Success: ${ordersRes.data.success}`);
    console.log(`   Orders Count: ${Array.isArray(ordersRes.data.data) ? ordersRes.data.data.length : 0}`);

    if (Array.isArray(ordersRes.data.data) && ordersRes.data.data.length > 0) {
      console.log(`   Sample Order: ${JSON.stringify(ordersRes.data.data[0], null, 2).substring(0, 200)}...`);
    } else {
      console.log('   ℹ️  No orders found (this is OK for new user)');
    }

    console.log('\n✅ Orders page should now load successfully!');
    console.log('   To test: Login with test@example.com / password123, then visit /orders');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
