# 📊 Full System Integration Guide

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                      │
│                    Port: 5173                                   │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  HomePage    │  │ LoginPage    │  │ OrderPage    │           │
│  │ + Collection │  │              │  │              │           │
│  │  + Detail    │  │ Registration │  │ Order Mgmt   │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│          │                 │                  │                  │
│          └─────────────────┴──────────────────┘                  │
│                    API Calls (Fetch)                             │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│               ADMIN FRONTEND (React + Vite)                     │
│                    Port: 5173                                   │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  Dashboard   │  │  Products    │  │   Orders     │           │
│  │              │  │              │  │              │           │
│  │  Customers   │  │   Settings   │  │   Analytics  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│          │                 │                  │                  │
│          └─────────────────┴──────────────────┘                  │
│                    API Calls (Fetch)                             │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│            ADMIN BACKEND (Express.js + Sequelize)               │
│                    Port: 5001                                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  - Products (proxies to main backend)                   │   │
│  │  - Orders (proxies to main backend)                     │   │
│  │  - Customers (proxies to main backend users)            │   │
│  │  - Auth (admin login/verify)                            │   │
│  │  - Settings (local config)                              │   │
│  │  - Dashboard Stats                                      │   │
│  │  - Fallback to local database                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                             │                                   │
│         Proxies to Main Backend (Port 5000)                     │
└─────────────────┬────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│            MAIN BACKEND (Express.js + MySQL2)                   │
│                    Port: 5000                                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Products API                                            │   │
│  │    - GET  /api/products                                 │   │
│  │    - GET  /api/products/:id                             │   │
│  │    - POST /api/products (admin)                         │   │
│  │    - PUT  /api/products/:id (admin)                     │   │
│  │    - DELETE /api/products/:id (admin)                   │   │
│  │                                                          │   │
│  │  Orders API                                              │   │
│  │    - GET  /api/orders (all orders)                      │   │
│  │    - POST /api/orders                                   │   │
│  │    - PUT  /api/orders/:id/status                        │   │
│  │                                                          │   │
│  │  Auth API                                                │   │
│  │    - POST /api/auth/register                            │   │
│  │    - POST /api/auth/login                               │   │
│  │    - GET  /api/auth/users (admin)                       │   │
│  │    - GET  /api/auth/profile/:id                         │   │
│  │                                                          │   │
│  │  Contact API                                             │   │
│  │    - POST /api/contact                                  │   │
│  │    - GET  /api/contacts (admin)                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────┬────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MySQL Database                              │
│                  Database: ecommerce                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Tables:                                                │    │
│  │  - users (id, email, password, first_name, etc)       │    │
│  │  - products (id, name, price, category, stock, etc)   │    │
│  │  - orders (id, user_id, total_amount, status, etc)    │    │
│  │  - order_items (id, order_id, product_id, qty, etc)   │    │
│  │  - contacts (id, email, message, status, etc)         │    │
│  │  - login_sessions (id, user_id, token, etc)           │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## How Data Flows

### 1. **Product Flow**
```
HomePage/CollectionPage
    ↓
Fetches from: GET /api/products (port 5000)
    ↓
Main Backend (ProductModel)
    ↓
MySQL Database (products table)
    ↓
Returns product list with: id, name, price, image, category, etc.
    ↓
Frontend displays products
    ↓
Admin can manage products via:
    - AdminProducts → GET /api/products (port 5001)
    - Admin Server proxies to port 5000 (main backend)
    - Falls back to local database if unavailable
```

### 2. **User/Login Flow**
```
LoginPage
    ↓
POST /api/auth/register or /api/auth/login (port 5000)
    ↓
Backend (authController)
    ↓
UserModel (MySQL operations)
    ↓
users table in MySQL
    ↓
Returns: success, token, user_id, email
    ↓
Frontend stores token in localStorage
    ↓
Admin can view users via:
    - AdminCustomers → GET /api/customers (port 5001)
    - Admin Server fetches from port 5000 /api/auth/users
    - Transforms user data to customer format
```

### 3. **Order Flow**
```
OrderPage → Place Order
    ↓
POST /api/orders (port 5000)
    ↓
Backend (orderController)
    ↓
OrderModel + order_items
    ↓
MySQL Database
    ↓
Returns: order_id, order_number, status
    ↓
Admin can view orders via:
    - AdminOrders → GET /api/orders (port 5001)
    - Admin Server fetches from port 5000 /api/orders
    - Returns all orders with customer info
    ↓
Can update status via:
    - PUT /api/orders/:id/status
    - Proxies to main backend
```

---

## Step-by-Step Setup

### Step 1: Ensure MySQL is Running
```bash
# Windows
net start MySQL80

# Mac/Linux
sudo systemctl start mysql
```

### Step 2: Create Databases and Tables
```bash
# Create databases
mysql -u root -p
CREATE DATABASE ecommerce;
USE ecommerce;

# Import SQL files
SOURCE C:\path\to\database\users.sql;
SOURCE C:\path\to\database\products.sql;
SOURCE C:\path\to\database\orders.sql;
SOURCE C:\path\to\database\order_items.sql;
SOURCE C:\path\to\database\contacts.sql;
SOURCE C:\path\to\database\login_sessions.sql;
```

### Step 3: Start Main Backend Server
```bash
cd backend
npm install  # First time only
node server.js

# Expected output:
# ✅ Database connected successfully
# ✅ Server is running on http://localhost:5000
```

### Step 4: Start Admin Backend Server
```bash
cd dress-page/server
npm install  # First time only
node server.js

# Expected output:
# ✅ Admin panel DB connected
# ✅ Customer DB connected
# ✅ API Server running on http://localhost:5001
```

### Step 5: Start Frontend Development Server
```bash
cd dress-page
npm install  # First time only
npm run dev

# Expected output:
# ➜  Local:   http://localhost:5173/
```

---

## API Endpoints Reference

### Products API (Main Backend - Port 5000)
```
GET    /api/products              - Get all products
GET    /api/products/:id          - Get single product
GET    /api/products/category/:category - Get by category
GET    /api/products/featured     - Get featured products
POST   /api/products              - Create product (admin)
PUT    /api/products/:id          - Update product (admin)
DELETE /api/products/:id          - Delete product (admin)
```

### Orders API (Main Backend - Port 5000)
```
GET    /api/orders                - Get all orders (admin)
GET    /api/orders/:id            - Get single order
POST   /api/orders                - Create new order
PUT    /api/orders/:id/status     - Update order status
PUT    /api/orders/:id/cancel     - Cancel order
```

### Auth API (Main Backend - Port 5000)
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login user
GET    /api/auth/users            - Get all users (admin)
GET    /api/auth/profile/:id      - Get user profile
PUT    /api/auth/profile/:id      - Update user profile
```

### Admin API (Admin Backend - Port 5001)
```
GET    /api/products              - Get products (proxies to port 5000)
GET    /api/orders                - Get orders (proxies to port 5000)
GET    /api/customers             - Get customers/users (proxies to port 5000)
POST   /api/auth/login            - Admin login
POST   /api/auth/verify           - Verify admin token
GET    /api/dashboard/stats       - Dashboard statistics
```

---

## Frontend to Admin Connection

### 1. **Homepage Products**
- **Component**: `HomePage.jsx`
- **API Call**: `GET API_ENDPOINTS.PRODUCTS` (points to `http://localhost:5000/api/products`)
- **Fallback**: Uses mock products if API fails
- **Displays**: Product grid with prices, ratings, categories

### 2. **Collection Page**
- **Component**: `CollectionPage.jsx`
- **API Call**: Filters products by category, price, search
- **Uses**: `API_ENDPOINTS.PRODUCTS` with query parameters
- **Features**: Sorting, filtering, pagination

### 3. **Login Page**
- **Component**: `LoginPage.jsx`
- **API Call**: `POST API_ENDPOINTS.LOGIN` (points to `http://localhost:5000/api/auth/login`)
- **Data**: email, password
- **Response**: token, user_id, user details
- **Storage**: Saves token in localStorage

### 4. **Order Page**
- **Component**: `OrderPage.jsx`
- **API Calls**:
  - `POST API_ENDPOINTS.USER_ORDERS` - Create order
  - `GET API_ENDPOINTS.USER_ORDERS` - View user's orders
- **Requires**: Authentication token
- **Stores**: Order in database

---

## Admin Panel Connection

### 1. **Admin Dashboard**
- **Fetches**: Product count, order stats, customer info
- **Source**: Aggregates data from main backend
- **Updates**: Real-time stats

### 2. **Admin Products**
- **Component**: `AdminProducts.jsx`
- **API Call**: `GET API_ENDPOINTS.ADMIN_PRODUCTS` (points to `http://localhost:5001/api/products`)
- **Admin Server**: Proxies to main backend port 5000
- **Features**: Add, edit, delete products (saved to MySQL)

### 3. **Admin Orders**
- **Component**: `AdminOrders.jsx`
- **API Call**: `GET API_ENDPOINTS.ORDERS` (points to `http://localhost:5001/api/orders`)
- **Admin Server**: Proxies to main backend port 5000
- **Real Data**: Shows actual orders from database
- **Updates**: Change order status, payment status

### 4. **Admin Customers**
- **Component**: `AdminCustomers.jsx`
- **API Call**: `GET API_ENDPOINTS.CUSTOMERS` (points to `http://localhost:5001/api/customers`)
- **Source**: Fetches from main backend `/api/auth/users`
- **Displays**: Real registered users from database

---

## Testing the Integration

### Test 1: Products API
```bash
# Get all products
curl http://localhost:5000/api/products

# Get specific product
curl http://localhost:5000/api/products/1

# Via admin (should proxy)
curl http://localhost:5001/api/products
```

### Test 2: Orders API
```bash
# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "order_number": "ORD001",
    "total_amount": 5000,
    "items": [{"product_id": 1, "quantity": 2}]
  }'

# Get all orders (admin)
curl http://localhost:5000/api/orders

# Via admin (should proxy)
curl http://localhost:5001/api/orders
```

### Test 3: Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get all users (admin)
curl http://localhost:5000/api/auth/users
```

---

## Troubleshooting

### Issue: Products not loading on homepage
**Check:**
1. Main backend running on port 5000: `curl http://localhost:5000/api/health`
2. MySQL database has products: `SELECT COUNT(*) FROM ecommerce.products;`
3. Browser console for errors (F12)

**Fix:**
```bash
# Restart backend
cd backend
node server.js

# Reload frontend
# Go to http://localhost:5173
```

### Issue: Admin panel not showing real data
**Check:**
1. Admin backend running on port 5001: `curl http://localhost:5001/api/health`
2. Main backend running on port 5000
3. Network tab shows API calls succeeding

**Fix:**
```bash
# Restart admin server
cd dress-page/server
node server.js

# Clear browser cache (Ctrl+Shift+Delete)
```

### Issue: Orders not saving
**Check:**
1. MySQL connection working
2. order_items table exists
3. User_id exists in users table

**Fix:**
```sql
-- Check tables
SHOW TABLES IN ecommerce;
SELECT COUNT(*) FROM ecommerce.orders;
SELECT COUNT(*) FROM ecommerce.order_items;
```

---

## Summary

✅ **Frontend pages** (Home, Login, Order, Collection) connected to main backend  
✅ **Admin panel** connected to main backend via proxy server  
✅ **Real MySQL data** flows from database → backend → frontend  
✅ **Admin management** of products, orders, customers  
✅ **Two-server architecture** for separation of concerns  
✅ **Fallback mechanisms** if one server is down  

**Status**: All connections established and tested!
