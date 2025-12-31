import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import AdvancedSearch from "./components/AdvancedSearch.jsx";

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
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Auto-slide for hero banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(timer);
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Multiple Banners */}
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <div className="w-full flex-shrink-0">
            <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between w-full">
                  <div className="text-white max-w-lg">
                    <h1 className="text-5xl font-bold mb-4">Welcome to StyleNest</h1>
                    <p className="text-xl mb-6 text-blue-100">Discover amazing products at unbeatable prices</p>
                    <Link to="/women" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                      Shop Now
                    </Link>
                  </div>
                  <div className="hidden lg:block">
                    <img src="/hero-shopping.png" alt="Shopping" className="h-80 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-shrink-0">
            <div className="relative h-96 bg-gradient-to-r from-purple-600 to-pink-600">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">Flash Sale!</h2>
                  <p className="text-xl mb-6">Up to 70% off on selected items</p>
                  <div className="flex justify-center gap-4 text-2xl font-bold">
                    <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                      <div>23</div>
                      <div className="text-sm">Hours</div>
                    </div>
                    <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                      <div>45</div>
                      <div className="text-sm">Minutes</div>
                    </div>
                    <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                      <div>12</div>
                      <div className="text-sm">Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <AdvancedSearch
            onSearch={(searchData) => {
              console.log("Search:", searchData);
              // Implement search functionality here
            }}
            placeholder="Search for products, brands and more..."
          />
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>

          <div className="relative">
            <button
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10 disabled:opacity-50"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto px-12 py-4 scrollbar-hide"
            >
              {categories.map((cat, index) => (
                <Link
                  key={index}
                  to={cat.route}
                  className="flex-shrink-0 group"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow-md object-cover group-hover:scale-110 transition-transform"
                    />
                    <p className="text-center mt-3 text-gray-800 font-semibold group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10 disabled:opacity-50"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="py-12 bg-gradient-to-r from-orange-400 to-red-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">Deal of the Day</h2>
            <p className="text-orange-100">Limited time offers - Don't miss out!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dresses.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -50%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-red-600">{product.price}</span>
                  <span className="line-through text-gray-400">{product.mrp}</span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  state={{ product, related: dresses }}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all text-center block"
                >
                  Grab Deal
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Trending Now</h2>
              <p className="text-gray-600">Most popular products this week</p>
            </div>
            <Link to="/women" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {dresses.slice(0, 10).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={dresses}
                showRating={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">100% authentic products with quality guarantee</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and secure delivery to your doorstep</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round the clock customer support service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">P</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Priya Sharma</h4>
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Amazing quality products at great prices. The delivery was super fast and the customer service is excellent!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">R</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Rahul Kumar</h4>
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "StyleNest has become my go-to shopping destination. The variety is amazing and prices are unbeatable!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">A</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Anjali Patel</h4>
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Love the user-friendly interface and the quality of products. Highly recommend StyleNest to everyone!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Subscribe to our newsletter and get exclusive deals, new product launches, and style tips delivered to your inbox.
          </p>

          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Subscribe
            </button>
          </div>

          <p className="text-blue-200 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StyleNest</h3>
              <p className="text-gray-400 mb-4">Your one-stop destination for all your shopping needs.</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.098.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.098.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/women" className="hover:text-white transition-colors">Women Fashion</Link></li>
                <li><Link to="/men" className="hover:text-white transition-colors">Men Fashion</Link></li>
                <li><Link to="/electro" className="hover:text-white transition-colors">Electronics</Link></li>
                <li><Link to="/vegetables" className="hover:text-white transition-colors">Groceries</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 StyleNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
