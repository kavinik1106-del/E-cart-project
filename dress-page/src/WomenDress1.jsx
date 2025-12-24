import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function WomenDress() {
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
    },
    {
      id: 207,
      type: "Midi",
      name: "Midi Calf Dress",
      price: 2999,
      mrp: 4499,
      image: "/mdi.webp",
      category: "Women Dresses",
      rating: 4.5,
      reviews: 189,
      tag: "Popular",
    },
    {
      id: 208,
      type: "Dress",
      name: "Chiffon Dress",
      price: 2999,
      mrp: 4799,
      image: "/chiff.webp",
      category: "Women Dresses",
      rating: 4.6,
      reviews: 201,
      tag: "Trending",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <Navbar />

      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl p-8 text-center shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Women's Collection</h1>
          <p className="text-pink-100">
            Premium dresses, kurtas & ethnic wear
          </p>
        </div>
      </div>

      {/* Filter & Sort */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{products.length}</span>{" "}
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
          {products.map((product) => (
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
