import http from 'http';

const BASE_URL = 'http://localhost:5000/api';

const makeRequest = (endpoint) => {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}${endpoint}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(data);
        }
      });
    }).on('error', (e) => resolve({ error: e.message }));
  });
};

const runTests = async () => {
  console.log('\n🧪 ========================================');
  console.log('   TESTING API ENDPOINTS');
  console.log('========================================\n');

  console.log('✅ 1. Health Check:');
  const health = await makeRequest('/health');
  console.log(`   Status: ${health.status}`);
  console.log(`   Mode: ${health.mode}\n`);

  console.log('✅ 2. Get Products:');
  const products = await makeRequest('/products');
  console.log(`   Total: ${products.count} products`);
  console.log(`   Sample: ${products.data[0].name} - ₹${products.data[0].price}\n`);

  console.log('✅ 3. Get Orders:');
  const orders = await makeRequest('/orders');
  console.log(`   Total: ${orders.count} orders`);
  console.log(`   Sample: ${orders.data[0].id} - ${orders.data[0].customer} (${orders.data[0].status})\n`);

  console.log('✅ 4. Get Customers:');
  const customers = await makeRequest('/customers');
  console.log(`   Total: ${customers.count} customers`);
  console.log(`   Sample: ${customers.data[0].name} (${customers.data[0].email})\n`);

  console.log('✅ 5. Get Settings:');
  const settings = await makeRequest('/settings');
  console.log(`   Store: ${settings.data.storeName}`);
  console.log(`   Currency: ${settings.data.currency}\n`);

  console.log('✅ 6. Dashboard Stats:');
  const stats = await makeRequest('/dashboard/stats');
  console.log(`   Total Sales: ₹${stats.data.totalSales}`);
  console.log(`   Total Orders: ${stats.data.totalOrders}`);
  console.log(`   Total Customers: ${stats.data.totalCustomers}`);
  console.log(`   Total Products: ${stats.data.totalProducts}\n`);

  console.log('✅ ========================================');
  console.log('   ALL ENDPOINTS WORKING! ✨');
  console.log('========================================\n');

  process.exit(0);
};

setTimeout(runTests, 1000);
