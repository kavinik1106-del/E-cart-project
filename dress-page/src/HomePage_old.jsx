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

  const handleSearch = async (query) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) {
      setShowSearchDropdown(false);
      return;
    }

    setIsSearching(true);
    setShowSearchDropdown(true);

    try {
      // Filter products based on search query
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 8)); // Limit to 8 results
      setSelectedResultIndex(0);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-48">
      <Navbar />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto">
        {/* Hero Banner with Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 px-4 mb-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4 h-fit sticky top-48">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Shop by Category</h3>
            <div className="space-y-2">
              {categories.map((cat, index) => (
                <Link
                  key={index}
                  to={cat.route}
                  className="block py-2 px-3 hover:bg-yellow-50 text-gray-700 hover:text-blue-600 rounded transition-colors text-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Large Hero Banner */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 h-80">
              <div className="absolute inset-0 opacity-20">
                <img src="/hero-shopping.png" alt="Banner" className="w-full h-full object-cover" />
              </div>
              <div className="relative h-full flex items-center px-8">
                <div className="text-white max-w-lg">
                  <span className="text-sm font-semibold bg-red-500 px-3 py-1 rounded-full inline-block mb-4">LIMITED OFFER</span>
                  <h1 className="text-5xl font-bold mb-4">Mega Sale!</h1>
                  <p className="text-xl mb-6 text-blue-100">Up to 70% off on all categories</p>
                  <Link to="/women" className="bg-yellow-400 text-black px-8 py-3 rounded font-bold hover:bg-yellow-300 transition-colors inline-block">
                    Shop Now →
                  </Link>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-yellow-400' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Deals - 4 Column Grid */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 mx-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Today's Deals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dresses.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                state={{ product, related: dresses }}
                className="group border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white overflow-hidden"
              >
                <div className="relative bg-gray-100 h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded font-bold text-sm">
                    -50%
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600 truncate">{product.category || "Products"}</p>
                  <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    {product.mrp && <span className="line-through text-gray-500 text-sm">{product.mrp}</span>}
                  </div>
                  {product.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-700">{product.rating}</span>
                      {product.reviews && <span className="text-gray-500">({product.reviews})</span>}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Great Deals Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 mx-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Best Sellers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {dresses.slice(4, 14).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={dresses}
                showRating={true}
              />
            ))}
          </div>
        </div>

        {/* Categories Showcase - 4 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-8">
          {[
            { name: "Electronics", image: "/mobile.jpg", route: "/electro" },
            { name: "Fashion", image: "/dress1.webp", route: "/women" },
            { name: "Home & Kitchen", image: "/OIP (1).jpg", route: "/appliances" },
            { name: "Sports & Outdoors", image: "/footw.jpg", route: "/footwear" }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={cat.route}
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gray-200 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{cat.name}</h3>
                <p className="text-sm text-blue-600 hover:underline mt-2">Shop Now →</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Flash Deal Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-md p-8 mx-4 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <p className="text-sm font-semibold mb-2">⚡ LIGHTNING DEALS</p>
              <h2 className="text-3xl font-bold mb-2">Flash Sale - 6 Hours Only!</h2>
              <p className="text-orange-100">Limited quantities available</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4 text-center">
              <div className="bg-white bg-opacity-20 px-4 py-3 rounded">
                <div className="text-3xl font-bold">23</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-3 rounded">
                <div className="text-3xl font-bold">45</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-3 rounded">
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* More Products Grid */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 mx-4">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Recommended For You</h2>
              <p className="text-sm text-gray-600">Based on your browsing history</p>
            </div>
            <Link to="/collection" className="text-blue-600 hover:text-blue-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {dresses.slice(14, 24).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={dresses}
                showRating={true}
              />
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-8 mx-4 mb-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6 text-blue-100">Get exclusive deals and updates on new arrivals!</p>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded font-bold hover:bg-yellow-300 transition-colors">
            Sign Up Today
          </button>
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
