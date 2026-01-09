import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, ChevronDown, RefreshCw } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { apiCall, API_ENDPOINTS } from "../config/apiConfig.js";

function AdminOrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from main backend
      const response = await apiCall(`${API_ENDPOINTS.USER_ORDERS}`, {
        method: 'GET'
      });
      
      console.log('📦 Admin Orders Response:', response);
      
      if (response.success && response.data) {
        const ordersData = Array.isArray(response.data) ? response.data : [];
        setOrders(ordersData.map(order => ({
          id: order.id,
          order_number: order.order_number || order.id,
          customer: order.customer || `User ${order.user_id}`,
          email: order.email || 'N/A',
          amount: parseFloat(order.total_amount || order.amount || 0),
          status: order.status || 'pending',
          payment_status: order.payment_status || 'unpaid',
          date: order.created_at ? order.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          items: order.total_items || 0,
          address: order.shipping_address || 'N/A',
          phone: order.phone || 'N/A',
          city: order.city || 'N/A',
          state: order.state || 'N/A',
          pincode: order.pincode || 'N/A'
        })));
      } else {
        throw new Error(response.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      setError(err.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusConfig = {
    pending: { color: "text-gray-600", bg: "bg-gray-100", icon: Clock },
    processing: { color: "text-primary", bg: "bg-primary/20", icon: Package },
    shipped: { color: "text-yellow-600", bg: "bg-yellow-100", icon: Truck },
    delivered: { color: "text-green-600", bg: "bg-green-100", icon: CheckCircle },
  };

  const filteredOrders =
    filter === "All" 
      ? orders 
      : orders.filter((o) => o.status === filter.toLowerCase());

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const result = await apiCall(`${API_ENDPOINTS.USER_ORDERS}/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });

      if (result && result.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      alert('Error updating order status: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all customer orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Status Filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Pending", "Processing", "Shipped", "Delivered"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilter(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? "bg-primary text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {status} ({filter === status ? filteredOrders.length : orders.filter((o) => status === "All" || o.status === status.toLowerCase()).length})
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {paginatedOrders.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedOrders.map((order) => {
                  const statusKey = order.status.toLowerCase();
                  const isExpanded = expandedOrder === order.id;

                  return (
                    <React.Fragment key={order.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                          {order.order_number}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {order.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {order.date}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                          ₹{order.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {order.items}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              statusConfig[statusKey]?.bg
                            } ${statusConfig[statusKey]?.color}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                            className="text-primary hover:text-blue-700 font-medium flex items-center gap-1"
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                            Details
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <tr className="bg-gray-50">
                          <td colSpan="8" className="px-4 py-4">
                            <div className="space-y-4">
                              {/* Customer Info */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs text-gray-600 font-semibold">PHONE</p>
                                  <p className="text-sm font-medium text-gray-900">{order.phone}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600 font-semibold">CITY</p>
                                  <p className="text-sm font-medium text-gray-900">{order.city}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600 font-semibold">STATE</p>
                                  <p className="text-sm font-medium text-gray-900">{order.state}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600 font-semibold">PINCODE</p>
                                  <p className="text-sm font-medium text-gray-900">{order.pincode}</p>
                                </div>
                              </div>

                              {/* Address */}
                              <div>
                                <p className="text-xs text-gray-600 font-semibold mb-2">DELIVERY ADDRESS</p>
                                <p className="text-sm text-gray-900 bg-white p-3 rounded border border-gray-200">
                                  {order.address}
                                </p>
                              </div>

                              {/* Status Update */}
                              <div>
                                <p className="text-xs text-gray-600 font-semibold mb-2">UPDATE STATUS</p>
                                <div className="flex gap-2 flex-wrap">
                                  {["pending", "processing", "shipped", "delivered"].map((status) => (
                                    <button
                                      key={status}
                                      onClick={() => updateOrderStatus(order.id, status)}
                                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                                        order.status === status
                                          ? "bg-primary text-white"
                                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                      }`}
                                    >
                                      {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-4">📦 No orders found</p>
          <p className="text-sm">Start creating orders to see them here.</p>
        </div>
      )}
    </div>
  );
}

export default function AdminOrders() {
  return (
    <AdminLayout>
      <AdminOrdersContent />
    </AdminLayout>
  );
}
