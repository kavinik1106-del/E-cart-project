# E-Cart Project Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT SIDE (Browser)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────────────┐      ┌──────────────────────────┐             │
│  │  HomePage Component      │      │  Admin Panel Component   │             │
│  ├──────────────────────────┤      ├──────────────────────────┤             │
│  │ - Fetch Products API     │      │ - Login                  │             │
│  │ - Display ProductCards   │      │ - View Products          │             │
│  │ - Search & Filter        │      │ - Create Products        │             │
│  │ - Add to Cart            │      │ - Edit Products          │             │
│  │ - Shopping Cart          │      │ - Delete Products        │             │
│  │ - Checkout               │      │ - View Customers         │             │
│  │ - Orders                 │      │ - View Orders            │             │
│  │ - Wishlist               │      │ - Dashboard Stats        │             │
│  └────────────┬─────────────┘      └──────────────┬───────────┘             │
│               │                                    │                         │
│               │ React 19 + Vite                    │                         │
│               │ Tailwind CSS                       │                         │
│               │ React Router                       │                         │
│               └────────────┬───────────────────────┘                         │
│                            │                                                 │
└────────────────────────────┼─────────────────────────────────────────────────┘
                             │
                             │ HTTP/REST API Calls
                             │
┌─────────────────────────────┼─────────────────────────────────────────────────┐
│                             │        SERVER SIDE (Node.js/Express)            │
├─────────────────────────────┼─────────────────────────────────────────────────┤
│                             │                                                  │
│                    ┌────────▼────────┐                                        │
│                    │  Express Server │                                        │
│                    │  Port: 5001     │                                        │
│                    └────────┬────────┘                                        │
│                             │                                                 │
│        ┌────────────────────┼────────────────────┐                           │
│        │                    │                    │                           │
│        ▼                    ▼                    ▼                           │
│  ┌───────────┐      ┌───────────┐      ┌──────────────┐                   │
│  │ Auth APIs │      │ Product   │      │ Order/       │                   │
│  │           │      │ APIs      │      │ Customer API │                   │
│  ├───────────┤      ├───────────┤      ├──────────────┤                   │
│  │ /auth/*   │      │ GET /api/ │      │ GET /api/    │                   │
│  │ /customer │      │ products  │      │ orders       │                   │
│  │ /auth     │      │           │      │              │                   │
│  │           │      │ POST /api │      │ GET /api/    │                   │
│  │           │      │ /products │      │ customers    │                   │
│  │           │      │           │      │              │                   │
│  │           │      │ PUT /api/ │      │ POST /api/   │                   │
│  │           │      │ products/ │      │ orders       │                   │
│  │           │      │ :id       │      │              │                   │
│  │           │      │           │      │              │                   │
│  │           │      │ DELETE    │      │ etc...       │                   │
│  │           │      │ /api/     │      │              │                   │
│  │           │      │ products/ │      │              │                   │
│  │           │      │ :id       │      │              │                   │
│  └─────┬─────┘      └─────┬─────┘      └──────┬───────┘                   │
│        │                  │                    │                           │
└────────┼──────────────────┼────────────────────┼───────────────────────────┘
         │                  │                    │
         │ ORM/Query        │ ORM/Query          │ ORM/Query
         │                  │                    │
┌────────┼──────────────────┼────────────────────┼───────────────────────────┐
│        │        DATABASE LAYER (MySQL)        │                           │
├────────┼──────────────────┼────────────────────┼───────────────────────────┤
│        │                  │                    │                           │
│        ▼                  ▼                    ▼                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐                 │
│  │ customer_db  │  │admin_panel_db│  │ ecommerce_db     │                 │
│  ├──────────────┤  ├──────────────┤  ├──────────────────┤                 │
│  │ customers    │  │ products     │  │ users            │                 │
│  │ - id         │  │ - id         │  │ - id             │                 │
│  │ - name       │  │ - name       │  │ - email          │                 │
│  │ - email      │  │ - type       │  │ - password       │                 │
│  │ - phone      │  │ - category   │  │ - phone          │                 │
│  │ - address    │  │ - brand      │  │ - address        │                 │
│  │ - created_at │  │ - price      │  │                  │                 │
│  │              │  │ - mrp        │  │ orders           │                 │
│  │              │  │ - stock      │  │ - id             │                 │
│  │              │  │ - image      │  │ - user_id        │                 │
│  │              │  │ - rating     │  │ - amount         │                 │
│  │              │  │ - reviews    │  │ - status         │                 │
│  │              │  │ - discount   │  │ - items          │                 │
│  │              │  │ - colors     │  │ - created_at     │                 │
│  │              │  │ - sizeGuide  │  │                  │                 │
│  │              │  │ - tag        │  │ contacts         │                 │
│  │              │  │              │  │ - id             │                 │
│  │              │  │ orders       │  │ - name           │                 │
│  │              │  │ - id         │  │ - email          │                 │
│  │              │  │ - customer   │  │ - message        │                 │
│  │              │  │ - amount     │  │ - created_at     │                 │
│  │              │  │ - status     │  │                  │                 │
│  │              │  │ - items      │  │                  │                 │
│  │              │  │              │  │                  │                 │
│  │              │  │ settings     │  │                  │                 │
│  │              │  │ - id         │  │                  │                 │
│  │              │  │ - key        │  │                  │                 │
│  │              │  │ - value      │  │                  │                 │
│  └──────────────┘  └──────────────┘  └──────────────────┘                 │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────────┐
│   User Action   │
│  (Click product)│
└────────┬────────┘
         │
         ▼
┌──────────────────────┐
│ HomePage Component   │
│ useEffect Hook       │
│ fetchProducts()      │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  apiCall()           │
│  (GET /api/products) │
└────────┬─────────────┘
         │
         ▼
┌────────────────────────────┐
│  Admin Backend             │
│  GET /api/products         │
│  Handler                   │
└────────┬───────────────────┘
         │
         ▼
┌──────────────────────┐
│  Product Model       │
│  findAll()           │
│  (Sequelize ORM)     │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  MySQL Query         │
│  SELECT * FROM       │
│  products;           │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Database Results    │
│  (Product Array)     │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Format Response     │
│  JSON {              │
│    success: true,    │
│    data: [...]       │
│  }                   │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Send to Frontend    │
│  HTTP 200 OK         │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Frontend receives   │
│  JSON response       │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Transform data      │
│  Map to Product      │
│  format              │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Update state        │
│  setProducts()       │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Re-render           │
│  ProductCards        │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Display Products    │
│  on HomePage         │
└──────────────────────┘
```

## Database Schema Relationships

```
admin_panel_db
│
├── products
│   ├── id (PK)
│   ├── name
│   ├── type
│   ├── category
│   ├── brand
│   ├── price
│   ├── mrp
│   ├── stock
│   ├── image
│   ├── description
│   ├── rating
│   ├── reviews
│   ├── discount
│   ├── colors (JSON)
│   ├── sizeGuide (JSON)
│   ├── tag
│   ├── createdAt
│   └── updatedAt
│
├── orders
│   ├── id (PK)
│   ├── customer
│   ├── email
│   ├── amount
│   ├── status
│   ├── items
│   ├── address
│   ├── createdAt
│   └── updatedAt
│
└── settings
    ├── id (PK)
    ├── key
    └── value


customer_db
│
├── customers
│   ├── id (PK)
│   ├── name
│   ├── email (UNIQUE)
│   ├── phone
│   ├── address
│   ├── createdAt
│   └── updatedAt
│
└── customer_auths
    ├── id (PK)
    ├── customerId (FK)
    ├── password
    ├── lastLogin
    ├── createdAt
    └── updatedAt


ecommerce_db
│
├── users
│   ├── id (PK)
│   ├── email (UNIQUE)
│   ├── password
│   ├── phone
│   ├── address
│   ├── createdAt
│   └── updatedAt
│
├── orders
│   ├── id (PK)
│   ├── userId (FK)
│   ├── amount
│   ├── status
│   ├── items
│   ├── createdAt
│   └── updatedAt
│
└── contacts
    ├── id (PK)
    ├── name
    ├── email
    ├── message
    ├── status
    ├── createdAt
    └── updatedAt
```

## Component Hierarchy

```
App.jsx
│
├── Navbar
│   ├── Search
│   ├── User Menu
│   └── Cart Icon
│
├── Routes
│   │
│   ├── HomePage
│   │   ├── HeroSlider
│   │   ├── CategoryCarousel
│   │   ├── ProductGrid
│   │   │   └── ProductCard (Multiple)
│   │   │       ├── Image
│   │   │       ├── Title
│   │   │       ├── Price
│   │   │       ├── Rating
│   │   │       ├── Wishlist Button
│   │   │       └── Add to Cart Button
│   │   ├── Features Section
│   │   └── Footer
│   │
│   ├── ProductDetailPage
│   │   ├── Product Image
│   │   ├── Product Info
│   │   ├── Size/Color Selector
│   │   ├── Price Section
│   │   ├── Add to Cart Button
│   │   └── Related Products
│   │
│   ├── CartPage
│   │   ├── Cart Items List
│   │   ├── Quantity Controls
│   │   ├── Remove Button
│   │   ├── Cart Summary
│   │   └── Checkout Button
│   │
│   ├── CheckoutPage
│   │   ├── Shipping Address
│   │   ├── Payment Method
│   │   ├── Order Summary
│   │   └── Place Order Button
│   │
│   ├── AdminPanel
│   │   ├── AdminNav
│   │   ├── Sidebar
│   │   │
│   │   ├── Dashboard
│   │   │   ├── Stats Cards
│   │   │   ├── Charts
│   │   │   └── Recent Activity
│   │   │
│   │   ├── ProductsPage
│   │   │   ├── Products Table
│   │   │   ├── Add Product Button
│   │   │   ├── Edit Product Modal
│   │   │   └── Delete Confirmation
│   │   │
│   │   ├── OrdersPage
│   │   │   ├── Orders Table
│   │   │   ├── Order Details Modal
│   │   │   └── Status Update
│   │   │
│   │   └── CustomersPage
│   │       ├── Customers Table
│   │       ├── Customer Details
│   │       └── Contact List
│   │
│   └── LoginPage
│       ├── Email Input
│       ├── Password Input
│       └── Submit Button
│
└── Footer
```

## API Request/Response Examples

### GET Products Request
```
GET /api/products HTTP/1.1
Host: localhost:5001
Content-Type: application/json
```

### GET Products Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "type": "Electronics",
      "category": "Phones",
      "brand": "Apple",
      "price": 50000,
      "mrp": 60000,
      "stock": 100,
      "image": "/iphone15.jpg",
      "description": "Latest iPhone model",
      "rating": 4.8,
      "reviews": 1250,
      "discount": 17,
      "colors": ["Black", "White", "Gold"],
      "sizeGuide": {},
      "tag": "In Stock",
      "createdAt": "2025-01-05T10:30:00Z",
      "updatedAt": "2025-01-05T10:30:00Z"
    }
  ],
  "count": 1
}
```

### POST Product Request
```
POST /api/products HTTP/1.1
Host: localhost:5001
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "name": "Samsung Galaxy S25",
  "type": "Electronics",
  "category": "Phones",
  "brand": "Samsung",
  "price": 45000,
  "mrp": 55000,
  "stock": 50,
  "image": "/galaxy.jpg",
  "description": "New Samsung flagship",
  "rating": 4.7,
  "reviews": 500,
  "discount": 18,
  "colors": ["Black", "White"],
  "sizeGuide": {},
  "tag": "In Stock"
}
```

### POST Product Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Samsung Galaxy S25",
    "type": "Electronics",
    "category": "Phones",
    "brand": "Samsung",
    "price": 45000,
    "mrp": 55000,
    "stock": 50,
    "image": "/galaxy.jpg",
    "description": "New Samsung flagship",
    "rating": 4.7,
    "reviews": 500,
    "discount": 18,
    "colors": ["Black", "White"],
    "sizeGuide": {},
    "tag": "In Stock",
    "createdAt": "2025-01-05T14:45:00Z",
    "updatedAt": "2025-01-05T14:45:00Z"
  }
}
```

## Deployment Architecture

```
┌──────────────────────────────────────┐
│         Internet/Browser              │
│      (Client Machines)                │
└────────────────┬─────────────────────┘
                 │
                 │ HTTPS (Port 443)
                 ▼
┌──────────────────────────────────────┐
│    Nginx Reverse Proxy/Load          │
│    Balancer                          │
│    (Optional - Production)           │
└────────────┬───────────────────────┬┘
             │                       │
      HTTP 5173                HTTP 5001
             │                       │
    ┌────────▼────────┐    ┌────────▼────────┐
    │  Frontend App   │    │ Backend Server  │
    │  (React/Vite)  │    │ (Node/Express)  │
    │  Port: 5173    │    │  Port: 5001     │
    │                │    │                 │
    │  - HomePage    │    │ - API Routes    │
    │  - ProductCard │    │ - DB Connection │
    │  - Cart        │    │ - Auth          │
    │  - Admin Panel │    │ - Business Logic│
    └────────────────┘    └────────┬────────┘
                                   │
                            MySQL 3306
                                   │
                         ┌─────────▼─────────┐
                         │  MySQL Database   │
                         │  (Local/Remote)   │
                         │                   │
                         │ - admin_panel_db  │
                         │ - customer_db     │
                         │ - ecommerce_db    │
                         └───────────────────┘
```

---

This architecture provides a clean separation of concerns, scalability, and maintainability for the E-cart project.
