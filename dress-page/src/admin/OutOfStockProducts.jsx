import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Search, RefreshCw } from "lucide-react";
import { apiCall, API_ENDPOINTS } from "../config/apiConfig.js";
import AdminLayout from "./AdminLayout";

function OutOfStockProductsContent() {
  const [products, setProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔵 Fetching products for out-of-stock view');
      const response = await apiCall(API_ENDPOINTS.ADMIN_PRODUCTS);
      
      console.log('🟢 Response received:', response);

      if (response.success && response.data) {
        const productList = Array.isArray(response.data) ? response.data : [];
        setProducts(productList);
        
        // Filter only out of stock products
        const outOfStock = productList.filter(p => p.stock === 0 || p.stock === '0' || !p.stock);
        setOutOfStockProducts(outOfStock);
      } else {
        const errorMsg = response.message || response.error || 'Failed to fetch products';
        console.error('❌ API returned error:', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      const errorMessage = err.message || 'Failed to load products. Make sure the backend server is running.';
      setError(errorMessage);
      setProducts([]);
      setOutOfStockProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search term
  useEffect(() => {
    const filtered = outOfStockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [outOfStockProducts, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await apiCall(`${API_ENDPOINTS.ADMIN_PRODUCTS}/${productId}`, {
          method: 'DELETE'
        });

        if (response.success) {
          setOutOfStockProducts(outOfStockProducts.filter(p => p.id !== productId));
          alert('Product deleted successfully');
        } else {
          alert(response.message || 'Failed to delete product');
        }
      } catch (error) {
        alert('Error deleting product: ' + error.message);
      }
    }
  };

  const handleEdit = (product) => {
    // For now, just alert - could be expanded to open a modal
    alert(`Edit functionality coming soon for: ${product.name}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading out-of-stock products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Out of Stock Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage products with zero inventory</p>
        </div>
        <button
          onClick={fetchProducts}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          Total Out of Stock: <span className="font-bold text-red-600 text-lg">{outOfStockProducts.length}</span>
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by product name, category, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Products Table */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    MRP
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-10 w-10 object-cover rounded"
                          onError={(e) => e.target.src = '/placeholder.png'}
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                          📦
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium max-w-xs truncate">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.type || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      ₹{parseFloat(product.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.mrp ? `₹${parseFloat(product.mrp).toFixed(2)}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary hover:opacity-80 transition"
                        title="Edit product"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
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
          <div className="text-6xl mb-4">✅</div>
          <p className="text-lg font-semibold mb-2">No Out of Stock Products</p>
          <p className="text-sm">Great job! All your products are in stock.</p>
        </div>
      )}
    </div>
  );
}

function OutOfStockProducts() {
  return (
    <AdminLayout>
      <OutOfStockProductsContent />
    </AdminLayout>
  );
}

export default OutOfStockProducts;
