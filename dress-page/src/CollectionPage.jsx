import React, { useState } from "react";
import Navbar from "./Navbar.jsx";

function CollectionPage() {
  const categories = [
    { name: "Electronics", image: "/mobile.jpg" },
    { name: "Women Dresses", image: "/dress1.webp" },
    { name: "Men Dresses", image: "/men2.jpg" },

    { name: "Dry Fruits", image: "/dates.jpg" },
    { name: "Home Appliances", image: "/fridge.webp" },
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
  ];

 
  /* ---------- PRODUCTS ---------- */
  const products = [
  { id: 1, name: "Double Door Fridge", price: "₹18,999", image: "/doubledoorfringe.avif", rating: 4.4 },
  { id: 2, name: "Cashew Nuts", price: "₹699", image: "/cashew.webp", rating: 4.2 },
  { id: 3, name: "Blue Sofa", price: "₹14,999", image: "/bluesofa.webp", rating: 4.5 },
  { id: 4, name: "Red Kurta", price: "₹1,299", image: "/dress1.webp", rating: 4.1 },
  { id: 5, name: "Sofa", price: "₹9,999", image: "/sofa.webp", rating: 4.3 },
  { id: 6, name: "Smart Mobile", price: "₹12,499", image: "/mobile.jpg", rating: 4.6 },
  { id: 7, name: "Dates Pack", price: "₹399", image: "/cashew.webp", rating: 4.0 },
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
  { id: 23, name: "Refrigerator", price: "₹16,999", image: "/fridge2.png", rating: 4.5 },
  { id: 24, name: "Kurta", price: "₹999", image: "/blue2.webp", rating: 4.1 },
  { id: 25, name: "White Kurta", price: "₹1,199", image: "/white.webp", rating: 4.3 },
  { id: 26, name: "Headphones", price: "₹1,499", image: "/headphone.webp", rating: 4.4 },
  { id: 27, name: "Flower Decor", price: "₹499", image: "/flower.webp", rating: 4.0 },
  { id: 28, name: "Walnuts", price: "₹799", image: "/walnut.jpg", rating: 4.5 },
  { id: 29, name: "Kids Dress", price: "₹899", image: "/kid1.webp", rating: 4.3 },
  { id: 30, name: "Baby Dress", price: "₹749", image: "/baby.webp", rating: 4.4 },
  { id: 31, name: "GlowSync Smart Desk Lamp", price: "₹3,999", image: "/desklamp.jpg", rating: 4.6 },
  { id: 32, name: "EcoNote Reusable Notebook", price: "₹899", image: "/econote.jpg", rating: 4.2 },
  { id: 33, name: "FocusCube Productivity Timer", price: "₹1,499", image: "/timer.jpg", rating: 4.4 },
  { id: 34, name: "ModuKey Modular Keyboard Keys", price: "₹2,499", image: "/keyboard.jpg", rating: 4.5 },
  { id: 35, name: "AromaCharge Wireless Diffuser", price: "₹3,299", image: "/aroma.jpg", rating: 4.3 },
  { id: 36, name: "FlexiStand Laptop Stand", price: "₹1,999", image: "/laptopstand.jpg", rating: 4.4 },
  { id: 37, name: "StudyZen Noise Shield Headphones", price: "₹4,999", image: "/noicehead.jpg", rating: 4.3 },
  { id: 38, name: "CableNest Magnetic Organizer", price: "₹799", image: "/magnetcable.jpg", rating: 4.1 },
  { id: 39, name: "MoodLight RGB Wall Panel", price: "₹5,999", image: "/moonlight.jpg", rating: 4.5 },
  { id: 40, name: "SmartCup Temperature Control Mug", price: "₹2,799", image: "/heatcup.jpg", rating: 4.2 },
  { id: 41, name: "PocketScan Mini Scanner", price: "₹3,499", image: "/printermini.jpg", rating: 4.3 },
  { id: 42, name: "VisionBoard Digital Planner Pad", price: "₹2,299", image: "/pad.jpg", rating: 4.1 },
  { id: 43, name: "AirWrite Smart Pen", price: "₹2,999", image: "/airpen.jpg", rating: 4.4 },
  { id: 44, name: "DeskDock Charging Hub", price: "₹3,499", image: "/chargerhub.jpg", rating: 4.2 },
  { id: 45, name: "SleepWell Smart Eye Mask", price: "₹2,199", image: "/eyemask.jpg", rating: 4.3 },
  { id: 46, name: "SnapBoard Foldable Whiteboard", price: "₹1,499", image: "/whiteboard.jpg", rating: 4.1 },
  { id: 47, name: "PostureGuard Seat Pad", price: "₹3,899", image: "/seat.jpg", rating: 4.0 },
  { id: 48, name: "TouchDial Creative Controller", price: "₹4,299", image: "/game.jpg", rating: 4.5 },
  { id: 49, name: "HydraGlow Smart Bottle", price: "₹1,799", image: "/waterbottle.jpg", rating: 4.2 },
  { id: 50, name: "NoteBeam Projector Pad", price: "₹5,499", image: "/projector.jpg", rating: 4.3 },
  { id: 51, name: "Sofa", price: "₹5,499", image: "/sofa.webp", rating: 4.3 },
  { id: 52, name: "Winter Coat", price: "₹5,499", image: "/winter.webp", rating: 4.3 },
];

  /* ---------- STATE ---------- */
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  /* ---------- FUNCTIONS ---------- */
  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);


  const handleConfirmAdd = () => {
    setCart((prev) => [...prev, selectedProduct]);
    alert(`${selectedProduct.name} added to cart ✅`);
    setSelectedProduct(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-white py-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <p className="text-gray-500 mt-2">
          Best quality products at best prices
        </p>
      </div>

      {/* Categories */}
      <section className="bg-white mt-2 p-4">
        <h2 className="font-bold text-lg mb-3">Categories</h2>
        <div className="flex gap-4 overflow-x-auto">
          {categories.map((cat, index) => (
            <div key={index} className="text-center min-w-[80px]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 mx-auto rounded-full border object-cover"
              />
              <p className="text-sm mt-1">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <img
        src="/skinbanner2.jpg"
        alt="Offer"
        className="w-full h-44 md:h-[350px] object-cover mt-3"
      />

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="font-bold text-lg mb-5">Popular Products</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {products.map((dress) => (
            <div
              key={dress.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Image + Wishlist */}
              <div className="relative">
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-48 object-contain p-2"
                />

                <button
                  onClick={() => toggleWishlist(dress)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isWishlisted(dress.id) ? "#ff0000" : "none"}
                    stroke={isWishlisted(dress.id) ? "#ff0000" : "#6b7280"}
                    strokeWidth="1.5"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 7.318c0-2.21-1.807-4.004-4.035-4.004-1.64 0-3.047.97-3.717 2.367-.67-1.396-2.077-2.367-3.717-2.367-2.228 0-4.035 1.794-4.035 4.004 0 6.045 7.752 10.678 7.752 10.678s7.752-4.633 7.752-10.678z"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium truncate">
                  {dress.name}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">{dress.price}</p>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    ⭐ {dress.rating}
                  </span>
                </div>

                <p className="text-green-600 text-sm mt-1">
                  Free Delivery
                </p>

                <button
                  onClick={() => setSelectedProduct(dress)}
                  className="w-full mt-3 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 active:scale-95 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONFIRM MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-80 rounded-lg p-4 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-xl"
            >
              ✖
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-40 object-contain"
            />

            <h3 className="font-bold mt-3">{selectedProduct.name}</h3>
            <p className="font-semibold">{selectedProduct.price}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleConfirmAdd}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Confirm Add
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className="flex-1 bg-gray-100 py-2 rounded"
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionPage;
