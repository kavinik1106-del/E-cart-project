import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Star, ShoppingCart, Loader2 } from "lucide-react";
import { useCart } from "./contexts/CartContext.jsx";

function ProductCard({ product, products = [], showRating = false }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisting, setIsWishlisting] = useState(false);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      // Get default size/quantity
      let size = "M";
      let quantity = 1;
      
      // For shoe products
      if (product.shoeGuide) {
        size = Object.keys(product.shoeGuide)[0];
      }
      // For clothing products
      else if (product.sizeGuide) {
        size = Object.keys(product.sizeGuide)[0];
      }
      // For vegetables/spices
      else if (product.quantityGuide) {
        size = Object.keys(product.quantityGuide)[0];
      }
      
      addToCart(product, quantity, size, "Default");
      
      // Navigate to order page after adding to cart
      setTimeout(() => {
        navigate("/order");
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setIsLoading(false);
      // Still navigate to order page even if error
      navigate("/order");
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisting(true);
    toggleWishlist(product);
    setTimeout(() => setIsWishlisting(false), 500);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      state={{ product, related: products }}
      className="group block transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
        {/* Image Container */}
        <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-contain p-4 transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = '/placeholder.jpg';
              setImageLoaded(true);
            }}
          />

          {/* Enhanced Tag */}
          {product.tag && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
              {product.tag}
            </span>
          )}

          {/* Enhanced Wishlist Button */}
          <button
            onClick={handleWishlist}
            disabled={isWishlisting}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white disabled:opacity-50"
          >
            {isWishlisting ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : (
              <Heart
                size={20}
                className={`transition-all duration-300 ${
                  isInWishlist(product.id) 
                    ? "text-red-600 fill-red-600 scale-110" 
                    : "text-gray-400 hover:text-red-500 hover:scale-110"
                }`}
              />
            )}
          </button>

          {/* Enhanced Discount Badge */}
          {product.discount && (
            <span className="absolute bottom-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
              {product.discount}% OFF
            </span>
          )}

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={handleQuickAdd}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
              {isLoading ? 'Adding...' : 'Quick Add'}
            </button>
          </div>
        </div>

        {/* Info Container */}
        <div className="p-3 sm:p-5 space-y-2 sm:space-y-3 bg-gradient-to-b from-white to-gray-50">
          {/* Category/Type */}
          <div className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-full inline-block">
            {product.type || product.category || product.brand}
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-sm sm:text-base line-clamp-2 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
            {product.name}
          </h3>

          {/* Rating */}
          {(showRating || product.rating) && (
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-gray-800">{product.rating || 4.5}</span>
              </div>
              {product.reviews && (
                <span className="text-gray-500 text-xs">({product.reviews})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 sm:gap-3 pt-2 flex-wrap">
            <span className="text-lg sm:text-xl font-bold text-blue-700">₹{product.price.toLocaleString()}</span>
            {product.mrp && (
              <>
                <span className="line-through text-gray-400 text-sm sm:text-base">
                  ₹{product.mrp.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;