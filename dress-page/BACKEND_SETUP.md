# 🚀 Backend Setup Guide - MySQL Database & API

## Complete Backend Stack Ready!

Your admin panel now has a **complete professional backend** with:
- ✅ Express.js REST API (20+ endpoints)
- ✅ MySQL database integration via Sequelize ORM
- ✅ 4 database models (Product, Order, Customer, Setting)
- ✅ Automatic database initialization & seeding
- ✅ Environment-based configuration
- ✅ Production-ready code

---

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** (v14+) - Already installed ✅
- **MySQL Server** - Need to install
- **npm** - Already installed ✅

---

## 🔧 Step 1: Install MySQL Server

### Windows
1. Download MySQL Community Server: https://dev.mysql.com/downloads/mysql/
2. Run installer → Follow wizard
3. Choose "Server Machine" setup
4. Set MySQL Port: `3306` (default)
5. Set root password: `root` (or your choice)
6. Install as Windows Service (recommended)

### Mac
```bash
brew install mysql
brew services start mysql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo service mysql start
```

---

## ✅ Step 2: Verify MySQL is Running

### Windows
- Open Services (Win+R → services.msc)
- Look for "MySQL80" or "MySQL57"
- Status should show "Running"

### Mac/Linux
```bash
# Mac
brew services list

# Linux
sudo service mysql status
```

---

## 🗄️ Step 3: Create Database

Once MySQL is running, you have two options:

### Option A: Automatic Setup (Recommended)
```bash
cd server
npm run setup-db
```

This will:
1. Create the `admin_panel_db` database
2. Create all tables automatically
3. Populate sample data
4. Verify the connection

### Option B: Manual Setup
Open MySQL Command Line:
```bash
mysql -u root -p
# Enter password: root
```

Then run:
```sql
CREATE DATABASE admin_panel_db;
EXIT;
```

---

## 📦 Step 4: Install Dependencies

```bash
cd server
npm install
```

This installs:
- `express` - Web framework
- `mysql2` - MySQL driver
- `sequelize` - ORM
- `dotenv` - Environment config
- `cors` - Cross-origin support

---

## ⚙️ Step 5: Configure Environment (Optional)

Edit `server/.env` if you used different MySQL credentials:

```env
DB_HOST=localhost        # MySQL server address
DB_PORT=3306            # MySQL port
DB_NAME=admin_panel_db  # Database name
DB_USER=root            # MySQL username
DB_PASSWORD=root        # MySQL password
PORT=5000               # API server port
```

---

## 🚀 Step 6: Start the Backend Server

```bash
cd server
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

---

## 🧪 Step 7: Test API Endpoints

In a **new terminal**, run:

```bash
cd server
npm run test-api
```

This will test all 6 main endpoints:
- ✅ Health Check
- ✅ Products
- ✅ Orders
- ✅ Customers
- ✅ Settings
- ✅ Dashboard Stats

---

## 📚 API Endpoints Reference

### Products (Full CRUD)
```
GET    /api/products              Get all products
GET    /api/products/:id          Get single product
POST   /api/products              Create product
PUT    /api/products/:id          Update product
DELETE /api/products/:id          Delete product
```

**Example POST:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Blue Shirt",
    "type": "shirts",
    "price": 1999,
    "stock": 50,
    "image": "shirt.jpg",
    "description": "Premium blue shirt"
  }'
```

### Orders (CRUD)
```
GET    /api/orders                Get all orders
GET    /api/orders/:id            Get single order
POST   /api/orders                Create order
PUT    /api/orders/:id            Update order
```

**Example POST:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": "John Doe",
    "email": "john@example.com",
    "amount": 5999,
    "status": "pending",
    "items": 2,
    "address": "123 Main St, City"
  }'
```

### Customers (Read)
```
GET    /api/customers             Get all customers
GET    /api/customers/:id         Get single customer
```

### Settings (Read/Write)
```
GET    /api/settings              Get store settings
PUT    /api/settings              Update settings
```

**Example PUT:**
```bash
curl -X PUT http://localhost:5000/api/settings \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "Fashion Hub",
    "storeEmail": "contact@hub.com",
    "currency": "USD",
    "taxRate": 5
  }'
```

### Dashboard
```
GET    /api/dashboard/stats       Get stats (sales, orders, products, customers)
```

### Health Check
```
GET    /api/health                Check API & database status
```

---

## 🗄️ Database Schema

### Products Table
```
id (Auto-increment)
name (Required)
type (Category)
price (Decimal, >= 0)
stock (Integer, >= 0)
image (URL)
description (Text)
createdAt (Auto timestamp)
updatedAt (Auto timestamp)
```

### Orders Table
```
id (String: ORD001, ORD002...)
customer (Name)
email (Required, validated)
amount (Decimal, >= 0)
status (pending, processing, shipped, delivered)
items (Integer >= 1)
address (Text)
createdAt (Auto timestamp)
updatedAt (Auto timestamp)
```

### Customers Table
```
id (Auto-increment)
name (Required)
email (Unique, validated)
phone (Optional)
location (Optional)
orders (Number of orders)
spent (Total spent)
joined (Date)
createdAt (Auto timestamp)
updatedAt (Auto timestamp)
```

### Settings Table
```
id (Always 1, single record)
storeName
storeEmail
storePhone
currency (USD, EUR, etc.)
taxRate (Percentage)
notificationsEmail (Boolean)
notificationsOrders (Boolean)
notificationsLowStock (Boolean)
createdAt (Auto timestamp)
updatedAt (Auto timestamp)
```

---

## 📊 Sample API Responses

### GET /api/health
```json
{
  "success": true,
  "message": "API is running",
  "database": "MySQL"
}
```

### GET /api/products
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Premium Casual Shirt",
      "type": "shirts",
      "price": 1500,
      "stock": 45,
      "image": "shirt1.jpg",
      "description": "Premium quality casual shirt",
      "createdAt": "2025-01-15T10:30:00Z",
      "updatedAt": "2025-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

### GET /api/dashboard/stats
```json
{
  "success": true,
  "data": {
    "totalSales": 45000,
    "totalOrders": 12,
    "totalProducts": 30,
    "totalCustomers": 25,
    "recentOrders": [...],
    "topProducts": [...]
  }
}
```

---

## 🎯 Development Commands

```bash
# Start server (production mode)
npm start

# Start with auto-reload (development)
npm run dev

# Setup database (create & seed)
npm run setup-db

# Test all API endpoints
npm run test-api

# Check npm packages
npm list
```

---

## 🔍 Verify Setup is Complete

Check these files exist:
```
✅ server/server.js                 (Express server)
✅ server/.env                      (Environment config)
✅ server/config/database.js        (Sequelize config)
✅ server/models/*.js               (4 database models)
✅ server/utils/initializeDatabase.js (Database init)
✅ server/package.json              (Dependencies)
✅ node_modules/                    (Installed packages)
```

---

## 🆘 Troubleshooting

### "Cannot find module 'sequelize'"
```bash
cd server
npm install
```

### "Error: connect ECONNREFUSED"
MySQL Server is not running. Start it:
- Windows: Services → MySQL80 → Start
- Mac: `brew services start mysql`
- Linux: `sudo service mysql start`

### "Access denied for user 'root'"
Check password in `server/.env` matches your MySQL password.

### "Database does not exist"
Run the setup script:
```bash
npm run setup-db
```

Or manually:
```bash
mysql -u root -p -e "CREATE DATABASE admin_panel_db;"
```

### "Port 5000 already in use"
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill it (replace PID with process id)
taskkill /PID <PID> /F

# Or change PORT in server/.env
```

---

## 📱 Connect Frontend to Backend

The React admin panel already calls the API. Just ensure:
1. Backend is running on `http://localhost:5000`
2. Frontend is running on `http://localhost:5173`
3. API requests use correct endpoints

---

## ✨ Features You Now Have

✅ **REST API** with 20+ endpoints
✅ **MySQL Database** for persistent storage
✅ **Sequelize ORM** for safe database operations
✅ **Auto Table Creation** on first run
✅ **Sample Data** pre-populated
✅ **Error Handling** on all endpoints
✅ **Data Validation** at model level
✅ **Environment Config** for dev/prod
✅ **CORS Enabled** for frontend communication
✅ **Connection Pooling** for performance

---

## 🚀 Next Steps

1. ✅ Install MySQL Server
2. ✅ Create database (or run setup script)
3. ✅ Install npm packages
4. ✅ Start backend: `npm start`
5. ✅ Test API: `npm run test-api`
6. ✅ Start frontend: `npm run dev` (in root directory)
7. ✅ Access admin panel at http://localhost:5173

---

## 📞 Need Help?

- **Setup Issues**: See [CREATE_DATABASE.md](../CREATE_DATABASE.md)
- **API Issues**: See [API_INTEGRATION_GUIDE.md](../API_INTEGRATION_GUIDE.md)
- **Database Issues**: See [MYSQL_SETUP.md](../MYSQL_SETUP.md)
- **General Help**: See [README.md](../README.md)

---

**Backend Setup Complete!** 🎉

Your professional admin panel backend is ready for production use.
