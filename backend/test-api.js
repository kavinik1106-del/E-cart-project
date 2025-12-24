import http from 'http';

function makeRequest(method, path, body) {
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

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function testAPIs() {
  console.log('\n════════════════════════════════════════════════════════');
  console.log('  API TESTING - LOGIN & ORDER ENDPOINTS');
  console.log('════════════════════════════════════════════════════════\n');

  // Test 1: Health Check
  console.log('1️⃣  HEALTH CHECK');
  console.log('GET /api/health\n');
  try {
    const health = await makeRequest('GET', '/api/health');
    console.log('✓ Status:', health.statusCode);
    console.log('✓ Response:', JSON.parse(health.body));
  } catch (error) {
    console.log('✗ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 2: Login API
  console.log('2️⃣  LOGIN API TEST');
  console.log('POST /api/auth/login');
  console.log('Payload:', {
    email: 'admin@example.com',
    password: 'admin123'
  });
  console.log('');

  try {
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('✓ Status:', loginRes.statusCode);
    console.log('✓ Response:', JSON.stringify(JSON.parse(loginRes.body), null, 2));
  } catch (error) {
    console.log('✗ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 3: Get All Orders
  console.log('3️⃣  GET ALL ORDERS API TEST');
  console.log('GET /api/orders\n');

  try {
    const ordersRes = await makeRequest('GET', '/api/orders');
    console.log('✓ Status:', ordersRes.statusCode);
    const parsed = JSON.parse(ordersRes.body);
    console.log('✓ Response:', JSON.stringify(parsed, null, 2));
  } catch (error) {
    console.log('✗ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 4: Create Order
  console.log('4️⃣  CREATE ORDER API TEST');
  console.log('POST /api/orders');
  const orderPayload = {
    user_id: 1,
    total_amount: 5999.99,
    tax_amount: 899.99,
    shipping_amount: 100,
    coupon_code: 'SAVE10',
    discount_amount: 599.99,
    shipping_address: '123 Main St, New York, NY 10001',
    payment_method: 'credit_card',
    items: [
      {
        product_id: 1,
        product_name: 'Formal Suit',
        quantity: 1,
        price: 4999.99
      },
      {
        product_id: 2,
        product_name: 'Premium Shoes',
        quantity: 1,
        price: 999.99
      }
    ]
  };
  console.log('Payload:', JSON.stringify(orderPayload, null, 2));
  console.log('');

  try {
    const createOrderRes = await makeRequest('POST', '/api/orders', orderPayload);
    console.log('✓ Status:', createOrderRes.statusCode);
    const parsed = JSON.parse(createOrderRes.body);
    console.log('✓ Response:', JSON.stringify(parsed, null, 2));
  } catch (error) {
    console.log('✗ Error:', error.message);
  }

  console.log('\n════════════════════════════════════════════════════════');
  console.log('  TESTING COMPLETE');
  console.log('════════════════════════════════════════════════════════\n');

  process.exit(0);
}

// Run tests after a short delay to ensure server is ready
setTimeout(testAPIs, 1000);
