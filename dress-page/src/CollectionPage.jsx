import React from "react";
import Navbar from "./Navbar.jsx";

function CollectionPage() {
  const dresses = [
    { id: 1, name: "Pink Dress", price: "₹1499", image: "/pinkdress.avif", rating: "4.3" },
    { id: 2, name: "Formal Suit", price: "₹2499", image: "/formalsuit.avif", rating: "4.1" },
    { id: 3, name: "Traditional Dress", price: "₹3999", image: "/vetti.webp", rating: "4.5" },
    { id: 4, name: "Winter Coat", price: "₹2799", image: "/winter.webp", rating: "4.2" },
    { id: 5, name: "Yellow Saree", price: "₹1899", image: "/yellowsaree.avif", rating: "4.4" },
    { id: 6, name: "Half Saree", price: "₹4599", image: "/halfsaree.webp", rating: "4.6" },
    { id: 7, name: "Children Dress", price: "₹999", image: "/kid.jpg", rating: "4.0" },
    { id: 8, name: "Saree", price: "₹1600", image: "/saree2.jpg", rating: "4.3" },
    { id: 9, name: "Saree", price: "₹3400", image: "/saree1.webp", rating: "4.8" },
    { id: 10, name: "kurta", price: "₹6400", image: "/dress1.webp", rating: "4.1" },
    { id: 11, name: "red kurta", price: "₹2000", image: "/red.jpg", rating: "4.2" },
    { id: 12, name: "blue kurta", price: "₹400", image: "/blue.webp", rating: "4.9" },
    { id: 13, name: "pink kurta", price: "₹1000", image: "/pink.jpg", rating: "4.5" },
    { id: 14, name: "kurta", price: "₹500", image: "/blue2.webp", rating: "4.5" },
    { id: 15, name: "White kurta", price: "₹1200", image: "/white.webp", rating: "4.5" },
    { id: 16, name: "kurta", price: "₹1200", image: "/dress3.webp", rating: "4.5" },
    { id: 17, name: "kurta", price: "₹1200", image: "/flower.webp", rating: "4.5" },
    { id: 17, name: "kurta", price: "₹1200", image: "/men.webp", rating: "4.5" },
    { id: 17, name: "kurta", price: "₹1200", image: "/kid1.webp", rating: "4.5" },
    { id: 17, name: "kurta", price: "₹1200", image: "/baby.webp", rating: "4.5" },
    
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-white py-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Dress Collection</h1>
        <p className="text-gray-500 mt-2">
          Stylish dresses at best prices
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {dresses.map((dress) => (
          <div
            key={dress.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            {/* Image */}
            <img
              src={dress.image}
              alt={dress.name}
              className="w-full h-56 object-contain bg-gray-100 rounded-t-lg"

            />

            {/* Details */}
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-800 truncate">
                {dress.name}
              </h3>

              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-gray-900">
                  {dress.price}
                </p>

                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  ⭐ {dress.rating}
                </span>
              </div>

              <p className="text-green-600 text-sm mt-1">
                Free Delivery
              </p>

              <button className="w-full mt-3 bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionPage;
