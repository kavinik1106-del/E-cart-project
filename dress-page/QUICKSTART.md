# Quick Start Guide - MySQL Setup

## ⚡ 5-Minute Setup

### Step 1: Install MySQL (If Not Installed)
**Windows:**
1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Run installer → Follow wizard → Remember password
3. Default port: 3306

**Mac:**
```bash
brew install mysql
brew services start mysql
```

**Linux:**
```bash
sudo apt-get install mysql-server
sudo service mysql start
```

### Step 2: Create Database
Open terminal/command prompt and run:
```bash
mysql -u root -p
```
Enter your MySQL password, then:
```sql
CREATE DATABASE admin_panel_db;
EXIT;
```

### Step 3: Install Dependencies
```bash
cd server
npm install
```

If you get permission errors, try:
```bash
npm install --legacy-peer-deps
```

### Step 4: Start Server
```bash
npm start
```

You should see:
```
✅ Database connection established
✅ API Server running on http://localhost:5000
📦 Products: GET /api/products
📋 Orders: GET /api/orders
👥 Customers: GET /api/customers
⚙️  Settings: GET /api/settings
📊 Dashboard: GET /api/dashboard/stats
🗄️  Database: MySQL (admin_panel_db)
```

### Step 5: Test It Works
Open browser and visit:
- http://localhost:5000/api/health (should return JSON with "API is running")
- http://localhost:5000/api/products (should return product list)

✅ **You're Done!** The admin panel is now using MySQL.

## 🆘 Common Issues

### "Can't connect to MySQL server"
```
Solution: Make sure MySQL is running
Mac: brew services start mysql
Linux: sudo service mysql start  
Windows: Start → Services → MySQL...
```

### "Access denied for user 'root'@'localhost'"
```
Solution: Check password in .env file
Edit server/.env and verify:
DB_USER=root
DB_PASSWORD=your_mysql_password
```

### "Database does not exist"
```
Solution: Create the database
mysql -u root -p
CREATE DATABASE admin_panel_db;
```

### "npm install fails"
```
Solution 1: Try with legacy peer deps
npm install --legacy-peer-deps

Solution 2: Delete package-lock.json and node_modules
rm -rf node_modules package-lock.json
npm install
```

### "Port 5000 already in use"
```
Solution 1: Kill the process
On Mac/Linux: lsof -i :5000
On Windows: netstat -ano | findstr :5000

Solution 2: Use different port
Edit server/.env and change PORT=5000 to PORT=5001
```

## 📊 Verify Installation

Check if all these files exist:
```
server/
├── config/database.js       ✓
├── models/Product.js        ✓
├── models/Order.js          ✓
├── models/Customer.js       ✓
├── models/Setting.js        ✓
├── models/index.js          ✓
├── utils/initializeDatabase.js ✓
├── .env                     ✓
├── .env.example             ✓
└── server.js                ✓ (updated with MySQL)
```

If any file is missing, the database integration is incomplete.

## 🔄 Change Default Credentials

To use different MySQL credentials:

1. Open `server/.env`
2. Update these lines:
```env
DB_HOST=localhost          # MySQL server address
DB_PORT=3306              # MySQL port
DB_NAME=admin_panel_db    # Database name
DB_USER=root              # MySQL username
DB_PASSWORD=root          # MySQL password
```

3. Save and restart the server

## 📝 Data Persistence

✅ Data is now saved in MySQL database, not JSON files
✅ Restart server without losing data
✅ Multiple admin panels can share same database
✅ Automatic backup and restore possible

## 🔗 Connect Frontend

The React admin panel automatically works with the new MySQL backend.
No changes needed in React code - it still calls the same API endpoints.

## 📖 Full Documentation

For detailed setup instructions, see: [MYSQL_SETUP.md](./MYSQL_SETUP.md)

## ✨ Next Steps

1. ✅ MySQL running
2. ✅ Database created
3. ✅ npm install completed
4. ✅ Server started
5. → Now use the admin panel to create, read, update, delete products, orders, customers!

---

**Everything is ready! The system is now using MySQL database.** 🎉
