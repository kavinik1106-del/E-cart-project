import React from "react";
import Navbar from "./Navbar";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Cart 🛒</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded shadow flex gap-4 mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p>{item.price}</p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <Link
              to="/checkout"
              className="block text-center bg-green-600 text-white py-3 rounded"
            >
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
