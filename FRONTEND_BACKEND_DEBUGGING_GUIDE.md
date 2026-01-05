# Frontend-Backend Connection Troubleshooting Guide

## 🔴 Problem Fixed: Login Error on Frontend

### Issue
When entering login details on the LoginPage, users were getting an error instead of logging in successfully.

### Root Cause
The backend's `login` endpoint had a bug in error handling:
- When a user was not found, the code tried to insert a login session record with `user_id = NULL`
- The database schema had `NOT NULL` constraint on the `user_id` column
- This caused a database error instead of returning a proper 401 response

### ✅ Solution Applied
Modified the auth controller to skip logging failed attempts for non-existent users:

**File:** `backend/controllers/authController.js`

**Before (Buggy):**
```javascript
if (!user) {
  await LoginSessionModel.create({
    user_id: null,  // ❌ Database doesn't allow NULL
    email,
    ip_address: req.ip || req.connection.remoteAddress,
    // ... more fields
  });
  return res.status(401).json({
    success: false,
    message: 'Invalid email or password'
  });
}
```

**After (Fixed):**
```javascript
if (!user) {
  logger.warn(`Login attempt with non-existent email: ${email}`);
  
  return res.status(401).json({
    success: false,
    message: 'Invalid email or password'
  });
}
```

---

## 🔍 How to Debug Frontend-Backend Issues

### Step 1: Check Browser Console
1. Open your browser (Chrome/Firefox)
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for any red error messages
5. You should see API request logs like:
```
🔵 API Request: POST http://localhost:5000/api/auth/login
🟢 API Response: 200 OK
```

### Step 2: Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Enter credentials and click Login
3. Look for the `login` request
4. Check:
   - **Status**: Should be 200 (success) or 401 (invalid credentials)
   - **Response**: Should show JSON with `success: true/false`
   - **Headers**: Should show `Content-Type: application/json`

### Step 3: Test Backend Directly
You can test the backend API independently:

**Via Frontend Console:**
```javascript
// Test login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(data => console.log(data))
.catch(err => console.error(err))
```

---

## 📋 Current Server Status

### ✅ Frontend
- **URL**: http://localhost:5173
- **Status**: Running
- **Port**: 5173
- **Framework**: React 19 + Vite

### ✅ Backend (Main)
- **URL**: http://localhost:5000/api
- **Status**: Running
- **Port**: 5000
- **Framework**: Node.js + Express
- **Database**: MySQL (`ecommerce` db)

### ⚠️ Backend (Admin)
- **URL**: http://localhost:5001/api
- **Status**: Requires database setup
- **Port**: 5001
- **Framework**: Node.js + Express + Sequelize
- **Database**: MySQL (`admin_panel_db`)

---

## 🚀 How to Start All Servers

### Terminal 1: Frontend Dev Server
```bash
cd dress-page
npm run dev
# Runs on http://localhost:5173
```

### Terminal 2: Backend Server
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Terminal 3: Admin Backend (Optional)
```bash
cd dress-page/server
npm start
# Runs on http://localhost:5001
# Requires MySQL databases to be set up
```

---

## 🧪 Testing the Login Flow

### Test Case 1: Register New User
1. Go to http://localhost:5173/login
2. Click on "Register" tab
3. Fill in:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Mobile: 9876543210
   - Password: Test@12345
   - Confirm Password: Test@12345
4. Click "Register"
5. Should see: "Registration successful! Please login with your credentials."

### Test Case 2: Login with Registered Credentials
1. Email should be auto-filled from registration
2. Enter password: Test@12345
3. Click "Login"
4. Should see: "Login successful! Redirecting..."
5. Should redirect to home page

### Test Case 3: Invalid Credentials
1. Enter: email@example.com, password: wrongpassword
2. Click "Login"
3. Should see: "Invalid email or password" error message

---

## 🔧 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Server not reachable" | Backend not running | Start backend: `cd backend && npm run dev` |
| "Cannot POST /api/auth/login" | Wrong API URL | Check apiConfig.js has correct URL |
| "Invalid email or password" | User doesn't exist | Register first, then login |
| CORS error | Frontend and backend on different origins | Check backend has CORS middleware |
| "Network error in console" | Backend crashed | Check backend terminal for errors |
| Token not stored | Browser localStorage disabled | Enable localStorage in browser settings |

---

## 📊 API Debugging Logs

The enhanced apiCall helper now logs:
1. **API Request** with method, URL, and headers
2. **API Response** with status code
3. **Response Data** with full JSON
4. **API Errors** with error details

Example output in browser console:
```
🔵 API Request: POST http://localhost:5000/api/auth/login
   Headers: {Content-Type: application/json, Authorization: Bearer ...}
   Body: {"email":"user@example.com","password":"pass123"}
🟢 API Response: 200 OK
   Data: {success: true, message: "Login successful", data: {...}}
```

---

## 📝 Files Modified to Fix Login Issues

### 1. **backend/controllers/authController.js**
- Removed problematic NULL user_id insertion
- Added logging for non-existent user attempts
- Fixed error handling flow

### 2. **dress-page/src/LoginPage.jsx**
- Added console.log for API responses
- Enhanced error messages
- Better validation feedback

### 3. **dress-page/src/config/apiConfig.js**
- Added detailed console logging
- Shows request/response cycle
- Helps debug API issues

---

## ✨ What's Now Working

✅ **Login with Email & Password**
- Validates email format
- Validates password (minimum 6 chars)
- Stores token and user data in localStorage
- Redirects to home page on success

✅ **User Registration**
- Validates all required fields
- Email format validation
- Mobile number validation (10 digits)
- Password strength check (8+ chars)
- Confirms password match
- Auto-fills email after success

✅ **Error Handling**
- Shows specific error messages
- Validates input before API call
- Handles network errors gracefully
- Displays errors in red alert boxes

✅ **API Connection**
- Frontend properly connects to backend
- Token attached to requests automatically
- CORS enabled for localhost
- Proper error responses from server

---

## 🔐 Security Notes

⚠️ **Current Implementation:**
- Passwords hashed with SHA256 (use bcrypt in production)
- Tokens stored in localStorage (use httpOnly cookies in production)
- No password expiration or refresh tokens

### For Production:
1. Use bcrypt for password hashing
2. Use httpOnly cookies for tokens
3. Implement refresh token mechanism
4. Add rate limiting on login attempts
5. Add CAPTCHA after 5 failed attempts
6. Implement 2FA/MFA

---

## 📞 Quick Help

**Check Backend Status:**
```javascript
// In browser console
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(data => console.log('Backend OK:', data))
```

**Check Stored User Data:**
```javascript
// In browser console
console.log('User:', JSON.parse(localStorage.getItem('user')))
console.log('Token:', localStorage.getItem('token'))
```

**Clear Local Storage (to test fresh login):**
```javascript
// In browser console
localStorage.clear()
location.reload()
```

---

**Last Updated:** January 5, 2026
**Status:** ✅ Login Fixed & Connected
