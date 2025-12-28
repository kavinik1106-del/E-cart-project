import React, { useState, useEffect } from "react";
import { TrendingUp, Users, Package, ShoppingCart, Eye, DollarSign } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: color }}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm font-semibold">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">${value.toLocaleString()}</p>
          {trend && (
            <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
              <TrendingUp size={14} /> {trend}% from last month
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );
};

function AdminDashboard() {
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
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, ordersRes, productsRes, salesRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/dashboard/stats'),
        fetch('http://localhost:5000/api/admin/dashboard/recent-orders'),
        fetch('http://localhost:5000/api/admin/dashboard/top-products'),
        fetch('http://localhost:5000/api/admin/dashboard/sales-overview')
      ]);

      const [statsData, ordersData, productsData, salesData] = await Promise.all([
        statsRes.json(),
        ordersRes.json(),
        productsRes.json(),
        salesRes.json()
      ]);

      if (statsData.success) setStats(statsData.data);
      if (ordersData.success) setRecentOrders(ordersData.data);
      if (productsData.success) setTopProducts(productsData.data);
      if (salesData.success) setSalesOverview(salesData.data);

    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome to your admin panel</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={stats.totalSales}
          icon={ShoppingCart}
          color="#3b82f6"
          trend={12}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={Package}
          color="#f59e0b"
          trend={8}
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="#10b981"
          trend={5}
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          color="#8b5cf6"
          trend={15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">${order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent orders</p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Products</h2>
          <div className="space-y-3">
            {stats.topProducts.length > 0 ? (
              stats.topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.stock} units in stock</p>
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
              ))
            ) : (
              <p className="text-gray-500">No products available</p>
            )}
          </div>
        </div>
      </div>

      {/* Sales Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Sales Overview (This Month)</h2>
        <div className="h-64 flex items-end gap-2 justify-around">
          {salesOverview.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className="bg-gradient-to-t from-blue-500 to-purple-400 rounded-t transition-all hover:from-blue-600"
                style={{ height: `${(item.sales / Math.max(...salesOverview.map(d => d.sales), 1)) * 100}%`, width: "30px" }}
              ></div>
              <span className="text-xs text-gray-500">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard
