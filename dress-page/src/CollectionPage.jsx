import React, { useState, useMemo } from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import PRODUCTS from "./data/products.js";
import { Filter, Grid, List, ChevronDown } from "lucide-react";

function CollectionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [viewMode, setViewMode] = useState("grid");

  // Get all products from all categories
  const allProducts = [
    ...PRODUCTS.electronics,
    ...PRODUCTS.fashion,
    ...PRODUCTS.mensWear,
    ...PRODUCTS.footwear,
    ...PRODUCTS.accessories,
    ...PRODUCTS.home,
    ...PRODUCTS.bicycles,
    ...PRODUCTS.kidsWear,
    ...PRODUCTS.vegetables,
  ];

  const categories = [
    { id: "all", name: "All Products", count: allProducts.length },
    { id: "electronics", name: "Electronics", count: PRODUCTS.electronics.length },
    { id: "fashion", name: "Women Fashion", count: PRODUCTS.fashion.length },
    { id: "mensWear", name: "Men Fashion", count: PRODUCTS.mensWear.length },
    { id: "footwear", name: "Footwear", count: PRODUCTS.footwear.length },
    { id: "accessories", name: "Accessories", count: PRODUCTS.accessories.length },
    { id: "home", name: "Home & Furniture", count: PRODUCTS.home.length },
    { id: "bicycles", name: "Bicycles & Sports", count: PRODUCTS.bicycles.length },
    { id: "kidsWear", name: "Kids Fashion", count: PRODUCTS.kidsWear.length },
    { id: "vegetables", name: "Vegetables", count: PRODUCTS.vegetables.length },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    return filtered;
  }, [searchTerm, sortBy, selectedCategory, priceRange]);

  return (
    <div className="bg-gray-100 min-h-screen pt-48">
      <Navbar />

      <div className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Complete Collection</h1>
          <p className="text-gray-600">Browse all products from our entire catalog</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-48">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Filter size={20} /> Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6 pb-6 border-b">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        selectedCategory === cat.id
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{cat.name}</span>
                        <span className="text-xs bg-gray-200 rounded-full px-2 py-1">{cat.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200000])}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <p className="text-xs text-gray-600">₹{priceRange[0]} - ₹{priceRange[1]}</p>
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Minimum Rating</label>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label key={star} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{"★".repeat(star)}{"☆".repeat(5 - star)} & up</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Sort & View Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-semibold text-gray-800">
                Found <span className="text-blue-600">{filteredProducts.length}</span> products
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="discount">Highest Discount</option>
                </select>
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 gap-4" : "space-y-4"}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showRating={true} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
