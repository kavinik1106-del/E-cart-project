import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
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

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const delivery = total > 999 ? 0 : 49;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">

        {/* Products */}
        <section className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="relative h-52 bg-gray-100 flex justify-center items-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full object-contain"
                />

                <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                  {p.tag}
                </span>

                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                  <Heart size={18} className="text-gray-400" />
                </button>
              </div>

              {/* Details */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm">{p.name}</h3>

                <div className="flex items-center text-sm">
                  <Star size={14} className="text-green-600 fill-green-600" />
                  <span className="ml-1">{p.rating}</span>
                  <span className="text-gray-400 ml-1">
                    ({p.reviews})
                  </span>
                </div>

                <p className="text-xs text-gray-600">{p.description}</p>

                {/* Highlights */}
                <ul className="text-xs text-gray-500 list-disc list-inside">
                  {p.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                {/* Price */}
                <div>
                  <span className="text-lg font-bold text-pink-600">
                    ₹{p.price}
                  </span>
                  <span className="line-through text-gray-400 text-sm ml-2">
                    ₹{p.mrp}
                  </span>
                  <span className="text-green-600 text-sm ml-2">
                    {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% OFF
                  </span>
                </div>

                <p className="text-xs text-green-600">
                  Free Delivery • 7 Days Return
                </p>

                <button
                  onClick={() => addToCart(p)}
                  className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </section>

       {/* Order Summary */}
<section className="bg-white rounded-xl shadow p-6">
  <h2 className="text-xl font-bold text-pink-600 mb-4">
    Order Summary
  </h2>

  {/* Cart Items */}
  {cart.length === 0 ? (
    <p className="text-sm text-gray-500 text-center">
      Your cart is empty
    </p>
  ) : (
    <div className="text-sm space-y-2">
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>
            {item.name} × {item.quantity}
          </span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}
    </div>
  )}

  <hr className="my-3" />

  {/* Price Details */}
  <div className="text-sm space-y-1">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>₹{total}</span>
    </div>

    <div className="flex justify-between">
      <span>Delivery Charges</span>
      <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
    </div>

    <div className="flex justify-between text-green-600">
      <span>Discount</span>
      <span>₹0</span>
    </div>

    <hr />

    <div className="flex justify-between font-bold text-lg">
      <span>Total Amount</span>
      <span>₹{total + delivery}</span>
    </div>
  </div>

  {/* Address */}
  <div className="mt-4 text-sm">
    <h3 className="font-semibold mb-1">Delivery Address</h3>
    <p className="text-gray-600">
      Chennai, Tamil Nadu<br />
      India
    </p>
  </div>

  {/* Payment Method */}
  <div className="mt-4 text-sm">
    <h3 className="font-semibold mb-1">Payment Method</h3>
    <p className="text-gray-600">Cash on Delivery</p>
  </div>

  {/* Place Order */}
  <button
    disabled={cart.length === 0}
    className="w-full mt-4 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 disabled:bg-gray-300"
  >
    Place Order
  </button>

  <p className="text-xs text-gray-500 text-center mt-2">
    Safe payment • Secure checkout • Easy returns
  </p>
</section>


      </div>
    </div>
  );
}

export default OrderPage;
