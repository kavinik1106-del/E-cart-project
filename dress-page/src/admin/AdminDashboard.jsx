import React from "react";
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

function AdminDashboard() {
  const stats = {
    totalSales: 45750,
    totalOrders: 324,
    totalProducts: 156,
    totalCustomers: 1240,
  };

  const recentOrders = [
    { id: 101, customer: "John Doe", total: 2500, status: "Delivered", date: "2025-12-24" },
    { id: 102, customer: "Sarah Smith", total: 1800, status: "Processing", date: "2025-12-23" },
    { id: 103, customer: "Mike Johnson", total: 3200, status: "Shipped", date: "2025-12-22" },
    { id: 104, customer: "Emma Davis", total: 1500, status: "Pending", date: "2025-12-22" },
    { id: 105, customer: "Alex Brown", total: 2100, status: "Delivered", date: "2025-12-21" },
  ];

  const topProducts = [
    { id: 1, name: "Premium Formal Suit", sales: 245, revenue: 8750 },
    { id: 2, name: "Cotton T-Shirt", sales: 189, revenue: 3402 },
    { id: 3, name: "Denim Jeans", sales: 156, revenue: 4680 },
    { id: 4, name: "Casual Dress", sales: 143, revenue: 5005 },
    { id: 5, name: "Sports Shoes", sales: 128, revenue: 6400 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Sales"
          value={`₹${stats.totalSales.toLocaleString()}`}
          color="#3b82f6"
          trend="12"
        />
        <StatCard
          icon={ShoppingCart}
          title="Total Orders"
          value={stats.totalOrders}
          color="#f59e0b"
          trend="8"
        />
        <StatCard
          icon={Package}
          title="Total Products"
          value={stats.totalProducts}
          color="#10b981"
          trend="5"
        />
        <StatCard
          icon={Users}
          title="Total Customers"
          value={stats.totalCustomers}
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
                    <td className="px-4 py-3 font-semibold text-gray-800">₹{order.total.toLocaleString()}</td>
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
                    <p className="font-bold text-gray-800">₹{product.revenue.toLocaleString()}</p>
                    <div className="w-12 h-1 bg-gray-200 rounded mt-2">
                      <div
                        className={`h-full rounded transition-all`}
                        style={{
                          width: `${(product.sales / topProducts[0].sales) * 100}%`,
                          backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"][index],
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
          {[12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45].map((value, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:from-blue-600"
                style={{ height: `${(value / 45) * 100}%`, width: "30px" }}
              ></div>
              <span className="text-xs text-gray-500">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
