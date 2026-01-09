import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  BarChart3,
  Package,
  ShoppingCart,
  Settings,
  Users,
  Bell,
  Search,
} from "lucide-react";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Get username from localStorage (assuming it was stored during login)
  const username = localStorage.getItem("username") || "Admin";

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: Package, label: "Out of Stock", path: "/admin/out-of-stock" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isAdmin");
      navigate("/admin/login");
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-primary text-white transition-all duration-300 flex flex-col shadow-xl`}
      >
        {/* ===== FIXED SIDEBAR HEADER ===== */}
        <div className="p-4 border-b border-primary flex items-center justify-between">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-white">
              S
            </div>

            {sidebarOpen && (
              <span className="font-bold text-xl tracking-wide">
                StyleNest
              </span>
            )}
          </div>

          {/* Toggle Button */}
          {sidebarOpen ? (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <X size={22} />
            </button>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <Menu size={22} />
            </button>
          )}
        </div>
        {/* ===== END HEADER ===== */}

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${
                    active
                      ? "bg-secondary text-white font-semibold shadow-md"
                      : "text-white hover:bg-primary/80"
                  }`}
              >
                {active && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-secondary rounded-r"></span>
                )}
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-primary/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-red-500 hover:text-white transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-primary/10 border border-primary rounded-lg px-3 py-2">
              <Search size={18} className="text-blue-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none ml-2 w-48 text-sm"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 rounded-lg hover:bg-primary/10">
              <Bell size={20} className="text-blue-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l">
              <div 
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:shadow-lg transition-shadow"
                title={username}
              >
                S
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
