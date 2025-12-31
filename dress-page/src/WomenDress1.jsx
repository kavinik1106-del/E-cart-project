import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import { Filter, Search, Grid, List, SlidersHorizontal, Heart } from "lucide-react";

function WomenDress() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const products = [
    {
      id: 201,
      type: "Pant",
      name: "Comfy Cotton Pants",
      price: 899,
      mrp: 1699,
      image: "/cpant.webp",
      category: "Bottomwear",
      brand: "ComfortWear",
      rating: 4.4,
      reviews: 198,
      discount: 47,
      tag: "Popular",
      sizeGuide: {
        "S": { price: 899, stock: 15 },
        "M": { price: 899, stock: 20 },
        "L": { price: 899, stock: 18 },
        "XL": { price: 899, stock: 12 },
        "XXL": { price: 899, stock: 8 }
      },
      colors: ["Black", "Navy", "Gray"],
      availableColors: ["#000000", "#000080", "#808080"],
      description: "Ultra-comfortable cotton pants perfect for everyday wear with excellent stretch and fit."
    },
    {
      id: 202,
      type: "Shirt",
      name: "Casual Cotton Shirt",
      price: 699,
      mrp: 1299,
      image: "/OIP (4).webp",
      category: "Tops",
      brand: "CasualWear",
      rating: 4.3,
      reviews: 165,
      discount: 46,
      tag: "Trending",
      sizeGuide: {
        "S": { price: 699, stock: 12 },
        "M": { price: 699, stock: 18 },
        "L": { price: 699, stock: 15 },
        "XL": { price: 699, stock: 10 },
        "XXL": { price: 699, stock: 6 }
      },
      colors: ["White", "Blue", "Pink"],
      availableColors: ["#FFFFFF", "#0000FF", "#FFC0CB"],
      description: "Lightweight cotton shirt with modern fit and versatile styling for any occasion."
    },
    {
      id: 203,
      type: "Chudi",
      name: "Silk Churidar Set",
      price: 1199,
      mrp: 1999,
      image: "/chutti.webp",
      category: "Ethnic Wear",
      brand: "EthnicStyle",
      rating: 4.5,
      reviews: 212,
      discount: 40,
      tag: "Bestseller",
      sizeGuide: {
        "S": { price: 1199, stock: 8 },
        "M": { price: 1199, stock: 15 },
        "L": { price: 1199, stock: 12 },
        "XL": { price: 1199, stock: 10 },
        "XXL": { price: 1199, stock: 5 }
      },
      colors: ["Red", "Green", "Purple"],
      availableColors: ["#FF0000", "#008000", "#800080"],
      description: "Elegant silk churidar set with intricate embroidery and traditional design."
    },
    {
      id: 204,
      type: "T-Shirt",
      name: "Everyday Cotton Tee",
      price: 399,
      mrp: 699,
      image: "/OIP (5).webp",
      category: "Tops",
      brand: "DailyWear",
      rating: 4.2,
      reviews: 287,
      discount: 43,
      tag: "Sale",
      sizeGuide: {
        "S": { price: 399, stock: 25 },
        "M": { price: 399, stock: 30 },
        "L": { price: 399, stock: 28 },
        "XL": { price: 399, stock: 20 },
        "XXL": { price: 399, stock: 15 }
      },
      colors: ["Black", "White", "Gray"],
      availableColors: ["#000000", "#FFFFFF", "#808080"],
      description: "Soft cotton t-shirt with comfortable fit and durable fabric for daily wear."
    },
    {
      id: 205,
      type: "Kurta",
      name: "Anarkali Embroidered Kurta",
      price: 1499,
      mrp: 2499,
      image: "/oip1.avif",
      category: "Ethnic Wear",
      brand: "RoyalFashion",
      rating: 4.6,
      reviews: 234,
      discount: 40,
      tag: "Premium",
      sizeGuide: {
        "S": { price: 1499, stock: 6 },
        "M": { price: 1499, stock: 10 },
        "L": { price: 1499, stock: 8 },
        "XL": { price: 1499, stock: 12 },
        "XXL": { price: 1499, stock: 4 }
      },
      colors: ["Maroon", "Cream", "Navy"],
      availableColors: ["#800000", "#FFFDD0", "#000080"],
      description: "Beautiful Anarkali kurta with intricate embroidery and premium fabric."
    },
    {
      id: 206,
      type: "Lehenga",
      name: "Festive Bridal Lehenga",
      price: 2999,
      mrp: 4999,
      image: "/OIP (6).webp",
      category: "Ethnic Wear",
      brand: "BridalCollection",
      rating: 4.7,
      reviews: 156,
      discount: 40,
      tag: "Premium",
      sizeGuide: {
        "S": { price: 2999, stock: 3 },
        "M": { price: 2999, stock: 5 },
        "L": { price: 2999, stock: 4 },
        "XL": { price: 2999, stock: 6 },
        "XXL": { price: 2999, stock: 2 }
      },
      colors: ["Red", "Gold", "Purple"],
      availableColors: ["#FF0000", "#FFD700", "#800080"],
      description: "Exquisite bridal lehenga with heavy embroidery and traditional craftsmanship."
    },
    {
      id: 207,
      type: "Saree",
      name: "Banarasi Silk Saree",
      price: 2499,
      mrp: 3999,
      image: "/saree1.webp",
      category: "Ethnic Wear",
      brand: "BanarasiSilk",
      rating: 4.5,
      reviews: 189,
      discount: 38,
      tag: "Traditional",
      sizeGuide: {
        "One Size": { price: 2499, stock: 8 }
      },
      colors: ["Red", "Blue", "Green"],
      availableColors: ["#FF0000", "#0000FF", "#008000"],
      description: "Authentic Banarasi silk saree with gold zari work and traditional motifs."
    },
    {
      id: 208,
      type: "Dress",
      name: "Party Wear Maxi Dress",
      price: 1999,
      mrp: 2999,
      image: "/dress1.webp",
      category: "Dresses",
      brand: "PartyWear",
      rating: 4.4,
      reviews: 167,
      discount: 33,
      tag: "Party",
      sizeGuide: {
        "S": { price: 1999, stock: 7 },
        "M": { price: 1999, stock: 12 },
        "L": { price: 1999, stock: 10 },
        "XL": { price: 1999, stock: 8 },
        "XXL": { price: 1999, stock: 5 }
      },
      colors: ["Black", "Red", "Navy"],
      availableColors: ["#000000", "#FF0000", "#000080"],
      description: "Elegant maxi dress perfect for parties and special occasions with flowing silhouette."
    },
    {
      id: 209,
      type: "Jeans",
      name: "Slim Fit Denim Jeans",
      price: 1299,
      mrp: 1999,
      image: "/denim.webp",
      category: "Bottomwear",
      brand: "DenimStyle",
      rating: 4.3,
      reviews: 245,
      discount: 35,
      sizeGuide: {
        "26": { price: 1299, stock: 8 },
        "28": { price: 1299, stock: 12 },
        "30": { price: 1299, stock: 15 },
        "32": { price: 1299, stock: 10 },
        "34": { price: 1299, stock: 6 }
      },
      colors: ["Blue", "Black", "Gray"],
      availableColors: ["#0000FF", "#000000", "#808080"],
      description: "Premium denim jeans with perfect fit and comfortable stretch fabric."
    },
    {
      id: 210,
      type: "Jacket",
      name: "Winter Wool Jacket",
      price: 2499,
      mrp: 3499,
      image: "/jacket.webp",
      category: "Outerwear",
      brand: "WinterWear",
      rating: 4.6,
      reviews: 178,
      discount: 29,
      tag: "Winter Special",
      sizeGuide: {
        "S": { price: 2499, stock: 6 },
        "M": { price: 2499, stock: 10 },
        "L": { price: 2499, stock: 8 },
        "XL": { price: 2499, stock: 12 },
        "XXL": { price: 2499, stock: 4 }
      },
      colors: ["Black", "Navy", "Gray"],
      availableColors: ["#000000", "#000080", "#808080"],
      description: "Warm wool jacket with modern design and excellent insulation for cold weather."
    }
  ];

  const categories = ["All", ...new Set(products.map(p => p.category))];
  const colorOptions = [
    { name: "All Colors", value: "all", color: "linear-gradient(45deg, #FF0000, #0000FF, #00FF00, #FFFF00, #FF00FF)" },
    { name: "Red", value: "red", color: "#FF0000" },
    { name: "Blue", value: "blue", color: "#0000FF" },
    { name: "Pink", value: "pink", color: "#FFC0CB" },
    { name: "Black", value: "black", color: "#000000" },
    { name: "White", value: "white", color: "#FFFFFF" },
    { name: "Green", value: "green", color: "#008000" },
    { name: "Purple", value: "purple", color: "#800080" },
    { name: "Gray", value: "gray", color: "#808080" },
    { name: "Navy", value: "navy", color: "#000080" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesColor = selectedColor === "all" ||
                        product.colors.some(color => color.toLowerCase().includes(selectedColor));
    return matchesSearch && matchesCategory && matchesColor;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return b.discount - a.discount;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Women's Collection
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover elegance and style with our premium collection of dresses, ethnic wear, and fashion essentials
            </p>
            <div className="flex items-center justify-center gap-6 text-pink-100">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-yellow-300" />
                <span>{products.length} Stylish Products</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Free Shipping Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search women's fashion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Color Filter */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-pink-400"></div>
              Filter by Color
            </h3>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => setSelectedColor(colorOption.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === colorOption.value
                      ? "border-pink-500 bg-pink-50 text-pink-700 shadow-md"
                      : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ background: colorOption.color }}
                  ></div>
                  <span className="text-sm font-medium">{colorOption.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        }`}>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              products={sortedProducts}
              showRating={true}
            />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👗</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WomenDress;
