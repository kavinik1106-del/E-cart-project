# Quick Start: Test Complete E-Cart System

## Prerequisites
- Node.js and npm installed
- MySQL server running
- Two databases created: `admin_panel_db` and `ecommerce`

## Step 1: Start the Backend Server

```bash
cd dress-page/server
npm install
npm start
```

Expected output:
```
Server running on port 5001
Connected to MySQL database
```

## Step 2: Start the Frontend

```bash
cd dress-page
npm install
npm run dev
```

Expected output:
```
VITE v... ready in ... ms
Local: http://localhost:5173/
```

## Step 3: Admin Login

1. Open admin panel at: `http://localhost:5173/admin`
2. Login with admin credentials (if configured)

## Step 4: Create a Test Product

1. Go to **Admin → Products**
2. Click **Add New Product**
3. Fill in details:
   - **Name**: Test T-Shirt
   - **Category**: Men
   - **Brand**: TestBrand
   - **Price**: 499
   - **MRP**: 699
   - **Stock**: 100
   - **Description**: A test product
4. Click **Save Product**

Expected: Product appears in product list with auto-generated ID

## Step 5: View Product on Homepage

1. Open homepage: `http://localhost:5173/`
2. Scroll through products
3. Find your test product
4. See product card with:
   - Product image
   - Price: ₹499
   - Discount badge (if applicable)
   - "Add to Cart" button

## Step 6: Add Product to Cart

1. Click **"Add to Cart"** on the test product
2. Button should change to **"Added to Cart"** (with secondary color)
3. Cart count should increase in navbar

## Step 7: View Cart

1. Click **Cart** in navbar (or go to `/cart`)
2. See cart items:
   - Product name and image
   - Price: ₹499
   - Quantity controls
   - Size and color selectors
3. See order summary:
   - **Subtotal**: ₹499
   - **Tax (18%)**: ₹89.82
   - **Shipping**: Free (for orders > ₹500)
   - **Total**: ₹588.82
4. Click **"Proceed to Checkout"**

## Step 8: Checkout & Place Order

1. Fill checkout form:
   ```
   First Name: John
   Last Name: Doe
   Email: john@example.com
   Phone: 9876543210
   Address: 123 Main Street
   City: Mumbai
   State: Maharashtra
   Pincode: 400001
   Payment Method: Cash on Delivery
   ```
2. Review order summary on right side
3. Click **"Place Order - ₹588.82"**

Expected behavior:
- Loading spinner appears
- Order is created in database
- Cart is cleared
- Success message: "Order placed successfully! 🎉"
- Order number displayed (e.g., "ORD-1735432523145")
- Auto-redirect to homepage after 2 seconds

## Step 9: View Order in Admin Dashboard

1. Go to Admin → Orders: `http://localhost:5173/admin/orders`
2. Should see your placed order with:
   - **Order ID**: (auto-generated)
   - **Customer**: John Doe
   - **Email**: john@example.com
   - **Amount**: ₹588.82
   - **Status**: Pending
   - **Payment Status**: Unpaid (for COD)
3. Click on order to expand and see:
   - Shipping address details
   - Item details (product name, price, quantity)
   - Option to update status

## Step 10: Update Order Status

1. In Admin → Orders
2. Click on your order to expand
3. In "Update Status" section, click:
   - **"Processing"** → Order moves to processing
   - **"Shipped"** → Order is shipped
   - **"Delivered"** → Order is delivered
4. Status updates immediately in the list

## Step 11: View Customers in Admin

1. Go to Admin → Customers: `http://localhost:5173/admin/customers`
2. Should see customer:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Phone**: 9876543210
   - **Orders**: 1
   - **Spent**: ₹588.82

## Complete Workflow Summary

```
Homepage
  ↓
Add Product to Cart
  ↓
View Cart
  ↓
Checkout & Fill Form
  ↓
Place Order
  ↓
Order Confirmation (with Order ID)
  ↓
Admin Dashboard
  ↓
View Order in Orders List
  ↓
Update Order Status
  ↓
View Customer in Customers List
```

## API Testing (Optional)

You can also test APIs directly:

### Get All Products
```bash
curl http://localhost:5001/api/products
```

### Get All Orders
```bash
curl http://localhost:5001/api/orders
```

### Get All Customers
```bash
curl http://localhost:5001/api/customers
```

### Place Order (Manual)
```bash
curl -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "amount": 999,
    "items_count": 1,
    "items_details": [
      {
        "product_id": 1,
        "product_name": "Test Product",
        "price": 999,
        "quantity": 1
      }
    ],
    "payment_method": "cod",
    "payment_status": "unpaid",
    "status": "pending"
  }'
```

## Troubleshooting

### Backend not connecting to database
```bash
# Check MySQL is running and database exists
mysql -u root -p
SHOW DATABASES;
USE admin_panel_db;
SHOW TABLES;
```

### Products not showing on frontend
1. Check that POST `/api/products` was successful
2. Verify database has products table
3. Check browser console for API errors

### Order not saving
1. Check `/api/orders` POST endpoint is working
2. Verify MySQL orders table exists
3. Check server logs for detailed error messages

### Admin login not working
1. Check admin credentials
2. Verify authentication is configured
3. Check localStorage for adminToken

## File Structure
```
E-cart-project/
├── dress-page/
│   ├── server/                 # Backend (port 5001)
│   │   ├── models/             # Database models
│   │   │   ├── Order.js
│   │   │   ├── Customer.js
│   │   │   └── Product.js
│   │   ├── server.js           # Main API server
│   │   └── package.json
│   ├── src/
│   │   ├── HomePage.jsx        # Product listing
│   │   ├── CartPage.jsx        # Shopping cart
│   │   ├── CheckoutPage.jsx    # Order placement
│   │   ├── admin/
│   │   │   ├── AdminOrders.jsx # Order management
│   │   │   ├── AdminCustomers.jsx # Customer management
│   │   │   └── AdminProducts.jsx  # Product management
│   │   └── config/
│   │       └── apiConfig.js    # API endpoints
│   ├── package.json
│   └── vite.config.js
└── database/                   # SQL migration files
    ├── products.sql
    ├── orders.sql
    └── customers.sql
```

## Success Indicators

✅ **System is working when:**
1. Products can be created in admin and appear on homepage
2. Products can be added to cart
3. Cart persists across page refreshes (localStorage)
4. Checkout form accepts and validates all fields
5. Order is created in database with all details
6. Order appears in Admin Dashboard
7. Order status can be updated
8. Customer is created/updated in database
9. Customer appears in Admin Customers list
10. All data flows correctly through API

## Next Testing Steps

- Test with multiple products in cart
- Test different payment methods
- Test order status updates
- Test customer purchase history
- Test product inventory updates
- Test real-time updates (if implemented)

Good luck! 🚀
