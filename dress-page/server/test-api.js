#!/usr/bin/env node

/**
 * API Test Script
 * Tests all backend API endpoints
 */

import http from 'http';

const API_BASE_URL = 'http://localhost:5000';

const tests = [
  {
    name: '🏥 Health Check',
    method: 'GET',
    path: '/api/health',
  },
  {
    name: '📦 Get All Products',
    method: 'GET',
    path: '/api/products',
  },
  {
    name: '📋 Get All Orders',
    method: 'GET',
    path: '/api/orders',
  },
  {
    name: '👥 Get All Customers',
    method: 'GET',
    path: '/api/customers',
  },
  {
    name: '⚙️  Get Store Settings',
    method: 'GET',
    path: '/api/settings',
  },
  {
    name: '📊 Get Dashboard Stats',
    method: 'GET',
    path: '/api/dashboard/stats',
  },
];

const testAPI = async (test) => {
  return new Promise((resolve) => {
    const url = new URL(API_BASE_URL + test.path);
    
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: test.method,
      timeout: 5000,
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({
            test: test.name,
            status: res.statusCode,
            success: res.statusCode === 200 || res.statusCode === 201,
            response: json,
          });
        } catch (e) {
          resolve({
            test: test.name,
            status: res.statusCode,
            success: false,
            error: 'Invalid JSON response',
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        test: test.name,
        success: false,
        error: error.message,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        test: test.name,
        success: false,
        error: 'Request timeout',
      });
    });

    req.end();
  });
};

const runTests = async () => {
  console.log('\n================================');
  console.log('🧪 Admin Panel API Test Suite');
  console.log('================================\n');
  console.log(`Testing API at: ${API_BASE_URL}\n`);

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await testAPI(test);

    if (result.success) {
      console.log(`✅ ${result.test}`);
      console.log(`   Status: ${result.status}`);
      if (result.response?.data) {
        const dataStr = JSON.stringify(result.response.data).substring(0, 100);
        console.log(`   Data: ${dataStr}${dataStr.length === 100 ? '...' : ''}`);
      }
      passed++;
    } else {
      console.log(`❌ ${result.test}`);
      console.log(`   Error: ${result.error || result.status}`);
      failed++;
    }
    console.log();
  }

  console.log('================================');
  console.log('📊 Test Results');
  console.log('================================');
  console.log(`✅ Passed: ${passed}/${tests.length}`);
  console.log(`❌ Failed: ${failed}/${tests.length}`);
  console.log('================================\n');

  if (failed === 0) {
    console.log('🎉 All tests passed! API is working correctly.\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Check the API server is running.\n');
    process.exit(1);
  }
};

runTests();
