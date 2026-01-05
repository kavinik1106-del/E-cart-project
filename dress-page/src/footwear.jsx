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
      reviews: 245,
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
      reviews: 189,
      image: "/footm.jpg",
      discount: 28
    },
    {
      id: 3,
      brand: "Puma",
      category: "Casual Shoes",
      name: "Puma Smash V2",
      price: 3299,
      mrp: 4499,
      rating: 4.4,
      reviews: 156,
      image: "/footw.jpg",
      discount: 27
    },
    {
      id: 4,
      brand: "Bata",
      category: "Formal Shoes",
      name: "Bata Office Wear",
      price: 2199,
      mrp: 2999,
      rating: 4.2,
      reviews: 98,
      image: "/footk1.jpg",
      discount: 27
    },
    {
      id: 5,
      brand: "Nike",
      category: "Sneakers",
      name: "Nike Revolution",
      price: 4899,
      mrp: 6499,
      rating: 4.5,
      reviews: 167,
      image: "/footm1.jpg",
      discount: 25
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: 3999,
      mrp: 5499,
      rating: 4.3,
      reviews: 134,
      image: "/footw1.jpg",
      discount: 27
    },
    {
      id: 7,
      brand: "Puma",
      category: "Running Shoes",
      name: "Puma Deviate Nitro",
      price: 4999,
      mrp: 6999,
      rating: 4.4,
      reviews: 112,
      image: "/footk2.jpg",
      discount: 29
    },
    {
      id: 8,
      brand: "Nike",
      category: "Casual Shoes",
      name: "Nike Air Force 1",
      price: 5499,
      mrp: 7499,
      rating: 4.8,
      reviews: 203,
      image: "/footw2.jpg",
      discount: 27
    },
    {
      id: 9,
      brand: "Adidas",
      category: "Sneakers",
      name: "Adidas Stan Smith",
      price: 4299,
      mrp: 5999,
      rating: 4.5,
      reviews: 178,
      image: "/footm2.jpg",
      discount: 28
    },
    {
      id: 10,
      brand: "Bata",
      category: "Casual Shoes",
      name: "Bata Comfort Plus",
      price: 1799,
      mrp: 2499,
      rating: 4.1,
      reviews: 89,
      image: "/footk3.jpg",
      discount: 28
    },
    {
      id: 11,
      brand: "Puma",
      category: "Sports Shoes",
      name: "Puma Future Rider",
      price: 3799,
      mrp: 4999,
      rating: 4.3,
      reviews: 145,
      image: "/footw3.jpg",
      discount: 24
    },
    {
      id: 12,
      brand: "Nike",
      category: "Basketball Shoes",
      name: "Nike LeBron",
      price: 6999,
      mrp: 8999,
      rating: 4.7,
      reviews: 267,
      image: "/footm3.jpg",
      discount: 22
    },
    {
      id: 13,
      brand: "Adidas",
      category: "Training Shoes",
      name: "Adidas Predator",
      price: 5999,
      mrp: 7999,
      rating: 4.6,
      reviews: 198,
      image: "/footk4.jpg",
      discount: 25
    },
    {
      id: 14,
      brand: "Bata",
      category: "Sandals",
      name: "Bata Hawaii",
      price: 999,
      mrp: 1399,
      rating: 4.0,
      reviews: 76,
      image: "/footw4.jpg",
      discount: 29
    },
    {
      id: 15,
      brand: "Puma",
      category: "Sneakers",
      name: "Puma Cali",
      price: 2999,
      mrp: 3999,
      rating: 4.4,
      reviews: 134,
      image: "/footm4.jpg",
      discount: 25
    },
    {
      id: 16,
      brand: "Nike",
      category: "Walking Shoes",
      name: "Nike Pegasus",
      price: 5799,
      mrp: 7499,
      rating: 4.5,
      reviews: 189,
      image: "/footw1.jpg",
      discount: 23
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Header Card */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-white text-primary rounded-2xl p-5 text-center shadow-md border-2 border-primary">
          <h1 className="text-2xl font-bold">Footwear</h1>
          <p className="text-sm mt-1">
            Nike, Adidas, Puma & Bata Shoes
          </p>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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

export default Footwear;
