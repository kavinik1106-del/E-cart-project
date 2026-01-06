import React, { useEffect, useState } from "react";
import { X, Plus, Edit2, Trash2, Search, Eye } from "lucide-react";
import { apiCall, API_ENDPOINTS } from "../config/apiConfig.js";
import AdminLayout from "./AdminLayout";

function AdminProductsContent() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    mrp: "",
    category: "",
    image: "",
    stock_quantity: "",
  });

  const initialFormState = {
    name: "",
    description: "",
    price: "",
    mrp: "",
    category: "",
    image: "",
    stock_quantity: "",
  };

  // Fetch products from API or use fallback
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔵 Fetching products from:', API_ENDPOINTS.ADMIN_PRODUCTS);
      const response = await apiCall(API_ENDPOINTS.ADMIN_PRODUCTS);
      
      console.log('🟢 Response received:', response);

      if (response.success && response.data) {
        const productList = Array.isArray(response.data) ? response.data : [];
        console.log('✅ Products loaded successfully:', productList.length, 'items');
        setProducts(productList);
      } else {
        const errorMsg = response.message || response.error || 'Failed to fetch products';
        console.error('❌ API returned error:', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      const errorMessage = err.message || 'Failed to load products. Make sure the backend server is running on port 5001.';
      setError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm]);

  const handleAdd = () => {
    setEditingId(null);
    setForm(initialFormState);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      mrp: product.mrp,
      category: product.category,
      image: product.image,
      stock_quantity: product.stock_quantity,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await apiCall(API_ENDPOINTS.PRODUCT(id), {
          method: "DELETE",
        });
        if (response.success) {
          setProducts(products.filter((p) => p.id !== id));
        }
      } catch (err) {
        setError("Failed to delete product");
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.stock_quantity) {
      alert("Please fill in all required fields (Name, Category, Price, Stock)");
      return;
    }

    try {
      if (editingId) {
        // Update existing product
        const response = await apiCall(API_ENDPOINTS.ADMIN_PRODUCT(editingId), {
          method: "PUT",
          body: JSON.stringify({
            ...form,
            price: parseFloat(form.price),
            mrp: form.mrp ? parseFloat(form.mrp) : null,
            stock_quantity: parseInt(form.stock_quantity),
          }),
        });
        if (response.success) {
          setProducts(
            products.map((p) => (p.id === editingId ? response.data : p))
          );
        }
      } else {
        // Create new product
        const response = await apiCall(API_ENDPOINTS.ADMIN_PRODUCTS, {
          method: "POST",
          body: JSON.stringify({
            ...form,
            price: parseFloat(form.price),
            mrp: form.mrp ? parseFloat(form.mrp) : null,
            stock_quantity: parseInt(form.stock_quantity),
          }),
        });
        if (response.success) {
          setProducts([...products, response.data]);
        }
      }

      setShowModal(false);
      setForm(initialFormState);
    } catch (err) {
      setError("Failed to save product");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary transition"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold mb-2">⚠️ Error loading products:</p>
          <p className="mb-3">{error}</p>
          <div className="text-sm bg-red-50 p-3 rounded mt-2">
            <p className="font-semibold mb-2">💡 Troubleshooting:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Ensure backend server is running: <code className="bg-red-200 px-1">npm start</code> in <code className="bg-red-200 px-1">dress-page/server</code></li>
              <li>Check that server is running on port <strong>5001</strong></li>
              <li>Check browser console (F12) for detailed error logs</li>
              <li>API endpoint: <code className="bg-red-200 px-1">{API_ENDPOINTS.PRODUCTS}</code></li>
            </ul>
          </div>
          <button
            onClick={() => fetchProducts()}
            className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            🔄 Retry Loading
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>

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
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      MRP
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
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
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        ₹{parseFloat(product.price).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {product.mrp ? `₹${parseFloat(product.mrp).toFixed(2)}` : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {product.stock_quantity}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.stock_quantity > 20
                              ? "bg-green-100 text-green-800"
                              : product.stock_quantity > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock_quantity > 20 ? "In Stock" : product.stock_quantity > 0 ? "Low Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-primary hover:opacity-80 transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 size={18} />
                        </button>
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
            <p className="text-lg mb-4">📦 No products found</p>
            {products.length === 0 ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
                <p className="text-sm mb-2">The database is empty. Click "Add Product" to create your first product.</p>
                <p className="text-xs text-gray-600">Or products may be loading from the database...</p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No products match your search criteria.</p>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="e.g., Furniture, Electronics, Clothing"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    MRP (₹)
                  </label>
                  <input
                    type="number"
                    name="mrp"
                    value={form.mrp}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock_quantity"
                  value={form.stock_quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Product Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="image.avif"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Product description"
                  rows="3"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminProducts() {
  return (
    <AdminLayout>
      <AdminProductsContent />
    </AdminLayout>
  );
}

export default AdminProducts;
