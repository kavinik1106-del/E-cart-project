import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'TestPassword123'
};

const testRegister = {
  email: 'newuser@example.com',
  password: 'NewPassword123',
  confirmPassword: 'NewPassword123',
  first_name: 'Test',
  last_name: 'User',
  phone: '1234567890'
};

async function testAPI() {
  console.log('\n========== LOGIN/REGISTER API TESTS ==========\n');

  // Test 1: Health Check
  console.log('1️⃣ Health Check...');
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    console.log('✅ Server is running:', data);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return;
  }

  // Test 2: Register
  console.log('\n2️⃣ Testing Registration...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testRegister)
    });
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ Registration successful');
    } else {
      console.log('⚠️ Registration warning:', data.message);
    }
  } catch (error) {
    console.log('❌ Registration test failed:', error.message);
  }

  // Test 3: Login with valid credentials
  console.log('\n3️⃣ Testing Login with valid credentials...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: testRegister.email,
        password: testRegister.password
      })
    });
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ Login successful');
      console.log('Token:', data.data.token);
    } else {
      console.log('❌ Login failed:', data.message);
    }
  } catch (error) {
    console.log('❌ Login test failed:', error.message);
  }

  // Test 4: Login with invalid credentials
  console.log('\n4️⃣ Testing Login with invalid credentials...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'invalid@example.com',
        password: 'wrongpassword'
      })
    });
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (!data.success) {
      console.log('✅ Correctly rejected invalid credentials');
    }
  } catch (error) {
    console.log('❌ Invalid login test failed:', error.message);
  }

  // Test 5: Registration validation - missing fields
  console.log('\n5️⃣ Testing Registration validation (missing fields)...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com'
        // missing password and confirmPassword
      })
    });
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (!data.success) {
      console.log('✅ Correctly validated missing fields');
    }
  } catch (error) {
    console.log('❌ Validation test failed:', error.message);
  }

  console.log('\n========== TESTS COMPLETED ==========\n');
}

testAPI().catch(console.error);
