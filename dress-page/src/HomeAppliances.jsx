import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function HomeAppliances() {
  const products = [
    { id: 1, type: "Kitchen", name: "Plates Set", price: 499, mrp: 699, image: "/plates.jpg", rating: 4.2, reviews: 45, discount: 29 },
    { id: 2, type: "Glassware", name: "Glass Set", price: 299, mrp: 399, image: "/glasss.jpg", rating: 4.0, reviews: 32, discount: 25 },
    { id: 3, type: "Bottle", name: "Water Bottle", price: 249, mrp: 349, image: "/th.jpg", rating: 4.3, reviews: 67, discount: 29 },
    { id: 4, type: "Electronics", name: "Ceiling Fan", price: 2499, mrp: 3499, image: "/fan.jpg", rating: 4.5, reviews: 123, discount: 29 },
    { id: 5, type: "Lighting", name: "Tube Light", price: 349, mrp: 499, image: "/tubelight.webp", rating: 4.1, reviews: 28, discount: 30 },
    { id: 6, type: "Accessory", name: "Spice Box", price: 199, mrp: 299, image: "/box.jpg", rating: 4.4, reviews: 56, discount: 33 },
    { id: 7, type: "Bottle opener", name: "Bottle Opener", price: 99, mrp: 149, image: "/OIP (8).webp", rating: 3.9, reviews: 18, discount: 34 },
    { id: 8, type: "Iron", name: "Iron Box", price: 999, mrp: 1399, image: "/R.jpg", rating: 4.6, reviews: 89, discount: 29 },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Rounded pink header card separated from navbar */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-white text-primary rounded-2xl p-5 text-center shadow-md border-2 border-primary">
          <h1 className="text-2xl font-bold">Home Appliances & Goods</h1>
          <p className="text-sm mt-1">Plates, Glass, Water Bottles, Fans, Tube Lights & More</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              products={products}
              showRating={true}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomeAppliances;
