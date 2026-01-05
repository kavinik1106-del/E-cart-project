import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import { vegetableProducts } from "./data/vegetableProducts.js";

function Vegetables() {
  return (
    <div className="min-h-screen bg-primary/10">
      <Navbar />

      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <div className="bg-primary text-white rounded-2xl p-8 text-center shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Fresh & Organic</h1>
          <p className="text-green-100">Farm fresh vegetables and authentic Indian spices delivered daily</p>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-4 justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{vegetableProducts.length}</span> products
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Best Ratings</option>
          <option>Freshest</option>
        </select>
      </div>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {vegetableProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              products={vegetableProducts}
              showRating={true}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Vegetables;
