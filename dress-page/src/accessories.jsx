import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function Accessories() {
  const products = [
    {
      id: 1,
      brand: "Lakme",
      category: "Nail Polish",
      name: "Lakme 9 to 5 Nail Color",
      price: 249,
      mrp: 399,
      rating: 4.5,
      reviews: 67,
      image: "/ring.jpg",
      discount: 38
    },
    {
      id: 2,
      brand: "Maybelline",
      category: "Eyeliner",
      name: "Maybelline Colossal Liner",
      price: 399,
      mrp: 649,
      rating: 4.6,
      reviews: 89,
      image: "/chain.jpg",
      discount: 39
    },
    {
      id: 3,
      brand: "Zaveri Pearls",
      category: "Earrings",
      name: "Gold Plated Earrings",
      price: 899,
      mrp: 1399,
      rating: 4.4,
      reviews: 112,
      image: "/bracelet.webp",
      discount: 36
    },
    {
      id: 4,
      brand: "Nova",
      category: "Comb",
      name: "Nova Hair Styling Comb",
      price: 149,
      mrp: 299,
      rating: 4.2,
      reviews: 45,
      image: "/chain1.jpg",
      discount: 50
    },
    {
      id: 5,
      brand: "Milton",
      category: "Water Bottle",
      name: "Milton Thermosteel Bottle",
      price: 799,
      mrp: 1199,
      rating: 4.7,
      reviews: 156,
      image: "/waterbottle.jpg",
      discount: 33
    },
    {
      id: 6,
      brand: "Tanishq",
      category: "Bracelet",
      name: "Gold Plated Bracelet",
      price: 1299,
      mrp: 1999,
      rating: 4.3,
      reviews: 98,
      image: "/bracelet2.jpg",
      discount: 35
    },
    {
      id: 7,
      brand: "Revlon",
      category: "Lipstick",
      name: "Revlon Super Lustrous Lipstick",
      price: 499,
      mrp: 799,
      rating: 4.5,
      reviews: 87,
      image: "/chain2.jpg",
      discount: 38
    },
    {
      id: 8,
      brand: "Giordani",
      category: "Jewelry",
      name: "Silver Pendant Necklace",
      price: 899,
      mrp: 1499,
      rating: 4.4,
      reviews: 76,
      image: "/bracelet3.jpg",
      discount: 40
    },
    {
      id: 9,
      brand: "JOAH",
      category: "Sunglasses",
      name: "UV Protection Sunglasses",
      price: 699,
      mrp: 1199,
      rating: 4.5,
      reviews: 94,
      image: "/lens.jpg",
      discount: 42
    },
    {
      id: 10,
      brand: "Malabar Gold",
      category: "Jewelry",
      name: "Gold Antique Ring",
      price: 2499,
      mrp: 3999,
      rating: 4.6,
      reviews: 134,
      image: "/jew.jpg",
      discount: 38
    },
    {
      id: 11,
      brand: "Scunci",
      category: "Hair Clips",
      name: "Decorative Hair Clips",
      price: 249,
      mrp: 499,
      rating: 4.3,
      reviews: 62,
      image: "/hairclip.jpg",
      discount: 50
    },
    {
      id: 12,
      brand: "Malabar",
      category: "Jewelry",
      name: "Diamond Studs Earrings",
      price: 1899,
      mrp: 2999,
      rating: 4.5,
      reviews: 108,
      image: "/jew1.jpg",
      discount: 37
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Header Card with Primary Color */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-primary text-white rounded-2xl p-6 text-center shadow-lg">
          <h1 className="text-3xl font-bold">Accessories & Daily Use</h1>
          <p className="text-sm mt-2 opacity-90">
            Beauty • Jewellery • Home • Essentials
          </p>
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

export default Accessories;