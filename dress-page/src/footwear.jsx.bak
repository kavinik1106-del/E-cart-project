import React from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

function Footwear() {
  const products = [
    {
      id: 1,
      brand: "Nike",
      category: "Sports Shoes",
      name: "Nike Air Zoom",
      price: "₹5,999",
      rating: 4.6,
      image: "/footk.jpg",
    },
    {
      id: 2,
      brand: "Adidas",
      category: "Running Shoes",
      name: "Adidas Ultraboost",
      price: "₹6,499",
      rating: 4.7,
      image: "/footm.jpg",
    },
    {
      id: 3,
      brand: "Puma",
      category: "Casual Shoes",
      name: "Puma Smash V2",
      price: "₹3,299",
      rating: 4.4,
      image: "/footw.jpg",
    },
    {
      id: 4,
      brand: "Bata",
      category: "Formal Shoes",
      name: "Bata Office Wear",
      price: "₹2,199",
      rating: 4.2,
      image: "/footk1.jpg",
    },
    {
      id: 5,
      brand: "Nike",
      category: "Sneakers",
      name: "Nike Revolution",
      price: "₹4,899",
      rating: 4.5,
      image: "/footm1.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footw1.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footk2.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footw2.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footm2.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footk3.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footw3.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footm3.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footk4.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footw4.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footm4.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footw1.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Header Card */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-pink-600 text-white rounded-2xl p-5 text-center shadow-md">
          <h1 className="text-2xl font-bold">Footwear</h1>
          <p className="text-sm mt-1">
            Nike, Adidas, Puma & Bata Shoes
          </p>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="w-full h-full flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full object-contain p-3"
                  />
                </Link>
              </div>

              <div className="p-4">
                <div className="text-xs text-pink-600 font-semibold">
                  {p.brand} • {p.category}
                </div>

                <h3 className="mt-1 font-semibold text-sm">
                  <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="hover:underline">{p.name}</Link>
                </h3>

                {/* Rating */}
                <div className="flex items-center text-xs mt-1">
                  ⭐ {p.rating} / 5
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-pink-600 font-bold">
                    {p.price}
                  </div>

                  <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 text-xs">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Footwear;
