# 🚀 HOW TO RUN BACKEND & FRONTEND

## Quick Start (2 Terminal Windows)

### Terminal 1: Start Backend
```powershell
cd "c:\Users\kavin\OneDrive\Desktop\web-cls2\dress-page\server"
node server-fallback.js
```

**Expected Output:**
```
🚀 ========================================
✅ API Server Running Successfully!
========================================
📍 Server: http://localhost:5000
🔗 Health Check: http://localhost:5000/api/health
...
```

### Terminal 2: Start Frontend
```powershell
cd "c:\Users\kavin\OneDrive\Desktop\web-cls2\dress-page"
npm run dev
```

**Expected Output:**
```
  VITE v... dev server running at:
  ➜  Local:   http://localhost:5173/
```

---

## ✅ What Each Port Does

| Port | Service | URL |
|------|---------|-----|
| **5000** | Backend API | http://localhost:5000/api/* |
| **5173** | Frontend (React) | http://localhost:5173/ |

---

## 🧪 Test Backend is Working

Open **PowerShell** and run:
```powershell
curl http://localhost:5000/api/health
```

Should see:
```json
{"status":"ok","message":"API is running...","mode":"fallback"}
```

---

## 🔗 Frontend Will Connect To

The admin panel will automatically call:
```
http://localhost:5000/api/products
http://localhost:5000/api/orders
http://localhost:5000/api/customers
http://localhost:5000/api/settings
http://localhost:5000/api/dashboard/stats
```

---

## 📊 Complete Workflow

```
1. Open Terminal 1 → Start Backend (port 5000)
                  ↓
2. Open Terminal 2 → Start Frontend (port 5173)
                  ↓
3. Go to http://localhost:5173 in browser
                  ↓
4. Admin panel loads & connects to API
                  ↓
5. All features work! (Products, Orders, Customers, etc.)
```

---

## 🛑 Stopping Everything

Press `Ctrl + C` in each terminal to stop

---

## 📝 Server Commands Reference

From `server` folder:

```bash
# Start server (MAIN COMMAND)
node server-fallback.js

# Test all API endpoints
node test-endpoints.js

# Install dependencies (if needed)
npm install
```

---

## ⚙️ Configuration

Edit `server/.env` to change settings:
```env
PORT=5000                    # API port
NODE_ENV=development         # Mode
```

---

## 🎯 Verify Complete Setup

### Backend Working? ✅
```powershell
# Should return JSON
curl http://localhost:5000/api/health
```

### Frontend Running? ✅
```
Open browser → http://localhost:5173
Should see admin panel
```

### Data Flowing? ✅
```
Open browser developer tools (F12)
Go to Network tab
Click on Products in admin panel
Should see request to http://localhost:5000/api/products
Response: List of products
```

---

## 📱 Admin Panel Features (Now Connected!)

When both are running:

✅ **View Products** - Fetches from `http://localhost:5000/api/products`  
✅ **View Orders** - Fetches from `http://localhost:5000/api/orders`  
✅ **View Customers** - Fetches from `http://localhost:5000/api/customers`  
✅ **View Settings** - Fetches from `http://localhost:5000/api/settings`  
✅ **Dashboard Stats** - Fetches from `http://localhost:5000/api/dashboard/stats`  
✅ **Add/Edit/Delete** - Updates data in JSON files  

---

## 🆘 Common Issues

### "Connection refused" when loading admin panel
→ Make sure `node server-fallback.js` is running in Terminal 1

### "Port 5173 in use"
→ Change frontend port: `npm run dev -- --port 3001`

### "Port 5000 in use"
→ Kill node: `Get-Process node | Stop-Process -Force`

### Data not showing in admin panel
→ Check browser console (F12) for API errors
→ Verify backend is running with `curl http://localhost:5000/api/health`

---

## 💡 Tips

1. **Always start Backend first** (Terminal 1)
2. **Then start Frontend** (Terminal 2)
3. **Both terminals should stay open** while you work
4. **Data saves automatically** in `server/data/` JSON files
5. **Test endpoints** anytime with: `node test-endpoints.js`

---

## 📚 File Structure

```
dress-page/
├── server/
│   ├── server-fallback.js          ← Backend API
│   ├── test-endpoints.js           ← API Tests
│   ├── data/
│   │   ├── products.json           ← Products data
│   │   ├── orders.json             ← Orders data
│   │   ├── customers.json          ← Customers data
│   │   └── settings.json           ← Settings data
│   └── package.json
├── src/
│   ├── App.jsx                     ← Admin Panel
│   ├── Navbar.jsx
│   ├── admin/
│   │   ├── AdminPanel.jsx
│   │   ├── AdminProducts.jsx
│   │   └── ...
│   └── ...
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎉 You're All Set!

Backend and API are **fully connected and ready to use**.

Just follow the Quick Start section above and everything will work! 🚀

---

**Ready to Run:**
- ✅ Backend API (port 5000)
- ✅ Frontend Admin Panel (port 5173)
- ✅ All CRUD operations
- ✅ Data persistence
- ✅ Sample data included

**Start anytime with:**
```
Terminal 1: node server-fallback.js
Terminal 2: npm run dev
```

**Done!** 🎊
