import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function KidsWear() {
  const products = [
    {
      id: 1,
      category: "Dress",
      name: "Kids Party Dress",
      price: 1299,
      mrp: 1799,
      image: "/kid1.webp",
      rating: 4.5,
      reviews: 87,
      discount: 28
    },
    {
      id: 2,
      category: "Shoes",
      name: "Kids Sports Shoes",
      price: 999,
      mrp: 1499,
      image: "/kid.jpg",
      rating: 4.4,
      reviews: 62,
      discount: 33
    },
    {
      id: 3,
      category: "Innerwear",
      name: "Kids Inner Set",
      price: 399,
      mrp: 599,
      image: "/kid2.jpg",
      rating: 4.2,
      reviews: 45,
      discount: 33
    },
    {
      id: 4,
      category: "Glasses",
      name: "Kids Sunglasses",
      price: 499,
      mrp: 799,
      image: "/kid3.jpg",
      rating: 4.3,
      reviews: 38,
      discount: 38
    },
    {
      id: 5,
      category: "Dress",
      name: "Kids Casual Wear",
      price: 899,
      mrp: 1299,
      image: "/kid4.jpg",
      rating: 4.4,
      reviews: 71,
      discount: 31
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: 699,
      mrp: 999,
      image: "/kid5.jpg",
      rating: 4.2,
      reviews: 54,
      discount: 30
    },
    {
      id: 7,
      category: "Accessories",
      name: "Kids Hair Clips",
      price: 299,
      mrp: 499,
      image: "/kid6.jpg",
      rating: 4.1,
      reviews: 42,
      discount: 40
    },
    {
      id: 8,
      category: "Clothing",
      name: "Kids T-Shirt",
      price: 449,
      mrp: 699,
      image: "/kid7.jpg",
      rating: 4.3,
      reviews: 58,
      discount: 36
    },
    {
      id: 9,
      category: "Footwear",
      name: "Kids Casual Shoes",
      price: 799,
      mrp: 1199,
      image: "/kid8.jpg",
      rating: 4.4,
      reviews: 69,
      discount: 33
    },
    {
      id: 10,
      category: "Outfit",
      name: "Kids Festival Outfit",
      price: 1399,
      mrp: 1999,
      image: "/kid9.jpg",
      rating: 4.5,
      reviews: 76,
      discount: 30
    },
    {
      id: 11,
      category: "Accessories",
      name: "Kids Backpack",
      price: 599,
      mrp: 899,
      image: "/kid10.jpg",
      rating: 4.2,
      reviews: 51,
      discount: 33
    },
    {
      id: 12,
      category: "Clothing",
      name: "Kids Shorts",
      price: 499,
      mrp: 799,
      image: "/kid11.jpg",
      rating: 4.3,
      reviews: 48,
      discount: 38
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Header Card with Primary Color */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-primary text-white rounded-2xl p-6 text-center shadow-lg">
          <h1 className="text-3xl font-bold">Kids Wear</h1>
          <p className="text-sm mt-2 opacity-90">
            Dresses, Shoes, Innerwear & Accessories
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} products={products} showRating={true} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default KidsWear;
