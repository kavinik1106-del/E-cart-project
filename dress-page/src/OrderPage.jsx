import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import { Heart, Star, Trash2, Plus, Minus, ShoppingCart, Shield, Truck, RefreshCw } from "lucide-react";
import { useCart } from "./contexts/CartContext.jsx";

function OrderPage() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");

  const products = [
    {
      id: 1,
      name: "Premium Sofa Set",
      price: 12000,
      mrp: 28000,
      rating: 4.5,
      reviews: 320,
      image: "/bluesofa.webp",
      tag: "Bestseller",
      description: "Comfortable 3-seater sofa with premium fabric upholstery and sturdy wooden frame.",
      highlights: ["Premium Fabric", "Strong Wooden Frame", "5 Year Warranty"],
      delivery: "Free delivery",
      seller: "HomeStyle Furnitures"
    },
    {
      id: 2,
      name: "Red Party Dress",
      price: 1500,
      mrp: 2200,
      rating: 4.3,
      reviews: 210,
      image: "/dress1.webp",
      tag: "Trending",
      description: "Elegant party wear dress perfect for special occasions and events.",
      highlights: ["Premium Fabric", "Perfect Fit", "Machine Washable"],
      delivery: "Free delivery",
      seller: "FashionHub"
    },
    {
      id: 3,
      name: "Premium Cashew Nuts",
      price: 800,
      mrp: 1200,
      rating: 4.6,
      reviews: 540,
      image: "/cashew.webp",
      tag: "Bestseller",
      description: "Fresh and healthy premium quality cashews, rich in nutrients.",
      highlights: ["100% Natural", "High Protein", "Premium Quality"],
      delivery: "Free delivery",
      seller: "NutriFoods"
    },
  ];

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalMRP = cart.reduce(
    (sum, p) => sum + (p.mrp || p.price) * p.quantity,
    0
  );
  const discount = totalMRP - total;
  const delivery = total > 999 ? 0 : 49;
  const finalTotal = total + delivery;

  const savings = totalMRP - total;
  const discountPercent = Math.round((savings / totalMRP) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shop by Category</h1>
              <p className="text-gray-600 mt-1">Discover amazing products at great prices</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{products.length} results</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Products */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.tag && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          {product.tag}
                        </span>
                      )}
                    </div>

                    {/* Wishlist */}
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                      <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 pt-0">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.mrp.toLocaleString()}
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                      </span>
                    </div>

                    {/* Delivery Info */}
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <Truck className="w-4 h-4" />
                      <span>{product.delivery}</span>
                    </div>

                    {/* Seller */}
                    <p className="text-xs text-gray-500 mb-4">
                      Sold by: {product.seller}
                    </p>

                    {/* Add to Cart */}
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Cart ({cart.length})
                </h2>
              </div>

              {cart.length === 0 ? (
                <div className="p-6 text-center">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="p-4 border-b border-gray-100">
                        <div className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain bg-gray-50 rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-blue-600 font-semibold text-sm mb-2">
                              ₹{item.price.toLocaleString()}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-red-500 hover:text-red-700 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="p-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-₹{discount.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery</span>
                        <span className={delivery === 0 ? "text-green-600" : ""}>
                          {delivery === 0 ? "FREE" : `₹${delivery}`}
                        </span>
                      </div>

                      <hr className="my-2" />

                      <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span className="text-blue-600">₹{finalTotal.toLocaleString()}</span>
                      </div>

                      {savings > 0 && (
                        <p className="text-green-600 text-xs">
                          You save ₹{savings.toLocaleString()} ({discountPercent}% off)
                        </p>
                      )}
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <RefreshCw className="w-4 h-4 text-blue-500" />
                        <span>Easy returns</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors mt-4">
                      Proceed to Checkout
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-2">
                      By placing your order, you agree to our terms and conditions
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
