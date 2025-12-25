# 🚀 Quick Start - Admin Panel with API

## 📋 Prerequisites

- Node.js installed
- Both terminals open in the project directory

---

## ⚡ Quick Start (2 Commands)

### Step 1: Start API Server (Terminal 1)
```bash
cd server
node server.js
```

### Step 2: Start Frontend (Terminal 2)
```bash
npm run dev
```

### Step 3: Login to Admin
```
URL: http://localhost:5173/admin/login
Username: admin
Password: admin123
```

---

## 📱 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Admin Panel | http://localhost:5173/admin | Main interface |
| Login Page | http://localhost:5173/admin/login | Authentication |
| API Server | http://localhost:5000/api | Backend |
| API Health | http://localhost:5000/api/health | Check server |

---

## 🎯 Admin Panel Modules

After logging in, you can access:

1. **Dashboard** (`/admin`)
   - View statistics
   - Recent orders
   - Top products
   - Sales chart

2. **Products** (`/admin/products`)
   - View products
   - Add product
   - Edit product
   - Delete product
   - Search & filter

3. **Orders** (`/admin/orders`)
   - View all orders
   - Filter by status
   - Update status
   - Expand details

4. **Customers** (`/admin/customers`)
   - View customer profiles
   - Customer statistics
   - Search customers

5. **Settings** (`/admin/settings`)
   - Store information
   - Notifications
   - Security
   - Preferences

---

## 🔧 Common Tasks

### Test Product CRUD
1. Go to `/admin/products`
2. Click "Add Product"
3. Fill form → Save
4. Edit product
5. Delete product

### Track Orders
1. Go to `/admin/orders`
2. Click filters (Pending, Processing, etc.)
3. Click order to expand details
4. Update status

### View Customers
1. Go to `/admin/customers`
2. Search by name or email
3. View customer cards
4. See spending stats

### Configure Store
1. Go to `/admin/settings`
2. Update store information
3. Toggle notifications
4. Save changes

---

## 📊 API Endpoints Cheat Sheet

```bash
# Test API
curl http://localhost:5000/api/health

# Products
curl http://localhost:5000/api/products          # GET all
curl http://localhost:5000/api/products/1        # GET one
curl -X POST http://localhost:5000/api/products  # POST new
curl -X PUT http://localhost:5000/api/products/1 # UPDATE
curl -X DELETE http://localhost:5000/api/products/1 # DELETE

# Orders
curl http://localhost:5000/api/orders            # GET all
curl -X PUT http://localhost:5000/api/orders/ORD001 # UPDATE status

# Customers
curl http://localhost:5000/api/customers         # GET all

# Settings
curl http://localhost:5000/api/settings          # GET settings
curl -X PUT http://localhost:5000/api/settings   # UPDATE

# Dashboard
curl http://localhost:5000/api/dashboard/stats   # GET stats
```

---

## 🛠️ Development Tips

### Watch for Errors
- **Frontend**: Check browser console (F12)
- **Backend**: Watch terminal output
- **Network**: DevTools → Network tab

### Make Changes
```bash
# Frontend changes auto-reload
# Just edit and save React components

# Backend changes need restart
# Stop server (Ctrl+C) and run: node server.js
```

### Reset Data
```bash
# Delete data files to reset
rm server/data/*.json

# Restart API server to regenerate
node server.js
```

### Change API URL
Edit `.env.local`:
```env
VITE_API_URL=http://your-api-url/api
```

---

## ✅ Verification

### Check Frontend
- [ ] http://localhost:5173 loads
- [ ] Admin login page visible
- [ ] Can login with admin/admin123

### Check Backend
- [ ] http://localhost:5000/api/health returns `{"success":true,...}`
- [ ] http://localhost:5000/api/products returns product list
- [ ] Can add/edit/delete via API

### Check Integration
- [ ] Products load on dashboard
- [ ] Can add new product
- [ ] Can view orders
- [ ] Can update settings

---

## 🚨 If Something Goes Wrong

### "Cannot connect to localhost:5173"
- Frontend server not running
- Fix: Start with `npm run dev`

### "Cannot connect to localhost:5000"
- API server not running
- Fix: Start with `node server.js` in `server/` folder

### "Failed to load products"
- API not returning data
- Fix: Check API server is running and check console logs

### "Port already in use"
- Another process using port
- Fix: Kill process or use different port

### "Module not found"
- Dependencies not installed
- Fix: Run `npm install` in that directory

---

## 📈 What's Next?

After verifying everything works:

1. **Explore the Code**
   - Check `src/admin/AdminProducts.jsx` for API call patterns
   - Review `server/server.js` for endpoint logic

2. **Customize Data**
   - Edit `server/data/*.json` to add your own data
   - Restart API server to load changes

3. **Add Database**
   - Install MongoDB or PostgreSQL
   - Update `server/server.js` to use database
   - Replace JSON file operations with DB queries

4. **Deploy to Production**
   - Build frontend: `npm run build`
   - Deploy API to server
   - Update API URL in `.env.local`

---

## 📞 Help & Resources

### Documentation Files
- `API_INTEGRATION_GUIDE.md` - Detailed API guide
- `ADMIN_PANEL_GUIDE.md` - Admin features guide
- `README.md` - Project overview

### Useful Links
- [Express.js Docs](https://expressjs.com)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST API Best Practices](https://restfulapi.net)

---

## 🎉 You're Ready!

Everything is set up and running. Your admin panel is:

✅ Connected to API
✅ Fully functional
✅ Ready to customize
✅ Ready for production

**Happy building!** 🚀

---

**Version**: 1.0
**Last Updated**: December 24, 2025
**Status**: ✅ Ready to Use
