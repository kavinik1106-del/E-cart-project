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

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
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
        {/* Logo */}
        <div className="p-4 border-b border-blue-500 flex items-center justify-between">
          <div
            className={`flex items-center gap-3 ${
              !sidebarOpen && "justify-center w-full"
            }`}
          >
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-primary">
              A
            </div>
            {sidebarOpen && (
              <span className="font-bold text-xl tracking-wide">
                StyleNest
              </span>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  active
                    ? "bg-secondary text-primary font-semibold shadow-md"
                    : "text-primary hover:bg-primary/80"
                }`}
              >
                {/* Active indicator */}
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
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-red-500 hover:text-white transition-all"
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-primary/10 transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-blue-700">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-secondary">
              <Search size={18} className="text-blue-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none ml-2 w-48 text-sm text-gray-700"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-primary/10">
              <Bell size={20} className="text-blue-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="font-semibold text-sm text-gray-800">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                A
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
