import React from "react";
import Navbar from "./Navbar";
import { useCart } from "./contexts/CartContext";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, ArrowLeft } from "lucide-react";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, toggleWishlist } = useCart();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">My Shopping Cart 🛒</h2>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
            <div className="mb-6">
              <ShoppingBag size={80} className="mx-auto text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Continue Shopping
              </Link>
              <Link
                to="/wishlist"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Heart size={20} className="mr-2" />
                View Wishlist
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Cart Items ({getCartCount()})</h3>
                
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <p className="text-blue-600 font-bold text-xl">₹{item.price.toLocaleString('en-IN')}</p>
                      
                      {/* Size and Color if available */}
                      {(item.size || item.color) && (
                        <div className="text-sm text-gray-600 mt-1">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.size && item.color && <span> | </span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm underline hover:no-underline transition-colors"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => {
                            toggleWishlist(item);
                            removeFromCart(item.id);
                          }}
                          className="text-blue-500 hover:text-blue-700 text-sm underline hover:no-underline transition-colors ml-2"
                        >
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Items ({getCartCount()}):</span>
                    <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{(getCartTotal() * 0.18).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{(getCartTotal() * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  to="/"
                  className="block text-center mt-3 text-blue-600 hover:text-blue-800"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
