import React, { useState, useEffect } from "react";
import { Search, RefreshCw } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { apiCall, API_ENDPOINTS } from "../config/apiConfig.js";

function AdminCustomersContent() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
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
          name: customer.name || 'N/A',
          email: customer.email || 'N/A',
          phone: customer.phone || 'N/A',
          location: customer.location || customer.city || 'N/A',
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

  useEffect(() => {
    const filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [customers, searchTerm]);

  const totalSpent = customers.reduce((sum, c) => sum + c.spent, 0);
  const avgOrderValue = customers.length > 0 ? totalSpent / customers.length : 0;
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);
  
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

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
          <p className="text-3xl font-bold text-gray-800">₹{totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Avg Order Value</p>
          <p className="text-3xl font-bold text-gray-800">₹{avgOrderValue.toFixed(0)}</p>
        </div>
      </div>

      {/* SEARCH AND TABLE */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 mb-6">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
        </div>

        {paginatedCustomers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Orders
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Spent
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          {customer.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <a href={`mailto:${customer.email}`} className="hover:text-blue-600 text-blue-500">
                          {customer.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {customer.phone}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {customer.location}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 font-semibold rounded-full">
                          {customer.orders}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        ₹{customer.spent.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {customer.joined}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
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
            <p className="text-lg">👥 No customers found</p>
            {customers.length === 0 ? (
              <p className="text-sm text-gray-600 mt-2">No customer data available</p>
            ) : (
              <p className="text-sm text-gray-600 mt-2">No customers match your search criteria.</p>
            )}
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