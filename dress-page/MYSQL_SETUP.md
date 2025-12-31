# MySQL Database Setup Guide

## Overview
This guide explains how to set up and configure the MySQL database for the admin panel application.

## Prerequisites
- MySQL Server (version 5.7 or higher)
- Node.js (v14 or higher)
- npm package manager

## Installation Steps

### 1. Install MySQL Server
**Windows:**
- Download from [MySQL official website](https://dev.mysql.com/downloads/mysql/)
- Run the installer and follow the setup wizard
- Default port: `3306`
- Default user: `root`
- Set password: `root` (or change as needed)

**macOS:**
```bash
brew install mysql
mysql.server start
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mysql-server
sudo service mysql start
```

### 2. Create Database
Open MySQL Command Line or MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS admin_panel_db;
```

### 3. Environment Configuration
The database connection uses environment variables defined in `.env` file:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=admin_panel_db
DB_USER=root
DB_PASSWORD=root
NODE_ENV=development
PORT=5000
```

**Important:** Never commit the `.env` file to version control! Use `.env.example` as a template.

### 4. Install Dependencies
```bash
cd server
npm install
```

This will install:
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `body-parser` - Request body parsing
- `mysql2` - MySQL database driver
- `sequelize` - ORM for database operations
- `dotenv` - Environment variable management

### 5. Start the Server
```bash
npm start          # Production mode
npm run dev        # Development mode with auto-reload
```

The server will:
1. Connect to MySQL database
2. Create tables if they don't exist (via Sequelize.sync)
3. Populate seed data if tables are empty
4. Start listening on `http://localhost:5000`

## Database Schema

### Products Table
```javascript
{
  id: Auto-increment Primary Key
  name: String(required)
  type: String
  price: Float (validated >= 0)
  stock: Integer (validated >= 0)
  image: String
  description: Text
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### Orders Table
```javascript
{
  id: String Primary Key (ORD001, ORD002, etc.)
  customer: String
  email: String (validated)
  amount: Float (validated >= 0)
  status: ENUM ['pending', 'processing', 'shipped', 'delivered']
  items: Integer (validated >= 1)
  address: String
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### Customers Table
```javascript
{
  id: Auto-increment Primary Key
  name: String
  email: String (unique, validated)
  phone: String
  location: String
  orders: Integer
  spent: Float
  joined: Date
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### Settings Table
```javascript
{
  id: Integer (defaults to 1 for single record)
  storeName: String
  storeEmail: String (validated)
  storePhone: String
  currency: String
  taxRate: Float
  notificationsEmail: Boolean
  notificationsOrders: Boolean
  notificationsLowStock: Boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## Database Initialization

On first run, the `initializeDatabase.js` script will:

1. **Create Tables**: Uses `Sequelize.sync()` to create all tables if they don't exist
2. **Seed Data**: Inserts sample data only if tables are empty
3. **Idempotent**: Running multiple times won't duplicate data

### Seed Data Includes:
- **3 Products**: Premium Casual Shirt, Formal Business Suit, Chino Pants
- **6 Orders**: Sample orders with various statuses
- **5 Customers**: Sample customer records with purchase history
- **1 Setting**: Default store configuration

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get specific customer

### Settings
- `GET /api/settings` - Get store settings
- `PUT /api/settings` - Update store settings

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Health Check
- `GET /api/health` - Check API status and database connection

## Troubleshooting

### Connection Error
**Error:** `ER_ACCESS_DENIED_FOR_USER`
**Solution:** Check MySQL credentials in `.env` file

### Database Not Found
**Error:** `ER_BAD_DB_NAME`
**Solution:** Create database using `CREATE DATABASE admin_panel_db;`

### Port Already in Use
**Error:** `Error: listen EADDRINUSE`
**Solution:** Change PORT in `.env` file or kill process using port 5000

### MySQL Server Not Running
**Error:** `connect ECONNREFUSED`
**Solution:** Start MySQL server using appropriate command for your OS

### Module Not Found
**Error:** `Cannot find module 'sequelize'`
**Solution:** Run `npm install` to install all dependencies

## Production Deployment

### Environment Variables
Create a `.env` file with production credentials:
```env
DB_HOST=prod-db-server
DB_PORT=3306
DB_NAME=admin_panel_prod
DB_USER=admin
DB_PASSWORD=strong_password_here
NODE_ENV=production
PORT=5000
```

### Database Backups
Regular backups are essential:
```bash
mysqldump -u root -p admin_panel_db > backup.sql
```

Restore from backup:
```bash
mysql -u root -p admin_panel_db < backup.sql
```

## Performance Tips

1. **Add Indexes**: Index frequently queried columns
2. **Connection Pooling**: Sequelize uses connection pools (max 5 by default)
3. **Query Optimization**: Use `.findByPk()` for single records, `.findAll()` for lists
4. **Pagination**: Implement LIMIT/OFFSET for large datasets

## Files Overview

- `server/config/database.js` - Database connection configuration
- `server/models/` - Sequelize model definitions (Product, Order, Customer, Setting)
- `server/utils/initializeDatabase.js` - Database initialization and seeding
- `server/.env` - Environment variables (local development)
- `server/.env.example` - Environment template (commit to git)
- `server/server.js` - Express server with API endpoints

## Next Steps

1. Install and start MySQL Server
2. Create the database
3. Update `.env` with correct credentials
4. Run `npm install` in server directory
5. Start the server with `npm start`
6. Access API at `http://localhost:5000`
7. Test endpoints using Postman or similar tool

## Support

For more information:
- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Express Documentation](https://expressjs.com/)
