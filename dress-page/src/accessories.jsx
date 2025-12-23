import React from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

function Accessories() {
  const products = [
    {
      id: 1,
      brand: "Lakme",
      category: "Nail Polish",
      name: "Lakme 9 to 5 Nail Color",
      price: "₹249",
      rating: 4.5,
      image: "/ring.jpg",
    },
    {
      id: 2,
      brand: "Maybelline",
      category: "Eyeliner",
      name: "Maybelline Colossal Liner",
      price: "₹399",
      rating: 4.6,
      image: "/chain.jpg",
    },
    {
      id: 3,
      brand: "Zaveri Pearls",
      category: "Earrings",
      name: "Gold Plated Earrings",
      price: "₹899",
      rating: 4.4,
      image: "/bracelet.webp",
    },
    {
      id: 4,
      brand: "Nova",
      category: "Comb",
      name: "Nova Hair Styling Comb",
      price: "₹149",
      rating: 4.2,
      image: "/chain1.jpg",
    },
    {
      id: 5,
      brand: "Milton",
      category: "Water Bottle",
      name: "Milton Thermosteel Bottle",
      price: "₹799",
      rating: 4.7,
      image: "/waterbottle.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/bracelet2.jpg",
    },
    {
      id: 7,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/chain2.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/bracelet3.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/lens.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/jew.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/hairclip.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/jew1.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/hairclip2.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/eyeliner.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/eyemask.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/hairclip3.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/chain2.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/ring1.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/hairclip4.webp",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/hairclip5.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/powder.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/heatcup.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/game.jpg",
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: "₹1,299",
      rating: 4.3,
      image: "/bracelet2.jpg",
    },
  ];
  

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Header Card */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-pink-600 text-white rounded-2xl p-5 text-center shadow-md">
          <h1 className="text-2xl font-bold">Accessories & Daily Use</h1>
          <p className="text-sm mt-1">
            Beauty • Jewellery • Home • Essentials
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
                  {p.brand} • {p.category}
                </div>

                <h3 className="mt-1 font-semibold text-sm">
                  <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="hover:underline">{p.name}</Link>
                </h3>

                {/* Rating */}
                <div className="flex items-center text-xs mt-1">
                  ⭐ {p.rating} / 5
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-pink-600 font-bold">
                    {p.price}
                  </div>

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

export default Accessories;