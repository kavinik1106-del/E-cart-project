import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { Heart, Star, ShoppingCart, Truck, RotateCcw, Shield, Zap } from "lucide-react";
import { useCart } from "./contexts/CartContext.jsx";

function ProductDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = location.state?.product;
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageGallery] = useState([
    product?.image || "/default.jpg",
    product?.image || "/default.jpg",
    product?.image || "/default.jpg",
  ]);
  const [selectedImage, setSelectedImage] = useState(imageGallery[0]);

  if (!product) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || "Standard", selectedColor || "Default");
    alert("✅ Added to cart!");
    navigate("/order");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize || "Standard", selectedColor || "Default");
    navigate("/order");
  };

  // Determine available sizes
  const sizes = product.sizeGuide ? Object.keys(product.sizeGuide) : 
                product.shoeGuide ? Object.keys(product.shoeGuide) : [];

  // Determine available colors
  const colors = product.colors || ["Black", "Navy", "Gray"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {product.description || "Experience the perfect blend of style and comfort with this premium product. Crafted with attention to detail, this item is designed for everyday wear and special occasions alike."}
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Premium quality material ensuring durability and comfort</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Modern design that complements any style preference</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Available in multiple sizes and colors for perfect fit</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Easy to maintain and care for</span>
              </li>
            </ul>
          </div>
        );

      case "specifications":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 font-semibold">Brand</p>
                <p className="text-gray-800 font-semibold">{product.brand || "Premium Brand"}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 font-semibold">Category</p>
                <p className="text-gray-800 font-semibold">{product.category || product.type || "Apparel"}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 font-semibold">Material</p>
                <p className="text-gray-800 font-semibold">{product.material || "Premium Fabric Mix"}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 font-semibold">Weight</p>
                <p className="text-gray-800 font-semibold">{product.weight || "250-350 grams"}</p>
              </div>
            </div>
          </div>
        );

      case "sizing":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Size Guide</h3>
            {product.sizeGuide && Object.keys(product.sizeGuide).length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border p-3 text-left text-sm font-semibold">Size</th>
                      <th className="border p-3 text-left text-sm font-semibold">Chest/Waist</th>
                      <th className="border p-3 text-left text-sm font-semibold">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(product.sizeGuide).map(([size, measurements]) => (
                      <tr key={size} className="border">
                        <td className="border p-3 font-semibold">{size}</td>
                        <td className="border p-3">{measurements.chest || measurements.waist || "—"}</td>
                        <td className="border p-3">{measurements.length || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!product.sizeGuide && (
              <p className="text-gray-600">Size information not available for this product.</p>
            )}
          </div>
        );

      case "care":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Care Instructions</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <span className="text-gray-700">Wash with cold water. Machine wash on gentle cycle or hand wash recommended.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <span className="text-gray-700">Use mild detergent only. Avoid bleach and harsh chemicals.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <span className="text-gray-700">Dry flat in shade. Do not tumble dry or wring.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                <span className="text-gray-700">Iron on low heat if needed. Avoid direct heat on printed areas.</span>
              </li>
            </ul>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating || 4.5} out of 5</span>
            </div>

            <div className="space-y-3">
              {[
                { name: "Priya M.", rating: 5, text: "Excellent quality! Fits perfectly and very comfortable." },
                { name: "Rahul K.", rating: 4, text: "Great product. Delivery could have been faster." },
                { name: "Anjali S.", rating: 5, text: "Best purchase ever! Highly recommended." },
              ].map((review, idx) => (
                <div key={idx} className="border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">{review.name}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "shipping":
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start">
                <Truck className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">Standard Shipping</p>
                  <p className="text-sm text-gray-600">Delivery in 5-7 business days</p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">FREE for orders above ₹499</p>
                </div>
              </div>

              <div className="flex items-start">
                <Zap className="text-orange-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">Express Shipping</p>
                  <p className="text-sm text-gray-600">Delivery in 2-3 business days</p>
                  <p className="text-sm font-semibold text-orange-600 mt-1">₹99 extra charge</p>
                </div>
              </div>

              <div className="flex items-start">
                <RotateCcw className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">Easy Returns</p>
                  <p className="text-sm text-gray-600">30 days money-back guarantee</p>
                  <p className="text-sm font-semibold text-green-600 mt-1">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <button onClick={() => navigate(-1)} className="hover:text-blue-600">
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-96 object-contain p-8"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.tag}
                </span>
              )}
              {product.discount && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-2">
              {imageGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`h-20 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === img ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-blue-600 font-semibold uppercase">
                    {product.category || product.type || product.brand}
                  </p>
                  <h1 className="text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Heart
                    size={24}
                    className={isWishlisted ? "fill-red-600 text-red-600" : "text-gray-400"}
                  />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating || 4.5}) · 1,234 reviews</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-3xl font-bold text-blue-600">₹{product.price}</span>
                {product.mrp && (
                  <span className="text-lg text-gray-400 line-through">₹{product.mrp}</span>
                )}
              </div>
              {product.discount && (
                <p className="text-sm text-green-600 font-semibold">Save {product.discount}% on this item</p>
              )}
              <p className="text-xs text-gray-600 mt-2">Inclusive of all taxes</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              {/* Color Selection */}
              {colors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 transition ${
                          selectedColor === color
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded-lg border-2 font-semibold transition ${
                          selectedSize === size
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Shield size={18} className="text-green-600" />
                <span className="text-gray-700">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw size={18} className="text-blue-600" />
                <span className="text-gray-700">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck size={18} className="text-orange-600" />
                <span className="text-gray-700">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star size={18} className="text-yellow-600" />
                <span className="text-gray-700">Genuine Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab Headers */}
          <div className="flex flex-wrap border-b">
            {[
              { id: "description", label: "Description" },
              { id: "specifications", label: "Specifications" },
              { id: "sizing", label: "Sizing Guide" },
              { id: "care", label: "Care & Maintenance" },
              { id: "reviews", label: "Reviews" },
              { id: "shipping", label: "Shipping & Returns" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 font-semibold transition ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailPage;
