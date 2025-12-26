import React from "react";
import Navbar from "./Navbar";
import { useCart } from "./contexts/CartContext";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    // Optional: Remove from wishlist after adding to cart
    // toggleWishlist(item);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlist.length} items in your wishlist</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:bg-red-50"
                    title="Remove from wishlist"
                  >
                    <Heart size={20} className="text-red-500 fill-red-500" />
                  </button>

                  {/* Discount Badge */}
                  {item.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Category/Type */}
                  <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                    {item.type || item.category || item.brand}
                  </div>

                  {/* Product Name */}
                  <Link
                    to={`/product/${item.id}`}
                    className="block"
                  >
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        {wishlist.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors mr-4"
            >
              Continue Shopping
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={20} className="mr-2" />
              View Cart ({wishlist.length} items)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
