import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const packages = ['mysql2@^3.6.5', 'sequelize@^6.35.2', 'dotenv@^16.3.1'];

console.log('📦 Installing MySQL dependencies...');
try {
  packages.forEach(pkg => {
    console.log(`\n📥 Installing ${pkg}...`);
    execSync(`npm install ${pkg}`, { stdio: 'inherit', cwd: process.cwd() });
    console.log(`✅ ${pkg} installed successfully`);
  });
  console.log('\n🎉 All dependencies installed successfully!');
} catch (error) {
  console.error('❌ Installation failed:', error.message);
  process.exit(1);
}
