import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Search, RefreshCw } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { apiCall, API_ENDPOINTS } from "../config/apiConfig.js";

function AdminCustomersContent() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall(API_ENDPOINTS.CUSTOMERS, {
        method: 'GET'
      });
      
      if (response.success && response.data) {
        const customersData = Array.isArray(response.data) ? response.data : [];
        setCustomers(customersData.map(customer => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone || 'N/A',
          location: customer.location || 'N/A',
          orders: customer.orders || 0,
          spent: parseFloat(customer.spent) || 0,
          joined: customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'
        })));
      } else {
        setError('Failed to load customers');
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSpent = customers.reduce((sum, c) => sum + c.spent, 0);
  const avgOrderValue = customers.length > 0 ? totalSpent / customers.length : 0;
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view customer information</p>
        </div>
        <button
          onClick={fetchCustomers}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Total Customers</p>
          <p className="text-3xl font-bold text-gray-800">{customers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-gray-800">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-800">${totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Avg Order Value</p>
          <p className="text-3xl font-bold text-gray-800">${avgOrderValue.toFixed(0)}</p>
        </div>
      </div>

      {/* SEARCH */}
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

      {/* CUSTOMER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition"
            >
              {/* Avatar */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {customer.name.charAt(0)}
                </div>
              </div>

              {/* Name & Joined */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-800 text-lg">{customer.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Since {customer.joined}</p>
              </div>

              {/* Contact */}
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

              {/* Orders & Spent */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="font-bold text-lg text-gray-800">{customer.orders}</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-gray-800">${customer.spent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Spent</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No customers found
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminCustomers() {
  return (
    <AdminLayout>
      <AdminCustomersContent />
     </AdminLayout> 

    
  );
}