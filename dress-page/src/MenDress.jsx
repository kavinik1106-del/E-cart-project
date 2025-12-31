import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import { Filter, Search, Grid, List, SlidersHorizontal, Shirt } from "lucide-react";

function MenDress() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const products = [
    {
      id: 101,
      type: "Pant",
      name: "Classic Slim Chinos",
      price: 999,
      mrp: 1999,
      image: "/chino.avif",
      category: "Bottomwear",
      brand: "ClassicWear",
      rating: 4.5,
      reviews: 234,
      discount: 50,
      tag: "Bestseller",
      sizeGuide: {
        "28": { price: 999, stock: 12 },
        "30": { price: 999, stock: 18 },
        "32": { price: 999, stock: 15 },
        "34": { price: 999, stock: 20 },
        "36": { price: 999, stock: 10 },
        "38": { price: 999, stock: 8 }
      },
      colors: ["Beige", "Navy", "Black", "Gray"],
      availableColors: ["#F5F5DC", "#000080", "#000000", "#808080"],
      description: "Premium slim-fit chinos with stretch fabric and perfect tailoring for modern men."
    },
    {
      id: 102,
      type: "Shirt",
      name: "Oxford Formal Shirt",
      price: 799,
      mrp: 1499,
      image: "/OIP.jpg",
      category: "Shirts",
      brand: "FormalStyle",
      rating: 4.4,
      reviews: 187,
      discount: 47,
      tag: "Popular",
      sizeGuide: {
        "S": { price: 799, stock: 10 },
        "M": { price: 799, stock: 15 },
        "L": { price: 799, stock: 12 },
        "XL": { price: 799, stock: 18 },
        "XXL": { price: 799, stock: 8 }
      },
      colors: ["White", "Light Blue", "Gray", "Black"],
      availableColors: ["#FFFFFF", "#ADD8E6", "#808080", "#000000"],
      description: "Classic Oxford shirt with button-down collar, perfect for office and formal occasions."
    },
    {
      id: 103,
      type: "T-Shirt",
      name: "Comfort Cotton Tee",
      price: 399,
      mrp: 699,
      image: "/OIP (7).webp",
      category: "T-Shirts",
      brand: "ComfortWear",
      rating: 4.3,
      reviews: 290,
      discount: 43,
      tag: "Sale",
      sizeGuide: {
        "S": { price: 399, stock: 20 },
        "M": { price: 399, stock: 25 },
        "L": { price: 399, stock: 22 },
        "XL": { price: 399, stock: 18 },
        "XXL": { price: 399, stock: 15 }
      },
      colors: ["White", "Black", "Navy", "Gray", "Red"],
      availableColors: ["#FFFFFF", "#000000", "#000080", "#808080", "#FF0000"],
      description: "Ultra-soft cotton t-shirt with comfortable fit and durable fabric for everyday wear."
    },
    {
      id: 104,
      type: "Jacket",
      name: "Vintage Denim Jacket",
      price: 1999,
      mrp: 3299,
      image: "/denim.webp",
      category: "Outerwear",
      brand: "DenimStyle",
      rating: 4.6,
      reviews: 156,
      discount: 39,
      tag: "Trending",
      sizeGuide: {
        "S": { price: 1999, stock: 8 },
        "M": { price: 1999, stock: 12 },
        "L": { price: 1999, stock: 15 },
        "XL": { price: 1999, stock: 10 },
        "XXL": { price: 1999, stock: 6 }
      },
      colors: ["Blue", "Black", "Gray"],
      availableColors: ["#0000FF", "#000000", "#808080"],
      description: "Classic denim jacket with vintage wash and premium stitching for timeless style."
    },
    {
      id: 105,
      type: "Shorts",
      name: "Casual Cargo Shorts",
      price: 449,
      mrp: 899,
      image: "/shorts.avif",
      category: "Bottomwear",
      brand: "CasualWear",
      rating: 4.2,
      reviews: 145,
      discount: 50,
      tag: "New",
      sizeGuide: {
        "28": { price: 449, stock: 15 },
        "30": { price: 449, stock: 20 },
        "32": { price: 449, stock: 18 },
        "34": { price: 449, stock: 12 },
        "36": { price: 449, stock: 8 }
      },
      colors: ["Khaki", "Black", "Navy", "Olive"],
      availableColors: ["#F0E68C", "#000000", "#000080", "#808000"],
      description: "Comfortable cargo shorts with multiple pockets and relaxed fit for casual outings."
    },
    {
      id: 106,
      type: "Sweater",
      name: "Merino Wool Sweater",
      price: 1299,
      mrp: 2199,
      image: "/wool.webp",
      category: "Sweaters",
      brand: "WinterWear",
      rating: 4.5,
      reviews: 203,
      discount: 41,
      tag: "Premium",
      sizeGuide: {
        "S": { price: 1299, stock: 10 },
        "M": { price: 1299, stock: 15 },
        "L": { price: 1299, stock: 12 },
        "XL": { price: 1299, stock: 8 },
        "XXL": { price: 1299, stock: 5 }
      },
      colors: ["Navy", "Gray", "Black", "Burgundy"],
      availableColors: ["#000080", "#808080", "#000000", "#800020"],
      description: "Luxurious merino wool sweater with excellent warmth and breathability."
    },
    {
      id: 107,
      type: "Kurta",
      name: "Cotton Straight Kurta",
      price: 1099,
      mrp: 1899,
      image: "/kurta.jpg",
      category: "Ethnic Wear",
      brand: "EthnicStyle",
      rating: 4.4,
      reviews: 167,
      discount: 42,
      tag: "Popular",
      sizeGuide: {
        "S": { price: 1099, stock: 8 },
        "M": { price: 1099, stock: 12 },
        "L": { price: 1099, stock: 15 },
        "XL": { price: 1099, stock: 10 },
        "XXL": { price: 1099, stock: 6 }
      },
      colors: ["White", "Cream", "Light Blue", "Gray"],
      availableColors: ["#FFFFFF", "#FFFDD0", "#ADD8E6", "#808080"],
      description: "Traditional cotton kurta with straight cut and comfortable fit for festive occasions."
    },
    {
      id: 108,
      type: "Sherwani",
      name: "Embroidered Wedding Sherwani",
      price: 5999,
      mrp: 9999,
      image: "/sherwa.webp",
      category: "Ethnic Wear",
      brand: "RoyalWedding",
      rating: 4.7,
      reviews: 89,
      discount: 40,
      tag: "Premium",
      sizeGuide: {
        "36": { price: 5999, stock: 4 },
        "38": { price: 5999, stock: 6 },
        "40": { price: 5999, stock: 5 },
        "42": { price: 5999, stock: 3 },
        "44": { price: 5999, stock: 2 }
      },
      colors: ["Cream", "Maroon", "Navy"],
      availableColors: ["#FFFDD0", "#800000", "#000080"],
      description: "Exquisite embroidered sherwani for weddings with premium fabric and intricate craftsmanship."
    },
    {
      id: 109,
      type: "Jeans",
      name: "Slim Fit Dark Wash Jeans",
      price: 1499,
      mrp: 2299,
      image: "/denim.webp",
      category: "Bottomwear",
      brand: "DenimStyle",
      rating: 4.3,
      reviews: 312,
      discount: 35,
      sizeGuide: {
        "28": { price: 1499, stock: 10 },
        "30": { price: 1499, stock: 15 },
        "32": { price: 1499, stock: 12 },
        "34": { price: 1499, stock: 18 },
        "36": { price: 1499, stock: 8 },
        "38": { price: 1499, stock: 6 }
      },
      colors: ["Dark Blue", "Black", "Gray"],
      availableColors: ["#00008B", "#000000", "#808080"],
      description: "Premium slim-fit jeans with dark wash and stretch comfort for modern styling."
    },
    {
      id: 110,
      type: "Blazer",
      name: "Formal Wool Blazer",
      price: 3499,
      mrp: 4999,
      image: "/blazer.webp",
      category: "Outerwear",
      brand: "FormalWear",
      rating: 4.6,
      reviews: 178,
      discount: 30,
      tag: "Professional",
      sizeGuide: {
        "36": { price: 3499, stock: 5 },
        "38": { price: 3499, stock: 8 },
        "40": { price: 3499, stock: 10 },
        "42": { price: 3499, stock: 6 },
        "44": { price: 3499, stock: 4 }
      },
      colors: ["Navy", "Black", "Gray", "Charcoal"],
      availableColors: ["#000080", "#000000", "#808080", "#36454F"],
      description: "Professional wool blazer with structured shoulders and premium tailoring."
    }
  ];

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Men's Collection
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Elevate your style with our premium collection of men's fashion, from casual to formal wear
            </p>
            <div className="flex items-center justify-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <Shirt className="w-5 h-5 text-yellow-300" />
                <span>{products.length} Quality Products</span>
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
                placeholder="Search men's fashion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
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
            <div className="text-6xl mb-4">👔</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenDress;
