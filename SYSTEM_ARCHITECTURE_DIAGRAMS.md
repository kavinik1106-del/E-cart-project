# System Architecture & Flow Diagrams

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      React Frontend (Port 5173)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │   HomePage   │  │  CartPage    │  │  CheckoutPage│               │
│  │  (Products)  │  │  (Add/Remove)│  │  (Place Order)              │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
│         │                  │                  │                      │
│         │                  │                  │                      │
│         └──────────┬───────┴──────────┬──────┘                      │
│                    │                  │                              │
│              Admin Dashboard          │                              │
│         ┌──────────────────┐          │                              │
│         │ ┌────────────┐   │          │                              │
│         │ │ Orders     │   │          │                              │
│         │ │ Customers  │   │          │                              │
│         │ │ Products   │   │          │                              │
│         │ └────────────┘   │          │                              │
│         └──────────────────┘          │                              │
│                    │                  │                              │
└────────────────────┼──────────────────┼──────────────────────────────┘
                     │ API Calls        │
                     │ (GET/POST/PUT)   │
                     │                  │
┌────────────────────┴──────────────────┴──────────────────────────────┐
│              Express.js API Server (Port 5001)                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │   Products   │  │    Orders    │  │  Customers   │               │
│  │  Endpoints   │  │  Endpoints   │  │  Endpoints   │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
│                                                                       │
└────────────┬───────────────────────────────────────────────────────┬─┘
             │ Sequelize ORM                                         │
             │                                                       │
┌────────────┴───────────────────────────────────────────────────────┴─┐
│                   MySQL Database (admin_panel_db)                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │  Products    │  │    Orders    │  │  Customers   │               │
│  │   Table      │  │   Table      │  │   Table      │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Shopping Flow

```
START: User on Homepage
  │
  ├─→ Browse Products (GET /api/products)
  │      │
  │      └─→ See product list with images, prices
  │
  ├─→ Click "Add to Cart" on Product
  │      │
  │      └─→ Product added to CartContext
  │          Button changes: Add to Cart → Added to Cart
  │          Cart count increases in navbar
  │
  ├─→ Navigate to Cart Page
  │      │
  │      └─→ View all cart items
  │          Show: Product name, image, price, quantity
  │          Option: Adjust quantity or remove item
  │
  ├─→ Review Order Summary
  │      │
  │      └─→ Subtotal calculation
  │          Tax: 18% of subtotal
  │          Shipping: ₹99 or Free (if > ₹500)
  │          Total: subtotal + tax + shipping
  │
  ├─→ Click "Proceed to Checkout"
  │      │
  │      └─→ Navigate to /checkout
  │
  ├─→ Fill Checkout Form
  │      │
  │      ├─→ First Name: John
  │      ├─→ Last Name: Doe
  │      ├─→ Email: john@example.com
  │      ├─→ Phone: 9876543210
  │      ├─→ Address: 123 Main Street
  │      ├─→ City: Mumbai
  │      ├─→ State: Maharashtra
  │      ├─→ Pincode: 400001
  │      └─→ Payment Method: COD / UPI / Card
  │
  ├─→ Click "Place Order - ₹XXX.XX"
  │      │
  │      └─→ Submit POST /api/orders with all details
  │
  ├─→ Server Processes Order
  │      │
  │      ├─→ Validate all fields
  │      ├─→ Check if customer exists (by email)
  │      ├─→ If new: Create customer record
  │      ├─→ If existing: Update customer (orders++, spent+=amount)
  │      ├─→ Create order with all details
  │      ├─→ Store items_details as JSON
  │      └─→ Generate order ID (ORD-001, ORD-002, etc.)
  │
  ├─→ Order Confirmation
  │      │
  │      ├─→ Clear cart from localStorage
  │      ├─→ Show success message
  │      ├─→ Display Order Number: ORD-XXXX
  │      └─→ Auto-redirect to homepage after 2 seconds
  │
  └─→ END: Order Placed Successfully
```

---

## 3. Admin Order Management Flow

```
Admin Opens Admin Panel
  │
  ├─→ Navigate to Orders section
  │      │
  │      └─→ Call GET /api/orders
  │
  ├─→ Server Retrieves All Orders from Database
  │      │
  │      └─→ Returns array of orders with:
  │          - Order ID, Customer name, Email
  │          - Amount, Status, Payment status
  │          - Items count, Shipping address
  │          - items_details (JSON array of products)
  │
  ├─→ Display Orders List
  │      │
  │      └─→ Show order cards with:
  │          - Order ID
  │          - Customer name (clickable to expand)
  │          - Total amount
  │          - Current status badge
  │          - Date created
  │
  ├─→ Click on Order to Expand
  │      │
  │      └─→ View full details:
  │          - Customer email
  │          - Phone number
  │          - Full shipping address
  │          - Items ordered with prices
  │          - Payment method and status
  │
  ├─→ Update Order Status
  │      │
  │      ├─→ Click status button (Pending → Processing)
  │      ├─→ Send PUT /api/orders/:id with new status
  │      ├─→ Server updates order in database
  │      └─→ Status updates immediately in UI
  │
  ├─→ Status Transitions
  │      │
  │      ├─→ Pending (initial state)
  │      ├─→ Processing (preparing order)
  │      ├─→ Shipped (order sent)
  │      ├─→ Delivered (order received)
  │      └─→ Cancelled (if needed)
  │
  └─→ END: Order Management Complete
```

---

## 4. Admin Customer Management Flow

```
Admin Opens Customers Section
  │
  ├─→ Navigate to Customers page
  │      │
  │      └─→ Call GET /api/customers
  │
  ├─→ Server Retrieves All Customers from Database
  │      │
  │      └─→ Returns array of customers with:
  │          - Customer ID, Name, Email
  │          - Phone, Location
  │          - Total orders count
  │          - Total amount spent
  │
  ├─→ Display Customers List
  │      │
  │      └─→ Show customer cards with:
  │          - Customer avatar (first letter)
  │          - Name and email
  │          - Phone number
  │          - Total orders
  │          - Total spent amount
  │
  ├─→ Search Customers (Optional)
  │      │
  │      ├─→ Type in search box
  │      └─→ Filter customers by name or email
  │
  ├─→ View Customer Details (Click to Expand)
  │      │
  │      └─→ See:
  │          - Full contact information
  │          - Complete order history
  │          - Total purchase value
  │          - Account creation date
  │
  ├─→ Manage Customer (Optional)
  │      │
  │      ├─→ Edit customer details: PUT /api/customers/:id
  │      ├─→ Delete customer: DELETE /api/customers/:id
  │      └─→ View related orders: GET /api/customers/:id
  │
  └─→ END: Customer Management Complete
```

---

## 5. Order Placement Data Flow

```
FRONTEND (CheckoutPage.jsx)
│
├─→ User submits form with:
│   {
│     customer: "John Doe",
│     email: "john@example.com",
│     phone: "9876543210",
│     address: "123 Main St",
│     city: "Mumbai",
│     state: "Maharashtra",
│     pincode: "400001",
│     amount: 2499.82,
│     items_count: 2,
│     items_details: [
│       {product_id: 1, product_name: "Saree", price: 999, qty: 1},
│       {product_id: 2, product_name: "Shirt", price: 499, qty: 1}
│     ],
│     payment_method: "cod",
│     payment_status: "unpaid",
│     status: "pending"
│   }
│
├─→ POST /api/orders → BACKEND (server.js)
│
BACKEND (server.js)
│
├─→ Validation Check
│   └─→ All required fields present?
│
├─→ Customer Processing
│   ├─→ Find customer by email
│   ├─→ If exists: Update (orders++, spent+=amount)
│   └─→ If not exists: Create new customer
│
├─→ Order Creation
│   ├─→ Generate unique order ID (ORD-001, ORD-002, etc.)
│   ├─→ Create order record with all fields
│   ├─→ Store items_details as JSON
│   └─→ Set initial status: "pending"
│
├─→ Database Operations
│   │
│   CUSTOMERS TABLE:
│   └─→ INSERT or UPDATE row:
│       {id: 1, name: "John Doe", email: "john@example.com", 
│        phone: "9876543210", orders: 1, spent: 2499.82}
│
│   ORDERS TABLE:
│   └─→ INSERT new row:
│       {id: "ORD-001", customer: "John Doe", email: "john@example.com",
│        phone: "9876543210", address: "123 Main St", city: "Mumbai",
│        state: "Maharashtra", pincode: "400001", amount: 2499.82,
│        items_count: 2, items_details: [...], status: "pending",
│        payment_status: "unpaid", payment_method: "cod"}
│
├─→ Response to Frontend
│   {
│     success: true,
│     message: "Order created successfully",
│     data: {complete order object with id: "ORD-001"}
│   }
│
FRONTEND (CheckoutPage.jsx)
│
├─→ Receive response
├─→ Clear cart from localStorage
├─→ Show success message with order ID
└─→ Auto-redirect to homepage
```

---

## 6. API Endpoint Connection Map

```
PRODUCTS ENDPOINTS
├─ GET /api/products → List all products
├─ GET /api/products/:id → Get single product
├─ POST /api/products → Create product
├─ PUT /api/products/:id → Update product
└─ DELETE /api/products/:id → Delete product

ORDERS ENDPOINTS
├─ GET /api/orders → List all orders (Admin)
├─ GET /api/orders/:id → Get single order (Admin)
├─ POST /api/orders → Create order (Frontend → Server)
├─ PUT /api/orders/:id → Update order status (Admin)
└─ DELETE /api/orders/:id → Delete order (Admin)

CUSTOMERS ENDPOINTS
├─ GET /api/customers → List all customers (Admin)
├─ GET /api/customers/:id → Get customer with orders (Admin)
├─ POST /api/customers → Create customer (Server auto-create)
├─ PUT /api/customers/:id → Update customer (Admin)
└─ DELETE /api/customers/:id → Delete customer (Admin)
```

---

## 7. Database Relationships

```
CUSTOMERS
├─ id (PRIMARY KEY)
├─ name
├─ email (UNIQUE)
├─ phone
├─ location
├─ orders (count)
└─ spent (total amount)
       │
       │ One customer can have many orders
       │
       ↓
ORDERS
├─ id (PRIMARY KEY) - "ORD-001", "ORD-002", etc.
├─ customer (references CUSTOMERS)
├─ email
├─ phone
├─ address
├─ city, state, pincode
├─ amount
├─ items_count
├─ items_details (JSON array)
│  └─ Contains: product_id, product_name, price, qty, size, color
├─ status (pending, processing, shipped, delivered, cancelled)
├─ payment_status (unpaid, paid, refunded)
├─ payment_method (cod, upi, card)
└─ order_date, createdAt, updatedAt
       │
       │ Order contains references to PRODUCTS
       │
       ↓
PRODUCTS
├─ id (PRIMARY KEY)
├─ name
├─ category
├─ brand
├─ price
├─ mrp
├─ stock
├─ image
├─ description
├─ rating
├─ reviews
├─ discount
├─ colors (JSON array)
├─ sizeGuide (JSON object)
├─ tag
└─ createdAt, updatedAt
```

---

## 8. Frontend Component Tree

```
App
├── Navbar (navigation, cart count)
├── Routes
│   ├── HomePage
│   │   └── ProductList
│   │       └── ProductCard (with Add to Cart button)
│   ├── CartPage
│   │   ├── CartItems (list of added products)
│   │   ├── OrderSummary (subtotal, tax, shipping, total)
│   │   └── Checkout Button
│   ├── CheckoutPage
│   │   ├── CheckoutForm
│   │   │   ├── PersonalInfo (name, email, phone)
│   │   │   ├── ShippingAddress (address, city, state, pincode)
│   │   │   ├── PaymentMethod (radio buttons)
│   │   │   └── PlaceOrderButton
│   │   └── OrderSummary (cart items, total)
│   ├── AdminPanel
│   │   ├── AdminOrders
│   │   │   ├── OrdersList (GET /api/orders)
│   │   │   ├── OrderDetails (expandable)
│   │   │   └── UpdateStatus (PUT /api/orders/:id)
│   │   ├── AdminCustomers
│   │   │   ├── CustomersList (GET /api/customers)
│   │   │   ├── CustomerCard (name, email, orders, spent)
│   │   │   └── SearchCustomer
│   │   └── AdminProducts
│   │       ├── ProductsList (GET /api/products)
│   │       ├── CreateProduct (POST /api/products)
│   │       └── EditProduct (PUT /api/products/:id)
│   │
│   └── CartContext (global state for cart)
│       ├── addToCart(product)
│       ├── removeFromCart(id)
│       ├── getCartTotal()
│       └── getCartCount()
```

---

## 9. Error Handling Flow

```
User Action
│
├─→ Form Validation Error
│   └─→ Show field-specific error message
│       └─→ User corrects and resubmits
│
├─→ API Request Error
│   └─→ Network error or server down
│       └─→ Show error message: "Failed to place order"
│       └─→ User can retry
│
├─→ Database Error
│   └─→ Customer creation fails
│   └─→ Order creation fails
│       └─→ Show error: "Failed to create order"
│       └─→ Data is not saved
│
└─→ Success Response
    └─→ Order ID returned
        └─→ Cart cleared
        └─→ Success message shown
        └─→ User redirected
```

---

## 10. Real-Time Data Sync

```
When Admin Updates Order Status:
│
├─→ Click status button (pending → processing)
├─→ Send: PUT /api/orders/ORD-001 {status: "processing"}
├─→ Server updates database
├─→ Response: {success: true, data: {...}}
├─→ Frontend: Update order in state immediately
├─→ UI reflects new status without page refresh
└─→ Order appears updated in AdminOrders list

When New Order is Placed:
│
├─→ Frontend: POST /api/orders
├─→ Server: Creates order and customer
├─→ Database: Saves order and customer
├─→ Admin Page (if open): Can refresh to see new order
└─→ Or use polling/WebSocket for real-time updates (future)
```

---

## Summary

The complete system architecture ensures:
1. **Separation of Concerns**: Frontend, API, and Database are independent
2. **Real-Time Data Sync**: Admin dashboard shows actual data from database
3. **Data Persistence**: All orders and customers saved in MySQL
4. **Scalability**: Can handle multiple users and orders
5. **User-Friendly Flow**: Clear checkout process with validation
6. **Admin Control**: Full visibility and management of orders and customers

This architecture is production-ready and can be deployed with minimal changes!
