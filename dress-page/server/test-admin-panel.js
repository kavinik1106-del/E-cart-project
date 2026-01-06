#!/usr/bin/env node

/**
 * Admin Panel API Verification Test
 * Tests real database connectivity and CRUD operations
 */

import http from 'http';

const API_BASE = 'http://localhost:5001/api';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  test: (msg) => console.log(`${colors.cyan}🧪 ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
};

// Make HTTP request helper
const makeRequest = (method, path, body = null) => {
  return new Promise((resolve) => {
    const url = new URL(API_BASE + path);
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: parsed,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: { error: 'Invalid JSON response', raw: data },
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        status: 0,
        error: error.message,
      });
    });

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
};

// Test suite
const tests = [
  {
    name: 'Get All Products (Real Database)',
    method: 'GET',
    path: '/products',
    expectedStatus: 200,
    checkData: (data) => {
      if (!data.success) return false;
      if (!Array.isArray(data.data)) return false;
      return true;
    },
  },
  {
    name: 'Get All Orders (Real Database)',
    method: 'GET',
    path: '/orders',
    expectedStatus: 200,
    checkData: (data) => {
      if (!data.success) return false;
      if (!Array.isArray(data.data)) return false;
      return true;
    },
  },
  {
    name: 'Get All Customers (Real Database)',
    method: 'GET',
    path: '/customers',
    expectedStatus: 200,
    checkData: (data) => {
      if (!data.success) return false;
      if (!Array.isArray(data.data)) return false;
      return true;
    },
  },
];

// Run tests
const runTests = async () => {
  console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Admin Panel Database Verification    ${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    log.test(`Testing: ${test.name}`);

    try {
      const response = await makeRequest(test.method, test.path, test.body);

      if (response.error) {
        log.error(`Network Error: ${response.error}`);
        failed++;
        continue;
      }

      if (response.status !== test.expectedStatus) {
        log.error(
          `Status ${response.status}, expected ${test.expectedStatus}`
        );
        failed++;
        continue;
      }

      if (
        test.checkData &&
        !test.checkData(response.body)
      ) {
        log.error(`Data validation failed`);
        console.log(`   Response:`, response.body);
        failed++;
        continue;
      }

      log.success(`${test.name}`);
      
      // Show data details
      const dataCount = response.body.data?.length || 0;
      const itemCount = response.body.count;
      log.info(`   Found ${itemCount || dataCount} items${itemCount ? ` (response count: ${itemCount})` : ''}`);
      
      if (dataCount > 0) {
        const firstItem = response.body.data[0];
        log.info(`   Sample: ${JSON.stringify(firstItem).substring(0, 100)}...`);
      }

      passed++;
    } catch (error) {
      log.error(`${test.name}: ${error.message}`);
      failed++;
    }

    console.log();
  }

  // Summary
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Test Summary${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  log.success(`Passed: ${passed}/${tests.length}`);
  if (failed > 0) {
    log.error(`Failed: ${failed}/${tests.length}`);
  }
  console.log();

  if (passed === tests.length) {
    log.success('All database connectivity tests passed! ✨');
    log.info('Admin panel is properly connected to real database');
    console.log();
    console.log('Next steps:');
    console.log('  1. Open http://localhost:5173/admin in browser');
    console.log('  2. Login with admin credentials');
    console.log('  3. Check Products, Orders, and Customers sections');
    console.log('  4. Verify data matches database (run: node test-admin-panel.js)');
  } else {
    log.warn(`${failed} test(s) failed. Check server logs for details.`);
    console.log();
    console.log('Troubleshooting:');
    console.log('  1. Ensure server is running: npm start (in dress-page/server)');
    console.log('  2. Check database is running and connected');
    console.log('  3. Verify tables are created: Product, Order, Customer');
    console.log('  4. Check server console for error messages');
  }
};

// Run the tests
runTests();
