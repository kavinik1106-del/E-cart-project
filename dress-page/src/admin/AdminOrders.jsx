import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, ChevronDown, RefreshCw } from "lucide-react";
import AdminLayout from "./AdminLayout";

function AdminOrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/orders');
      const result = await response.json();

      if (result.success) {
        // Transform API data to match component structure
        const transformedOrders = result.data.map(order => ({
          id: order.id,
          order_number: order.order_number,
          customer: `${order.user?.first_name || 'Unknown'} ${order.user?.last_name || ''}`.trim(),
          email: order.user?.email || 'N/A',
          total: order.total_amount,
          status: order.status,
          payment_status: order.payment_status,
          date: new Date(order.created_at).toLocaleDateString(),
          items: order.order_items?.length || 0,
          address: order.shipping_address,
          items_details: order.order_items || []
        }));
        setOrders(transformedOrders);
      } else {
        setError(result.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Error fetching orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState("All");

  const statusConfig = {
    Pending: { color: "text-gray-600", bg: "bg-gray-100", icon: Clock },
    Processing: { color: "text-blue-600", bg: "bg-blue-100", icon: Package },
    Shipped: { color: "text-yellow-600", bg: "bg-yellow-100", icon: Truck },
    Delivered: { color: "text-green-600", bg: "bg-green-100", icon: CheckCircle },
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (result.success) {
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
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <RefreshCw size={40} className="animate-spin mx-auto text-blue-600 mb-4" />
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
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status].icon;
          const isExpanded = expandedOrder === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
            >
              {/* Order Header */}
              <button
                onClick={() =>
                  setExpandedOrder(isExpanded ? null : order.id)
                }
                className="w-full p-6 hover:bg-gray-50 transition flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${statusConfig[order.status].bg}`}>
                    <StatusIcon
                      size={24}
                      className={statusConfig[order.status].color}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-gray-800">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right hidden md:block">
                    <p className="font-bold text-gray-800">
                      ₹{order.total.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                </div>

                <ChevronDown
                  size={20}
                  className={`text-gray-400 transition ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-6">
                  {/* Order Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        Email
                      </p>
                      <p className="text-gray-800">{order.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        Shipping Address
                      </p>
                      <p className="text-gray-800">{order.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        Items
                      </p>
                      <p className="text-gray-800">{order.items} products</p>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                      Order Status
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {["Pending", "Processing", "Shipped", "Delivered"].map(
                        (status, idx) => (
                          <div key={status} className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateOrderStatus(order.id, status)
                              }
                              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                                order.status === status
                                  ? statusConfig[status].bg +
                                    " " +
                                    statusConfig[status].color
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            >
                              {status}
                            </button>
                            {idx < 3 && (
                              <span className="text-gray-300 text-xl">→</span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                      Print Invoice
                    </button>
                    <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium">
                      Send Email
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium">
                      Cancel Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      )}
    </div>
  );
}

function AdminOrders() {
  return (
    <AdminLayout>
      <AdminOrdersContent />
    </AdminLayout>
  );
}

export default AdminOrders;
