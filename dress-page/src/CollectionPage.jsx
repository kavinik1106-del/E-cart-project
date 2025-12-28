import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import { useCart } from "./contexts/CartContext.jsx";
import {
  Filter,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";

function CollectionPage() {
  const { addToCart } = useCart();

  // Enhanced state management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  /* ---------- ENHANCED CATEGORIES ---------- */
  const categories = [
    { id: "all", name: "All Products", image: "/all-products.jpg", count: 156 },
    { id: "electronics", name: "Electronics", image: "/mobile.jpg", count: 45 },
    { id: "women", name: "Women Fashion", image: "/dress1.webp", count: 38 },
    { id: "men", name: "Men Fashion", image: "/men2.jpg", count: 32 },
    { id: "home", name: "Home & Kitchen", image: "/fridge.webp", count: 28 },
    { id: "food", name: "Food & Beverages", image: "/cashew.webp", count: 13 },
  ];

  /* ---------- ENHANCED PRODUCTS ---------- */
  const allProducts = [
    { id: 1, name: "Premium Double Door Fridge", price: 18999, mrp: 22999, image: "/doubledoorfringe.avif", rating: 4.4, reviews: 234, category: "home", brand: "Samsung", discount: 15 },
    { id: 2, name: "Premium Cashew Nuts 500g", price: 699, mrp: 899, image: "/cashew.webp", rating: 4.2, reviews: 156, category: "food", brand: "NutriLife", discount: 22 },
    { id: 3, name: "Luxury Blue Sofa Set", price: 14999, mrp: 18999, image: "/bluesofa.webp", rating: 4.5, reviews: 89, category: "home", brand: "Ikea", discount: 21 },
    { id: 4, name: "Designer Red Kurta", price: 1299, mrp: 1799, image: "/dress1.webp", rating: 4.1, reviews: 67, category: "women", brand: "FabIndia", discount: 28 },
    { id: 5, name: "Modern Sofa Chair", price: 9999, mrp: 12999, image: "/sofa.webp", rating: 4.3, reviews: 123, category: "home", brand: "Godrej", discount: 23 },
    { id: 6, name: "iPhone 15 Pro Max", price: 12499, mrp: 13999, image: "/mobile.jpg", rating: 4.6, reviews: 445, category: "electronics", brand: "Apple", discount: 11 },
    { id: 7, name: "Organic Dates 1kg", price: 399, mrp: 499, image: "/dates.jpg", rating: 4.0, reviews: 78, category: "food", brand: "Organic Farms", discount: 20 },
    { id: 8, name: "Silk Wedding Saree", price: 1899, mrp: 2499, image: "/saree2.jpg", rating: 4.3, reviews: 156, category: "women", brand: "Kanchipuram", discount: 24 },
    { id: 9, name: "Apple Watch Series 9", price: 2999, mrp: 3499, image: "/smartwatch.webp", rating: 4.7, reviews: 312, category: "electronics", brand: "Apple", discount: 14 },
    { id: 10, name: "Cotton Kurta Set", price: 1599, mrp: 1999, image: "/dress3.webp", rating: 4.2, reviews: 98, category: "men", brand: "Raymond", discount: 20 },
    { id: 11, name: "MacBook Pro 16\"", price: 199999, mrp: 229999, image: "/laptop.webp", rating: 4.8, reviews: 67, category: "electronics", brand: "Apple", discount: 13 },
    { id: 12, name: "Nike Air Max Shoes", price: 8999, mrp: 11999, image: "/footk.jpg", rating: 4.5, reviews: 234, category: "men", brand: "Nike", discount: 25 },
    { id: 13, name: "Samsung 4K TV 55\"", price: 45999, mrp: 54999, image: "/tv.jpg", rating: 4.6, reviews: 189, category: "electronics", brand: "Samsung", discount: 16 },
    { id: 14, name: "Designer Lehenga", price: 15999, mrp: 19999, image: "/lehenga.jpg", rating: 4.7, reviews: 145, category: "women", brand: "Manish Malhotra", discount: 20 },
    { id: 15, name: "Coffee Maker", price: 3499, mrp: 4499, image: "/coffeemaker.jpg", rating: 4.3, reviews: 87, category: "home", brand: "Philips", discount: 22 },
  ];

  // Filter and sort products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Premium Collection</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover our curated selection of high-quality products at unbeatable prices
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </label>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Results Count */}
                <div className="flex items-end">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">{filteredProducts.length}</span> products found
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">

          {/* Sidebar Categories */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === cat.id
                        ? "bg-blue-500 text-white shadow-md"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-medium">{cat.name}</div>
                        <div className="text-xs opacity-75">{cat.count} items</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === "all" ? "All Products" : categories.find(c => c.id === selectedCategory)?.name}
                <span className="text-gray-500 text-lg ml-2">({filteredProducts.length} items)</span>
              </h2>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}>
                  {paginatedProducts.map((product) => (
                    <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
                      <ProductCard
                        product={product}
                        showRating={true}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-4 py-2 border rounded-lg ${
                              currentPage === pageNum
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
