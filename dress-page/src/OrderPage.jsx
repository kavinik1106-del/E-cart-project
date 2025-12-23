import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

function OrderPage() {
  const products = [
    {
      id: 1,
      name: "Sofa Set",
      price: 12000,
      mrp: 28000,
      rating: 4.5,
      reviews: 320,
      image: "/bluesofa.webp",
      tag: "Bestseller",
      description: "Comfortable 3-seater sofa with premium fabric.",
      highlights: ["Soft Cushions", "Strong Wooden Frame", "Modern Design"],
    },
    {
      id: 2,
      name: "Red Party Dress",
      price: 1500,
      mrp: 2200,
      rating: 4.3,
      reviews: 210,
      image: "/dress1.webp",
      tag: "Trending",
      description: "Stylish party wear dress for special occasions.",
      highlights: ["Premium Fabric", "Perfect Fit", "Elegant Look"],
    },
    {
      id: 3,
      name: "Cashew Dry Fruits",
      price: 800,
      mrp: 1200,
      rating: 4.6,
      reviews: 540,
      image: "/cashew.webp",
      tag: "Bestseller",
      description: "Fresh and healthy premium quality cashews.",
      highlights: ["100% Natural", "High Protein", "Crunchy Taste"],
    },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((p) => p.id === product.id);
    if (exists) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalMRP = cart.reduce((sum, p) => sum + p.mrp * p.quantity, 0);
  const discount = totalMRP - total;
  const delivery = total > 999 ? 0 : 49;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">
        {/* Products */}
        <section className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow">
              <div className="relative h-52 bg-gray-100 flex justify-center items-center">
                <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="w-full h-full flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="h-full object-contain" />
                </Link>
                <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                  {p.tag}
                </span>
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                  <Heart size={18} className="text-gray-400" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm">{p.name}</h3>

                <div className="flex items-center text-sm">
                  <Star size={14} className="text-green-600 fill-green-600" />
                  <span className="ml-1">{p.rating}</span>
                  <span className="text-gray-400 ml-1">({p.reviews})</span>
                </div>

                <p className="text-xs text-gray-600">{p.description}</p>

                <ul className="text-xs text-gray-500 list-disc list-inside">
                  {p.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div>
                  <span className="text-lg font-bold text-pink-600">₹{p.price}</span>
                  <span className="line-through text-gray-400 text-sm ml-2">₹{p.mrp}</span>
                  <span className="text-green-600 text-sm ml-2">
                    {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% OFF
                  </span>
                </div>

                <p className="text-xs text-green-600">Free Delivery • 7 Days Return</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(p)}
                    className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
                  >
                    Add to Cart
                  </button>
                  <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="px-3 py-2 border rounded-lg text-sm">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Order Summary */}
        <section className="bg-white rounded-xl shadow-lg p-6 border">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">Your cart is empty</p>
          ) : (
            <div className="space-y-4 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 border-b pb-3">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded" />

                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-green-600 text-xs">Free Delivery</p>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                      <span className="line-through text-gray-400 text-xs">
                        ₹{item.mrp * item.quantity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => decreaseQty(item.id)} className="px-2 border rounded">−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)} className="px-2 border rounded">+</button>

                      <button onClick={() => removeItem(item.id)} className="text-pink-600 text-xs ml-3">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 text-sm space-y-2">
            <h3 className="font-semibold">Price Details</h3>

            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{totalMRP}</span>
            </div>

            <div className="flex justify-between text-green-700">
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Order Total</span>
              <span>₹{total + delivery}</span>
            </div>

            <p className="text-green-700 text-xs">You saved ₹{discount} on this order</p>
          </div>

          <div className="mt-4 bg-pink-50 p-3 rounded text-xs space-y-1">
            <p>✔ 7 Days Easy Return</p>
            <p>✔ Cash on Delivery Available</p>
            <p>✔ Trusted by 1 Crore+ Customers</p>
          </div>

          <button
            disabled={cart.length === 0}
            className="w-full mt-4 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 disabled:bg-gray-300"
          >
            Place Order (Cash on Delivery)
          </button>
        </section>
      </div>
    </div>
  );
}

export default OrderPage;