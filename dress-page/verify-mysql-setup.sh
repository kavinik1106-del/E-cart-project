#!/bin/bash

# MySQL Integration Verification Script
# This script verifies that all database files are in place

echo "🔍 Verifying MySQL Integration..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Files to check
files=(
    "server/config/database.js"
    "server/models/index.js"
    "server/models/Product.js"
    "server/models/Order.js"
    "server/models/Customer.js"
    "server/models/Setting.js"
    "server/utils/initializeDatabase.js"
    "server/.env"
    "server/.env.example"
)

echo "📋 Checking required files..."
all_exist=true

for file in "${files[@]}"
do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file - MISSING"
        all_exist=false
    fi
done

echo ""
echo "📦 Checking package.json dependencies..."

if grep -q '"mysql2"' server/package.json; then
    echo -e "${GREEN}✓${NC} mysql2 - Found"
else
    echo -e "${RED}✗${NC} mysql2 - Not found"
    all_exist=false
fi

if grep -q '"sequelize"' server/package.json; then
    echo -e "${GREEN}✓${NC} sequelize - Found"
else
    echo -e "${RED}✗${NC} sequelize - Not found"
    all_exist=false
fi

if grep -q '"dotenv"' server/package.json; then
    echo -e "${GREEN}✓${NC} dotenv - Found"
else
    echo -e "${RED}✗${NC} dotenv - Not found"
    all_exist=false
fi

echo ""
echo "🔍 Checking server.js for Sequelize imports..."

if grep -q 'import sequelize from' server/server.js; then
    echo -e "${GREEN}✓${NC} Sequelize import found"
else
    echo -e "${RED}✗${NC} Sequelize import not found"
    all_exist=false
fi

if grep -q 'initializeDatabase' server/server.js; then
    echo -e "${GREEN}✓${NC} Database initialization found"
else
    echo -e "${RED}✗${NC} Database initialization not found"
    all_exist=false
fi

if grep -q 'Product.findAll' server/server.js; then
    echo -e "${GREEN}✓${NC} Sequelize queries found"
else
    echo -e "${RED}✗${NC} Sequelize queries not found"
    all_exist=false
fi

echo ""
echo "🔍 Checking environment configuration..."

if [ -f "server/.env" ]; then
    if grep -q "DB_HOST" server/.env && \
       grep -q "DB_NAME" server/.env && \
       grep -q "DB_USER" server/.env && \
       grep -q "DB_PASSWORD" server/.env; then
        echo -e "${GREEN}✓${NC} Environment variables configured"
    else
        echo -e "${YELLOW}⚠${NC} Some environment variables may be missing"
    fi
else
    echo -e "${RED}✗${NC} .env file not found"
    all_exist=false
fi

echo ""
echo "📊 Summary"
echo "==========="

if [ "$all_exist" = true ]; then
    echo -e "${GREEN}✅ All MySQL integration files are in place!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Install MySQL Server (if not already installed)"
    echo "2. Create database: CREATE DATABASE admin_panel_db;"
    echo "3. Update .env with your MySQL credentials if needed"
    echo "4. Run: cd server && npm install"
    echo "5. Start server: npm start"
    exit 0
else
    echo -e "${RED}❌ Some files are missing!${NC}"
    echo ""
    echo "Please check the files listed above with ✗"
    exit 1
fi
