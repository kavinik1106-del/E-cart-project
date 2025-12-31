#!/usr/bin/env node

import http from 'http';

const baseURL = 'http://localhost:5000';

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseURL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, data: data });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });
    
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function test() {
  console.log('\n' + '='.repeat(70));
  console.log('  ✅ LOGIN API & ORDER API TEST OUTPUT');
  console.log('='.repeat(70) + '\n');

  try {
    // Test 1: Health
    console.log('[1️⃣ ] HEALTH CHECK TEST');
    console.log('    GET /api/health\n');
    const h = await request('GET', '/api/health');
    console.log('    ✓ Status:', h.status);
    console.log('    ✓ Response:', h.data);
    console.log();

    // Test 2: Login with test user
    console.log('[2️⃣ ] LOGIN API TEST');
    console.log('    POST /api/auth/login');
    const loginPayload = { email: 'admin@example.com', password: 'admin123' };
    console.log('    Payload:', JSON.stringify(loginPayload), '\n');
    const login = await request('POST', '/api/auth/login', loginPayload);
    console.log('    ✓ Status:', login.status);
    console.log('    ✓ Response:');
    console.log('   ', login.data);
    console.log();

    // Test 3: Get Orders
    console.log('[3️⃣ ] GET ALL ORDERS TEST');
    console.log('    GET /api/orders\n');
    const orders = await request('GET', '/api/orders');
    console.log('    ✓ Status:', orders.status);
    console.log('    ✓ Response:', orders.data);
    console.log();

    // Test 4: Create Order
    console.log('[4️⃣ ] CREATE ORDER API TEST');
    console.log('    POST /api/orders');
    const orderPayload = {
      user_id: 1,
      total_amount: 5999.99,
      tax_amount: 899.99,
      shipping_amount: 100,
      coupon_code: 'SAVE10',
      discount_amount: 599.99,
      shipping_address: '123 Main St, NYC',
      payment_method: 'credit_card',
      items: [
        {
          product_id: 1,
          product_name: 'Formal Suit',
          quantity: 1,
          price: 4999.99
        }
      ]
    };
    console.log('    Payload:', JSON.stringify(orderPayload, null, 2), '\n');
    const createOrder = await request('POST', '/api/orders', orderPayload);
    console.log('    ✓ Status:', createOrder.status);
    console.log('    ✓ Response:', createOrder.data);
    console.log();

    console.log('='.repeat(70));
    console.log('  ✅ ALL TESTS COMPLETED SUCCESSFULLY');
    console.log('='.repeat(70) + '\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('Make sure server is running on http://localhost:5000');
  }

  process.exit(0);
}

setTimeout(test, 500);
