import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function HomePage() {
  const categories = [
  { name: "Electronics", image: "mobile.jpg" },
    { name: "Women Dresses", image: "dress1.webp" },
    { name: "Men Dresses", image: "men2.jpg" },
    { name: "Vegetables", image: "veg2.webp" },
    { name: "Home Appliances", image: "fridge.webp" },
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
    { id: 1, name: "Half Saree", price: "₹1400", image: "bluesofa.webp" },
    { id: 2, name: "Traditional Dress", price: "₹4000", image: "th.webp" },
    { id: 3, name: "Pink Dress", price: "₹5000", image: "fridge.webp" },
    { id: 4, name: "Red Dress", price: "₹500", image: "red.jpg" },
    { id: 5, name: "Flower Dress", price: "₹1000", image: "camara.jpg" },
    { id: 6, name: "Wedding Dress", price: "₹5200", image: "mobile.jpg" },
    { id: 7, name: "Pink Dress", price: "₹700", image: "kismis.webp" },
    { id: 8, name: "Kids Dress", price: "₹800", image: "saree1.webp" },
  ];

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />

      {/* 🔍 Search Bar */}
      <div className="bg-white p-3 md:p-4 shadow mt-4 max-w-3xl mx-auto rounded-lg ">
        <input
          type="text"
          placeholder="Search for Laptops, Dry Fruits, Kurtis..."
          className="w-full border rounded-lg px-4 py-2 text-sm md:text-base focus:outline-none"
        />
      </div>

      {/* 🎯 Categories */}
      <section className="bg-white mt-2 p-3 md:p-4">
        <h2 className="font-bold text-base md:text-lg mb-3">
          Categories
        </h2>

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
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
          >
            {categories.map((cat, index) => {
              const lname = cat.name.toLowerCase();

              // Determine route for known categories
              let route = null;
              if (lname.includes("elect")) route = "/electro";
              else if (lname.includes("women") || lname.includes("woman")) route = "/women";
              else if (lname.includes("men") || lname.includes("man")) route = "/men";
              else if (lname.includes("veg") || lname.includes("veget")) route = "/vegetables";
              else if (lname.includes("home") || lname.includes("appliance")) route = "/appliances";
              else if (lname.includes("kids")) route = "/kidswear";
              else if (lname.includes("kids")) route = "/kids";
              else if (lname.includes("footwear") || lname.includes("shoe")) route = "/footwear";
              else if (lname.includes("access")) route = "/accessories";
              else if (lname.includes("bicycle") || lname.includes("bike")) route = "/bicycles";



              const content = (
                <div className="inline-block cursor-pointer transform hover:scale-105 transition shadow-sm hover:shadow-md">
                  <div className="p-1 rounded-full bg-pink-50">
                    <img src={cat.image} alt={cat.name} className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full border object-cover" />
                  </div>
                  <p className="text-xs sm:text-sm mt-1 text-pink-600 font-medium">{cat.name}</p>
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
          {dresses.map((dress) => {
            const isWomen = /dress|saree|kurta|lehenga/i.test(dress.name);
            const isMen = /men|man|pant|pants|shirt|t-shirt|tshirt|trouser|jacket|shorts/i.test(dress.name);
            const card = (
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-2">
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-36 sm:h-40 md:h-44 object-contain"
                />

                <h3 className="text-sm md:text-base font-semibold mt-2">
                  {dress.name}
                </h3>

                <p className="text-pink-600 font-bold text-sm md:text-base">
                  {dress.price}
                </p>

                <button className="mt-2 w-full bg-pink-600 hover:bg-pink-700 text-white py-1.5 rounded text-sm">
                  Add to Cart
                </button>
              </div>
            );

            if (isWomen) {
              return (
                <Link to="/women" key={dress.id} className="block">
                  {card}
                </Link>
              );
            }

            if (isMen) {
              return (
                <Link to="/men" key={dress.id} className="block">
                  {card}
                </Link>
              );
            }

            return <div key={dress.id}>{card}</div>;
          })}
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
      <h3 className="font-bold mb-2">Click2Buy</h3>
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
      <p>Email: support@Click2Buy.com</p>
      <p>Phone: +91 98765 43210</p>
    </div>
  </div>

  <p className="text-center text-xs text-gray-400 mt-4">
    © 2025 Click2Buy. All rights reserved.
  </p>
</footer>


    </div>
  );
}

export default HomePage;
