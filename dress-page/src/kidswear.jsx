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
      reviews: 89,
      discount: 28
    },
    {
      id: 2,
      category: "Shoes",
      name: "Kids Sports Shoes",
      price: 999,
      mrp: 1399,
      image: "/kid.jpg",
      rating: 4.3,
      reviews: 67,
      discount: 29
    },
    {
      id: 3,
      category: "Innerwear",
      name: "Kids Inner Set",
      price: 399,
      mrp: 599,
      image: "/kid2.jpg",
      rating: 4.1,
      reviews: 45,
      discount: 33
    },
    {
      id: 4,
      category: "Glasses",
      name: "Kids Sunglasses",
      price: 499,
      mrp: 699,
      image: "/kid3.jpg",
      rating: 4.2,
      reviews: 34,
      discount: 29
    },
    {
      id: 5,
      category: "Dress",
      name: "Kids Casual Wear",
      price: 899,
      mrp: 1199,
      image: "/kid4.jpg",
      rating: 4.4,
      reviews: 78,
      discount: 25
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: 699,
      mrp: 999,
      image: "/kid5.jpg",
      rating: 4.0,
      reviews: 56,
      discount: 30
    },
    {
      id: 7,
      category: "Shoes",
      name: "Kids Canvas Shoes",
      price: 799,
      mrp: 1099,
      image: "/kid6.jpg",
      rating: 4.3,
      reviews: 42,
      discount: 27
    },
    {
      id: 8,
      category: "Dress",
      name: "Kids Summer Dress",
      price: 649,
      mrp: 899,
      image: "/kid7.jpg",
      rating: 4.6,
      reviews: 91,
      discount: 28
    },
    {
      id: 9,
      category: "Accessories",
      name: "Kids Cap",
      price: 299,
      mrp: 399,
      image: "/kid8.jpg",
      rating: 3.9,
      reviews: 23,
      discount: 25
    },
    {
      id: 10,
      category: "Innerwear",
      name: "Kids Socks Set",
      price: 199,
      mrp: 299,
      image: "/kid9.jpg",
      rating: 4.2,
      reviews: 67,
      discount: 33
    },
    {
      id: 11,
      category: "Dress",
      name: "Kids Winter Jacket",
      price: 1499,
      mrp: 1999,
      image: "/kid10.jpg",
      rating: 4.7,
      reviews: 112,
      discount: 25
    },
    {
      id: 12,
      category: "Shoes",
      name: "Kids Boots",
      price: 1199,
      mrp: 1599,
      image: "/kid11.jpg",
      rating: 4.4,
      reviews: 78,
      discount: 25
    },
  ];
    

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Header Card */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-white text-primary rounded-2xl p-5 text-center shadow-md border-2 border-primary">
          <h1 className="text-2xl font-bold">Kids Wear</h1>
          <p className="text-sm mt-1">
            Dresses, Shoes, Innerwear & Accessories
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

export default KidsWear;
