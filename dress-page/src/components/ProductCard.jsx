import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";

function ProductCard({ product, products = [], showRating = false }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    navigate('/order');
  };

  return (
    <Link
      to={`/product/${product.id}`}
      state={{ product, related: products }}
      className="group block"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
          />

          {/* Tag */}
          {product.tag && (
            <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {product.tag}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:shadow-md transition"
          >
            <Heart
              size={18}
              className={isWishlisted ? "text-red-600 fill-red-600" : "text-gray-400"}
            />
          </button>

          {/* Discount Badge */}
          {product.discount && (
            <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Info Container */}
        <div className="p-4 space-y-2">
          {/* Category/Type */}
          <div className="text-xs text-pink-600 font-semibold uppercase tracking-wider">
            {product.type || product.category || product.brand}
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-pink-600">
            {product.name}
          </h3>

          {/* Rating */}
          {(showRating || product.rating) && (
            <div className="flex items-center gap-1 text-xs">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{product.rating || 4.5}</span>
              {product.reviews && (
                <span className="text-gray-500">({product.reviews})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-pink-600">₹{product.price}</span>
            {product.mrp && (
              <>
                <span className="line-through text-gray-400 text-sm">
                  ₹{product.mrp}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition text-sm font-medium"
          >
            Quick Add
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
