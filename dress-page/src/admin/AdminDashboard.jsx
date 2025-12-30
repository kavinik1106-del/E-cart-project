import React, { useState, useEffect } from "react";
import { TrendingUp, Users, Package, ShoppingCart, Eye, DollarSign } from "lucide-react";

const StatCard = ({ icon: IconComponent, title, value, color, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        {trend && (
          <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <TrendingUp size={16} /> {trend}% increase
          </p>
        )}
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
        <IconComponent size={28} style={{ color }} />
      </div>
    </div>
  </div>
);

/* ---------------- DASHBOARD ---------------- */
function AdminDashboard() {
  console.log("AdminDashboard rendering");
  const [stats, setStats] = useState({
    totalSales: 125450,
    totalOrders: 1234,
    totalProducts: 560,
    totalCustomers: 8934,
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: "ORD001", customer: "John Doe", amount: 2500, status: "Delivered", date: "2024-12-28" },
    { id: "ORD002", customer: "Jane Smith", amount: 1800, status: "Processing", date: "2024-12-29" },
    { id: "ORD003", customer: "Mike Johnson", amount: 3200, status: "Pending", date: "2024-12-29" }
  ]);

  const [topProducts, setTopProducts] = useState([
    { id: 1, name: "Premium Cashew Nuts", sales: 450, revenue: 31500 },
    { id: 2, name: "iPhone 15 Pro Max", sales: 89, revenue: 1111011 },
    { id: 3, name: "Designer Kurta", sales: 234, revenue: 304266 }
  ]);

  const [salesOverview, setSalesOverview] = useState([
    { month: "Jan", sales: 8000 },
    { month: "Feb", sales: 12000 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 22000 }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Data is already initialized in state
    // No loading needed
  }, []);


  /* UI - Render immediately with initialized data */
  return (
    <div className="space-y-6">
      {/* Test Heading */}
      <div className="bg-blue-100 p-4 rounded mb-4">
        <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
        <p className="text-blue-700">Stats: Sales={stats.totalSales}, Orders={stats.totalOrders}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={stats.totalSales}
          icon={ShoppingCart}
          color="#3b82f6"
          trend="12"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={Package}
          color="#f59e0b"
          trend="8"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="#10b981"
          trend="5"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          color="#ef4444"
          trend="15"
        />
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-semibold text-gray-800">#{order.id}</td>
                    <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">₹{order.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Top Products</h2>
            <Eye size={18} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{parseFloat(product.revenue).toLocaleString()}</p>
                    <div className="w-12 h-1 bg-gray-200 rounded mt-2">
                      <div
                        className={`h-full rounded transition-all`}
                        style={{
                          width: `${topProducts.length > 0 ? (product.sales / topProducts[0].sales) * 100 : 0}%`,
                          backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"][index] || "#6b7280",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Sales Overview (This Month)</h2>
        <div className="h-64 flex items-end gap-2 justify-around">
          {salesOverview.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className="bg-blue-500 w-6 rounded-t"
                style={{ height: `${item.sales / 500}px` }}
              ></div>
              <span className="text-xs mt-1">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
