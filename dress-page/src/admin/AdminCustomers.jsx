import React, { useState } from "react";
import { Mail, Phone, MapPin, ShoppingCart, Search, MoreVertical } from "lucide-react";
import AdminLayout from "./AdminLayout";

function AdminCustomersContent() {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91-9876543210",
      location: "Delhi, India",
      orders: 5,
      spent: 12500,
      joined: "2025-01-15",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+91-8765432109",
      location: "Mumbai, India",
      orders: 3,
      spent: 7800,
      joined: "2025-02-10",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91-7654321098",
      location: "Bangalore, India",
      orders: 8,
      spent: 21500,
      joined: "2025-01-05",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+91-6543210987",
      location: "Hyderabad, India",
      orders: 2,
      spent: 5200,
      joined: "2025-03-01",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex@example.com",
      phone: "+91-5432109876",
      location: "Chennai, India",
      orders: 6,
      spent: 18900,
      joined: "2024-12-20",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and view customer information</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {customer.name.charAt(0)}
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <MoreVertical size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Customer Info */}
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 text-lg">{customer.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Joined {customer.joined}</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} className="text-blue-500" />
                <a href={`mailto:${customer.email}`} className="hover:text-blue-600">
                  {customer.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} className="text-green-500" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} className="text-red-500" />
                {customer.location}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg mb-4">
              <div className="text-center">
                <p className="font-bold text-lg text-gray-800">
                  {customer.orders}
                </p>
                <p className="text-xs text-gray-500">Orders</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-gray-800">
                  ₹{customer.spent.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium flex items-center justify-center gap-2">
              <ShoppingCart size={16} />
              View Orders
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No customers found</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm font-medium">Total Customers</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{customers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-500 text-sm font-medium">Total Orders</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {customers.reduce((sum, c) => sum + c.orders, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ₹{customers.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-500 text-sm font-medium">Avg. Order Value</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ₹{Math.round(
              customers.reduce((sum, c) => sum + c.spent, 0) /
                customers.reduce((sum, c) => sum + c.orders, 0)
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminCustomers() {
  return (
    <AdminLayout>
      <AdminCustomersContent />
    </AdminLayout>
  );
}

export default AdminCustomers;
