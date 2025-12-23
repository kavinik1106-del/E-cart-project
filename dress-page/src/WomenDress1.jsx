import React from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

function WomenDress() {
  const products = [
    { id: 1, type: "Pant", name: "Comfy Pants", price: "₹899", image: "/cpant.webp" },
    { id: 2, type: "Shirt", name: "Casual Shirt", price: "₹699", image: "/OIP (4).webp" },
    { id: 3, type: "Chudi", name: "Silk Chudi", price: "₹1,199", image: "/chutti.webp" },
    { id: 4, type: "T-Shirt", name: "Everyday Tee", price: "₹399", image: "/OIP (5).webp" },
    { id: 5, type: "Kurta", name: "Anarkali Kurta", price: "₹1,499", image: "/oip1.avif" },
    { id: 6, type: "Lehenga", name: "Festive Lehenga", price: "₹2,999", image: "/OIP (6).webp" },
    { id: 7, type: "Lehenga", name: "Midi calf", price: "₹2,999", image: "/mdi.webp" },
    { id: 8, type: "Lehenga", name: "Chiffon dress", price: "₹2,999", image: "chiff.webp" },
    
    

  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Rounded pink header card */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-pink-600 text-white rounded-2xl p-5 text-center shadow-md">
          <h1 className="text-2xl font-bold">Women's Dresses</h1>
          <p className="text-sm mt-1">Pants, Shirts, Chudis, T-Shirts & More</p>
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

export default WomenDress;
