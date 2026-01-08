import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function HomeAppliances() {
  const products = [
    { 
      id: 1, 
      type: "Kitchen", 
      name: "Plates Set", 
      price: 499, 
      mrp: 699,
      image: "/plates.jpg",
      rating: 4.3,
      reviews: 45,
      discount: 28
    },
    { 
      id: 2, 
      type: "Glassware", 
      name: "Glass Set", 
      price: 299, 
      mrp: 499,
      image: "/glasss.jpg",
      rating: 4.2,
      reviews: 32,
      discount: 40
    },
    { 
      id: 3, 
      type: "Bottle", 
      name: "Water Bottle", 
      price: 249, 
      mrp: 399,
      image: "/th.jpg",
      rating: 4.4,
      reviews: 67,
      discount: 38
    },
    { 
      id: 4, 
      type: "Electronics", 
      name: "Ceiling Fan", 
      price: 2499, 
      mrp: 3299,
      image: "/fan.jpg",
      rating: 4.5,
      reviews: 128,
      discount: 24
    },
    { 
      id: 5, 
      type: "Lighting", 
      name: "Tube Light", 
      price: 349, 
      mrp: 599,
      image: "/tubelight.webp",
      rating: 4.1,
      reviews: 54,
      discount: 42
    },
    { 
      id: 6, 
      type: "Accessory", 
      name: "Spice Box", 
      price: 199, 
      mrp: 349,
      image: "/box.jpg",
      rating: 4.2,
      reviews: 38,
      discount: 43
    },
    { 
      id: 7, 
      type: "Bottle opener", 
      name: "Bottle Opener", 
      price: 99, 
      mrp: 199,
      image: "/OIP (8).webp",
      rating: 4.0,
      reviews: 22,
      discount: 50
    },
    { 
      id: 8, 
      type: "Iron", 
      name: "Iron Box", 
      price: 999, 
      mrp: 1499,
      image: "/R.jpg",
      rating: 4.4,
      reviews: 89,
      discount: 33
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Header Card with Primary Color */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-primary text-white rounded-2xl p-6 text-center shadow-lg">
          <h1 className="text-3xl font-bold">Home Appliances & Goods</h1>
          <p className="text-sm mt-2 opacity-90">Plates, Glass, Water Bottles, Fans, Tube Lights & More</p>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} products={products} showRating={true} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomeAppliances;
