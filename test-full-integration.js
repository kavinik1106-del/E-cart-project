#!/usr/bin/env node

/**
 * Full System Integration Test
 * Tests all connections between frontend, backend, admin, and database
 */

import http from 'http';

const MAIN_BACKEND = 'http://localhost:5000/api';
const ADMIN_BACKEND = 'http://localhost:5001/api';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, text) {
  console.log(`${color}${text}${colors.reset}`);
}

async function request(baseUrl, path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    try {
      const url = new URL(baseUrl + path);
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };

      const req = http.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve({ status: res.statusCode, data: json, success: res.statusCode < 400 });
          } catch {
            resolve({ status: res.statusCode, data, success: res.statusCode < 400 });
          }
        });
      });

      req.on('error', (err) => {
        resolve({ success: false, error: err.message });
      });

      if (body) req.write(JSON.stringify(body));
      req.end();
    } catch (err) {
      resolve({ success: false, error: err.message });
    }
  });
}

async function runTests() {
  console.clear();
  log(colors.cyan, '═════════════════════════════════════════════════════════════');
  log(colors.cyan, '    🧪 FULL SYSTEM INTEGRATION TEST');
  log(colors.cyan, '═════════════════════════════════════════════════════════════');

  const results = {
    mainBackend: {},
    adminBackend: {},
    database: {},
  };

  // ========== MAIN BACKEND TESTS ==========
  log(colors.blue, '\n📍 MAIN BACKEND (Port 5000)');
  log(colors.blue, '─────────────────────────────────────────────────────────────');

  let test = 'Health Check';
  let res = await request(MAIN_BACKEND, '/health');
  results.mainBackend.health = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  test = 'GET /products';
  res = await request(MAIN_BACKEND, '/products');
  results.mainBackend.products = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (res.success) log(colors.green, `   Found: ${res.data.count || res.data.data?.length || 0} products`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  test = 'GET /auth/users';
  res = await request(MAIN_BACKEND, '/auth/users');
  results.mainBackend.users = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (res.success) log(colors.green, `   Found: ${res.data.total || res.data.data?.length || 0} users`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  test = 'GET /orders';
  res = await request(MAIN_BACKEND, '/orders');
  results.mainBackend.orders = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (res.success) log(colors.green, `   Found: ${res.data.total || res.data.data?.length || 0} orders`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  test = 'GET /contacts';
  res = await request(MAIN_BACKEND, '/contacts');
  results.mainBackend.contacts = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  // ========== ADMIN BACKEND TESTS ==========
  log(colors.blue, '\n📍 ADMIN BACKEND (Port 5001)');
  log(colors.blue, '─────────────────────────────────────────────────────────────');

  test = 'Health Check';
  res = await request(ADMIN_BACKEND, '/health');
  results.adminBackend.health = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  test = 'POST /auth/login (Admin)';
  res = await request(ADMIN_BACKEND, '/auth/login', 'POST', {
    username: 'admin',
    password: 'admin123',
  });
  results.adminBackend.adminLogin = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  test = 'GET /products (Proxy to Main Backend)';
  res = await request(ADMIN_BACKEND, '/products');
  results.adminBackend.products = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (res.success) log(colors.green, `   Found: ${res.data.count || 0} products`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  test = 'GET /orders (Proxy to Main Backend)';
  res = await request(ADMIN_BACKEND, '/orders');
  results.adminBackend.orders = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (res.success) log(colors.green, `   Found: ${res.data.count || 0} orders`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  test = 'GET /customers (Proxy to Main Backend Users)';
  res = await request(ADMIN_BACKEND, '/customers');
  results.adminBackend.customers = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (res.success) log(colors.green, `   Found: ${res.data.count || 0} customers`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  test = 'GET /dashboard/stats';
  res = await request(ADMIN_BACKEND, '/dashboard/stats');
  results.adminBackend.stats = res.success;
  log(res.success ? colors.green : colors.red, `${res.success ? '✅' : '❌'} ${test}`);
  if (!res.success) log(colors.red, `   Error: ${res.error}`);

  // ========== SUMMARY ==========
  log(colors.cyan, '\n═════════════════════════════════════════════════════════════');
  log(colors.cyan, '   📊 TEST SUMMARY');
  log(colors.cyan, '═════════════════════════════════════════════════════════════');

  const mainPassed = Object.values(results.mainBackend).filter((v) => v).length;
  const adminPassed = Object.values(results.adminBackend).filter((v) => v).length;
  const totalTests = Object.keys(results.mainBackend).length + Object.keys(results.adminBackend).length;
  const totalPassed = mainPassed + adminPassed;

  log(colors.yellow, `\n📌 Main Backend: ${mainPassed}/${Object.keys(results.mainBackend).length} tests passed`);
  log(colors.yellow, `📌 Admin Backend: ${adminPassed}/${Object.keys(results.adminBackend).length} tests passed`);
  log(colors.yellow, `📌 Total: ${totalPassed}/${totalTests} tests passed\n`);

  if (totalPassed === totalTests) {
    log(colors.green, '🎉 ALL TESTS PASSED! System is fully integrated and working.');
    log(colors.green, '\n✅ You can now:');
    log(colors.green, '   1. Access http://localhost:5173 (Frontend)');
    log(colors.green, '   2. Access http://localhost:5173/admin/login (Admin Panel)');
    log(colors.green, '   3. Use admin/admin123 to login');
    log(colors.green, '   4. View real data from database in all pages\n');
    process.exit(0);
  } else {
    log(colors.red, '⚠️  Some tests failed. Check the errors above.');
    log(colors.red, '\n❌ To fix:');
    log(colors.red, '   1. Ensure MySQL is running');
    log(colors.red, '   2. Run: cd backend && node server.js (Terminal 1)');
    log(colors.red, '   3. Run: cd dress-page/server && node server.js (Terminal 2)');
    log(colors.red, '   4. Run: cd dress-page && npm run dev (Terminal 3)\n');
    process.exit(1);
  }
}

runTests().catch(console.error);
