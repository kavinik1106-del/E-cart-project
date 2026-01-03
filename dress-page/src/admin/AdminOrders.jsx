import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, ChevronDown, RefreshCw } from "lucide-react";
import AdminLayout from "./AdminLayout";

function AdminOrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API or use fallback
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fallback demo orders
      const demoOrders = [
        {
          id: 1,
          order_number: "ORD-001",
          customer: "John Doe",
          email: "john@example.com",
          total: 2500,
          status: "delivered",
          payment_status: "paid",
          date: "2024-12-28",
          items: 3,
          address: "123 Main St, City, State",
          items_details: [
            { id: 1, name: "iPhone 15 Pro", price: 1500, quantity: 1 },
            { id: 2, name: "Designer Saree", price: 999, quantity: 1 }
          ]
        },
        {
          id: 2,
          order_number: "ORD-002",
          customer: "Jane Smith",
          email: "jane@example.com",
          total: 1800,
          status: "processing",
          payment_status: "paid",
          date: "2024-12-29",
          items: 2,
          address: "456 Oak Ave, Town, State",
          items_details: []
        },
        {
          id: 3,
          order_number: "ORD-003",
          customer: "Mike Johnson",
          email: "mike@example.com",
          total: 3200,
          status: "pending",
          payment_status: "pending",
          date: "2024-12-29",
          items: 4,
          address: "789 Pine Rd, Village, State",
          items_details: []
        }
      ];
      
      setOrders(demoOrders);
    } catch (err) {
      console.error(err);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
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
