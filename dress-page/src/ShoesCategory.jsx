import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import { shoeProducts } from "./data/shoeProducts.js";

function ShoesCategory() {
  const [sortBy, setSortBy] = useState("popularity");

  const sortedProducts = [...shoeProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Shoes Collection</h1>
          <p className="text-blue-100">Step into style with our premium shoe collection</p>
          <p className="text-sm text-blue-200 mt-2">{shoeProducts.length} products available</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Sort Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-900">All Shoes</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((shoe) => (
            <ProductCard
              key={shoe.id}
              product={shoe}
              categoryProducts={shoeProducts}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ShoesCategory;
