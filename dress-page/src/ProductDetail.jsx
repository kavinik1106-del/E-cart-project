import React, { useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { useCart } from "./contexts/CartContext.jsx";
import { Heart, Share2, Truck, RefreshCw, Shield } from "lucide-react";

function ProductDetail() {
  const { id: _id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const product = location.state?.product;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product?.sizeGuide ? Object.keys(product.sizeGuide)[0] : "M");
  const [selectedQuantity, setSelectedQuantity] = useState(product?.quantityGuide ? Object.keys(product.quantityGuide)[0] : null);
  const [color, setColor] = useState("Default");
  const [activeTab, setActiveTab] = useState("description");

  // Get product price based on quantity selection
  const getProductPrice = () => {
    if (product.quantityGuide && selectedQuantity) {
      return product.quantityGuide[selectedQuantity].price;
    }
    return product.price;
  };

  const changeQty = (n) => setQty((q) => Math.max(1, q + n));

  const handleAddToCart = () => {
    addToCart(product, qty, size, color);
    navigate("/order");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="mt-2 text-gray-600">No product data was provided. Go back to the catalog.</p>
          <Link to="/collection" className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded">Browse Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/collection" className="hover:text-blue-600">Home</Link> / 
          <span className="ml-1">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <div className="bg-gray-100 rounded-lg flex items-center justify-center h-80 overflow-hidden">
                <img src={product.image} alt={product.name} className="max-h-full object-contain p-4" />
              </div>
              {product.tag && (
                <div className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-center font-semibold text-sm">
                  {product.tag}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Title & Ratings */}
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-semibold">{product.rating || 4.5}</span>
                    {product.reviews && <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>}
                  </div>
                  {product.tag && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{product.tag}</span>}
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-blue-600">₹{getProductPrice()}</span>
                  {product.mrp && (
                    <>
                      <span className="line-through text-gray-400 text-lg">₹{product.mrp}</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(((product.mrp - getProductPrice()) / product.mrp) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-green-600 text-sm font-semibold">✓ In Stock</p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description || "Premium quality product."}</p>

              {/* Options */}
              <div className="space-y-6 mb-6">
                {/* Quantity Guide (for vegetables/spices) */}
                {product.quantityGuide && (
                  <div>
                    <label className="block text-sm font-semibold mb-3">Select Quantity</label>
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(product.quantityGuide).map(([key, data]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedQuantity(key)}
                          className={`px-4 py-2 border rounded-lg font-medium transition ${
                            selectedQuantity === key
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                          }`}
                        >
                          <div>{key}</div>
                          <div className="text-xs">{data.price ? `₹${data.price}` : ''}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Guide (for shoes/clothes) */}
                {product.sizeGuide && (
                  <div>
                    <label className="block text-sm font-semibold mb-3">Select Size</label>
                    <div className="flex gap-2 flex-wrap">
                      {Object.keys(product.sizeGuide).map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`px-4 py-2 border rounded-lg font-medium transition ${
                            size === s
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color - Hide for vegetables/spices */}
                {!['Vegetable', 'Spice'].includes(product.type) && (
                  <div>
                    <label className="block text-sm font-semibold mb-3">Select Color</label>
                    <div className="flex gap-3">
                      {[
                        { name: 'Red', color: 'bg-red-500' },
                        { name: 'Blue', color: 'bg-blue-500' },
                        { name: 'Green', color: 'bg-green-500' },
                        { name: 'Black', color: 'bg-black' },
                        { name: 'White', color: 'bg-gray-200 border-gray-400' }
                      ].map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setColor(c.name)}
                          className={`w-10 h-10 rounded-full border-2 transition ${
                            color === c.name ? 'ring-2 ring-blue-600 border-blue-600 scale-110' : 'border-gray-300'
                          } ${c.color}`}
                          title={c.name}
                        >
                          <span className="sr-only">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Quantity</label>
                  <div className="flex items-center gap-3 w-fit">
                    <button onClick={() => changeQty(-1)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">−</button>
                    <span className="w-12 text-center font-semibold text-lg">{qty}</span>
                    <button onClick={() => changeQty(1)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">+</button>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold mb-3">Product Highlights</h3>
                  <ul className="space-y-2">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-600 font-bold">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product Details for Vegetables/Spices */}
              {['Vegetable', 'Spice'].includes(product.type) && product.specifications && (
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold mb-4">Product Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-xs text-gray-500 font-semibold uppercase">{key}</span>
                        <span className="text-sm text-gray-700 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary font-semibold transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <Heart size={20} className={isInWishlist(product.id) ? "fill-red-600 text-red-600" : ""} />
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Truck size={24} className="text-blue-600" />
                  <span className="text-xs text-center">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <RefreshCw size={24} className="text-blue-600" />
                  <span className="text-xs text-center">7 Days Return</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Shield size={24} className="text-blue-600" />
                  <span className="text-xs text-center">Secure Payment</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mt-6 overflow-hidden">
              <div className="flex border-b overflow-x-auto">
                {['description', 'specifications', 'care', product.sizeGuide ? 'size-guide' : 'quantity-guide', 'reviews', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-4 font-semibold whitespace-nowrap transition ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'size-guide' ? 'Size Guide' : tab === 'quantity-guide' ? 'Quantity Options' : tab === 'care' ? 'Care' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="space-y-4 text-gray-700">
                    <p className="leading-relaxed">{product.description}</p>
                    {product.weight && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p><strong>Weight:</strong> {product.weight}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'specifications' && product.specifications && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-4">Product Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex gap-3 pb-3 border-b">
                          <div className="font-semibold text-gray-700 min-w-fit">{key}:</div>
                          <div className="text-gray-600">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'care' && product.careInstructions && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Care Instructions</h3>
                    <ol className="space-y-2 list-decimal list-inside text-gray-700">
                      {product.careInstructions.map((instruction, i) => (
                        <li key={i} className="text-sm">{instruction}</li>
                      ))}
                    </ol>
                    {product.warranty && (
                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="font-semibold text-yellow-900">{product.warranty}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'size-guide' && product.sizeGuide && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Size Guide & Measurements</h3>
                      <p className="text-gray-600 mb-6 text-sm">All measurements are in inches. Choose your size based on the description and measurements provided.</p>
                      
                      {/* Size Chart Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-blue-50 border-b-2 border-blue-600">
                              <th className="px-4 py-3 text-left font-semibold text-gray-900">Size</th>
                              {Object.values(product.sizeGuide)[0] && 
                                Object.keys(Object.values(product.sizeGuide)[0])
                                  .filter(k => k !== 'description')
                                  .map((key) => (
                                    <th key={key} className="px-4 py-3 text-left font-semibold text-gray-900 capitalize">
                                      {key}
                                    </th>
                                  ))
                              }
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(product.sizeGuide).map(([sizeKey, measurements], idx) => (
                              <tr 
                                key={sizeKey}
                                className={`border-b ${
                                  size === sizeKey || sizeKey === size
                                    ? 'bg-blue-50 border-l-4 border-l-blue-600'
                                    : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                }`}
                              >
                                <td className={`px-4 py-3 font-bold ${size === sizeKey || sizeKey === size ? 'text-blue-600' : 'text-gray-900'}`}>
                                  {sizeKey}
                                </td>
                                {Object.entries(measurements)
                                  .filter(([key]) => key !== 'description')
                                  .map(([key, value]) => (
                                    <td key={key} className="px-4 py-3 text-gray-700">
                                      {value}
                                    </td>
                                  ))
                                }
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Size Descriptions */}
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.sizeGuide).map(([sizeKey, measurements]) => (
                          <div
                            key={sizeKey}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                              size === sizeKey || sizeKey === size
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            }`}
                            onClick={() => setSize(sizeKey)}
                          >
                            <div className={`font-bold text-lg mb-1 ${size === sizeKey || sizeKey === size ? 'text-blue-600' : 'text-gray-900'}`}>
                              {sizeKey}
                            </div>
                            <div className="text-sm text-gray-600">
                              {measurements.description}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Measurement Tips */}
                      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-3">How to Measure</h4>
                        <ul className="text-sm text-blue-800 space-y-2">
                          <li>• <strong>Chest/Waist:</strong> Measure around the fullest part of your chest/waist with measuring tape</li>
                          <li>• <strong>Length:</strong> Measure from shoulder to desired hem length</li>
                          <li>• <strong>Shoulders:</strong> Measure from shoulder point to shoulder point</li>
                          <li>• <strong>Inseam:</strong> Measure from inside of thigh to ankle</li>
                          <li>• <strong>Hips:</strong> Measure around the fullest part of your hips</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'quantity-guide' && product.quantityGuide && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Quantity Options & Pricing</h3>
                      <p className="text-gray-600 mb-6 text-sm">Choose the quantity that suits your needs. Bulk purchases offer better value.</p>
                      
                      {/* Quantity Chart Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-blue-50 border-b-2 border-blue-600">
                              <th className="px-4 py-3 text-left font-semibold text-gray-900">Quantity</th>
                              <th className="px-4 py-3 text-left font-semibold text-gray-900">Price</th>
                              <th className="px-4 py-3 text-left font-semibold text-gray-900">Price per Unit</th>
                              <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(product.quantityGuide).map(([qtyKey, qtyData], idx) => {
                              
                              return (
                                <tr 
                                  key={qtyKey}
                                  className={`border-b ${
                                    selectedQuantity === qtyKey
                                      ? 'bg-blue-50 border-l-4 border-l-blue-600'
                                      : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                  }`}
                                >
                                  <td className={`px-4 py-3 font-bold ${selectedQuantity === qtyKey ? 'text-blue-600' : 'text-gray-900'}`}>
                                    {qtyKey}
                                  </td>
                                  <td className="px-4 py-3 font-semibold text-blue-600">₹{qtyData.price}</td>
                                  <td className="px-4 py-3 text-gray-700">₹{(qtyData.price / parseFloat(qtyData.weight.replace(/[a-zA-Z]/g, ''))).toFixed(2)}/{qtyData.weight.replace(/[0-9]/g, '').trim()}</td>
                                  <td className="px-4 py-3 text-gray-700">{qtyData.description}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Quantity Selection Cards */}
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(product.quantityGuide).map(([qtyKey, qtyData]) => (
                          <div
                            key={qtyKey}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                              selectedQuantity === qtyKey
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            }`}
                            onClick={() => setSelectedQuantity(qtyKey)}
                          >
                            <div className={`font-bold text-lg mb-2 ${selectedQuantity === qtyKey ? 'text-blue-600' : 'text-gray-900'}`}>
                              {qtyKey}
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mb-2">₹{qtyData.price}</div>
                            <div className="text-sm text-gray-600 mb-3">
                              {qtyData.description}
                            </div>
                            {qtyData.price && parseFloat(qtyData.weight) > 1 && (
                              <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded inline-block">
                                Save {Math.round((1 - (qtyData.price / (product.quantityGuide[Object.keys(product.quantityGuide)[0]].price * parseFloat(qtyData.weight) / parseFloat(product.quantityGuide[Object.keys(product.quantityGuide)[0]].weight)))) * 100)}%
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Storage Tips */}
                      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-3">Storage Tips</h4>
                        <ul className="text-sm text-blue-800 space-y-2">
                          {product.careInstructions.map((instruction, i) => (
                            <li key={i}>• {instruction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div>
                        <div className="text-4xl font-bold text-gray-900">{product.rating || 4.5}</div>
                        <div className="text-yellow-400 text-lg">★★★★★</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600 text-sm"><strong>{product.reviews || 0}</strong> verified customer reviews</p>
                        <button className="mt-3 text-blue-600 font-semibold hover:underline text-sm">Write a Review</button>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <p className="text-green-700 font-semibold">✓ {product.reviews || 0} verified purchases</p>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-4 text-gray-700">
                    <div className="border-l-4 border-blue-600 pl-4 py-2">
                      <p className="font-semibold text-gray-900">Free Shipping</p>
                      <p className="text-sm">On orders above ₹999</p>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4 py-2">
                      <p className="font-semibold text-gray-900">Delivery Time</p>
                      <p className="text-sm">2-5 business days depending on your location</p>
                    </div>
                    <div className="border-l-4 border-green-600 pl-4 py-2">
                      <p className="font-semibold text-gray-900">Easy Returns</p>
                      <p className="text-sm">7 days return policy for all products</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4 py-2">
                      <p className="font-semibold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm">Available for select locations</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products */}
            {location.state?.related && location.state.related.length > 0 && (
              <div className="bg-white rounded-lg shadow mt-6 p-6">
                <h3 className="text-xl font-bold mb-6">Related Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {location.state.related.slice(0, 4).map((r) => (
                    <div key={r.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition">
                      {/* Image */}
                      <Link
                        to={`/product/${r.id}`}
                        state={{ product: r }}
                        className="block"
                      >
                        <div className="bg-white rounded-lg flex items-center justify-center h-40 overflow-hidden mb-3 group hover:shadow-md transition">
                          <img src={r.image} alt={r.name} className="max-h-full object-contain p-2" />
                        </div>
                      </Link>

                      {/* Product Details Below Image */}
                      <div className="mb-3 text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-yellow-400 font-semibold">{r.rating || 4.5}★</span>
                          <span className="text-gray-500">({r.reviews || 0})</span>
                        </div>
                        {r.tag && (
                          <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold inline-block">
                            {r.tag}
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <Link
                        to={`/product/${r.id}`}
                        state={{ product: r }}
                        className="block group"
                      >
                        <p className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 mb-2">{r.name}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-blue-600 font-bold text-sm">₹{r.price}</p>
                          {r.mrp && <p className="line-through text-gray-400 text-xs">₹{r.mrp}</p>}
                        </div>
                      </Link>

                      {/* Size Selection */}
                      {r.sizeGuide && (
                        <div className="mb-3">
                          <label className="block text-xs font-semibold mb-2 text-gray-700">Size</label>
                          <div className="flex gap-1 flex-wrap">
                            {Object.keys(r.sizeGuide).slice(0, 3).map((s) => (
                              <button
                                key={s}
                                className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-blue-100 hover:border-blue-600 transition"
                              >
                                {s}
                              </button>
                            ))}
                            {Object.keys(r.sizeGuide).length > 3 && (
                              <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-blue-100 hover:border-blue-600 transition">
                                +{Object.keys(r.sizeGuide).length - 3}
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Quick Add Button */}
                      <Link
                        to={`/product/${r.id}`}
                        state={{ product: r }}
                        className="w-full bg-primary text-white px-3 py-2 rounded text-sm font-semibold hover:bg-primary transition block text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetail;