import React from "react";
import Navbar from "./Navbar";
import { useCart } from "./contexts/CartContext";

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Wishlist 💖</h2>

        {wishlist.length === 0 ? (
          <p>No wishlist items</p>
        ) : (
          wishlist.map((item) => (
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

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(item)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
