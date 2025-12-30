import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  Eye,
  DollarSign,
} from "lucide-react";
import { Navigate } from "react-router-dom";

/* ---------------- STAT CARD ---------------- */
const StatCard = ({ icon: Icon, title, value, color, trend }) => (
  <div
    className="bg-white rounded-lg shadow-md p-6 border-l-4"
    style={{ borderColor: color }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        {trend && (
          <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <TrendingUp size={16} /> {trend}% increase
          </p>
        )}
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
        <Icon size={28} style={{ color }} />
      </div>
    </div>
  </div>
);

/* ---------------- DASHBOARD ---------------- */
function AdminDashboard() {
  /* 🔐 Route protection */
  if (!localStorage.getItem("isAdmin")) {
    return <Navigate to="/admin-login" />;
  }

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [salesOverview, setSalesOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  /* ---------------- FETCH / FALLBACK ---------------- */
  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "http://localhost:5000/api/admin/dashboard"
      );

      if (!res.ok) throw new Error("Backend not available");

      const data = await res.json();

      setStats(data.stats || stats);
      setRecentOrders(data.recentOrders || []);
      setTopProducts(data.topProducts || []);
      setSalesOverview(data.salesOverview || []);
    } catch (err) {
      console.warn("Using demo data (backend offline)");

      /* ✅ DEMO DATA FALLBACK */
      setStats({
        totalSales: 125000,
        totalOrders: 320,
        totalProducts: 85,
        totalCustomers: 210,
      });

      setRecentOrders([
        { id: 101, customer: "Rahul", total: 2499, status: "Delivered", date: "29 Dec" },
        { id: 102, customer: "Anita", total: 1599, status: "Processing", date: "28 Dec" },
      ]);

      setTopProducts([
        { id: 1, name: "Denim Jacket", sales: 120, revenue: 54000 },
        { id: 2, name: "Sneakers", sales: 90, revenue: 45000 },
      ]);

      setSalesOverview([
        { month: "Jan", sales: 20000 },
        { month: "Feb", sales: 28000 },
        { month: "Mar", sales: 35000 },
        { month: "Apr", sales: 42000 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Sales"
          value={`₹${stats.totalSales.toLocaleString()}`}
          color="#3b82f6"
        />
        <StatCard
          icon={ShoppingCart}
          title="Orders"
          value={stats.totalOrders}
          color="#f59e0b"
        />
        <StatCard
          icon={Package}
          title="Products"
          value={stats.totalProducts}
          color="#10b981"
        />
        <StatCard
          icon={Users}
          title="Customers"
          value={stats.totalCustomers}
          color="#ef4444"
        />
      </div>

      {/* Orders & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Order</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-2">#{o.id}</td>
                  <td className="p-2">{o.customer}</td>
                  <td className="p-2">₹{o.total}</td>
                  <td className="p-2">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 flex justify-between">
            Top Products <Eye size={18} />
          </h2>
          {topProducts.map((p) => (
            <div key={p.id} className="border-b pb-2 mb-2">
              <p className="font-semibold">{p.name}</p>
              <p className="text-xs text-gray-500">
                {p.sales} sales • ₹{p.revenue}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Overview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
        <div className="flex gap-4 items-end h-40">
          {salesOverview.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="bg-blue-500 w-6 rounded-t"
                style={{ height: `${s.sales / 500}px` }}
              ></div>
              <span className="text-xs mt-1">{s.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
