import React from "react";
import Navbar from "./Navbar.jsx";

function Electro() {
  const products = [
    { id: 1, category: "Phone", name: "Galaxy X Pro", price: "₹29,999", image: "/mobile.jpg" },
    { id: 2, category: "Laptop", name: "SwiftBook 14", price: "₹49,999", image: "/laptop.webp" },
    { id: 3, category: "Watch", name: "Pulse Watch 3", price: "₹7,999", image: "/smartwatch.webp" },
    { id: 4, category: "Tablet", name: "TabOne 10", price: "₹19,499", image: "/OIP (3).webp" },
    { id: 5, category: "Phone", name: "Nova S", price: "₹18,999", image: "/mobile.jpg" },
    { id: 6, category: "Laptop", name: "Workmate Pro", price: "₹62,999", image: "/laptop.webp" },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Separate rounded pink card below the navbar */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-pink-600 text-white rounded-2xl p-5 text-center shadow-md">
          <h1 className="text-2xl font-bold">Electronics</h1>
          <p className="text-sm mt-1">Phones, Laptops, Watches & Tablets</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img src={p.image} alt={p.name} className="h-full object-contain p-3" />
              </div>

              <div className="p-4">
                <div className="text-xs text-pink-600 font-semibold">{p.category}</div>
                <h3 className="mt-1 font-semibold text-sm">{p.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-pink-600 font-bold">{p.price}</div>
                  <button className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 text-xs">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Electro;
