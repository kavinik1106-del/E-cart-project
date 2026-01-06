// Test to verify admin fetch issues

async function testAdminEndpoints() {
  console.log('🧪 Testing Admin Backend Connections\n');

  // Test 1: Main backend health
  console.log('1️⃣ Testing Main Backend Health (port 5000)...');
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('✅ Main backend is running:', data.message);
  } catch (err) {
    console.error('❌ Main backend error:', err.message);
  }

  // Test 2: Main backend products
  console.log('\n2️⃣ Testing Main Backend Products (port 5000/api/products)...');
  try {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    console.log('✅ Products endpoint response:', {
      success: data.success,
      count: data.data?.length || 0,
      hasData: !!data.data
    });
  } catch (err) {
    console.error('❌ Products endpoint error:', err.message);
  }

  // Test 3: Admin backend health
  console.log('\n3️⃣ Testing Admin Backend Health (port 5001)...');
  try {
    const response = await fetch('http://localhost:5001/api/health');
    const data = await response.json();
    console.log('✅ Admin backend is running');
  } catch (err) {
    console.error('❌ Admin backend error:', err.message);
  }

  // Test 4: Admin products endpoint (should proxy to main backend)
  console.log('\n4️⃣ Testing Admin Products Endpoint (port 5001/api/products)...');
  try {
    const response = await fetch('http://localhost:5001/api/products');
    const data = await response.json();
    console.log('✅ Admin products endpoint response:', {
      success: data.success,
      count: data.data?.length || 0,
      hasData: !!data.data,
      responseKeys: Object.keys(data)
    });
    console.log('📦 Sample product:', data.data?.[0]);
  } catch (err) {
    console.error('❌ Admin products endpoint error:', err.message);
  }

  // Test 5: Admin orders endpoint
  console.log('\n5️⃣ Testing Admin Orders Endpoint (port 5001/api/orders)...');
  try {
    const response = await fetch('http://localhost:5001/api/orders');
    const data = await response.json();
    console.log('✅ Admin orders endpoint response:', {
      success: data.success,
      count: data.data?.length || 0,
      hasData: !!data.data
    });
  } catch (err) {
    console.error('❌ Admin orders endpoint error:', err.message);
  }

  // Test 6: Admin customers endpoint
  console.log('\n6️⃣ Testing Admin Customers Endpoint (port 5001/api/customers)...');
  try {
    const response = await fetch('http://localhost:5001/api/customers');
    const data = await response.json();
    console.log('✅ Admin customers endpoint response:', {
      success: data.success,
      count: data.data?.length || 0,
      hasData: !!data.data
    });
  } catch (err) {
    console.error('❌ Admin customers endpoint error:', err.message);
  }
}

testAdminEndpoints();
