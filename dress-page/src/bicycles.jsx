import React from "react";
import Navbar from "./Navbar.jsx";

function Bicycles() {
  const products = [
    {
      id: 1,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Sprint MTB",
      price: "₹9,999",
      rating: 4.4,
      image: "/bicyclek.jpg",
    },
    {
      id: 2,
      brand: "Firefox",
      category: "Gear Cycle",
      name: "Firefox Roadrunner",
      price: "₹12,499",
      rating: 4.6,
      image: "/bicyclek1.jpg",
    },
    {
      id: 3,
      brand: "Hercules",
      category: "Kids Cycle",
      name: "Hercules Kids Fun",
      price: "₹4,999",
      rating: 4.3,
      image: "/bicyclem2.jpg",
    },
    {
      id: 4,
      brand: "EMotorad",
      category: "Electric Bike",
      name: "EMotorad X2",
      price: "₹32,999",
      rating: 4.7,
      image: "/bicyclew3.jpg",
    },
    {
      id: 5,
      brand: "Atlas",
      category: "City Bicycle",
      name: "Atlas Gold City",
      price: "₹6,499",
      rating: 4.2,
      image: "/bicyclem1.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclew2.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclew.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclek2.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclem.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclew4.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclek3.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclem2.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclem3.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclew3.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclem.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclew1.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Header Card */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-pink-600 text-white rounded-2xl p-5 text-center shadow-md">
          <h1 className="text-2xl font-bold">Bicycles</h1>
          <p className="text-sm mt-1">
            Mountain • Kids • Gear • Electric Bikes
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
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full object-contain p-3"
                />
              </div>

              <div className="p-4">
                <div className="text-xs text-pink-600 font-semibold">
                  {p.brand} • {p.category}
                </div>

                <h3 className="mt-1 font-semibold text-sm">
                  {p.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center text-xs mt-1">
                  ⭐ {p.rating} / 5
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-pink-600 font-bold">
                    {p.price}
                  </div>

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

export default Bicycles;
