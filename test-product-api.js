#!/usr/bin/env node

/**
 * Test Script for Product API Integration
 * Tests connection between Admin Backend, Database, and Frontend
 */

import fetch from 'node-fetch';

const ADMIN_API_URL = 'http://localhost:5001/api';
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testAPI() {
  log('\n=== Product API Integration Test ===\n', 'blue');

  // Test 1: Health Check
  log('Test 1: Server Health Check', 'yellow');
  try {
    const response = await fetch(`${ADMIN_API_URL}/health`);
    const data = await response.json();
    if (data.success) {
      log('✅ Server is running', 'green');
      log(`   Message: ${data.message}`, 'green');
    } else {
      log('❌ Server health check failed', 'red');
    }
  } catch (error) {
    log(`❌ Cannot reach server at ${ADMIN_API_URL}`, 'red');
    log(`   Error: ${error.message}`, 'red');
    log('\n   Make sure admin server is running:', 'yellow');
    log('   cd dress-page/server && npm start', 'yellow');
    process.exit(1);
  }

  // Test 2: Get All Products
  log('\nTest 2: Fetch All Products', 'yellow');
  try {
    const response = await fetch(`${ADMIN_API_URL}/products`);
    const data = await response.json();
    if (data.success) {
      log(`✅ Products fetched successfully`, 'green');
      log(`   Count: ${data.count}`, 'green');
      if (data.data && data.data.length > 0) {
        log(`   First product: ${data.data[0].name}`, 'green');
        log(`   Fields: ${Object.keys(data.data[0]).join(', ')}`, 'green');
      } else {
        log('   ⚠️  No products in database yet', 'yellow');
      }
    } else {
      log('❌ Failed to fetch products', 'red');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }

  // Test 3: Create Sample Product
  log('\nTest 3: Create Sample Product', 'yellow');
  try {
    const sampleProduct = {
      name: 'Test Product API ' + new Date().getTime(),
      type: 'Electronics',
      category: 'Test Category',
      brand: 'Test Brand',
      price: 999.99,
      mrp: 1299.99,
      stock: 50,
      image: '/test-product.jpg',
      description: 'This is a test product created via API',
      rating: 4.8,
      reviews: 125,
      discount: 23,
      colors: ['Red', 'Blue', 'Black'],
      sizeGuide: { S: {}, M: {}, L: {}, XL: {} },
      tag: 'New Arrival',
    };

    const response = await fetch(`${ADMIN_API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleProduct),
    });

    const data = await response.json();
    if (data.success) {
      log('✅ Product created successfully', 'green');
      log(`   ID: ${data.data.id}`, 'green');
      log(`   Name: ${data.data.name}`, 'green');
      log(`   Price: ₹${data.data.price}`, 'green');
      return data.data.id;
    } else {
      log(`❌ Failed to create product: ${data.error}`, 'red');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }

  // Test 4: Get Single Product
  log('\nTest 4: Fetch Single Product', 'yellow');
  try {
    const response = await fetch(`${ADMIN_API_URL}/products/1`);
    const data = await response.json();
    if (data.success && data.data) {
      log('✅ Single product fetched successfully', 'green');
      log(`   ID: ${data.data.id}`, 'green');
      log(`   Name: ${data.data.name}`, 'green');
      log(`   Price: ₹${data.data.price}`, 'green');
    } else {
      log('⚠️  Product not found (this is normal if DB is empty)', 'yellow');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }

  // Test 5: Database Fields Check
  log('\nTest 5: Verify All Product Fields', 'yellow');
  try {
    const response = await fetch(`${ADMIN_API_URL}/products`);
    const data = await response.json();
    if (data.success && data.data && data.data.length > 0) {
      const product = data.data[0];
      const requiredFields = [
        'id', 'name', 'type', 'category', 'brand',
        'price', 'mrp', 'stock', 'image', 'description',
        'rating', 'reviews', 'discount', 'colors', 'sizeGuide', 'tag'
      ];

      const missingFields = requiredFields.filter(field => !(field in product));

      if (missingFields.length === 0) {
        log('✅ All required fields present in database', 'green');
        log(`   Fields: ${Object.keys(product).join(', ')}`, 'green');
      } else {
        log(`⚠️  Missing fields: ${missingFields.join(', ')}`, 'yellow');
      }
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }

  log('\n=== Test Complete ===\n', 'blue');
  log('Next Steps:', 'yellow');
  log('1. Start the admin backend: cd dress-page/server && npm start', 'yellow');
  log('2. Start the frontend: cd dress-page && npm run dev', 'yellow');
  log('3. Visit http://localhost:5173 to see products on homepage', 'yellow');
}

testAPI().catch(error => {
  log(`\n❌ Test failed: ${error.message}`, 'red');
  process.exit(1);
});
