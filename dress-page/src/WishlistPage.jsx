import React, { useState } from "react";
import Navbar from "./Navbar";
import { useCart } from "./contexts/CartContext";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Share2, Trash2, Grid, List, SortAsc, Filter } from "lucide-react";

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddToCart = (item) => {
    addToCart(item);
    // Optional: Remove from wishlist after adding to cart
    // toggleWishlist(item);
  };

  const handleShareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My StyleNest Wishlist',
        text: `Check out my wishlist with ${wishlist.length} amazing products!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Wishlist link copied to clipboard!');
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBulkDelete = () => {
    selectedItems.forEach(id => {
      const item = wishlist.find(w => w.id === id);
      if (item) toggleWishlist(item);
    });
    setSelectedItems([]);
  };

  const sortedWishlist = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />

        <div className="max-w-7xl mx-auto p-6">
        {/* Header with Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">{wishlist.length} items in your wishlist</p>
            </div>

            {wishlist.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600"} rounded-l-lg`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600"} rounded-r-lg`}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShareWishlist}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Share2 size={18} />
                  Share
                </button>

                {/* Bulk Actions */}
                {selectedItems.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                    Delete Selected ({selectedItems.length})
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="mb-6">
              <Heart size={80} className="mx-auto text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Add items you love to your wishlist. Review them anytime and easily move them to cart.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={20} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {sortedWishlist.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                {/* Product Image */}
                <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "h-56"} bg-gray-100 flex items-center justify-center overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(item);
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:shadow-md transition"
                  >
                    <Heart
                      size={18}
                      className="text-red-600 fill-red-600"
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1">
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 mb-2">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  {item.rating && (
                    <div className="flex items-center gap-1 text-xs mb-2">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{item.rating}</span>
                      {item.reviews && (
                        <span className="text-gray-500">({item.reviews})</span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
                    {item.mrp && (
                      <>
                        <span className="line-through text-gray-400 text-sm">
                          ₹{item.mrp}
                        </span>
                        <span className="text-xs text-green-600 font-semibold">
                          {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default WishlistPage;
