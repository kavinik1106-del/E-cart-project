import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function WomenDress() {
  const [selectedColor, setSelectedColor] = useState("all");

  const products = [
    {
      id: 201,
      type: "Pant",
      name: "Comfy Pants",
      price: 899,
      mrp: 1699,
      image: "/cpant.webp",
      category: "Women Dresses",
      rating: 4.4,
      reviews: 198,
      tag: "Popular",
      colors: ["Black", "Navy", "Gray"],
      availableColors: ["#000000", "#000080", "#808080"]
    },
    {
      id: 202,
      type: "Shirt",
      name: "Casual Shirt",
      price: 699,
      mrp: 1299,
      image: "/OIP (4).webp",
      category: "Women Dresses",
      rating: 4.3,
      reviews: 165,
      tag: "Trending",
      colors: ["White", "Blue", "Pink"],
      availableColors: ["#FFFFFF", "#0000FF", "#FFC0CB"]
    },
    {
      id: 203,
      type: "Chudi",
      name: "Silk Chudi",
      price: 1199,
      mrp: 1999,
      image: "/chutti.webp",
      category: "Women Dresses",
      rating: 4.5,
      reviews: 212,
      tag: "Bestseller",
      colors: ["Red", "Green", "Purple"],
      availableColors: ["#FF0000", "#008000", "#800080"]
    },
    {
      id: 204,
      type: "T-Shirt",
      name: "Everyday Tee",
      price: 399,
      mrp: 699,
      image: "/OIP (5).webp",
      category: "Women Dresses",
      rating: 4.2,
      reviews: 287,
      tag: "Sale",
      colors: ["Black", "White", "Gray"],
      availableColors: ["#000000", "#FFFFFF", "#808080"]
    },
    {
      id: 205,
      type: "Kurta",
      name: "Anarkali Kurta",
      price: 1499,
      mrp: 2499,
      image: "/oip1.avif",
      category: "Women Dresses",
      rating: 4.6,
      reviews: 234,
      tag: "Premium",
      colors: ["Maroon", "Cream", "Navy"],
      availableColors: ["#800000", "#FFFDD0", "#000080"]
    },
    {
      id: 206,
      type: "Lehenga",
      name: "Festive Lehenga",
      price: 2999,
      mrp: 4999,
      image: "/OIP (6).webp",
      category: "Women Dresses",
      rating: 4.7,
      reviews: 156,
      tag: "Premium",
      colors: ["Red", "Gold", "Purple"],
      availableColors: ["#FF0000", "#FFD700", "#800080"]
    },
    {
      id: 207,
      type: "Saree",
      name: "Banarasi Silk Saree",
      price: 2499,
      mrp: 3999,
      image: "/saree1.webp",
      category: "Women Dresses",
      rating: 4.5,
      reviews: 189,
      tag: "Traditional",
      colors: ["Red", "Blue", "Green"],
      availableColors: ["#FF0000", "#0000FF", "#008000"]
    },
    {
      id: 208,
      type: "Dress",
      name: "Party Wear Dress",
      price: 1999,
      mrp: 2999,
      image: "/dress1.webp",
      category: "Women Dresses",
      rating: 4.4,
      reviews: 167,
      tag: "Party",
      colors: ["Black", "Red", "Navy"],
      availableColors: ["#000000", "#FF0000", "#000080"]
    }
  ];

  const colorOptions = [
    { name: "All Colors", value: "all", color: "linear-gradient(45deg, #FF0000, #0000FF, #00FF00, #FFFF00, #FF00FF)" },
    { name: "Red", value: "red", color: "#FF0000" },
    { name: "Blue", value: "blue", color: "#0000FF" },
    { name: "Pink", value: "pink", color: "#FFC0CB" },
    { name: "Black", value: "black", color: "#000000" },
    { name: "White", value: "white", color: "#FFFFFF" },
    { name: "Green", value: "green", color: "#008000" },
    { name: "Purple", value: "purple", color: "#800080" }
  ];

  const filteredProducts = selectedColor === "all" 
    ? products 
    : products.filter(product => 
        product.colors.some(color => color.toLowerCase().includes(selectedColor))
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />

      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Women's Collection</h1>
          <p className="text-blue-100">
            Premium dresses, kurtas & ethnic wear
          </p>
        </div>
      </div>

      {/* Color Filter */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by Color</h3>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption.value}
                onClick={() => setSelectedColor(colorOption.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === colorOption.value
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
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

      {/* Filter & Sort */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span>{" "}
          products
        </p>
        <select className="px-4 py-2 border rounded-lg text-sm">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
          <option>Best Ratings</option>
        </select>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              products={products}
              showRating={true}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default WomenDress;
