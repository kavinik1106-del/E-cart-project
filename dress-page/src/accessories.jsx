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
      mrp: 349,
      rating: 4.5,
      reviews: 156,
      image: "/ring.jpg",
      discount: 29
    },
    {
      id: 2,
      brand: "Maybelline",
      category: "Eyeliner",
      name: "Maybelline Colossal Liner",
      price: 399,
      mrp: 549,
      rating: 4.6,
      reviews: 203,
      image: "/chain.jpg",
      discount: 27
    },
    {
      id: 3,
      brand: "Zaveri Pearls",
      category: "Earrings",
      name: "Gold Plated Earrings",
      price: 899,
      mrp: 1299,
      rating: 4.4,
      reviews: 89,
      image: "/bracelet.webp",
      discount: 31
    },
    {
      id: 4,
      brand: "Nova",
      category: "Comb",
      name: "Nova Hair Styling Comb",
      price: 149,
      mrp: 199,
      rating: 4.2,
      reviews: 67,
      image: "/chain1.jpg",
      discount: 25
    },
    {
      id: 5,
      brand: "Milton",
      category: "Water Bottle",
      name: "Milton Thermosteel Bottle",
      price: 799,
      mrp: 1099,
      rating: 4.7,
      reviews: 178,
      image: "/waterbottle.jpg",
      discount: 27
    },
    {
      id: 6,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: 1299,
      mrp: 1599,
      rating: 4.3,
      reviews: 245,
      image: "/bracelet2.jpg",
      discount: 19
    },
    {
      id: 7,
      brand: "Godrej",
      category: "Chair",
      name: "Godrej Office Chair",
      price: 2499,
      mrp: 2999,
      rating: 4.5,
      reviews: 189,
      image: "/chain2.jpg",
      discount: 17
    },
    {
      id: 8,
      brand: "Nilkamal",
      category: "Chair",
      name: "Nilkamal Plastic Chair",
      price: 1299,
      mrp: 1599,
      rating: 4.3,
      reviews: 245,
      image: "/bracelet3.jpg",
      discount: 19
    },
    {
      id: 9,
      brand: "Lenskart",
      category: "Eyewear",
      name: "Lenskart UV Protection Sunglasses",
      price: 899,
      mrp: 1299,
      rating: 4.6,
      reviews: 312,
      image: "/lens.jpg",
      discount: 31
    },
    {
      id: 10,
      brand: "Tanishq",
      category: "Jewellery",
      name: "Tanishq Gold Necklace",
      price: 15999,
      mrp: 18999,
      rating: 4.8,
      reviews: 67,
      image: "/jew.jpg",
      discount: 16
    },
    {
      id: 11,
      brand: "Clipsy",
      category: "Hair Accessories",
      name: "Clipsy Hair Clips Set",
      price: 199,
      mrp: 299,
      rating: 4.2,
      reviews: 456,
      image: "/hairclip.jpg",
      discount: 33
    },
    {
      id: 12,
      brand: "Tanishq",
      category: "Jewellery",
      name: "Tanishq Silver Earrings",
      price: 2499,
      mrp: 2999,
      rating: 4.7,
      reviews: 123,
      image: "/jew1.jpg",
      discount: 17
    },
    {
      id: 13,
      brand: "Clipsy",
      category: "Hair Accessories",
      name: "Clipsy Decorative Hair Clips",
      price: 149,
      mrp: 249,
      rating: 4.1,
      reviews: 678,
      image: "/hairclip2.jpg",
      discount: 40
    },
    {
      id: 14,
      brand: "Lakme",
      category: "Makeup",
      name: "Lakme Eyeliner",
      price: 299,
      mrp: 399,
      rating: 4.4,
      reviews: 892,
      image: "/eyeliner.jpg",
      discount: 25
    },
    {
      id: 15,
      brand: "Himalaya",
      category: "Skincare",
      name: "Himalaya Eye Mask",
      price: 149,
      mrp: 199,
      rating: 4.3,
      reviews: 345,
      image: "/eyemask.jpg",
      discount: 25
    },
    {
      id: 16,
      brand: "Clipsy",
      category: "Hair Accessories",
      name: "Clipsy Hair Accessories Set",
      price: 299,
      mrp: 399,
      rating: 4.5,
      reviews: 567,
      image: "/hairclip3.jpg",
      discount: 25
    },
    {
      id: 17,
      brand: "Tanishq",
      category: "Jewellery",
      name: "Tanishq Gold Chain",
      price: 8999,
      mrp: 10999,
      rating: 4.9,
      reviews: 89,
      image: "/chain2.jpg",
      discount: 18
    },
    {
      id: 18,
      brand: "Tanishq",
      category: "Jewellery",
      name: "Tanishq Diamond Ring",
      price: 24999,
      mrp: 29999,
      rating: 4.8,
      reviews: 45,
      image: "/ring1.jpg",
      discount: 17
    },
    {
      id: 19,
      brand: "Clipsy",
      category: "Hair Accessories",
      name: "Clipsy Hair Clips Pack",
      price: 249,
      mrp: 349,
      rating: 4.3,
      reviews: 723,
      image: "/hairclip4.webp",
      discount: 29
    },
    {
      id: 20,
      brand: "Clipsy",
      category: "Hair Accessories",
      name: "Clipsy Hair Accessories",
      price: 199,
      mrp: 299,
      rating: 4.4,
      reviews: 634,
      image: "/hairclip5.jpg",
      discount: 33
    },
    {
      id: 21,
      brand: "Lakme",
      category: "Makeup",
      name: "Lakme Face Powder",
      price: 349,
      mrp: 449,
      rating: 4.2,
      reviews: 456,
      image: "/powder.jpg",
      discount: 22
    },
    {
      id: 22,
      brand: "Milton",
      category: "Kitchen",
      name: "Milton Heat Resistant Cup",
      price: 249,
      mrp: 349,
      rating: 4.5,
      reviews: 234,
      image: "/heatcup.jpg",
      discount: 29
    },
    {
      id: 23,
      brand: "Funskool",
      category: "Toys",
      name: "Funskool Board Game",
      price: 599,
      mrp: 799,
      rating: 4.6,
      reviews: 178,
      image: "/game.jpg",
      discount: 25
    },
    {
      id: 24,
      brand: "Tanishq",
      category: "Jewellery",
      name: "Tanishq Silver Bracelet",
      price: 3499,
      mrp: 3999,
      rating: 4.7,
      reviews: 156,
      image: "/bracelet2.jpg",
      discount: 13
    }
  ];
  

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Header Card */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-white text-primary rounded-2xl p-5 text-center shadow-md border-2 border-primary">
          <h1 className="text-2xl font-bold">Accessories & Daily Use</h1>
          <p className="text-sm mt-1">
            Beauty • Jewellery • Home • Essentials
          </p>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showRating={true}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Accessories;
// asdfa sdfasf