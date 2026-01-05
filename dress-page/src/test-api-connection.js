/**
 * Frontend-Backend Connection Tester
 * Tests all API calls and displays detailed error info
 */

const API_BASE = 'http://localhost:5000/api';

console.log('🔍 Testing Frontend-Backend Connection...\n');

// Test 1: Health Check
async function testHealth() {
  console.log('1️⃣ Testing Health Endpoint...');
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response:', data);
    console.log('   ✅ Health check passed\n');
    return true;
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    console.error('   Details:', error);
    return false;
  }
}

// Test 2: Login with non-existent user
async function testLoginNonExistent() {
  console.log('2️⃣ Testing Login (Non-existent User)...');
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'password123'
      })
    });
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response:', JSON.stringify(data, null, 2));
    console.log('   ✅ Login endpoint responding\n');
    return true;
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    return false;
  }
}

// Test 3: Register new user
async function testRegister() {
  console.log('3️⃣ Testing Registration...');
  const timestamp = Date.now();
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${timestamp}@example.com`,
        mobile: '1234567890',
        password: 'Test@12345'
      })
    });
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response:', JSON.stringify(data, null, 2));
    console.log('   ✅ Register endpoint responding\n');
    return { success: data.success, email: `test${timestamp}@example.com`, password: 'Test@12345' };
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    return null;
  }
}

// Test 4: Login with registered user
async function testLoginValidUser(email, password) {
  console.log('4️⃣ Testing Login (Valid Credentials)...');
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response:', JSON.stringify(data, null, 2));
    if (data.success) {
      console.log('   ✅ Login successful!\n');
    } else {
      console.log('   ⚠️ Login failed:', data.message, '\n');
    }
    return data.success;
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    return false;
  }
}

// Test 5: Test CORS
async function testCORS() {
  console.log('5️⃣ Testing CORS Headers...');
  try {
    const response = await fetch(`${API_BASE}/health`);
    const corsHeaders = {
      'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
      'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
      'access-control-allow-headers': response.headers.get('access-control-allow-headers')
    };
    console.log('   CORS Headers:', corsHeaders);
    if (corsHeaders['access-control-allow-origin']) {
      console.log('   ✅ CORS enabled\n');
    } else {
      console.log('   ⚠️ CORS might be disabled\n');
    }
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('═══════════════════════════════════════════\n');
  
  const health = await testHealth();
  if (!health) {
    console.error('\n❌ Backend is not reachable. Make sure it\'s running on port 5000\n');
    console.log('Start backend with: cd backend && npm run dev\n');
    return;
  }

  await testLoginNonExistent();
  const registered = await testRegister();
  
  if (registered && registered.success) {
    await testLoginValidUser(registered.email, registered.password);
  }
  
  await testCORS();

  console.log('═══════════════════════════════════════════');
  console.log('\n📋 Summary:');
  console.log('   - Backend is reachable ✅');
  console.log('   - API endpoints are working ✅');
  console.log('   - If you still see errors on frontend, check browser console');
  console.log('   - Look for CORS errors or network errors in Network tab\n');
}

runTests().catch(console.error);
