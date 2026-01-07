import React from "react";
import { useCart } from "./contexts/CartContext.jsx";
import Navbar from "./Navbar";

function TestWishlist() {
  const { wishlist, toggleWishlist } = useCart();

  const testProduct = {
    id: 999,
    name: "Test Product",
    price: 999,
    image: "/mobile.jpg"
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Wishlist Test Page</h1>
        
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="font-bold mb-2">Wishlist Contents ({wishlist.length}):</h2>
          {wishlist.length === 0 ? (
            <p className="text-gray-600">Wishlist is empty</p>
          ) : (
            <ul>
              {wishlist.map((item) => (
                <li key={item.id} className="py-2 border-b">
                  {item.id}: {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-4 rounded border-2 border-gray-300 mb-4">
          <h3 className="font-bold mb-2">Test Product:</h3>
          <p>ID: {testProduct.id}</p>
          <p>Name: {testProduct.name}</p>
          <button
            onClick={() => {
              console.log("🔴 Clicking toggle button");
              toggleWishlist(testProduct);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Toggle in Wishlist
          </button>
        </div>

        <div className="text-sm text-gray-600">
          <p>Open browser console (F12) to see debug logs</p>
        </div>
      </div>
    </>
  );
}

export default TestWishlist;
