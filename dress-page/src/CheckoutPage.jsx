import React from "react";
import Navbar from "./Navbar";
import { useCart } from "./contexts/CartContext";

function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price.replace("₹", "").replace(",", ""));
  }, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 bg-white mt-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Checkout 🧾</h2>

        <p>Total Items: {cart.length}</p>
        <p className="font-bold text-lg mb-4">Total: ₹{total}</p>

        <button
          onClick={() => alert("Order placed successfully 🎉")}
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
