import React from "react";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

function HomeAppliances() {
  const products = [
    { id: 1, type: "Kitchen", name: "Plates Set", price: "₹499", image: "/plates.jpg" },
    { id: 2, type: "Glassware", name: "Glass Set", price: "₹299", image: "/glasss.jpg" },
    { id: 3, type: "Bottle", name: "Water Bottle", price: "₹249", image: "/th.jpg" },
    { id: 4, type: "Electronics", name: "Ceiling Fan", price: "₹2,499", image: "/fan.jpg" },
    { id: 5, type: "Lighting", name: "Tube Light", price: "₹349", image: "/tubelight.webp" },
    { id: 6, type: "Accessory", name: "Spice Box", price: "₹199", image: "/box.jpg" },
    { id: 7, type: "Bottle opener", name: "Bottle Opener", price: "₹99", image: "/OIP (8).webp" },
    { id: 8, type: "Iron", name: "Iron Box", price: "₹999", image: "/R.jpg" },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Rounded pink header card separated from navbar */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-pink-600 text-white rounded-2xl p-5 text-center shadow-md">
          <h1 className="text-2xl font-bold">Home Appliances & Goods</h1>
          <p className="text-sm mt-1">Plates, Glass, Water Bottles, Fans, Tube Lights & More</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="w-full h-full flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="h-full object-contain p-3" />
                </Link>
              </div>

              <div className="p-4">
                <div className="text-xs text-pink-600 font-semibold">{p.type}</div>
                <h3 className="mt-1 font-semibold text-sm">
                  <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="hover:underline">{p.name}</Link>
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-pink-600 font-bold">{p.price}</div>
                  <Link to={`/product/${p.id}`} state={{ product: p, related: products }} className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 text-xs">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomeAppliances;
