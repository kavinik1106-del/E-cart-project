import React from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function MenDress() {
  const products = [
    { 
      id: 101, 
      type: "Pant", 
      name: "Classic Chino", 
      price: "999",
      mrp: "1999",
      image: "/chino.avif",
      category: "Men Dresses",
      rating: 4.5,
      reviews: 234,
      tag: "Bestseller"
    },
    { 
      id: 102, 
      type: "Shirt", 
      name: "Oxford Shirt", 
      price: "799",
      mrp: "1499",
      image: "/OIP.jpg",
      category: "Men Dresses",
      rating: 4.4,
      reviews: 187,
      tag: "Popular"
    },
    { 
      id: 103, 
      type: "T-Shirt", 
      name: "Comfort Tee", 
      price: "399",
      mrp: "699",
      image: "/OIP (7).webp",
      category: "Men Dresses",
      rating: 4.3,
      reviews: 290,
      tag: "Sale"
    },
    { 
      id: 104, 
      type: "Jacket", 
      name: "Denim Jacket", 
      price: "1999",
      mrp: "3299",
      image: "/denim.webp",
      category: "Men Dresses",
      rating: 4.6,
      reviews: 156,
      tag: "Trending"
    },
    { 
      id: 105, 
      type: "Shorts", 
      name: "Casual Shorts", 
      price: "449",
      mrp: "899",
      image: "/shorts.avif",
      category: "Men Dresses",
      rating: 4.2,
      reviews: 145,
      tag: "New"
    },
    { 
      id: 106, 
      type: "Sweater", 
      name: "Wool Sweater", 
      price: "1299",
      mrp: "2199",
      image: "/wool.webp",
      category: "Men Dresses",
      rating: 4.5,
      reviews: 203,
      tag: "Premium"
    },
    { 
      id: 107, 
      type: "Kurta", 
      name: "Men Kurta", 
      price: "1099",
      mrp: "1899",
      image: "/kurta.jpg",
      category: "Men Dresses",
      rating: 4.4,
      reviews: 167,
      tag: "Popular"
    },
    { 
      id: 108, 
      type: "Sherwani", 
      name: "Wedding Sherwani", 
      price: "5999",
      mrp: "9999",
      image: "/sherwa.webp",
      category: "Men Dresses",
      rating: 4.7,
      reviews: 89,
      tag: "Premium"
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Rounded pink header card separated from navbar */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="bg-pink-600 text-white rounded-2xl p-5 text-center shadow-md">
          <h1 className="text-2xl font-bold">Men's Dresses</h1>
          <p className="text-sm mt-1">Pants, Shirts, T‑Shirts & More</p>
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

export default MenDress;

