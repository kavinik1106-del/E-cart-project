@echo off
REM Database Creation Script for Admin Panel (Windows)
REM This script creates the MySQL database

color 0A
cls

echo ================================
echo.    Admin Panel Database Setup
echo ================================
echo.

REM Database credentials (modify as needed)
set DB_USER=root
set DB_PASSWORD=root
set DB_HOST=localhost
set DB_NAME=admin_panel_db
set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe

REM Alternative paths if above doesn't exist
if not exist "%MYSQL_PATH%" (
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe
)

if not exist "%MYSQL_PATH%" (
    set MYSQL_PATH=C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe
)

REM Check if MySQL is found
if not exist "%MYSQL_PATH%" (
    color 0C
    echo.
    echo [ERROR] MySQL not found!
    echo.
    echo Please install MySQL Server from: https://dev.mysql.com/downloads/mysql/
    echo.
    echo After installation, run this script again.
    echo.
    pause
    exit /b 1
)

echo Configuration:
echo   Host: %DB_HOST%
echo   User: %DB_USER%
echo   Database: %DB_NAME%
echo.

REM Create database
echo Creating database...
"%MYSQL_PATH%" -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME%;"

if %ERRORLEVEL% EQU 0 (
    color 0A
    echo.
    echo [SUCCESS] Database created successfully!
) else (
    color 0C
    echo.
    echo [ERROR] Failed to create database
    echo.
    echo Make sure:
    echo   1. MySQL Server is installed
    echo   2. MySQL Server is running
    echo   3. Credentials are correct (user: %DB_USER%, password: %DB_PASSWORD%)
    echo.
    pause
    exit /b 1
)

REM Verify database
echo.
echo Verifying database...
"%MYSQL_PATH%" -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% -e "SHOW DATABASES LIKE '%DB_NAME%';"

if %ERRORLEVEL% EQU 0 (
    color 0A
    echo.
    echo [SUCCESS] Database verified!
    echo.
    echo ================================
    echo    Database Setup Complete!
    echo ================================
    echo.
    echo Next steps:
    echo   1. Open Command Prompt
    echo   2. cd server
    echo   3. npm install
    echo   4. npm start
    echo.
    pause
) else (
    color 0C
    echo.
    echo [ERROR] Database verification failed
    pause
    exit /b 1
)
