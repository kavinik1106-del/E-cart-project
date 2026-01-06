# Product API Integration Guide

## Overview
This document explains how the admin products are now fully connected to the homepage with API endpoints and database integration.

## Architecture

### Database Layer
- **Admin Backend Database**: `admin_panel_db` (Sequelize ORM)
- **Product Table**: Contains all product information with the following fields:

```
id (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
name (STRING, REQUIRED)
type (STRING, REQUIRED)
category (STRING)
brand (STRING)
price (DECIMAL, REQUIRED)
mrp (DECIMAL)
stock (INTEGER)
image (STRING)
description (TEXT)
rating (FLOAT, DEFAULT: 4.5)
reviews (INTEGER, DEFAULT: 0)
discount (INTEGER, DEFAULT: 0)
colors (JSON, DEFAULT: ["Default"])
sizeGuide (JSON, DEFAULT: {S: {}, M: {}, L: {}, XL: {}})
tag (STRING, DEFAULT: "In Stock")
createdAt (TIMESTAMP)
updatedAt (TIMESTAMP)
```

### API Endpoints

#### Base URL
```
http://localhost:5001/api
```

#### Endpoints Available

1. **Get All Products** (PUBLIC - No Auth Required)
```
GET /api/products
Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "type": "category",
      "category": "Electronics",
      "brand": "Brand Name",
      "price": 999.99,
      "mrp": 1299.99,
      "stock": 50,
      "image": "/image.jpg",
      "description": "Product description",
      "rating": 4.5,
      "reviews": 234,
      "discount": 15,
      "colors": ["Red", "Blue", "Black"],
      "sizeGuide": {"S": {}, "M": {}, "L": {}, "XL": {}},
      "tag": "In Stock",
      "createdAt": "2025-01-05T10:30:00Z",
      "updatedAt": "2025-01-05T10:30:00Z"
    }
  ],
  "count": 1
}
```

2. **Get Single Product** (PUBLIC)
```
GET /api/products/:id
Response:
{
  "success": true,
  "data": {...}
}
```

3. **Create Product** (ADMIN ONLY)
```
POST /api/products
Headers:
  Authorization: Bearer <admin_token>
  Content-Type: application/json

Body:
{
  "name": "Product Name",
  "type": "category",
  "category": "Electronics",
  "brand": "Brand Name",
  "price": 999.99,
  "mrp": 1299.99,
  "stock": 50,
  "image": "/image.jpg",
  "description": "Product description",
  "rating": 4.5,
  "reviews": 234,
  "discount": 15,
  "colors": ["Red", "Blue"],
  "sizeGuide": {"S": {}, "M": {}, "L": {}, "XL": {}},
  "tag": "In Stock"
}

Response:
{
  "success": true,
  "data": {...created product}
}
```

4. **Update Product** (ADMIN ONLY)
```
PUT /api/products/:id
Headers:
  Authorization: Bearer <admin_token>
  Content-Type: application/json

Body: (same as POST, all fields optional)

Response:
{
  "success": true,
  "data": {...updated product}
}
```

5. **Delete Product** (ADMIN ONLY)
```
DELETE /api/products/:id
Headers:
  Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "data": {...deleted product}
}
```

## Frontend Integration

### HomePage.jsx
The homepage automatically fetches all products from the API on load:

```javascript
useEffect(() => {
  const fetchProducts = async () => {
    const response = await apiCall(API_ENDPOINTS.PRODUCTS);
    if (response.success && response.data) {
      // Transform and display products
    }
  };
  fetchProducts();
}, []);
```

### Product Transformation
Products fetched from API are automatically transformed with:
- Price validation
- MRP calculation
- Discount percentage calculation
- Default values for missing fields
- Size guides and color options

## Admin Panel Integration

### Admin Products Component
The admin panel can:
1. **View all products** in a table/grid
2. **Create new products** with all field details
3. **Edit products** with full field support
4. **Delete products** with confirmation
5. **Search and filter** products

## Database Synchronization

### Auto-Sync Features
- Sequelize automatically syncs table schema on server startup
- Tables are created if they don't exist
- Schema updates are applied with `alter: true` option

### Manual Database Setup (If Needed)

1. **Start MySQL Server**
```bash
# Windows
mysql -u root -p

# Create admin database
CREATE DATABASE admin_panel_db;
USE admin_panel_db;
```

2. **Server starts with auto-sync**
```bash
cd dress-page/server
npm install
npm start
```

## Testing the Integration

### 1. Test API Endpoints
```bash
# Get all products
curl http://localhost:5001/api/products

# Get single product
curl http://localhost:5001/api/products/1

# Create product (requires admin token)
curl -X POST http://localhost:5001/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Test Product",
    "type": "Electronics",
    "price": 999.99,
    "stock": 50
  }'
```

### 2. View on Homepage
- Start frontend: `npm run dev` in `dress-page/`
- Navigate to homepage
- Products should load from API
- Add to cart functionality works

### 3. Manage via Admin Panel
- Login to admin panel
- Navigate to Products section
- Create, edit, or delete products
- Changes reflect immediately on homepage

## API Configuration

### Frontend Configuration
File: `dress-page/src/config/apiConfig.js`

```javascript
export const ADMIN_API_BASE_URL = "http://localhost:5001/api";

export const API_ENDPOINTS = {
  PRODUCTS: `${ADMIN_API_BASE_URL}/products`,
  PRODUCT: (id) => `${ADMIN_API_BASE_URL}/products/${id}`,
  // ... other endpoints
};
```

### Backend Configuration
File: `dress-page/server/server.js`

```javascript
const PORT = process.env.PORT || 5001;
const ADMIN_DB = process.env.ADMIN_DB_NAME || 'admin_panel_db';
```

## Troubleshooting

### Products Not Loading on Homepage
1. Check browser console for API errors
2. Verify admin server is running on port 5001
3. Check database connection in terminal
4. Ensure products exist in database

### Cannot Create/Edit Products
1. Verify admin token is valid
2. Check all required fields are provided
3. Ensure price and stock are numeric
4. Check server logs for specific errors

### Database Errors
1. Verify MySQL server is running
2. Check database name matches config
3. Ensure user has proper permissions
4. Try dropping and recreating database

## Next Steps

1. **Add Product Images**
   - Implement image upload to admin panel
   - Store image URLs in database

2. **Add Product Variants**
   - Store multiple sizes/colors per product
   - Implement inventory tracking per variant

3. **Add Product Reviews**
   - Create reviews table
   - Link reviews to products
   - Display on product detail page

4. **Implement Filters**
   - Add category filters
   - Add brand filters
   - Add price range filters
   - Add rating filters

5. **Add Search**
   - Implement full-text search
   - Add autocomplete suggestions

## Summary

✅ Products are now:
- Stored in database with all details
- Fetched via API endpoints
- Displayed on homepage with real data
- Manageable via admin panel
- Connected to cart and order system
