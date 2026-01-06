#!/usr/bin/env node

import http from 'http';

const API_URL = 'http://localhost:5001/api/products';

console.log('\n🔍 Testing Admin Backend API Connection...\n');
console.log(`📍 Testing URL: ${API_URL}\n`);

const req = http.get(API_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`✅ Connection: SUCCESSFUL`);
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log(`📝 Response Content-Type:`, res.headers['content-type']);
    
    try {
      const json = JSON.parse(data);
      console.log(`✅ Response JSON: Valid`);
      console.log(`📦 Products in Database: ${json.count || json.data?.length || 0}`);
      console.log(`\n✨ API is working! Products endpoint is accessible.\n`);
      if (json.data && json.data.length > 0) {
        console.log(`Sample Product:`, JSON.stringify(json.data[0], null, 2));
      }
    } catch (e) {
      console.log(`❌ Response is not valid JSON:`, data.substring(0, 100));
    }
  });
});

req.on('error', (err) => {
  console.log(`❌ Connection: FAILED`);
  console.log(`🔴 Error: ${err.message}\n`);
  console.log('📋 Troubleshooting Steps:');
  console.log('  1. Is the backend server running on port 5001?');
  console.log('  2. Terminal command: cd dress-page/server && npm start');
  console.log('  3. Wait for message: "Server running on port 5001"');
  console.log('  4. Then run this script again\n');
  process.exit(1);
});

req.setTimeout(5000, () => {
  console.log(`❌ Connection: TIMEOUT`);
  console.log(`⏱️  Server took too long to respond (5 seconds)\n`);
  console.log('📋 Make sure:');
  console.log('  1. Backend server is running: npm start (in dress-page/server)');
  console.log('  2. Port 5001 is not blocked by firewall');
  console.log('  3. Try restarting the backend server\n');
  req.destroy();
  process.exit(1);
});
