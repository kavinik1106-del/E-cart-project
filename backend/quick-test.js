import http from 'http';

function test(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: body ? { 'Content-Type': 'application/json' } : {}
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`\n[${method}] ${path}`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Response: ${data}`);
        resolve();
      });
    });

    req.on('error', (err) => {
      console.error(`\n✗ ERROR [${method}] ${path}:`);
      console.error(err.message);
      resolve();
    });

    if (body) req.write(body);
    req.end();
  });
}

async function run() {
  console.log('Testing Login & Order APIs\n');
  
  await test('/api/health');
  
  await test('/api/auth/login', 'POST', JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123'
  }));

  await test('/api/orders');

  process.exit(0);
}

setTimeout(run, 500);
