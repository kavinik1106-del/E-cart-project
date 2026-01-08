import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, ChevronDown, RefreshCw } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { apiCall, API_ENDPOINTS } from "../config/apiConfig.js";

function AdminOrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from main backend, not admin API
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

  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState("All");

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
          <p className="text-gray-500 text-sm mt-1">Manage and track customer orders</p>
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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <RefreshCw size={40} className="animate-spin mx-auto text-primary mb-4" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      )}

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
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? "bg-primary text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const statusKey = order.status.toLowerCase();
            const StatusIcon = statusConfig[statusKey]?.icon || Clock;
            const isExpanded = expandedOrder === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
              >
                <div
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="p-4 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${statusConfig[statusKey]?.bg}`}>
                        <StatusIcon size={20} className={statusConfig[statusKey]?.color} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {order.id} - {order.customer}
                        </h3>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">${order.amount}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[statusKey]?.bg} ${statusConfig[statusKey]?.color}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-gray-50 border-t p-4 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900">{order.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Items</p>
                        <p className="font-semibold text-gray-900">{order.items}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold text-gray-900">{order.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-semibold text-gray-900 capitalize">{order.status}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-2">Update Status:</p>
                      <div className="flex gap-2 flex-wrap">
                        {["pending", "processing", "shipped", "delivered"].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(order.id, status)}
                            className={`px-3 py-1 rounded text-sm font-medium transition ${
                              order.status === status
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            No orders found
          </div>
        )}
      </div>
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
