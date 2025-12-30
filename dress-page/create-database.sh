#!/bin/bash

# Database Creation Script for Admin Panel
# This script creates the MySQL database and initializes it

echo "================================"
echo "🗄️  Admin Panel Database Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Database credentials (modify as needed)
DB_USER="${1:-root}"
DB_PASSWORD="${2:-root}"
DB_HOST="${3:-localhost}"
DB_NAME="admin_panel_db"

echo "📋 Configuration:"
echo "  Host: $DB_HOST"
echo "  User: $DB_USER"
echo "  Database: $DB_NAME"
echo ""

# Create database
echo "🔄 Creating database..."
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database created successfully${NC}"
else
    echo -e "${RED}❌ Failed to create database${NC}"
    echo "Make sure MySQL is running and credentials are correct"
    exit 1
fi

# Verify database was created
echo ""
echo "🔍 Verifying database..."
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "SHOW DATABASES LIKE '$DB_NAME';" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database verified${NC}"
else
    echo -e "${RED}❌ Verification failed${NC}"
    exit 1
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ Database setup complete!${NC}"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Ensure .env file has correct database credentials"
echo "2. Run: cd server && npm install"
echo "3. Start the server: npm start"
echo ""
