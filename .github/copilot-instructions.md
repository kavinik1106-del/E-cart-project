# AI Coding Agent Instructions for E-cart Project

## Project Architecture

This is a full-stack e-commerce platform with two separate backend services:

- **Main E-commerce Backend** (`backend/`): Node.js/Express with raw MySQL queries using mysql2 pool. Handles user auth, orders, contacts.
- **Admin Panel Backend** (`dress-page/server/`): Node.js/Express with Sequelize ORM. Manages admin operations for products, orders, customers.
- **Frontend** (`dress-page/src/`): React 19 with Vite, Tailwind CSS. Uses fetch API with custom `apiCall` helper.

Data flows: Frontend → API calls → Backend → MySQL database (separate DBs: `ecommerce` and `admin_panel_db`).

## Critical Workflows

### Development Setup
1. Start MySQL server manually
2. Create databases: `CREATE DATABASE ecommerce;` and `CREATE DATABASE admin_panel_db;`
3. Run SQL migrations from `database/*.sql` for main backend
4. For admin backend: Sequelize auto-syncs tables on startup
5. Start servers: `npm run dev` in `backend/` (port 5000), `npm start` in `dress-page/server/` (port 5000), `npm run dev` in `dress-page/` (port 5173)

### API Integration
- Use `src/config/apiConfig.js` for endpoints and `apiCall` helper
- Main backend endpoints: `/api/auth/*`, `/api/orders/*`, `/api/contact/*`
- Admin backend endpoints: `/api/products/*`, `/api/orders/*`, `/api/customers/*`
- Always check response.success and handle errors

### Database Operations
- Main backend: Raw SQL queries in model classes (e.g., `UserModel.js`)
- Admin backend: Sequelize models with standard CRUD methods
- Password hashing: Use crypto.createHash('sha256') (not bcrypt)

## Project-Specific Patterns

### Code Organization
- ES modules throughout (`import/export`)
- Controllers handle business logic, routes define endpoints
- Models encapsulate database operations
- Utils: validators for input checking, logger for console output

### Validation & Error Handling
- Use `utils/validators.js` functions for input validation
- Return consistent response format: `{ success: boolean, message?: string, data?: any, errors?: string[] }`
- Log errors with `utils/logger.js`

### Testing
- Manual API testing with HTTP requests in `test-*.js` files
- No automated test framework; run tests with `node test-api.js`

### Frontend Components
- Admin components in `src/admin/` extend `AdminLayout`
- Use React hooks for state management
- Tailwind for styling, Lucide React for icons

## Key Files to Reference
- `backend/server.js`: Main server setup and routes
- `dress-page/server/server.js`: Admin server with Sequelize
- `src/config/apiConfig.js`: API endpoints and fetch helper
- `backend/models/UserModel.js`: Raw SQL model example
- `dress-page/server/models/index.js`: Sequelize model initialization
- `database/*.sql`: Table schemas for main backend

Focus on maintaining separation between the two backend systems and using the appropriate database access pattern for each.