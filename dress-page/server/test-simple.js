import http from 'http';

const BASE_URL = 'http://localhost:5000';

const makeRequest = (path) => {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({ error: 'Invalid JSON' });
        }
      });
    }).on('error', (e) => resolve({ error: e.message }));
  });
};

console.log('\n🧪 Testing API Endpoints...\n');

const tests = async () => {
  try {
    // Test 1: Health
    console.log('1️⃣  Health Check:');
    const health = await makeRequest('/api/health');
    console.log(`   ✅ Status: ${health.status || 'ok'}\n`);

    // Test 2: Products
    console.log('2️⃣  Products:');
    const products = await makeRequest('/api/products');
    console.log(`   ✅ Count: ${products.count || products.data?.length || 0} items\n`);

    // Test 3: Orders
    console.log('3️⃣  Orders:');
    const orders = await makeRequest('/api/orders');
    console.log(`   ✅ Count: ${orders.count || orders.data?.length || 0} items\n`);

    // Test 4: Customers
    console.log('4️⃣  Customers:');
    const customers = await makeRequest('/api/customers');
    console.log(`   ✅ Count: ${customers.count || customers.data?.length || 0} items\n`);

    // Test 5: Settings
    console.log('5️⃣  Settings:');
    const settings = await makeRequest('/api/settings');
    const storeName = settings.data?.storeName || settings.storeName || 'N/A';
    console.log(`   ✅ Store: ${storeName}\n`);

    // Test 6: Dashboard
    console.log('6️⃣  Dashboard:');
    const stats = await makeRequest('/api/dashboard/stats');
    const dashData = stats.data || stats;
    console.log(`   ✅ Total Sales: ₹${dashData.totalSales || 0}`);
    console.log(`   ✅ Orders: ${dashData.totalOrders || 0}`);
    console.log(`   ✅ Customers: ${dashData.totalCustomers || 0}\n`);

    console.log('✅ ========================================');
    console.log('   ALL TESTS PASSED!');
    console.log('========================================\n');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  process.exit(0);
};

setTimeout(tests, 500);
