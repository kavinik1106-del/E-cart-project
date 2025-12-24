import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function HomePage() {
  const categories = [
    { name: "Electronics", image: "mobile.jpg", route: "/electro" },
    { name: "Women Dresses", image: "dress1.webp", route: "/women" },
    { name: "Men Dresses", image: "men2.jpg", route: "/men" },
    { name: "Vegetables", image: "veg2.webp", route: "/vegetables" },
    { name: "Home Appliances", image: "OIP (1).jpg", route: "/appliances" },
    { name: "Kids Wear", image: "OIP (1).webp", route: "/kidswear" },
    { name: "Footwear", image: "OIP (2).webp", route: "/footwear" },
    { name: "Accessories", image: "acces.jpg", route: "/accessories" },
  ];

  const dresses = [
    {
      id: 1,
      name: "Half Saree",
      price: "₹1,400",
      mrp: "₹2,500",
      image: "saree1.webp",
      rating: 4.5,
      reviews: 150,
      tag: "Trending",
    },
    {
      id: 2,
      name: "Traditional Dress",
      price: "₹4,000",
      mrp: "₹5,500",
      image: "dress1.webp",
      rating: 4.6,
      reviews: 200,
      tag: "Bestseller",
    },
    {
      id: 3,
      name: "Pink Dress",
      price: "₹1,200",
      mrp: "₹2,000",
      image: "pink.jpg",
      rating: 4.4,
      reviews: 180,
      tag: "New",
    },
    {
      id: 4,
      name: "Red Dress",
      price: "₹999",
      mrp: "₹1,500",
      image: "red.jpg",
      rating: 4.3,
      reviews: 120,
      tag: "Sale",
    },
    {
      id: 5,
      name: "Kids Dress",
      price: "₹799",
      mrp: "₹1,299",
      image: "kid1.webp",
      rating: 4.4,
      reviews: 140,
      tag: "Popular",
    },
    {
      id: 6,
      name: "Men Kurta",
      price: "₹1,499",
      mrp: "₹2,299",
      image: "men.webp",
      rating: 4.5,
      reviews: 160,
      tag: "Hot",
    },
  ];

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(
        el.scrollLeft + el.clientWidth < el.scrollWidth - 1
      );
    };

    onScroll();
    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollByAmount = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />

      {/* 🔍 Search */}
      <div className="bg-white p-4 shadow mt-4 max-w-7xl mx-auto rounded-lg">
        <input
          type="text"
          placeholder="Search for Dresses, Electronics, Vegetables..."
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* 📦 Categories */}
      <section className="p-4">
        <h2 className="font-bold text-lg mb-4">Categories</h2>

        <div className="relative">
          <button
            onClick={() => scrollByAmount("left")}
            disabled={!canScrollLeft}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            ‹
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-8"
          >
            {categories.map((cat, index) => (
              <div
                key={index}
                className="text-center min-w-[90px]"
              >
                <Link to={cat.route}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-16 h-16 mx-auto rounded-full border object-cover"
                  />
                </Link>
                <p className="text-sm mt-1 text-pink-600 font-medium">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollByAmount("right")}
            disabled={!canScrollRight}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            ›
          </button>
        </div>
      </section>

      {/* 🖼 Banner */}
      <img
        src="/elebanner.jpg"
        alt="offer"
        className="w-full h-48 object-cover"
      />

      {/* 🛍 Products */}
      <section className="p-6">
        <h2 className="font-bold text-lg mb-4">
          Popular Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {dresses.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              products={dresses}
              showRating={true}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto text-center text-sm">
          © 2025 StyleNest. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
