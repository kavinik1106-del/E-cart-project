import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import { menProducts } from "./data/menProducts.js";

function MenDress() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navbar />

      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-8 text-center shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Men's Collection</h1>
          <p className="text-blue-100">Premium clothing for the modern man - from casual to formal</p>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-4 justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{menProducts.length}</span> products
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
          <option>Best Ratings</option>
        </select>
      </div>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {menProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              products={menProducts}
              showRating={true}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default MenDress;
