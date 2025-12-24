import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";

function HomePage() {
  const categories = [
  { name: "Electronics", image: "mobile.jpg" },
    { name: "Women Dresses", image: "dress1.webp" },
    { name: "Men Dresses", image: "men2.jpg" },
    { name: "Vegetables", image: "veg2.webp" },
    { name: "Home Appliances", image: "OIP (1).jpg" },
    { name: "Kids Wear", image: "OIP (1).webp" },
    { name: "Footwear", image: "OIP (2).webp" },  
    { name: "Bicycles", image: "allbikes.jpg" }, 
    { name: "Accessories", image: "acces.jpg" }, 
  
   ];

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
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
    el.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  const dresses = [ 
    { 
      id: 1, 
      name: "Half Saree", 
      price: "1400",
      mrp: "2500",
      image: "bluesofa.webp",
      category: "Women Dresses",
      type: "Saree",
      rating: 4.5,
      reviews: 150,
      tag: "Trending"
    },
    { 
      id: 2, 
      name: "Traditional Dress", 
      price: "4000",
      mrp: "5500",
      image: "th.webp",
      category: "Women Dresses",
      type: "Dress",
      rating: 4.6,
      reviews: 200,
      tag: "Bestseller"
    },
    { 
      id: 3, 
      name: "Pink Dress", 
      price: "5000",
      mrp: "7500",
      image: "fridge.webp",
      category: "Women Dresses",
      type: "Dress",
      rating: 4.4,
      reviews: 180,
      tag: "New"
    },
    { 
      id: 4, 
      name: "Red Dress", 
      price: "500",
      mrp: "1200",
      image: "red.jpg",
      category: "Women Dresses",
      type: "Casual",
      rating: 4.3,
      reviews: 120,
      tag: "Sale"
    },
    { 
      id: 5, 
      name: "Flower Dress", 
      price: "1000",
      mrp: "2000",
      image: "camara.jpg",
      category: "Women Dresses",
      type: "Casual",
      rating: 4.5,
      reviews: 160,
      tag: "Popular"
    },
    { 
      id: 6, 
      name: "Wedding Dress", 
      price: "5200",
      mrp: "8000",
      image: "mobile.jpg",
      category: "Women Dresses",
      type: "Formal",
      rating: 4.7,
      reviews: 220,
      tag: "Premium"
    },
    { 
      id: 7, 
      name: "Pink Dress", 
      price: "700",
      mrp: "1400",
      image: "kismis.webp",
      category: "Women Dresses",
      type: "Casual",
      rating: 4.2,
      reviews: 100,
      tag: "Trending"
    },
    { 
      id: 8, 
      name: "Kids Dress", 
      price: "800",
      mrp: "1500",
      image: "saree1.webp",
      category: "Kids Wear",
      type: "Dress",
      rating: 4.4,
      reviews: 140,
      tag: "Popular"
    },
  ];

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />

      {/* 🔍 Search Bar */}
      <div className="bg-white p-3 md:p-4 shadow mt-4 max-w-8xl mx-auto rounded-lg ">
        <input
          type="text"
          placeholder="Search for Laptops, Dry Fruits, Kurtis..."
          className="w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:outline-none"
        />
      </div>

      {/* 📦 Category Carousel */}
      <section className="p-3 md:p-6">
        <h2 className="font-bold text-base md:text-lg mb-4">Categories</h2>
        <div className="relative">
          <button
            onClick={() => scrollByAmount('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 px-8"
            style={{ scrollBehavior: "smooth" }}
          >
            {categories.map((cat, index) => {
              const routes = {
                "Electronics": "/electro",
                "Women Dresses": "/women",
                "Men Dresses": "/men",
                "Vegetables": "/vegetables",
                "Home Appliances": "/appliances",
                "Kids Wear": "/kidswear",
                "Footwear": "/footwear",
                "Bicycles": "/bicycles",
                "Accessories": "/accessories",
              };

              const route = routes[cat.name];
              const content = (
                <div className="p-1 rounded-full bg-pink-50">
                  <img src={cat.image} alt={cat.name} className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full border object-cover" />
                </div>
              );

              return (
                <div key={index} className="text-center min-w-[70px] sm:min-w-[90px]">
                  {route ? (
                    <Link to={route} aria-label={cat.name} className="inline-block">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                  <p className="text-xs sm:text-sm mt-1 text-pink-600 font-medium">{cat.name}</p>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scrollByAmount('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      </section>

      {/* 🖼️ Banner */}
      <img
        src="/elebanner.jpg"
        alt="eleoffer2.avif"
        className="w-full h-40 sm:h-52 md:h-64 lg:h-90 object-cover"
      />

      {/* 🛍️ Products */}
      <section className="p-3 md:p-6">
        <h2 className="font-bold text-base md:text-lg mb-4">
          Popular Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
    {/* Trust Section */}
<div
  className="py-60 mt-24 bg-cover bg-center"
  style={{ backgroundImage: "url('/drybanner.jpg')" }}
>
  
</div>
<footer className="bg-gray-800 text-white mt-10 py-2">
  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 text-sm px-4">
    <div>
      <h3 className="font-bold mb-2">StyleNest</h3>
      <p> Everything you need, at one place</p>
    </div>

    <div>
      <h3 className="font-bold mb-2">Customer Care</h3>
      <p>Help Center</p>
      <p>Returns</p>
      <p>Track Order</p>
    </div>

    <div>
      <h3 className="font-bold mb-2">Contact</h3>
      <p>Email: support@StyleNest.com</p>
      <p>Phone: +91 98765 43210</p>
    </div>
  </div>

  <p className="text-center text-xs text-gray-400 mt-4">
    © 2025 StyleNest. All rights reserved.
  </p>
</footer>


    </div>
  );
}

export default HomePage;
