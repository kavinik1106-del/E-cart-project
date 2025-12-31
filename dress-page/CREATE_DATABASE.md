# 🗄️ Create MySQL Database - Step by Step

## Quick Option: Run Database Creation Script

### On Windows
1. Double-click: `create-database.bat`
2. The script will create the database automatically
3. Follow the on-screen instructions

### On Mac/Linux
```bash
chmod +x create-database.sh
./create-database.sh
```

---

## Manual Option: Create Database Manually

### Step 1: Verify MySQL is Installed and Running

**Windows:**
1. Press `Windows Key + R`
2. Type: `services.msc`
3. Look for "MySQL80" or "MySQL57"
4. If not running, right-click → Start

**Mac:**
```bash
brew services list
# Should show mysql running
```

**Linux:**
```bash
sudo service mysql status
# Should show "running"
```

---

### Step 2: Open MySQL Command Line

**Windows:**
1. Start → Search for "MySQL Command Line Client"
2. Click to open
3. Enter password when prompted (default: `root` or leave blank)

**Mac/Linux:**
Open terminal and run:
```bash
mysql -u root -p
# Enter password when prompted
```

---

### Step 3: Create the Database

In the MySQL command prompt, run:

```sql
CREATE DATABASE admin_panel_db;
```

Then verify it was created:

```sql
SHOW DATABASES;
```

You should see `admin_panel_db` in the list.

Exit MySQL:
```sql
EXIT;
```

---

## Option 3: Use MySQL Workbench (GUI)

If you prefer a graphical interface:

1. **Download MySQL Workbench** (if not installed)
   - https://dev.mysql.com/downloads/workbench/

2. **Open MySQL Workbench**

3. **Connect to MySQL Server**
   - Click on the existing connection or create new
   - Enter hostname: `localhost`
   - Username: `root`
   - Password: `root` (or whatever you set)

4. **Create Database**
   - Click: `File` → `New Query Tab`
   - Paste this code:
   ```sql
   CREATE DATABASE admin_panel_db;
   ```
   - Press `Ctrl+Enter` or click Execute button
   - Look for "Query executed successfully"

---

## Option 4: Using PowerShell (Windows)

If MySQL is in your PATH:

```powershell
mysql -u root -p -e "CREATE DATABASE admin_panel_db;"
# Enter password when prompted
```

---

## ✅ Verify Database Was Created

### From Command Line:
```bash
mysql -u root -p -e "SHOW DATABASES LIKE 'admin_panel_db';"
```

You should see:
```
+---------------------+
| Database            |
+---------------------+
| admin_panel_db      |
+---------------------+
```

### Or in MySQL prompt:
```sql
SHOW DATABASES;
```

Look for `admin_panel_db` in the list.

---

## 🆘 Troubleshooting

### "MySQL command not found"
**Solution:** 
- Reinstall MySQL
- Or add MySQL to PATH
- Or use full path: `"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"`

### "Access denied for user 'root'"
**Solution:**
- Check password in `server/.env` file
- Default password is often `root` or blank
- If you forgot password, you may need to reset it

### "MySQL Server is not running"
**Solution:**
- Start MySQL Server:
  - **Windows:** Services → MySQL80 → Start
  - **Mac:** `brew services start mysql`
  - **Linux:** `sudo service mysql start`

### "Database already exists"
**Solution:**
- This is normal! The script uses `IF NOT EXISTS`
- The database will be reused
- Your data won't be deleted

---

## 📝 Database Name & Credentials

**Database Name:** `admin_panel_db`
**Database User:** `root` (default)
**Database Password:** Check in `server/.env` (default: `root`)
**Database Host:** `localhost`
**Database Port:** `3306` (default)

---

## ✨ What Happens Next

Once the database is created:

1. **Tables are auto-created** when you start the server
   - The server will run `Sequelize.sync()`
   - Creates: products, orders, customers, settings

2. **Seed data is auto-populated**
   - 3 sample products
   - 6 sample orders
   - 5 sample customers
   - 1 settings record

3. **Server starts normally**
   ```bash
   cd server
   npm install    # First time only
   npm start      # Start the server
   ```

---

## 🎯 Next Steps

1. ✅ Create database (using one of the methods above)
2. Install dependencies: `cd server && npm install`
3. Start the server: `npm start`
4. Access admin panel: `http://localhost:5173`

---

## 📞 Still Need Help?

- Check: [QUICKSTART.md](./QUICKSTART.md)
- Read: [MYSQL_SETUP.md](./MYSQL_SETUP.md)
- Review: [README.md](./README.md#-troubleshooting)

---

**Database Creation Guide** ✅  
Last Updated: December 2025
