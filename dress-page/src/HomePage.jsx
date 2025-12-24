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
      tag:"best seller"
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
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclem3.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclew3.jpg",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclem.jpg",
       tag: "Premium",
    },
    {
      id: 6,
      brand: "Hero",
      category: "Mountain Bicycle",
      name: "Hero Ranger",
      price: "₹10,999",
      rating: 4.5,
      image: "/bicyclew1.jpg",
    },
     { id: 1, category: "Phone", name: "Galaxy X Pro", price: "₹29,999", image: "/mobile.jpg" },
    { id: 2, category: "Laptop", name: "SwiftBook 14", price: "₹49,999", image: "/laptop.webp" },
    { id: 3, category: "Watch", name: "Pulse Watch 3", price: "₹7,999", image: "/smartwatch.webp" },
    { id: 4, category: "Tablet", name: "TabOne 10", price: "₹19,499", image: "/OIP (3).webp" },
    { id: 5, category: "Phone", name: "Nova S", price: "₹18,999", image: "/mobile.jpg" },
    { id: 6, category: "Laptop", name: "Workmate Pro", price: "₹62,999", image: "/OIP (9).webp" },
    { id: 7, category: "Watch", name: "Chrono Watch", price: "₹12,999", image: "/th (1).jpg" },
    { id: 8, category: "Tablet", name: "TabMax 12", price: "₹24,999", image: "/th (2).jpg" },
    {
      id: 1,
      brand: "Nike",
      category: "Sports Shoes",
      name: "Nike Air Zoom",
      price: "₹5,999",
      rating: 4.6,
      image: "/footk.jpg",
    },
    {
      id: 2,
      brand: "Adidas",
      category: "Running Shoes",
      name: "Adidas Ultraboost",
      price: "₹6,499",
      rating: 4.7,
      image: "/footm.jpg",
    },
    {
      id: 3,
      brand: "Puma",
      category: "Casual Shoes",
      name: "Puma Smash V2",
      price: "₹3,299",
      rating: 4.4,
      image: "/footw.jpg",
    },
    {
      id: 4,
      brand: "Bata",
      category: "Formal Shoes",
      name: "Bata Office Wear",
      price: "₹2,199",
      rating: 4.2,
      image: "/footk1.jpg",
    },
    {
      id: 5,
      brand: "Nike",
      category: "Sneakers",
      name: "Nike Revolution",
      price: "₹4,899",
      rating: 4.5,
      image: "/footm1.jpg",
       tag: "Premium",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footw1.jpg",
    },
    {
      id: 6,
      brand: "Adidas",
      category: "Sports Shoes",
      name: "Adidas Duramo",
      price: "₹3,999",
      rating: 4.3,
      image: "/footk2.jpg",
    },
    {
      id: 1,
      category: "Dress",
      name: "Kids Party Dress",
      price: "₹1,299",
      image: "/kid1.webp",
      tag: "Premium",
    },
    {
      id: 2,
      category: "Shoes",
      name: "Kids Sports Shoes",
      price: "₹999",
      image: "/kid.jpg",
    },
    {
      id: 3,
      category: "Innerwear",
      name: "Kids Inner Set",
      price: "₹399",
      image: "/kid2.jpg",
    },
    {
      id: 4,
      category: "Glasses",
      name: "Kids Sunglasses",
      price: "₹499",
      image: "/kid3.jpg",
    },
    {
      id: 5,
      category: "Dress",
      name: "Kids Casual Wear",
      price: "₹899",
      image: "/kid4.jpg",
       tag: "Premium"
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid5.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid6.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid7.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid8.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid9.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid10.jpg",
    },
    {
      id: 6,
      category: "Shoes",
      name: "Kids Sandals",
      price: "₹699",
      image: "/kid11.jpg",
    },
    {
      id: 101,
      type: "Pant",
      name: "Classic Chino",
      price: 999,
      mrp: 1999,
      image: "/chino.avif",
      category: "Men Dresses",
      rating: 4.5,
      reviews: 234,
      tag: "Bestseller",
    },
    {
      id: 102,
      type: "Shirt",
      name: "Oxford Shirt",
      price: 799,
      mrp: 1499,
      image: "/OIP.jpg",
      category: "Men Dresses",
      rating: 4.4,
      reviews: 187,
      tag: "Popular",
    },
    {
      id: 103,
      type: "T-Shirt",
      name: "Comfort Tee",
      price: 399,
      mrp: 699,
      image: "/OIP (7).webp",
      category: "Men Dresses",
      rating: 4.3,
      reviews: 290,
      tag: "Sale",
    },
    {
      id: 104,
      type: "Jacket",
      name: "Denim Jacket",
      price: 1999,
      mrp: 3299,
      image: "/denim.webp",
      category: "Men Dresses",
      rating: 4.6,
      reviews: 156,
      tag: "Trending",
    },
    {
      id: 105,
      type: "Shorts",
      name: "Casual Shorts",
      price: 449,
      mrp: 899,
      image: "/shorts.avif",
      category: "Men Dresses",
      rating: 4.2,
      reviews: 145,
      tag: "New",
    },
    {
      id: 106,
      type: "Sweater",
      name: "Wool Sweater",
      price: 1299,
      mrp: 2199,
      image: "/wool.webp",
      category: "Men Dresses",
      rating: 4.5,
      reviews: 203,
      tag: "Premium",
    },
    {
      id: 107,
      type: "Kurta",
      name: "Men Kurta",
      price: 1099,
      mrp: 1899,
      image: "/kurta.jpg",
      category: "Men Dresses",
      rating: 4.4,
      reviews: 167,
      tag: "Popular",
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
      <div className="bg-white p-4 shadow mt-4 max-w-8xl mx-auto rounded-lg">
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
        className="w-full h-80 object-cover"
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
