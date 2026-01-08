@echo off
echo Stopping existing servers...
taskkill /F /IM node.exe >nul 2>&1

timeout /t 2 /nobreak

echo.
echo Starting Main Backend (port 5000)...
start "Main Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak

echo Starting Admin Backend (port 5001)...
start "Admin Backend" cmd /k "cd dress-page\server && node server.js"

timeout /t 3 /nobreak

echo Starting Frontend (port 5173)...
start "Frontend" cmd /k "cd dress-page && npm run dev"

timeout /t 5 /nobreak

echo.
echo Servers started! Opening admin panel...
start http://localhost:5173/admin

echo.
echo Servers running on:
echo   - Main Backend: http://localhost:5000
echo   - Admin Backend: http://localhost:5001
echo   - Frontend: http://localhost:5173
echo   - Admin Panel: http://localhost:5173/admin
