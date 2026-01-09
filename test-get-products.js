import fetch from 'node-fetch';

async function testGetProducts() {
  console.log('\n🔍 Testing Product APIs...\n');

  try {
    // Test main backend products
    console.log('1️⃣ Testing Main Backend (localhost:5000)...');
    const mainResponse = await fetch('http://localhost:5000/api/products');
    const mainData = await mainResponse.json();
    console.log(`   Status: ${mainResponse.status}`);
    console.log(`   Products found: ${mainData.data?.length || 0}`);
    if (mainData.data?.length > 0) {
      console.log(`   First product: ${mainData.data[0].name}`);
    }
    console.log('');

    // Test admin backend products
    console.log('2️⃣ Testing Admin Backend (localhost:5001)...');
    const adminResponse = await fetch('http://localhost:5001/api/products');
    const adminData = await adminResponse.json();
    console.log(`   Status: ${adminResponse.status}`);
    console.log(`   Products found: ${adminData.data?.length || 0}`);
    if (adminData.data?.length > 0) {
      console.log(`   First product: ${adminData.data[0].name}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testGetProducts();
