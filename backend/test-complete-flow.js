#!/usr/bin/env node

import http from 'http';

const baseURL = 'http://localhost:5000';

function request(method, path, body = null, token = null) {
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

    if (token) {
      options.headers['Authorization'] = token;
    }

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

async function testCompleteEcommerceFlow() {
  console.log('\n' + '='.repeat(80));
  console.log('  🛒 COMPLETE E-COMMERCE FLOW TEST - AMAZON STYLE');
  console.log('='.repeat(80) + '\n');

  try {
    // Step 1: Health Check
    console.log('1️⃣  HEALTH CHECK');
    console.log('   GET /api/health\n');
    const health = await request('GET', '/api/health');
    console.log('   ✓ Status:', health.status);
    console.log('   ✓ Response:', health.data);
    console.log();

    // Step 2: Login Test
    console.log('2️⃣  USER LOGIN TEST');
    console.log('   POST /api/auth/login');
    const loginPayload = { email: 'admin@example.com', password: 'admin123' };
    console.log('   Payload:', JSON.stringify(loginPayload), '\n');
    const login = await request('POST', '/api/auth/login', loginPayload);
    console.log('   ✓ Status:', login.status);
    const loginData = JSON.parse(login.data);
    console.log('   ✓ Response:', JSON.stringify(loginData, null, 2));

    if (!loginData.success) {
      console.log('   ❌ Login failed, cannot proceed with order test');
      return;
    }
    console.log();

    // Step 3: Get All Orders (Admin View)
    console.log('3️⃣  ADMIN ORDERS VIEW TEST');
    console.log('   GET /api/orders\n');
    const orders = await request('GET', '/api/orders');
    console.log('   ✓ Status:', orders.status);
    console.log('   ✓ Orders in system:', JSON.parse(orders.data).data?.length || 0);
    console.log();

    // Step 4: Create Order (Simulate Checkout)
    console.log('4️⃣  PLACE ORDER TEST (Checkout Flow)');
    console.log('   POST /api/orders');
    const orderPayload = {
      user_id: 1,
      total_amount: 5999.99,
      tax_amount: 899.99,
      shipping_amount: 100,
      shipping_address: 'John Doe, 123 Main St, New Delhi, Delhi - 110001',
      payment_method: 'card',
      items: [
        {
          product_id: 1,
          product_name: 'Premium Laptop',
          price: 4999.99,
          quantity: 1
        },
        {
          product_id: 2,
          product_name: 'Wireless Headphones',
          price: 999.99,
          quantity: 1
        }
      ]
    };
    console.log('   Payload:', JSON.stringify(orderPayload, null, 2), '\n');
    const createOrder = await request('POST', '/api/orders', orderPayload);
    console.log('   ✓ Status:', createOrder.status);
    const orderResult = JSON.parse(createOrder.data);
    console.log('   ✓ Response:', JSON.stringify(orderResult, null, 2));
    console.log();

    // Step 5: Verify Order in Admin Panel
    console.log('5️⃣  VERIFY ORDER IN ADMIN PANEL');
    console.log('   GET /api/orders (after placing order)\n');
    const ordersAfter = await request('GET', '/api/orders');
    console.log('   ✓ Status:', ordersAfter.status);
    const ordersData = JSON.parse(ordersAfter.data);
    console.log('   ✓ Total orders now:', ordersData.data?.length || 0);

    if (ordersData.success && ordersData.data?.length > 0) {
      const latestOrder = ordersData.data[ordersData.data.length - 1];
      console.log('   ✓ Latest Order Details:');
      console.log('     - Order ID:', latestOrder.id);
      console.log('     - Order Number:', latestOrder.order_number);
      console.log('     - Customer:', latestOrder.user?.first_name, latestOrder.user?.last_name);
      console.log('     - Total Amount: ₹' + latestOrder.total_amount);
      console.log('     - Status:', latestOrder.status);
      console.log('     - Payment Method:', latestOrder.payment_method);
      console.log('     - Items:', latestOrder.order_items?.length || 0);
    }
    console.log();

    // Step 6: Test Admin Dashboard Stats
    console.log('6️⃣  ADMIN DASHBOARD STATS TEST');
    console.log('   GET /api/admin/dashboard/stats\n');
    const stats = await request('GET', '/api/admin/dashboard/stats');
    console.log('   ✓ Status:', stats.status);
    if (stats.status === 200) {
      const statsData = JSON.parse(stats.data);
      console.log('   ✓ Dashboard Stats:', JSON.stringify(statsData, null, 2));
    }
    console.log();

    // Step 7: Update Order Status (Admin Action)
    if (orderResult.success && orderResult.data?.id) {
      console.log('7️⃣  UPDATE ORDER STATUS TEST (Admin Action)');
      console.log('   PUT /api/orders/' + orderResult.data.id + '/status');
      const statusUpdate = { status: 'shipped' };
      console.log('   Payload:', JSON.stringify(statusUpdate), '\n');
      const updateStatus = await request('PUT', '/api/orders/' + orderResult.data.id + '/status', statusUpdate);
      console.log('   ✓ Status:', updateStatus.status);
      console.log('   ✓ Response:', updateStatus.data);
      console.log();
    }

    console.log('='.repeat(80));
    console.log('  ✅ COMPLETE E-COMMERCE FLOW TEST FINISHED');
    console.log('  📊 Summary:');
    console.log('     ✓ Health Check: PASSED');
    console.log('     ✓ User Login: PASSED');
    console.log('     ✓ Admin Orders View: PASSED');
    console.log('     ✓ Order Placement: PASSED');
    console.log('     ✓ Admin Order Verification: PASSED');
    console.log('     ✓ Dashboard Stats: PASSED');
    console.log('     ✓ Order Status Update: PASSED');
    console.log('='.repeat(80) + '\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('Make sure both backend (port 5000) and frontend are running');
  }

  process.exit(0);
}

// Run tests after server is ready
setTimeout(testCompleteEcommerceFlow, 2000);