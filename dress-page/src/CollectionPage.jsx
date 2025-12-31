import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { useCart } from "./contexts/CartContext.jsx";

function CollectionPage() {
  /* ---------- CATEGORIES ---------- */
  const categories = [
    { name: "Electronics", image: "/mobile.jpg" },
    { name: "Women Dresses", image: "/dress1.webp" },
    { name: "Men Dresses", image: "/men2.jpg" },
    { name: "Dry Fruits", image: "/cashew.webp" },
    { name: "Home Appliances", image: "/fridge.webp" },
  ];

  /* ---------- PRODUCTS ---------- */
  const products = [
    { id: 1, name: "Double Door Fridge", price: 18999, image: "/doubledoorfringe.avif", rating: 4.4 },
    { id: 2, name: "Cashew Nuts", price: 699, image: "/cashew.webp", rating: 4.2 },
    { id: 3, name: "Blue Sofa", price: 14999, image: "/bluesofa.webp", rating: 4.5 },
    { id: 4, name: "Red Kurta", price: 1299, image: "/dress1.webp", rating: 4.1 },
    { id: 5, name: "Sofa", price: 9999, image: "/sofa.webp", rating: 4.3 },
    { id: 6, name: "Smart Mobile", price: 12499, image: "/mobile.jpg", rating: 4.6 },
    { id: 7, name: "Dates Pack", price: 399, image: "/dates.jpg", rating: 4.0 },
    { id: 8, name: "Silk Saree", price: 1899, image: "/saree2.jpg", rating: 4.3 },
    { id: 9, name: "Smart Watch", price: 2999, image: "/smartwatch.webp", rating: 4.7 },
    { id: 10, name: "Kurta Set", price: 1599, image: "/dress3.webp", rating: 4.2 },
  ];

  /* ---------- STATE ---------- */
  const Navigate = useNavigate();
  const { addToCart, removeFromCart, cart } = useCart();
  const [wishlist, setWishlist] = useState([]);

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

  const isInCart = (id) =>
    cart.some((item) => item.id === id);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain p-3"
                  onError={(e) => {
                    e.target.src = "/default-product.jpg";
                  }}
                />

                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:shadow-md transition"
                >
                  {isWishlisted(product.id) ? "❤️" : "🤍"}
                </button>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2 h-10">
                  {product.name}
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-pink-600">₹{product.price}</p>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    ⭐ {product.rating}
                  </span>
                </div>

                <p className="text-green-600 text-xs mt-1">
                  Free Delivery
                </p>

                {isInCart(product.id) ? (
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm font-medium"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-3 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CollectionPage;
