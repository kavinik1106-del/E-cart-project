@echo off
REM Quick Start Script for E-cart Project

echo.
echo ========================================
echo   E-Cart Project - Complete Setup
echo ========================================
echo.

REM Check if Node is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    exit /b 1
)

echo Step 1: Installing dependencies...
echo.

REM Install main backend dependencies
echo Installing main backend...
cd backend
call npm install
cd ..
echo ✓ Main backend ready

REM Install admin backend dependencies
echo.
echo Installing admin backend...
cd dress-page\server
call npm install
cd ..\..
echo ✓ Admin backend ready

REM Install frontend dependencies
echo.
echo Installing frontend...
cd dress-page
call npm install
cd ..
echo ✓ Frontend ready

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Start MySQL Server:
echo    - Open MySQL Command Line Client
echo    - Or run: mysql -u root -p
echo    - Create database: CREATE DATABASE admin_panel_db;
echo.
echo 2. In Terminal 1 - Start Admin Backend:
echo    cd dress-page\server
echo    npm start
echo.
echo 3. In Terminal 2 - Start Frontend:
echo    cd dress-page
echo    npm run dev
echo.
echo 4. In Terminal 3 (Optional) - Start Main Backend:
echo    cd backend
echo    npm run dev
echo.
echo 5. Test API:
echo    node test-product-api.js
echo.
echo 6. Open Browser:
echo    http://localhost:5173
echo.
pause
