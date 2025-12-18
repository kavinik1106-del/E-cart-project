import React from "react";
import Navbar from "./Navbar.jsx";

function CollectionPage() {
   const categories = [
   { name: "Electronics", image: "mobile.jpg" },
    { name: "Women Dresses", image: "dress1.webp" },
    { name: "Men Dresses", image: "men2.jpg" },
    { name: "Dry Fruits", image: "dates.jpg" },
    { name: "Home Appliances", image: "fridge.webp" },
   ];
  
   const dresses = [
  { id: 1, name: "Double Door Fridge", price: "₹18,999", image: "/doubledoorfringe.avif", rating: 4.4 },
  { id: 2, name: "Cashew Nuts", price: "₹699", image: "/cashew.webp", rating: 4.2 },
  { id: 3, name: "Blue Sofa", price: "₹14,999", image: "/bluesofa.webp", rating: 4.5 },
  { id: 4, name: "Red Kurta", price: "₹1,299", image: "/dress1.webp", rating: 4.1 },
  { id: 5, name: "Sofa", price: "₹9,999", image: "/sofa.webp", rating: 4.3 },
  { id: 6, name: "Smart Mobile", price: "₹12,499", image: "/mobile.jpg", rating: 4.6 },
  { id: 7, name: "Dates Pack", price: "₹399", image: "/dates.jpg", rating: 4.0 },
  { id: 8, name: "Silk Saree", price: "₹1,899", image: "/saree2.jpg", rating: 4.3 },
  { id: 9, name: "Smart Watch", price: "₹2,999", image: "/smartwatch.webp", rating: 4.7 },
  { id: 10, name: "Kurta Set", price: "₹1,599", image: "/dress3.webp", rating: 4.2 },
  { id: 11, name: "Red Kurta", price: "₹1,199", image: "/red.jpg", rating: 4.1 },
  { id: 12, name: "Laptop", price: "₹39,999", image: "/laptop.webp", rating: 4.8 },
  { id: 13, name: "Pink Kurta", price: "₹999", image: "/pink.jpg", rating: 4.4 },
  { id: 14, name: "Kismis", price: "₹349", image: "/kismis.webp", rating: 4.3 },
  { id: 15, name: "White Kurta", price: "₹1,099", image: "/white.webp", rating: 4.4 },
  { id: 16, name: "Kurta", price: "₹1,299", image: "/dress3.webp", rating: 4.2 },
  { id: 17, name: "Dry Fruits Combo", price: "₹899", image: "/combodry.webp", rating: 4.5 },
  { id: 18, name: "Men Wear", price: "₹1,499", image: "/men.webp", rating: 4.1 },
  { id: 19, name: "Gas Burner", price: "₹1,899", image: "/burner.avif", rating: 4.3 },
  { id: 20, name: "Baby Dress", price: "₹799", image: "/baby.webp", rating: 4.4 },
  { id: 21, name: "Camera", price: "₹24,999", image: "/camara.jpg", rating: 4.6 },
  { id: 22, name: "Blue Kurta", price: "₹899", image: "/blue.webp", rating: 4.2 },
  { id: 23, name: "Refrigerator", price: "₹16,999", image: "/fridge.webp", rating: 4.5 },
  { id: 24, name: "Kurta", price: "₹999", image: "/blue2.webp", rating: 4.1 },
  { id: 25, name: "White Kurta", price: "₹1,199", image: "/white.webp", rating: 4.3 },
  { id: 26, name: "Headphones", price: "₹1,499", image: "/headphone.webp", rating: 4.4 },
  { id: 27, name: "Flower Decor", price: "₹499", image: "/flower.webp", rating: 4.0 },
  { id: 28, name: "Walnuts", price: "₹799", image: "/walnut.jpg", rating: 4.5 },
  { id: 29, name: "Kids Dress", price: "₹899", image: "/kid1.webp", rating: 4.3 },
  { id: 30, name: "Baby Dress", price: "₹749", image: "/baby.webp", rating: 4.4 },
  { id: 31, name: "GlowSync Smart Desk Lamp", price: "₹3,999", image: "/OIP.webp" , rating: 4.6 },
    { id: 32, name: "EcoNote Reusable Notebook", price: "₹899", image: "/boku.webp" , rating: 4.2 },
    { id: 33, name: "FocusCube Productivity Timer", price: "₹1,499", image: "/images/products/product03.jpg", rating: 4.4 },
    { id: 34, name: "ModuKey Modular Keyboard Keys", price: "₹2,499", image: "/images/products/product04.jpg", rating: 4.5 },

    { id: 35, name: "AromaCharge Wireless Diffuser", price: "₹3,299", image: "/images/products/product05.jpg" , rating: 4.3 },
    { id: 36, name: "FlexiStand Laptop Stand", price: "₹1,999", image: "/images/products/product06.jpg", rating: 4.4 },
    { id: 37, name: "StudyZen Noise Shield Headphones", price: "₹4,999", image: "/images/products/product07.jpg", },
    { id: 38, name: "CableNest Magnetic Organizer", price: "₹799", image: "/images/products/product08.jpg", rating: 4.1 },

    { id: 39, name: "MoodLight RGB Wall Panel", price: "₹5,999", image: "/images/products/product09.jpg", rating: 4.5 },
    { id: 40, name: "SmartCup Temperature Control Mug", price: "₹2,799", image: "/images/products/product10.jpg", rating: 4.2 },
    { id: 41, name: "PocketScan Mini Scanner", price: "₹3,499", image: "/images/products/product11.jpg", rating: 4.3 },
    { id: 42, name: "VisionBoard Digital Planner Pad", price: "₹2,299", image: "/images/products/product12.jpg", rating: 4.1 },

    { id: 43, name: "AirWrite Smart Pen", price: "₹2,999", image: "/images/products/product13.jpg", rating: 4.4 },
    { id: 44, name: "DeskDock Charging Hub", price: "₹3,499", image: "/images/products/product14.jpg", rating: 4.2 },
    { id: 45, name: "SleepWell Smart Eye Mask", price: "₹2,199", image: "/images/products/product15.jpg", rating: 4.3 },
    { id: 46, name: "SnapBoard Foldable Whiteboard", price: "₹1,499", image: "/images/products/product16.jpg", rating: 4.1 },

    { id: 47, name: "PostureGuard Seat Pad", price: "₹3,899", image: "/images/products/product17.jpg", rating: 4.0 },
    { id: 48, name: "TouchDial Creative Controller", price: "₹4,299", image: "/images/products/product18.jpg", rating: 4.5 },
    { id: 49, name: "HydraGlow Smart Bottle", price: "₹1,799", image: "/images/products/product19.jpg", rating: 4.2 },
    { id: 50, name: "NoteBeam Projector Pad", price: "₹5,499", image: "/images/products/product20.jpg", rating: 4.3 },
  ];



  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-white py-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">
          Products
        </h1>
        <p className="text-gray-500 mt-2">
          Best quality products at best prices
        </p>
      </div>

      {/* Categories */}
      <section className="bg-white mt-2 p-4">
        <h2 className="font-bold text-lg mb-3">
          Categories
        </h2>

        <div className="flex gap-4 overflow-x-auto">
          {categories.map((cat, index) => (
            <div key={index} className="text-center min-w-[80px]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 mx-auto rounded-full border object-cover"
              />
              <p className="text-sm mt-1">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <img
        src="/skinbanner.jpg"
        alt="Offer"
        className="w-full h-44 md:h-70 object-cover mt-3"
      />

      {/* Product Grid (ONLY ONCE) */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="font-bold text-lg mb-5">
          Popular Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {dresses.map((dress) => (
            <div
              key={dress.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={dress.image}
                alt={dress.name}
                className="w-full h-48 object-contain p-2"
              />

              <div className="p-3">
                <h3 className="text-sm font-medium truncate">
                  {dress.name}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-gray-900">
                    {dress.price}
                  </p>

                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    ⭐ {dress.rating}
                  </span>
                </div>

                <p className="text-green-600 text-sm mt-1">
                  Free Delivery
                </p>

                <button className="w-full mt-3 bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CollectionPage;