import React from "react";
import Navbar from "./Navbar.jsx";

function HomePage() {
  const categories = [
    { name: "Sarees", image: "saree2.jpg" },
    { name: "Kurtis", image: "dress1.webp" },
    { name: "Dresses", image: "winter.webp" },
    { name: "Men", image: "vetti.webp" },
    { name: "Kids", image: "kid.jpg" },
    { name: "Mobiles", image: "mobile.jpg" },
    { name: "Laptops", image: "laptop.jpg" },
    { name: "Headphones", image: "headphone.jpg" },
    { name: "Dry Fruits", image: "dryfruits.jpg" },
    { name: "Snacks", image: "snacks.jpg" },
    { name: "Home Appliances", image: "fridge.jpg" },
];

    
  

  const dresses = [
    { id: 1, name: "Half Saree", price: "₹1400", image: "halfsaree.webp" },
    { id: 2, name: "Traditional Dress", price: "₹4000", image: "vetti.webp" },
    { id: 3, name: "Pink Dress", price: "₹5000", image: "pinkdress.avif" },
    { id: 4, name: "Red Dress", price: "₹500", image: "red.jpg" },
    { id: 5, name: "Flower Dress", price: "₹1000", image: "flower.webp" },
    { id: 6, name: "Wedding Dress", price: "₹5200", image: "men2.jpg" },
    { id: 7, name: "Pink Dress", price: "₹700", image: "pink.jpg" },
    { id: 8, name: "Kids Dress", price: "₹800", image: "kid1.webp" },
  ];

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />

      {/* 🔍 Search Bar */}
      <div className="bg-white p-3 md:p-4 shadow">
        <input
          type="text"
          placeholder="Search for Sarees, Dresses, Kurtis..."
          className="w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:outline-none"
        />
      </div>

      {/* 🎯 Categories */}
      <section className="bg-white mt-2 p-3 md:p-4">
        <h2 className="font-bold text-base md:text-lg mb-3">
          Categories
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="text-center min-w-[70px] sm:min-w-[90px]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full border object-cover"
              />
              <p className="text-xs sm:text-sm mt-1">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🖼️ Banner */}
      <img
        src="/offer.webp"
        alt="Offer Banner"
        className="w-full h-40 sm:h-52 md:h-64 lg:h-72 object-cover"
      />

      {/* 🛍️ Products */}
      <section className="p-3 md:p-6">
        <h2 className="font-bold text-base md:text-lg mb-4">
          Popular Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {dresses.map((dress) => (
            <div
              key={dress.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-2"
            >
              <img
                src={dress.image}
                alt={dress.name}
                className="w-full h-36 sm:h-40 md:h-44 object-contain"
              />

              <h3 className="text-sm md:text-base font-semibold mt-2">
                {dress.name}
              </h3>

              <p className="text-pink-600 font-bold text-sm md:text-base">
                {dress.price}
              </p>

              <button className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white py-1.5 rounded text-sm">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
<footer className="text-center text-xs md:text-sm text-gray-600 py-4">
  © 2025 <span className="font-semibold text-black">Kavi Boutique</span>. 
  <span className="text-pink-500">Made with ❤️ in Chennai</span>
</footer>


    </div>
  );
}

export default HomePage;
