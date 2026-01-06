#!/usr/bin/env node

/**
 * Admin API Connection Test
 * Tests all admin panel API endpoints
 */

const http = require('http');

const ADMIN_API_BASE = 'http://localhost:5001/api';

async function testAPI(method, endpoint, data = null) {
  return new Promise((resolve) => {
    const url = new URL(ADMIN_API_BASE + endpoint);
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      const body = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }

    console.log(`\n🔵 ${method} ${endpoint}`);

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          const status = res.statusCode >= 200 && res.statusCode < 300 ? '✅' : '❌';
          console.log(`${status} Status: ${res.statusCode}`);
          console.log(`Response:`, JSON.stringify(response, null, 2));
          resolve({ success: res.statusCode >= 200 && res.statusCode < 300, data: response });
        } catch (e) {
          console.log(`❌ Status: ${res.statusCode}`);
          console.log(`Response:`, body);
          resolve({ success: false, data: body });
        }
      });
    });

    req.on('error', (err) => {
      console.log(`🔴 Error: ${err.message}`);
      resolve({ success: false, error: err.message });
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function runTests() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   🧪 ADMIN PANEL API CONNECTION TEST');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`\n📍 Admin API Base: ${ADMIN_API_BASE}`);
  console.log('Testing on port: 5001\n');

  const results = {};

  // Test 1: Health Check
  console.log('\n─ TEST 1: HEALTH CHECK ─');
  results.health = await testAPI('GET', '/health');

  // Test 2: Admin Login (Valid)
  console.log('\n─ TEST 2: ADMIN LOGIN (VALID) ─');
  results.loginValid = await testAPI('POST', '/auth/login', {
    username: 'admin',
    password: 'admin123',
  });

  // Test 3: Admin Login (Alternative Email)
  console.log('\n─ TEST 3: ADMIN LOGIN (ALTERNATIVE EMAIL) ─');
  results.loginEmail = await testAPI('POST', '/auth/login', {
    username: 'admin@example.com',
    password: 'admin123',
  });

  // Test 4: Admin Login (Invalid)
  console.log('\n─ TEST 4: ADMIN LOGIN (INVALID CREDENTIALS) ─');
  results.loginInvalid = await testAPI('POST', '/auth/login', {
    username: 'admin',
    password: 'wrongpassword',
  });

  // Test 5: Products List
  console.log('\n─ TEST 5: FETCH PRODUCTS ─');
  results.products = await testAPI('GET', '/products');

  // Test 6: Orders List
  console.log('\n─ TEST 6: FETCH ORDERS ─');
  results.orders = await testAPI('GET', '/orders');

  // Test 7: Customers List
  console.log('\n─ TEST 7: FETCH CUSTOMERS ─');
  results.customers = await testAPI('GET', '/customers');

  // Test 8: Settings
  console.log('\n─ TEST 8: FETCH SETTINGS ─');
  results.settings = await testAPI('GET', '/settings');

  // Test 9: Dashboard Stats
  console.log('\n─ TEST 9: FETCH DASHBOARD STATS ─');
  results.dashboard = await testAPI('GET', '/dashboard/stats');

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('   📊 TEST SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');

  const passed = Object.values(results).filter((r) => r.success).length;
  const total = Object.keys(results).length;

  console.log(`\n✅ Passed: ${passed}/${total}`);

  if (passed === total) {
    console.log('\n🎉 ALL TESTS PASSED! Admin API is working correctly.\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Check the logs above.\n');
    process.exit(1);
  }
}

runTests().catch(console.error);
