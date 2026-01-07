import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function Footwear() {
  const products = [
    {
      id: 1,
      brand: "Nike",
      category: "Sports Shoes",
      name: "Nike Air Zoom",
      price: 5999,
      mrp: 7999,
      rating: 4.6,
      reviews: 145,
      image: "/footk.jpg",
      discount: 25
    },
    {
      id: 2,
      brand: "Adidas",
      category: "Running Shoes",
      name: "Adidas Ultraboost",
      price: 6499,
      mrp: 8999,
      rating: 4.7,
      reviews: 162,
      image: "/footm.jpg",
      discount: 28
    },
    {
      id: 3,
      brand: "Puma",
      category: "Casual Shoes",
      name: "Puma Smash V2",
      price: 3299,
      mrp: 4999,
      rating: 4.4,
      reviews: 98,
      image: "/footw.jpg",
      discount: 34
    },
    {
      id: 4,
      brand: "Bata",
      category: "Formal Shoes",
      name: "Bata Office Wear",
      price: 2199,
      mrp: 3499,
      rating: 4.2,
      reviews: 76,
      image: "/footk1.jpg",
      discount: 37
    },
    {
      id: 5,
      brand: "Nike",
      category: "Sneakers",
      name: "Nike Revolution",
      price: 4899,
      mrp: 6499,
      rating: 4.5,
      reviews: 123,
      image: "/footm1.jpg",
      discount: 25
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: 3999,
      mrp: 5999,
      rating: 4.3,
      reviews: 112,
      image: "/footw1.jpg",
      discount: 33
    },
    {
      id: 7,
      brand: "Puma",
      category: "Casual Shoes",
      name: "Puma Court Flex",
      price: 2799,
      mrp: 4299,
      rating: 4.4,
      reviews: 87,
      image: "/footk2.jpg",
      discount: 35
    },
    {
      id: 8,
      brand: "Adidas",
      category: "Formal Shoes",
      name: "Adidas Stan Smith",
      price: 4499,
      mrp: 6499,
      rating: 4.5,
      reviews: 134,
      image: "/footw2.jpg",
      discount: 31
    },
    {
      id: 9,
      brand: "Nike",
      category: "Running Shoes",
      name: "Nike React",
      price: 6999,
      mrp: 9499,
      rating: 4.6,
      reviews: 156,
      image: "/footm2.jpg",
      discount: 26
    },
    {
      id: 10,
      brand: "Skechers",
      category: "Comfort Shoes",
      name: "Skechers Go Walk",
      price: 3499,
      mrp: 5299,
      rating: 4.3,
      reviews: 95,
      image: "/footk3.jpg",
      discount: 34
    },
    {
      id: 11,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas NMD",
      price: 5499,
      mrp: 7999,
      rating: 4.5,
      reviews: 128,
      image: "/footw3.jpg",
      discount: 31
    },
    {
      id: 12,
      brand: "New Balance",
      category: "Running Shoes",
      name: "New Balance 574",
      price: 5299,
      mrp: 7499,
      rating: 4.4,
      reviews: 111,
      image: "/footm3.jpg",
      discount: 29
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Header Card with Primary Color */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-primary text-white rounded-2xl p-6 text-center shadow-lg">
          <h1 className="text-3xl font-bold">Footwear</h1>
          <p className="text-sm mt-2 opacity-90">
            Nike, Adidas, Puma & Bata Shoes
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

export default Footwear;
