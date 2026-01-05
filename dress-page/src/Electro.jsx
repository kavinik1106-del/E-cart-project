import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import { Filter, Search, Grid, List, SlidersHorizontal } from "lucide-react";

function Electro() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 149900,
      mrp: 159900,
      image: "/mobile.jpg",
      rating: 4.8,
      reviews: 1247,
      category: "Smartphones",
      brand: "Apple",
      discount: 6,
      tag: "Bestseller",
      sizeGuide: {
        "256GB": { price: 149900, stock: 15 },
        "512GB": { price: 169900, stock: 8 },
        "1TB": { price: 189900, stock: 3 }
      },
      colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
      description: "The most advanced iPhone with Pro camera system, A17 Pro chip, and titanium design."
    },
    {
      id: 2,
      name: "MacBook Pro 16\" M3 Max",
      price: 329900,
      mrp: 349900,
      image: "/laptop.webp",
      rating: 4.9,
      reviews: 892,
      category: "Laptops",
      brand: "Apple",
      discount: 6,
      tag: "Premium",
      sizeGuide: {
        "16GB RAM, 512GB SSD": { price: 329900, stock: 5 },
        "32GB RAM, 1TB SSD": { price: 369900, stock: 3 },
        "48GB RAM, 2TB SSD": { price: 409900, stock: 1 }
      },
      colors: ["Space Black", "Silver", "Space Gray"],
      description: "Supercharged by M3 Max chip with up to 48GB RAM and professional performance."
    },
    {
      id: 3,
      name: "Apple Watch Series 9 GPS",
      price: 41900,
      mrp: 45900,
      image: "/smartwatch.webp",
      rating: 4.7,
      reviews: 2156,
      category: "Wearables",
      brand: "Apple",
      discount: 9,
      sizeGuide: {
        "41mm": { price: 41900, stock: 12 },
        "45mm": { price: 43900, stock: 8 }
      },
      colors: ["Midnight", "Starlight", "Silver", "Pink", "Product Red"],
      description: "Advanced health, fitness, and safety features with S9 chip."
    },
    {
      id: 4,
      name: "Samsung Galaxy Tab S9+",
      price: 75900,
      mrp: 85900,
      image: "/OIP (3).webp",
      rating: 4.6,
      reviews: 634,
      category: "Tablets",
      brand: "Samsung",
      discount: 12,
      sizeGuide: {
        "8GB RAM, 128GB": { price: 75900, stock: 10 },
        "12GB RAM, 256GB": { price: 85900, stock: 6 },
        "12GB RAM, 512GB": { price: 95900, stock: 4 }
      },
      colors: ["Graphite", "Silver", "Beige"],
      description: "Premium Android tablet with S Pen, 120Hz display, and Snapdragon 8 Gen 2."
    },
    {
      id: 5,
      name: "Sony WH-1000XM5 Headphones",
      price: 29990,
      mrp: 34990,
      image: "/noicehead.jpg",
      rating: 4.8,
      reviews: 3421,
      category: "Audio",
      brand: "Sony",
      discount: 14,
      sizeGuide: {
        "One Size": { price: 29990, stock: 20 }
      },
      colors: ["Black", "Silver", "Blue"],
      description: "Industry-leading noise canceling with 30-hour battery and premium comfort."
    },
    {
      id: 6,
      name: "Dell XPS 13 Plus Laptop",
      price: 129900,
      mrp: 149900,
      image: "/OIP (9).webp",
      rating: 4.5,
      reviews: 756,
      category: "Laptops",
      brand: "Dell",
      discount: 13,
      sizeGuide: {
        "16GB RAM, 512GB SSD": { price: 129900, stock: 7 },
        "32GB RAM, 1TB SSD": { price: 149900, stock: 4 }
      },
      colors: ["Platinum", "Graphite"],
      description: "Ultra-thin laptop with 12th Gen Intel processors and InfinityEdge display."
    },
    {
      id: 7,
      name: "Samsung 55\" 4K Smart TV",
      price: 64900,
      mrp: 79900,
      image: "/OIP (4).webp",
      rating: 4.4,
      reviews: 892,
      category: "TVs",
      brand: "Samsung",
      discount: 19,
      sizeGuide: {
        "43\"": { price: 44900, stock: 8 },
        "55\"": { price: 64900, stock: 12 },
        "65\"": { price: 89900, stock: 5 }
      },
      colors: ["Black"],
      description: "Crystal UHD 4K TV with Tizen OS, HDR10+, and smart features."
    },
    {
      id: 8,
      name: "Logitech MX Master 3S Mouse",
      price: 8990,
      mrp: 10990,
      image: "/keyboard.jpg",
      rating: 4.6,
      reviews: 1543,
      category: "Accessories",
      brand: "Logitech",
      discount: 18,
      sizeGuide: {
        "One Size": { price: 8990, stock: 25 }
      },
      colors: ["Black", "White", "Gray"],
      description: "Advanced wireless mouse with 8K DPI, 70-day battery, and customizable buttons."
    },
    {
      id: 9,
      name: "iPad Pro 12.9\" M2 Chip",
      price: 119900,
      mrp: 129900,
      image: "/th (2).jpg",
      rating: 4.7,
      reviews: 987,
      category: "Tablets",
      brand: "Apple",
      discount: 8,
      sizeGuide: {
        "8GB RAM, 128GB": { price: 119900, stock: 6 },
        "8GB RAM, 256GB": { price: 129900, stock: 4 },
        "16GB RAM, 512GB": { price: 149900, stock: 2 }
      },
      colors: ["Space Gray", "Silver"],
      description: "The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support."
    },
    {
      id: 10,
      name: "Nikon Z6 II Mirrorless Camera",
      price: 154990,
      mrp: 169990,
      image: "/th (1).jpg",
      rating: 4.5,
      reviews: 423,
      category: "Cameras",
      brand: "Nikon",
      discount: 9,
      sizeGuide: {
        "Body Only": { price: 154990, stock: 3 },
        "With 24-70mm Lens": { price: 199990, stock: 2 }
      },
      colors: ["Black"],
      description: "Full-frame mirrorless camera with dual EXPEED 6 processors and 4K video."
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
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-secondary">
              Electronics
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover cutting-edge technology with premium smartphones, laptops, wearables, and more
            </p>
            <div className="flex items-center justify-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>{products.length} Products Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Free Delivery Available</span>
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
                placeholder="Search electronics..."
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
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Electro;
