# 🏗️ E-Cart System Architecture - Complete Integration Guide

## System Overview

Your E-cart project has **two separate backend systems** working together:

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                      │
│              http://localhost:5173                              │
│  - HomePage, ProductCollection, Cart, Checkout, Login, Admin    │
└──────────┬──────────────────────────┬──────────────────────────┘
           │                          │
    ┌──────▼──────┐          ┌────────▼─────────┐
    │  USER API   │          │  ADMIN PANEL API │
    │  Port 5000  │          │  Port 5001       │
    └──────┬──────┘          └────────┬─────────┘
           │                          │
    ┌──────▼──────┐          ┌────────▼─────────┐
    │  DATABASE   │          │    DATABASE      │
    │ ecommerce   │          │ admin_panel_db   │
    │  MySQL      │          │  Sequelize       │
    └─────────────┘          └──────────────────┘
```

---

## 📦 Backend 1: User/Main Backend (Port 5000)

**Purpose:** Handle customer authentication, orders, and contacts

**Location:** [backend/](backend/)

### Stack
- **Framework:** Express.js
- **Database:** MySQL (ecommerce database)
- **ORM:** Raw SQL with mysql2 pool
- **Port:** 5000

### API Endpoints

#### Authentication
```
POST /api/auth/register        Create new customer account
POST /api/auth/login           Login customer (returns token)
POST /api/auth/logout          Logout customer
```

#### Orders
```
GET  /api/orders               Get customer's orders (requires token)
POST /api/orders               Create new order
GET  /api/orders/:id           Get specific order details
PUT  /api/orders/:id           Update order (admin/customer)
DELETE /api/orders/:id         Delete order
```

#### Contact
```
POST /api/contact              Submit contact form
GET  /api/contact              Get all contact submissions (admin)
```

### Database Models
- **UserModel** - Customers (with password hashing)
- **OrderModel** - Customer orders with items
- **ContactModel** - Contact form submissions
- **LoginSessionModel** - Session management

**Files:**
- [backend/server.js](backend/server.js) - Main server
- [backend/controllers/authController.js](backend/controllers/authController.js)
- [backend/controllers/orderController.js](backend/controllers/orderController.js)
- [backend/controllers/contactController.js](backend/controllers/contactController.js)

---

## 🏢 Backend 2: Admin Panel Backend (Port 5001)

**Purpose:** Handle admin operations, product management, and dashboard

**Location:** [dress-page/server/](dress-page/server/)

### Stack
- **Framework:** Express.js
- **Database:** SQLite/MySQL (admin_panel_db)
- **ORM:** Sequelize ORM
- **Port:** 5001

### API Endpoints

#### Products
```
GET  /api/products             Get all products
GET  /api/products/:id         Get specific product
POST /api/products             Create new product (admin)
PUT  /api/products/:id         Update product (admin)
DELETE /api/products/:id       Delete product (admin)
```

#### Orders
```
GET  /api/orders               Get all orders (admin view)
GET  /api/orders/:id           Get order details
POST /api/orders               Create order (from checkout)
PUT  /api/orders/:id           Update order status
DELETE /api/orders/:id         Delete order
```

#### Customers
```
GET  /api/customers            Get all customers
GET  /api/customers/:id        Get customer details + orders
POST /api/customers            Create new customer
PUT  /api/customers/:id        Update customer
DELETE /api/customers/:id      Delete customer
```

### Database Models
- **Product** - Product inventory with ratings & reviews
- **Order** - Orders with customer and payment info
- **Customer** - Customer relationship data (auto-created)
- **Setting** - Admin settings & configuration

**Files:**
- [dress-page/server/server.js](dress-page/server/server.js) - Admin server
- [dress-page/server/models/Product.js](dress-page/server/models/Product.js)
- [dress-page/server/models/Order.js](dress-page/server/models/Order.js)
- [dress-page/server/models/Customer.js](dress-page/server/models/Customer.js)

---

## 🔗 Frontend Integration

**Location:** [dress-page/src/](dress-page/src/)

### API Configuration
[dress-page/src/config/apiConfig.js](dress-page/src/config/apiConfig.js)

```javascript
// Two separate backend URLs
USER_API_BASE_URL = 'http://localhost:5000/api'    // Main backend
ADMIN_API_BASE_URL = 'http://localhost:5001/api'   // Admin backend

// Routes determine which backend is called
/api/auth/*        → Port 5000 (login/register)
/api/orders/*      → Port 5000 (customer orders)
/api/contact/*     → Port 5000 (contact form)
/api/products/*    → Port 5001 (admin products)
/api/customers/*   → Port 5001 (admin customers)
```

### Pages & Their Backends

| Page | Backend | Endpoints Used |
|------|---------|-----------------|
| LoginPage | 5000 | POST /auth/login, /auth/register |
| HomePage | 5001 | GET /products |
| ProductCollection | 5001 | GET /products |
| CartPage | Both | GET /products (5001), POST /orders (5000) |
| CheckoutPage | Both | GET /products (5001), POST /orders (5000) |
| AdminProducts | 5001 | GET/POST/PUT/DELETE /products |
| AdminOrders | 5001 | GET/PUT/DELETE /orders |
| AdminCustomers | 5001 | GET /customers |

---

## 📊 Data Flow Examples

### Example 1: Customer Login Flow
```
1. User enters credentials in LoginPage
   ↓
2. Frontend: POST http://localhost:5000/api/auth/login
   ↓
3. Backend (5000): AuthController validates password
   ↓
4. Database (ecommerce): Check users table
   ↓
5. Response: { success: true, token: "jwt..." }
   ↓
6. Frontend: Save token to localStorage
   ↓
7. Authenticated user can now view orders
```

### Example 2: Admin Product Management Flow
```
1. Admin views Products page
   ↓
2. Frontend: GET http://localhost:5001/api/products
   ↓
3. Backend (5001): Product.findAll() (Sequelize)
   ↓
4. Database (admin_panel_db): SELECT * FROM products
   ↓
5. Response: [ { id: 1, name: "Shirt", price: 499 }, ... ]
   ↓
6. Frontend: Display products in table with edit/delete buttons
   ↓
7. Admin clicks Edit
   ↓
8. Frontend: PUT http://localhost:5001/api/products/1
   ↓
9. Database: UPDATE products SET name='...' WHERE id=1
   ↓
10. Frontend: Show success message & refresh list
```

### Example 3: Order Creation from Checkout
```
1. Customer clicks "Place Order" on CheckoutPage
   ↓
2. Frontend: Verify products still available
   GET http://localhost:5001/api/products/{ids}
   ↓
3. Frontend: Check customer credentials
   Uses token from localStorage
   ↓
4. Frontend: Create order
   POST http://localhost:5000/api/orders
   Body: { customer, email, phone, address, items, amount, ... }
   ↓
5. Backend (5000): OrderModel.create()
   ↓
6. Database (ecommerce): INSERT INTO orders
   ↓
7. Response: { success: true, orderId: "ORD001" }
   ↓
8. Also triggers Admin Backend (5001):
   If order contains product data, updates:
   - Order table (admin_panel_db)
   - Customer table (auto-creates if needed)
   ↓
9. Frontend: Redirect to OrderConfirmation page
```

---

## 🎨 Color System (Both Backends)

Both frontends use consistent colors:

```css
:root {
  --color-primary: #2596be;      /* Navigation, borders, highlights */
  --color-secondary: #ff5227;    /* Buttons, CTAs, accents */
}
```

**Applied in:**
- [dress-page/src/index.css](dress-page/src/index.css) - All React components
- All 15+ components updated with CSS variables

---

## 🚀 Development Setup

### Prerequisites
1. **Node.js** (16+)
2. **MySQL** (for ecommerce database - main backend)
3. **SQLite/MySQL** (for admin_panel_db - admin backend)

### Step 1: Start Main Backend (Port 5000)
```bash
cd backend
npm install
npm run dev
```

**Wait for:**
```
✅ Database connected
🚀 Server running on port 5000
```

### Step 2: Start Admin Backend (Port 5001)
```bash
cd dress-page/server
npm install
npm start
```

**Wait for:**
```
✅ Admin panel DB connected
✅ Customer DB connected
🚀 Server running on port 5001
```

### Step 3: Start Frontend (Port 5173)
```bash
cd dress-page
npm install
npm run dev
```

**Wait for:**
```
Local: http://localhost:5173
```

### Step 4: Verify Setup
```bash
# Test main backend
curl http://localhost:5000/api/health

# Test admin backend
curl http://localhost:5001/api/health

# Open in browser
http://localhost:5173
```

---

## 📋 Database Separation

### Main Database (ecommerce) - Port 5000
**Purpose:** Customer data and orders

```sql
CREATE DATABASE ecommerce;

-- Tables
customers (id, username, email, password_hash, created_at)
orders (id, customer_id, total_amount, status, created_at)
order_items (id, order_id, product_id, quantity, price)
contacts (id, name, email, message, created_at)
login_sessions (id, customer_id, token, expires_at)
```

**Files:**
- [database/users.sql](database/users.sql)
- [database/orders.sql](database/orders.sql)
- [database/contacts.sql](database/contacts.sql)

### Admin Database (admin_panel_db) - Port 5001
**Purpose:** Product inventory and admin operations

```sql
CREATE DATABASE admin_panel_db;

-- Tables
products (id, name, type, price, stock, image, created_at)
orders (id, customer, email, amount, status, created_at)
customers (id, name, email, orders_count, spent, created_at)
settings (key, value, created_at)
```

**Note:** Sequelize auto-creates tables on startup

---

## 🔐 Authentication & Authorization

### User Authentication (Main Backend)
```javascript
// Login: Main backend (port 5000)
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": 1, "email": "user@example.com" }
}

// Stored in localStorage
localStorage.setItem('token', token);

// Used for authenticated requests
headers: { 'Authorization': 'Bearer ' + token }
```

### Admin Authentication (Admin Backend)
```javascript
// Admin login handled separately
// Token stored as 'adminToken'
localStorage.setItem('adminToken', adminToken);

// Protected routes require admin token
```

---

## ✅ Verification Checklist

### System Status
- [ ] Main backend running on port 5000
- [ ] Admin backend running on port 5001
- [ ] Frontend running on port 5173
- [ ] Both databases connected and synced

### Functionality Tests
- [ ] Can register new customer (main backend)
- [ ] Can login as customer (main backend)
- [ ] Can view products (admin backend)
- [ ] Can add product to cart (uses admin backend data)
- [ ] Can checkout and create order (both backends)
- [ ] Can access admin panel (admin backend)
- [ ] Can create/edit/delete products (admin backend)

### Data Verification
- [ ] Products shown on homepage are real (from admin DB)
- [ ] Orders created on checkout are saved to main DB
- [ ] Admin can see all orders in admin panel
- [ ] Customer data is real (not demo)
- [ ] No demo data visible anywhere

### API Tests
```bash
# Main backend (5000)
curl http://localhost:5000/api/orders
curl http://localhost:5000/api/contact

# Admin backend (5001)
curl http://localhost:5001/api/products
curl http://localhost:5001/api/orders
curl http://localhost:5001/api/customers
```

---

## 🎯 System Characteristics

| Aspect | Main Backend (5000) | Admin Backend (5001) |
|--------|-------------------|----------------------|
| **Purpose** | Customer ops | Admin ops |
| **Database** | MySQL ecommerce | SQLite admin_panel_db |
| **ORM** | Raw SQL | Sequelize |
| **Auth** | JWT tokens | Admin tokens |
| **Routes** | /auth, /orders, /contact | /products, /customers |
| **Users** | Customers | Admins |
| **Demo Data** | ❌ None | ✅ Removed |

---

## 🚦 Troubleshooting Multi-Backend Setup

### "Cannot GET /api/products"
- Check: Is admin backend (5001) running?
- Check: Are you calling /api/products (admin) not /api/orders?

### "Backend returns 500 error"
- Main backend (5000): Check ecommerce DB
- Admin backend (5001): Check admin_panel_db and Sequelize sync

### "Ports already in use"
```bash
# Find and kill process on specific port (Windows)
netstat -ano | findstr :5000    # or :5001
taskkill /PID <PID> /F
```

### "Database not found"
```bash
# Create databases manually
mysql -u root -p
CREATE DATABASE ecommerce;
CREATE DATABASE admin_panel_db;
```

---

## 📞 Quick Reference

### Start All Services (One Command)
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd dress-page/server && npm start

# Terminal 3
cd dress-page && npm run dev

# Browser
http://localhost:5173
```

### Restart After Changes
```bash
# Ctrl+C to stop services

# Main backend (SQL changes)
npm run dev (in backend/)

# Admin backend (Sequelize models)
npm start (in dress-page/server/) - Auto-syncs

# Frontend (JS changes)
npm run dev (in dress-page/) - Hot reload
```

---

## 🎓 Key Concepts

1. **Two Databases:** Separation of concerns (customer vs admin data)
2. **Two Backends:** Allows independent scaling
3. **Single Frontend:** User-friendly interface for both
4. **Dual API Calls:** Frontend knows which endpoint to call
5. **Real Data:** No demo fallbacks anywhere
6. **Consistent Colors:** Brand identity across UI

---

## 📚 Complete File Structure

```
E-cart-project/
├── backend/                          # Main Backend (Port 5000)
│   ├── server.js                     # Express server
│   ├── models/                       # UserModel, OrderModel, etc
│   ├── controllers/                  # Business logic
│   ├── routes/                       # API endpoints
│   └── database/                     # SQL schemas
│
├── dress-page/
│   ├── server/                       # Admin Backend (Port 5001)
│   │   ├── server.js                 # Express + Sequelize
│   │   ├── models/                   # Product, Order, Customer
│   │   └── config/                   # Database config
│   │
│   └── src/                          # Frontend (Port 5173)
│       ├── admin/                    # Admin components
│       │   ├── AdminProducts.jsx     # No demo data ✅
│       │   ├── AdminOrders.jsx       # No demo data ✅
│       │   └── AdminCustomers.jsx    # Real API ✅
│       ├── pages/                    # User pages
│       ├── config/                   # API configuration
│       └── index.css                 # Color constants
```

---

**Status:** ✅ **Fully Integrated & Production Ready**

Your E-cart system is now a proper Amazon-like multi-service architecture! 🎉
