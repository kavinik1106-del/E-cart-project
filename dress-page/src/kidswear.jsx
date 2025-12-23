import React from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

function KidsWear() {
  const products = [
    {
      id: 1,
      category: "Dress",
      name: "Kids Party Dress",
      price: "₹1,299",
      image: "/kid1.webp",
    },
    {
      id: 2,
      category: "Shoes",
      name: "Kids Sports Shoes",
      price: "₹999",
      image: "/kid.jpg",
    },
    {
      id: 3,
      category: "Innerwear",
      name: "Kids Inner Set",
      price: "₹399",
      image: "/kid2.jpg",
    },
    {
      id: 4,
      category: "Glasses",
      name: "Kids Sunglasses",
      price: "₹499",
      image: "/kid3.jpg",
    },
    {
      id: 5,
      category: "Dress",
      name: "Kids Casual Wear",
      price: "₹899",
      image: "/kid4.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid5.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid6.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid7.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid8.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid9.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid10.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid11.jpg",
    },
    
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Header Card */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-pink-600 text-white rounded-2xl p-5 text-center shadow-md">
          <h1 className="text-2xl font-bold">Kids Wear</h1>
          <p className="text-sm mt-1">
            Dresses, Shoes, Innerwear & Accessories
          </p>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="w-full h-full flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full object-contain p-3"
                  />
                </Link>
              </div>

              <div className="p-4">
                <div className="text-xs text-pink-600 font-semibold">
                  {p.category}
                </div>
                <h3 className="mt-1 font-semibold text-sm">
                  <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="hover:underline">{p.name}</Link>
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-pink-600 font-bold">{p.price}</div>
                  <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 text-xs">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default KidsWear;
