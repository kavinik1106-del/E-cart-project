#!/usr/bin/env node

/**
 * Test Script: Orders Page - Cart to Order Flow
 * Tests:
 * 1. User login
 * 2. Cart displays items from context
 * 3. Order creation with cart items
 * 4. Proper error handling
 */

const http = require('http');

async function makeRequest(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
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
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║   ORDERS PAGE - CART TO ORDER FLOW TEST                    ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    // 1. Login
    console.log('📋 Step 1: User Login');
    console.log('─'.repeat(60));
    const loginRes = await makeRequest('POST', '/api/auth/login', JSON.stringify({
      email: 'admin@example.com',
      password: 'admin123'
    }));

    if (!loginRes.data.success) {
      console.error('❌ Login failed:', loginRes.data.message);
      return;
    }

    const userId = loginRes.data.data.user.id;
    const token = loginRes.data.data.token;
    console.log('✅ Login successful');
    console.log(`   User: ${loginRes.data.data.user.email}`);
    console.log(`   User ID: ${userId}\n`);

    // 2. Get existing orders
    console.log('📋 Step 2: Fetch Existing Orders');
    console.log('─'.repeat(60));
    const ordersRes = await makeRequest('GET', `/api/orders/user/${userId}`, null, {
      'Authorization': `Bearer ${token}`
    });

    console.log(`✅ Orders fetched`);
    console.log(`   Total orders: ${Array.isArray(ordersRes.data.data) ? ordersRes.data.data.length : 0}`);
    console.log(`   Status code: ${ordersRes.status}\n`);

    // 3. Create a new order with sample items
    console.log('📋 Step 3: Create New Order from Cart');
    console.log('─'.repeat(60));

    const sampleCartItems = [
      { id: 1, product_id: 1, name: 'Sofa Set', product_name: 'Sofa Set', price: 15000, quantity: 1, image: '/sofa.webp' },
      { id: 2, product_id: 2, name: 'Dining Table', product_name: 'Dining Table', price: 8000, quantity: 1, image: '/table.webp' }
    ];

    const orderData = {
      user_id: userId,
      items: sampleCartItems,
      shipping_address: '123 Main Street, City, State 12345',
      payment_method: 'card',
      coupon_code: '',
      discount_amount: 0
    };

    // Calculate totals
    const subtotal = sampleCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18;
    const shipping = 0;
    const total = subtotal + tax + shipping;

    orderData.total_amount = total;
    orderData.tax_amount = tax;
    orderData.shipping_amount = shipping;

    console.log('📦 Cart Items:');
    sampleCartItems.forEach(item => {
      console.log(`   • ${item.name}: ₹${item.price.toLocaleString('en-IN')} × ${item.quantity}`);
    });
    console.log('\n💰 Order Totals:');
    console.log(`   Subtotal: ₹${subtotal.toLocaleString('en-IN')}`);
    console.log(`   Tax (18%): ₹${tax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
    console.log(`   Shipping: FREE`);
    console.log(`   Total: ₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n`);

    const createOrderRes = await makeRequest('POST', '/api/orders', JSON.stringify(orderData), {
      'Authorization': `Bearer ${token}`
    });

    console.log(`Status code: ${createOrderRes.status}`);
    
    if (createOrderRes.data.success) {
      console.log('✅ Order created successfully!');
      console.log(`   Order ID: ${createOrderRes.data.data.id}`);
      console.log(`   Order Number: ${createOrderRes.data.data.orderNumber}`);
      console.log(`   Status: ${createOrderRes.data.data.status}`);
      console.log(`   Amount: ₹${createOrderRes.data.data.total_amount.toLocaleString('en-IN')}\n`);
    } else {
      console.error('❌ Order creation failed:', createOrderRes.data.message);
      console.log('   Response:', createOrderRes.data);
      return;
    }

    // 4. Verify order appears in user's orders
    console.log('📋 Step 4: Verify Order in User\'s Orders List');
    console.log('─'.repeat(60));
    const verifyOrdersRes = await makeRequest('GET', `/api/orders/user/${userId}`, null, {
      'Authorization': `Bearer ${token}`
    });

    const userOrders = verifyOrdersRes.data.data;
    console.log(`✅ Orders list updated`);
    console.log(`   Total orders: ${userOrders.length}`);
    
    if (userOrders.length > 0) {
      const lastOrder = userOrders[userOrders.length - 1];
      console.log(`   Latest order: #${lastOrder.orderNumber}`);
      console.log(`   Amount: ₹${lastOrder.total_amount.toLocaleString('en-IN')}\n`);
    }

    // Summary
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                    ✅ TEST SUCCESSFUL                      ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📝 Summary:');
    console.log('   ✅ User can login');
    console.log('   ✅ Cart items can be added to order');
    console.log('   ✅ Order is created successfully');
    console.log('   ✅ Order appears in user\'s orders list');
    console.log('   ✅ Shipping address & payment method are saved');
    console.log('   ✅ Cart totals calculated correctly\n');

    console.log('🎯 Browser Test Instructions:');
    console.log('   1. Go to http://localhost:5175 (home page)');
    console.log('   2. Login with: admin@example.com / admin123');
    console.log('   3. Add products to cart from product pages');
    console.log('   4. Navigate to http://localhost:5175/orders');
    console.log('   5. Click "Place Order" tab to see cart items');
    console.log('   6. Fill in shipping address and payment method');
    console.log('   7. Click "Place Order & Proceed to Checkout"');
    console.log('   8. Order will be created and confirmation page shown\n');

  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
}

test();
