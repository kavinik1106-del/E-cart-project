import React from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

function MenDress() {
  const products = [
    { id: 1, type: "Pant", name: "Classic Chino", price: "₹999", image: "/chino.avif" },
    { id: 2, type: "Shirt", name: "Oxford Shirt", price: "₹799", image: "/OIP.jpg" },
    { id: 3, type: "T-Shirt", name: "Comfort Tee", price: "₹399", image: "/OIP (7).webp" },
    { id: 4, type: "Jacket", name: "Denim Jacket", price: "₹1,999", image: "/denim.webp" },
    { id: 5, type: "Shorts", name: "Casual Shorts", price: "₹449", image: "/shorts.avif" },
    { id: 6, type: "Sweater", name: "Wool Sweater", price: "₹1,299", image: "/wool.webp" },
    { id: 7, type: "Kurta", name: "Men Kurta", price: "₹1,099", image: "/kurta.jpg" },
      { id: 8, type: "Sherwani", name: "Wedding Sherwani", price: "₹5,999", image: "/sherwa.webp" },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Rounded pink header card separated from navbar */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-pink-600 text-white rounded-2xl p-5 text-center shadow-md">
          <h1 className="text-2xl font-bold">Men's Dresses</h1>
          <p className="text-sm mt-1">Pants, Shirts, T‑Shirts & More</p>
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
                <div className="text-xs text-pink-600 font-semibold">{p.type}</div>
                <h3 className="mt-1 font-semibold text-sm">{p.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-pink-600 font-bold">{p.price}</div>
                  <Link to="/order" className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 text-xs">Buy</Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default MenDress;
