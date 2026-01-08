import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { TrendingUp, Users, Package, ShoppingCart, Eye, DollarSign } from "lucide-react";
import { apiCall, API_ENDPOINTS } from "../config/apiConfig.js";

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
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch orders from admin backend
      const ordersRes = await apiCall(API_ENDPOINTS.ORDERS, {
        method: 'GET'
      });
      
      // Fetch customers from admin backend
      const customersRes = await apiCall(API_ENDPOINTS.CUSTOMERS, {
        method: 'GET'
      });
      
      // Fetch products from admin backend
      const productsRes = await apiCall(API_ENDPOINTS.ADMIN_PRODUCTS, {
        method: 'GET'
      });

      // Check for API errors
      if (!ordersRes.success && ordersRes.status !== 404) {
        throw new Error(ordersRes.message || 'Failed to fetch orders');
      }
      if (!customersRes.success && customersRes.status !== 404) {
        throw new Error(customersRes.message || 'Failed to fetch customers');
      }
      if (!productsRes.success && productsRes.status !== 404) {
        throw new Error(productsRes.message || 'Failed to fetch products');
      }

      // Calculate stats
      const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
      const customers = Array.isArray(customersRes.data) ? customersRes.data : [];
      const products = Array.isArray(productsRes.data) ? productsRes.data : [];

      const totalSales = orders.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0);
      const totalOrders = orders.length;
      const totalProducts = products.length;
      const totalCustomers = customers.length;

      setStats({
        totalSales: Math.round(totalSales),
        totalOrders,
        totalProducts,
        totalCustomers,
      });

      // Set recent orders
      const recent = orders.slice(-5).reverse().map(order => ({
        id: order.order_number || order.id,
        customer: order.customer || `User ${order.user_id}`,
        amount: parseFloat(order.total_amount || 0),
        status: order.status || 'Pending',
        date: order.created_at ? order.created_at.split('T')[0] : new Date().toISOString().split('T')[0]
      }));
      setRecentOrders(recent);

      // Set top products by orders
      const topProds = products.slice(0, 3).map(product => ({
        id: product.id,
        name: product.name,
        sales: Math.floor(Math.random() * 500), // Placeholder, would need order_items data
        revenue: parseFloat(product.price) * 10 // Placeholder
      }));
      setTopProducts(topProds);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };


  /* UI - Render immediately with initialized data */
  return (
    <div className="space-y-6">
      {/* Test Heading */}
      <div className="bg-primary/20 p-4 rounded mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Stats: Sales=₹{stats.totalSales.toLocaleString()}, Orders={stats.totalOrders}, Customers={stats.totalCustomers}</p>
      </div>

      {loading && (
        <div className="bg-blue-50 p-4 rounded text-blue-700 text-center">
          Loading dashboard data...
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-4 rounded text-red-700 border border-red-200">
          <p className="font-semibold">⚠️ Failed to Load</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      )}

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
            <button className="text-primary hover:opacity-80 font-medium text-sm">View All</button>
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
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      No orders yet. Orders will appear here when customers place them.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
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
                            ? "bg-primary/20 text-primary"
                            : order.status === "Shipped"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{order.date}</td>
                  </tr>
                  ))
                )}
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
            {topProducts.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No products yet. Add products to see them here.
              </div>
            ) : (
              topProducts.map((product, index) => (
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
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
