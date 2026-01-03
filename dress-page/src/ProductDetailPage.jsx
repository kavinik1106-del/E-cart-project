import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { Heart, Star, ShoppingCart, Truck, RotateCcw, Shield, Zap, Award } from "lucide-react";
import { useCart } from "./contexts/CartContext.jsx";

function ProductDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
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
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary"
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
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <span className="text-gray-700">Wash with cold water. Machine wash on gentle cycle or hand wash recommended.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <span className="text-gray-700">Use mild detergent only. Avoid bleach and harsh chemicals.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <span className="text-gray-700">Dry flat in shade. Do not tumble dry or wring.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
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
        {/* Enhanced Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <button onClick={() => navigate("/")} className="hover:text-blue-600">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate(-1)} className="hover:text-blue-600">
            {product.category || product.type || "Category"}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enhanced Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-contain p-8"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.tag}
                </span>
              )}
              {product.discount && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Enhanced Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {imageGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === img
                      ? "border-blue-600 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                    {product.category || product.type || product.brand}
                  </p>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1 leading-tight">{product.name}</h1>
                  <p className="text-sm text-gray-600 mt-2">Brand: <span className="font-medium">{product.brand || "Premium Brand"}</span></p>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 rounded-full bg-gray-100 hover:bg-red-50 transition-all duration-200 group"
                >
                  <Heart
                    size={24}
                    className={`transition-colors ${
                      isWishlisted
                        ? "fill-red-600 text-red-600"
                        : "text-gray-400 group-hover:text-red-500"
                    }`}
                  />
                </button>
              </div>

              {/* Enhanced Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{product.rating || 4.5}</span>
                <span className="text-sm text-gray-600">({product.reviews || 1234} reviews)</span>
                <span className="text-blue-600 text-sm hover:underline cursor-pointer">Write a review</span>
              </div>
            </div>

            {/* Enhanced Price Section */}
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-4xl font-bold text-gray-900">₹{product.price?.toLocaleString('en-IN')}</span>
                {product.mrp && (
                  <span className="text-xl text-gray-500 line-through">₹{product.mrp?.toLocaleString('en-IN')}</span>
                )}
                {product.discount && (
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                    {product.discount}% off
                  </span>
                )}
              </div>
              {product.discount && (
                <p className="text-sm text-green-700 font-medium">
                  You Save: ₹{(product.mrp - product.price)?.toLocaleString('en-IN')}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="text-gray-600">Inclusive of all taxes</span>
                <span className="text-green-600 font-medium">✓ Free delivery</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700 font-medium">In Stock</span>
              <span className="text-sm text-gray-600">Usually ships within 2-3 days</span>
            </div>

            {/* Enhanced Selection Options */}
            <div className="space-y-6">
              {/* Color Selection */}
<div className="border-b border-gray-200 pb-6">
  <div className="flex items-center gap-2 mb-3">
    <label className="text-sm font-semibold text-gray-900">
      Color:
    </label>
    <span className="text-sm text-gray-700">
      {selectedColor || "Select a color"}
    </span>
  </div>

  <div className="flex flex-wrap gap-3">
    {[
      "Black",
      "White",
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Orange",
      "Pink",
      "Purple",
      "Brown",
      "Grey",
      "Beige",
      "Navy",
      "Maroon",
      "Olive",
    ].map((color) => (
      <button
        key={color}
        type="button"
        onClick={() => setSelectedColor(color)}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition-all
          ${
            selectedColor === color
              ? "border-gray-900 bg-gray-100 text-gray-900"
              : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
          }`}
        aria-pressed={selectedColor === color}
      >
        {color}
      </button>
    ))}
  </div>
</div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-semibold text-gray-900">Size: </label>
                    <span className="text-sm text-gray-700">{selectedSize || "Choose an option"}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-lg border-2 font-semibold transition-all duration-200 ${
                          selectedSize === size
                            ? "border-primary bg-primary text-white shadow-sm"
                            : "border-gray-300 hover:border-gray-400 text-gray-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="border-b border-gray-200 pb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-6 py-3 font-semibold border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-4 px-6 rounded-lg border-2 border-orange-400 text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-4 px-6 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 transition-all duration-200 shadow-sm"
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                  <Heart size={16} />
                  Add to Wish List
                </button>
                <span className="text-gray-300">|</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Share
                </button>
              </div>
            </div>

            {/* Enhanced Trust Badges */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Secure transaction</p>
                    <p className="text-xs text-gray-600">Your payment is protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw size={20} className="text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Easy returns</p>
                    <p className="text-xs text-gray-600">30-day return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-orange-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Free delivery</p>
                    <p className="text-xs text-gray-600">On orders over ₹499</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-purple-600" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Genuine product</p>
                    <p className="text-xs text-gray-600">100% authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50">
            {[
              { id: "description", label: "Product Description", icon: "📝" },
              { id: "specifications", label: "Specifications", icon: "📋" },
              { id: "sizing", label: "Size Guide", icon: "📏" },
              { id: "care", label: "Care Instructions", icon: "🧼" },
              { id: "reviews", label: "Customer Reviews", icon: "⭐" },
              { id: "shipping", label: "Shipping & Returns", icon: "🚚" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "text-orange-600 border-b-2 border-orange-600 bg-white"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">{renderTabContent()}</div>
        </div>

      
        {/* Customer Reviews Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews & Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-gray-900">{product.rating || 4.5}</div>
                <div>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{product.reviews || 1234} global ratings</p>
                </div>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2 text-sm">
                    <span className="w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : stars === 2 ? 3 : 2}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-gray-600">{stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : stars === 2 ? 3 : 2}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Review Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Excellent quality and finish</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Perfect fit and comfort</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Value for money</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailPage;
