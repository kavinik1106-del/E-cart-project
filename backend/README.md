# E-Commerce Backend API

A Node.js/Express backend server for the e-commerce platform.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup
- Make sure MySQL is running on your system
- Create a database named `ecommerce`:
  ```sql
  CREATE DATABASE ecommerce;
  ```
- Run the SQL migrations from `database/contacts.sql` to create tables

### 3. Configure Environment
Copy `.env.example` to `.env` and update with your database credentials:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce
```

### 4. Run the Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health`
  - Returns server status

### Contact Management
- **POST** `/api/contact`
  - Submit a contact form
  - Body: `{ fullName, email, mobileNumber, orderId, issueType, message }`

- **GET** `/api/contacts`
  - Get all contacts (Admin)

- **GET** `/api/contacts/:id`
  - Get a specific contact

- **PUT** `/api/contacts/:id`
  - Update contact status
  - Body: `{ status: 'pending' | 'in-progress' | 'resolved' }`

## Database Schema

The `contacts` table is created from `database/contacts.sql` with fields:
- id (Primary Key)
- full_name
- email
- mobile_number
- order_id
- issue_type
- message
- status (pending, in-progress, resolved)
- created_at
- updated_at
