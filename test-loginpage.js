#!/usr/bin/env node
/**
 * LoginPage Integration Test
 * Tests all LoginPage features with backend API
 */

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testCases = {
  validEmail: 'testuser@example.com',
  validPassword: 'Test@1234567',
  invalidEmail: 'notanemail',
  shortPassword: '123',
  validMobile: '9876543210',
  invalidMobile: '12345'
};

// Color output functions
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  title: (msg) => console.log(`\n${colors.cyan}════════════════════════════════════${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️ ${msg}${colors.reset}`),
  test: (msg) => console.log(`${colors.yellow}🧪 Testing: ${msg}${colors.reset}`),
  result: (msg) => console.log(`${colors.cyan}${msg}${colors.reset}`)
};

// Validation functions (matching LoginPage)
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidMobile(mobile) {
  return /^\d{10}$/.test(mobile);
}

// Test API calls
async function testAPI() {
  console.log(`\n${colors.cyan}╔════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║          LoginPage API Integration Tests                ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════════╝${colors.reset}`);

  let passedTests = 0;
  let failedTests = 0;

  try {
    // Test 1: Server Health
    log.test('Server Connection');
    try {
      const response = await fetch(`${BASE_URL}/health`);
      if (response.ok) {
        log.success('Backend server is running');
        passedTests++;
      } else {
        log.error('Backend server returned error status');
        failedTests++;
      }
    } catch (error) {
      log.error(`Cannot connect to backend: ${error.message}`);
      failedTests++;
      console.log(`${colors.red}Please ensure backend is running on port 5000${colors.reset}`);
      return;
    }

    // Test 2: Email Validation (Client-side)
    log.test('Client-side Email Validation');
    const emailTests = [
      { email: 'valid@example.com', expected: true },
      { email: 'user.name@domain.co.uk', expected: true },
      { email: 'notanemail', expected: false },
      { email: '@example.com', expected: false },
      { email: 'user@', expected: false }
    ];

    let emailPass = true;
    for (const test of emailTests) {
      const result = isValidEmail(test.email);
      if (result === test.expected) {
        log.result(`  ✓ "${test.email}" → ${result}`);
      } else {
        log.result(`  ✗ "${test.email}" → ${result} (expected ${test.expected})`);
        emailPass = false;
      }
    }
    if (emailPass) {
      log.success('Email validation working correctly');
      passedTests++;
    } else {
      log.error('Email validation has issues');
      failedTests++;
    }

    // Test 3: Mobile Validation (Client-side)
    log.test('Client-side Mobile Validation');
    const mobileTests = [
      { mobile: '9876543210', expected: true },
      { mobile: '1234567890', expected: true },
      { mobile: '123456789', expected: false },
      { mobile: '12345678901', expected: false },
      { mobile: 'abcdefghij', expected: false }
    ];

    let mobilePass = true;
    for (const test of mobileTests) {
      const result = isValidMobile(test.mobile);
      if (result === test.expected) {
        log.result(`  ✓ "${test.mobile}" → ${result}`);
      } else {
        log.result(`  ✗ "${test.mobile}" → ${result} (expected ${test.expected})`);
        mobilePass = false;
      }
    }
    if (mobilePass) {
      log.success('Mobile validation working correctly');
      passedTests++;
    } else {
      log.error('Mobile validation has issues');
      failedTests++;
    }

    // Test 4: Registration API
    log.test('User Registration');
    const timestamp = Date.now();
    const registerPayload = {
      name: 'Test User',
      email: `testuser${timestamp}@example.com`,
      mobile: '9876543210',
      password: 'TestPassword123'
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerPayload)
      });

      const data = await response.json();
      log.result(`  Status: ${response.status}`);
      log.result(`  Success: ${data.success}`);
      log.result(`  Message: ${data.message}`);

      if (data.success || (response.status === 400 && data.message.includes('already exists'))) {
        log.success('Registration endpoint is working');
        passedTests++;
        testCases.testEmail = registerPayload.email;
      } else {
        log.error(`Registration failed: ${data.message}`);
        failedTests++;
      }
    } catch (error) {
      log.error(`Registration request failed: ${error.message}`);
      failedTests++;
    }

    // Test 5: Login API - Valid Credentials
    log.test('Login with Valid Credentials');
    // Using the registered email if available, otherwise a test email
    const loginPayload = {
      email: testCases.testEmail || testCases.validEmail,
      password: testCases.validPassword
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload)
      });

      const data = await response.json();
      log.result(`  Status: ${response.status}`);
      log.result(`  Success: ${data.success}`);
      log.result(`  Message: ${data.message}`);

      if (data.success) {
        log.result(`  Token: ${data.data.token.substring(0, 20)}...`);
        log.result(`  User: ${data.data.user.email}`);
        log.success('Login endpoint is working');
        passedTests++;
      } else {
        log.error(`Login failed: ${data.message}`);
        failedTests++;
      }
    } catch (error) {
      log.error(`Login request failed: ${error.message}`);
      failedTests++;
    }

    // Test 6: Login API - Invalid Credentials
    log.test('Login with Invalid Credentials');
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'nonexistent@example.com',
          password: 'wrongpassword'
        })
      });

      const data = await response.json();
      log.result(`  Status: ${response.status}`);
      log.result(`  Success: ${data.success}`);
      log.result(`  Message: ${data.message}`);

      if (!data.success && response.status === 401) {
        log.success('Correctly rejected invalid credentials');
        passedTests++;
      } else {
        log.error('Should have rejected invalid credentials');
        failedTests++;
      }
    } catch (error) {
      log.error(`Invalid login test failed: ${error.message}`);
      failedTests++;
    }

    // Test 7: Missing Required Fields
    log.test('Validation - Missing Required Fields');
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }) // Missing password, name, mobile
      });

      const data = await response.json();
      log.result(`  Status: ${response.status}`);
      log.result(`  Success: ${data.success}`);
      log.result(`  Message: ${data.message}`);

      if (!data.success && response.status === 400) {
        log.success('Correctly validated missing fields');
        passedTests++;
      } else {
        log.error('Should have rejected missing fields');
        failedTests++;
      }
    } catch (error) {
      log.error(`Validation test failed: ${error.message}`);
      failedTests++;
    }

  } catch (error) {
    log.error(`Test suite error: ${error.message}`);
  }

  // Results Summary
  console.log(`\n${colors.cyan}════════════════════════════════════${colors.reset}`);
  console.log(`\n${colors.cyan}📊 Test Results:${colors.reset}`);
  console.log(`${colors.green}✅ Passed: ${passedTests}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${failedTests}${colors.reset}`);
  console.log(`${colors.blue}📈 Total: ${passedTests + failedTests}${colors.reset}`);

  if (failedTests === 0) {
    console.log(`\n${colors.green}🎉 All tests passed!${colors.reset}`);
  } else {
    console.log(`\n${colors.red}⚠️ Some tests failed. Check output above.${colors.reset}`);
  }

  console.log(`\n${colors.cyan}════════════════════════════════════${colors.reset}\n`);
}

// Run tests
testAPI().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
