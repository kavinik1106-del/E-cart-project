# API Request/Response Reference Guide

## Base URL
```
http://localhost:5001/api
```

All endpoints return JSON responses with the following format:
```json
{
  "success": true/false,
  "message": "Description of response",
  "data": { /* response data */ }
}
```

---

## PRODUCTS API

### GET /api/products
**Get all products**

Request:
```bash
curl http://localhost:5001/api/products
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Designer Saree",
      "type": "Saree",
      "category": "Women",
      "brand": "LuxeBrand",
      "price": 999,
      "mrp": 1499,
      "stock": 50,
      "image": "saree.jpg",
      "description": "Beautiful designer saree",
      "rating": 4.5,
      "reviews": 12,
      "discount": 33,
      "colors": ["Red", "Blue", "Green"],
      "sizeGuide": { "S": "Small", "M": "Medium", "L": "Large" },
      "tag": "New",
      "createdAt": "2024-12-28T10:30:00Z",
      "updatedAt": "2024-12-28T10:30:00Z"
    }
  ]
}
```

---

### GET /api/products/:id
**Get single product**

Request:
```bash
curl http://localhost:5001/api/products/1
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": 1,
    "name": "Designer Saree",
    "type": "Saree",
    "category": "Women",
    "brand": "LuxeBrand",
    "price": 999,
    "mrp": 1499,
    "stock": 50,
    "image": "saree.jpg",
    "description": "Beautiful designer saree",
    "rating": 4.5,
    "reviews": 12,
    "discount": 33,
    "colors": ["Red", "Blue", "Green"],
    "sizeGuide": { "S": "Small", "M": "Medium", "L": "Large" },
    "tag": "New",
    "createdAt": "2024-12-28T10:30:00Z",
    "updatedAt": "2024-12-28T10:30:00Z"
  }
}
```

---

### POST /api/products
**Create new product**

Request:
```bash
curl -X POST http://localhost:5001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Casual Shirt",
    "type": "Shirt",
    "category": "Men",
    "brand": "CasualWear",
    "price": 499,
    "mrp": 699,
    "stock": 100,
    "image": "shirt.jpg",
    "description": "Comfortable casual shirt",
    "rating": 4.0,
    "reviews": 8,
    "discount": 28,
    "colors": ["Blue", "White"],
    "sizeGuide": { "S": "Small", "M": "Medium", "L": "Large", "XL": "Extra Large" },
    "tag": "Sale"
  }'
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 2,
    "name": "Casual Shirt",
    "type": "Shirt",
    "category": "Men",
    "brand": "CasualWear",
    "price": 499,
    "mrp": 699,
    "stock": 100,
    "image": "shirt.jpg",
    "description": "Comfortable casual shirt",
    "rating": 4.0,
    "reviews": 8,
    "discount": 28,
    "colors": ["Blue", "White"],
    "sizeGuide": { "S": "Small", "M": "Medium", "L": "Large", "XL": "Extra Large" },
    "tag": "Sale",
    "createdAt": "2024-12-29T10:30:00Z",
    "updatedAt": "2024-12-29T10:30:00Z"
  }
}
```

---

### PUT /api/products/:id
**Update product**

Request:
```bash
curl -X PUT http://localhost:5001/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 899,
    "stock": 40,
    "discount": 40
  }'
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "price": 899,
    "stock": 40,
    "discount": 40
  }
}
```

---

### DELETE /api/products/:id
**Delete product**

Request:
```bash
curl -X DELETE http://localhost:5001/api/products/1
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": { "id": 1 }
}
```

---

## ORDERS API

### GET /api/orders
**Get all orders**

Request:
```bash
curl http://localhost:5001/api/orders
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "id": "ORD-1735432523145",
      "customer": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "address": "123 Main Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "amount": 2499.82,
      "items_count": 2,
      "items_details": [
        {
          "product_id": 1,
          "product_name": "Designer Saree",
          "price": 999,
          "quantity": 1,
          "size": "S",
          "color": "Red",
          "image": "saree.jpg"
        },
        {
          "product_id": 2,
          "product_name": "Casual Shirt",
          "price": 499,
          "quantity": 1,
          "size": "M",
          "color": "Blue",
          "image": "shirt.jpg"
        }
      ],
      "status": "pending",
      "payment_status": "unpaid",
      "payment_method": "cod",
      "notes": "Tax: ₹500, Shipping: ₹99",
      "order_date": "2024-12-29T10:30:00Z",
      "createdAt": "2024-12-29T10:30:00Z",
      "updatedAt": "2024-12-29T10:30:00Z"
    }
  ]
}
```

---

### GET /api/orders/:id
**Get single order**

Request:
```bash
curl http://localhost:5001/api/orders/ORD-1735432523145
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Order retrieved successfully",
  "data": {
    "id": "ORD-1735432523145",
    "customer": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "amount": 2499.82,
    "items_count": 2,
    "items_details": [
      {
        "product_id": 1,
        "product_name": "Designer Saree",
        "price": 999,
        "quantity": 1,
        "size": "S",
        "color": "Red",
        "image": "saree.jpg"
      }
    ],
    "status": "pending",
    "payment_status": "unpaid",
    "payment_method": "cod",
    "notes": "Tax: ₹500, Shipping: ₹99",
    "order_date": "2024-12-29T10:30:00Z",
    "createdAt": "2024-12-29T10:30:00Z",
    "updatedAt": "2024-12-29T10:30:00Z"
  }
}
```

---

### POST /api/orders
**Create new order** (from checkout form)

Request:
```bash
curl -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "amount": 2499.82,
    "items_count": 2,
    "items_details": [
      {
        "product_id": 1,
        "product_name": "Designer Saree",
        "price": 999,
        "quantity": 1,
        "size": "S",
        "color": "Red",
        "image": "saree.jpg"
      },
      {
        "product_id": 2,
        "product_name": "Casual Shirt",
        "price": 499,
        "quantity": 1,
        "size": "M",
        "color": "Blue",
        "image": "shirt.jpg"
      }
    ],
    "status": "pending",
    "payment_status": "unpaid",
    "payment_method": "cod",
    "notes": "Tax: ₹500, Shipping: ₹99"
  }'
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "ORD-1735432523145",
    "customer": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "amount": 2499.82,
    "items_count": 2,
    "items_details": [...],
    "status": "pending",
    "payment_status": "unpaid",
    "payment_method": "cod",
    "notes": "Tax: ₹500, Shipping: ₹99",
    "order_date": "2024-12-29T10:30:00Z",
    "createdAt": "2024-12-29T10:30:00Z",
    "updatedAt": "2024-12-29T10:30:00Z"
  }
}
```

**Server Actions:**
- Auto-creates customer if not exists
- Creates order with all details
- Stores items_details as JSON
- Generates unique order ID (ORD-{timestamp})

---

### PUT /api/orders/:id
**Update order status/details**

Request:
```bash
curl -X PUT http://localhost:5001/api/orders/ORD-1735432523145 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "processing",
    "payment_status": "paid"
  }'
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Order updated successfully",
  "data": {
    "id": "ORD-1735432523145",
    "status": "processing",
    "payment_status": "paid"
  }
}
```

---

### DELETE /api/orders/:id
**Delete order**

Request:
```bash
curl -X DELETE http://localhost:5001/api/orders/ORD-1735432523145
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Order deleted successfully",
  "data": { "id": "ORD-1735432523145" }
}
```

---

## CUSTOMERS API

### GET /api/customers
**Get all customers**

Request:
```bash
curl http://localhost:5001/api/customers
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Customers retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "location": "Mumbai, Maharashtra",
      "orders": 2,
      "spent": 4999.64,
      "createdAt": "2024-12-29T10:30:00Z",
      "updatedAt": "2024-12-29T10:30:00Z"
    }
  ]
}
```

---

### GET /api/customers/:id
**Get customer with orders**

Request:
```bash
curl http://localhost:5001/api/customers/1
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Customer retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "location": "Mumbai, Maharashtra",
    "orders": 2,
    "spent": 4999.64,
    "createdAt": "2024-12-29T10:30:00Z",
    "updatedAt": "2024-12-29T10:30:00Z",
    "orders_details": [
      {
        "id": "ORD-1735432523145",
        "amount": 2499.82,
        "status": "delivered",
        "order_date": "2024-12-29T10:30:00Z"
      }
    ]
  }
}
```

---

### POST /api/customers
**Create new customer**

Request:
```bash
curl -X POST http://localhost:5001/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "9876543211",
    "location": "Delhi, Delhi"
  }'
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Customer created successfully",
  "data": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "9876543211",
    "location": "Delhi, Delhi",
    "orders": 0,
    "spent": 0,
    "createdAt": "2024-12-29T10:30:00Z",
    "updatedAt": "2024-12-29T10:30:00Z"
  }
}
```

---

### PUT /api/customers/:id
**Update customer**

Request:
```bash
curl -X PUT http://localhost:5001/api/customers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9999999999",
    "location": "Bangalore, Karnataka"
  }'
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Customer updated successfully",
  "data": {
    "id": 1,
    "phone": "9999999999",
    "location": "Bangalore, Karnataka"
  }
}
```

---

### DELETE /api/customers/:id
**Delete customer**

Request:
```bash
curl -X DELETE http://localhost:5001/api/customers/1
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Customer deleted successfully",
  "data": { "id": 1 }
}
```

---

## STATUS CODES

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## ENUM VALUES

### Order Status
```
'pending'      - Order placed, waiting confirmation
'processing'   - Order being prepared
'shipped'      - Order shipped
'delivered'    - Order delivered
'cancelled'    - Order cancelled
```

### Payment Status
```
'unpaid'   - Payment not yet made
'paid'     - Payment completed
'refunded' - Payment refunded
```

### Payment Method
```
'cod'   - Cash on Delivery
'upi'   - UPI Payment
'card'  - Credit/Debit Card
```

---

## FIELD VALIDATION

### Required Fields for POST /api/orders
- `customer` - String, 1-255 characters
- `email` - Valid email format
- `phone` - 10 digits
- `address` - String, 1-500 characters
- `city` - String, 1-100 characters
- `pincode` - 6 digits
- `amount` - Positive decimal
- `items_count` - Positive integer
- `payment_method` - One of: cod, upi, card

### Optional Fields
- `state` - String
- `phone` - String
- `notes` - String
- `payment_status` - One of: unpaid, paid, refunded
- `status` - One of: pending, processing, shipped, delivered, cancelled

---

## Error Response Example

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Email is required",
    "Phone must be 10 digits"
  ]
}
```

---

## Common API Errors

### Missing Required Field
```json
{
  "success": false,
  "message": "Customer email is required"
}
```

### Invalid Email
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

### Order Not Found
```json
{
  "success": false,
  "message": "Order not found"
}
```

### Database Error
```json
{
  "success": false,
  "message": "Failed to create order. Please try again."
}
```

---

## Testing Tips

1. **Use Postman** for easier API testing
2. **Check response status codes** to verify success
3. **Validate JSON format** before sending
4. **Look at error messages** for debugging
5. **Check database** to verify data persistence
6. **Monitor network tab** in browser for actual requests

Good luck with your API integration! 🚀
