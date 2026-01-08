# PowerShell script to start all three servers
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Starting E-cart Servers" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kill any existing Node processes
Write-Host "Stopping existing servers..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force 2>$null

Start-Sleep -Seconds 2

# Start Backend Server (port 5000)
Write-Host "Starting Main Backend (port 5000)..." -ForegroundColor Green
$backendPath = Join-Path $PSScriptRoot "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; npm run dev" -PassThru

Start-Sleep -Seconds 3

# Start Admin Server (port 5001)
Write-Host "Starting Admin Backend (port 5001)..." -ForegroundColor Green
$adminPath = Join-Path $PSScriptRoot "dress-page\server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$adminPath'; node server.js" -PassThru

Start-Sleep -Seconds 3

# Start Frontend (port 5173)
Write-Host "Starting Frontend (port 5173)..." -ForegroundColor Green
$frontendPath = Join-Path $PSScriptRoot "dress-page"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev" -PassThru

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ All servers started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Servers running on:" -ForegroundColor Yellow
Write-Host "  • Main Backend: http://localhost:5000" -ForegroundColor Gray
Write-Host "  • Admin Backend: http://localhost:5001" -ForegroundColor Gray
Write-Host "  • Frontend: http://localhost:5173" -ForegroundColor Gray
Write-Host "  • Admin Dashboard: http://localhost:5173/admin" -ForegroundColor Gray
Write-Host ""
Write-Host "Waiting for servers to fully start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Opening browser..." -ForegroundColor Cyan
Start-Process "http://localhost:5173/admin"
