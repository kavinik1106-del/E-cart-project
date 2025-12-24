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

async function testLoginAPI() {
  console.log('\n════════════════════════════════════════════════════════');
  console.log('           LOGIN API TESTING');
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

  // Test 2: Login with valid credentials
  console.log('2️⃣  LOGIN WITH VALID CREDENTIALS');
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
    const parsed = JSON.parse(loginRes.body);
    console.log('✓ Response:', JSON.stringify(parsed, null, 2));
  } catch (error) {
    console.log('✗ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 3: Login with invalid credentials
  console.log('3️⃣  LOGIN WITH INVALID CREDENTIALS');
  console.log('POST /api/auth/login');
  console.log('Payload:', {
    email: 'admin@example.com',
    password: 'wrongpassword'
  });
  console.log('');

  try {
    const invalidLoginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'admin@example.com',
      password: 'wrongpassword'
    });
    console.log('✓ Status:', invalidLoginRes.statusCode);
    const parsed = JSON.parse(invalidLoginRes.body);
    console.log('✓ Response:', JSON.stringify(parsed, null, 2));
  } catch (error) {
    console.log('✗ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 4: Register new user
  console.log('4️⃣  REGISTER NEW USER');
  console.log('POST /api/auth/register');
  const registerPayload = {
    email: 'testuser@example.com',
    password: 'test123',
    confirmPassword: 'test123',
    first_name: 'Test',
    last_name: 'User'
  };
  console.log('Payload:', registerPayload);
  console.log('');

  try {
    const registerRes = await makeRequest('POST', '/api/auth/register', registerPayload);
    console.log('✓ Status:', registerRes.statusCode);
    const parsed = JSON.parse(registerRes.body);
    console.log('✓ Response:', JSON.stringify(parsed, null, 2));
  } catch (error) {
    console.log('✗ Error:', error.message);
  }

  console.log('\n---\n');

  // Test 5: Login with newly registered user
  console.log('5️⃣  LOGIN WITH NEWLY REGISTERED USER');
  console.log('POST /api/auth/login');
  console.log('Payload:', {
    email: 'testuser@example.com',
    password: 'test123'
  });
  console.log('');

  try {
    const newUserLoginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'testuser@example.com',
      password: 'test123'
    });
    console.log('✓ Status:', newUserLoginRes.statusCode);
    const parsed = JSON.parse(newUserLoginRes.body);
    console.log('✓ Response:', JSON.stringify(parsed, null, 2));
  } catch (error) {
    console.log('✗ Error:', error.message);
  }

  console.log('\n════════════════════════════════════════════════════════');
  console.log('           LOGIN API TESTING COMPLETE');
  console.log('════════════════════════════════════════════════════════\n');

  process.exit(0);
}

// Run tests after a short delay to ensure server is ready
setTimeout(testLoginAPI, 1000);