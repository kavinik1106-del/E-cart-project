import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import { womenProducts } from "./data/womenProducts.js";

function WomenDress() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <Navbar />

      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl p-8 text-center shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Women's Collection</h1>
          <p className="text-pink-100">Discover our curated selection of premium dresses, kurtas, and ethnic wear</p>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-4 justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{womenProducts.length}</span> products
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent">
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
          {womenProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              products={womenProducts}
              showRating={true}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default WomenDress;
