import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import { ChevronLeft, ChevronRight, Star, Truck, Shield, HeadphonesIcon, Quote, Zap, Award, Users, ShoppingBag, TrendingUp, Play, Pause } from "lucide-react";
import { apiCall, API_ENDPOINTS } from "./config/apiConfig.js";

function HomePage() {
  
  const categories = [
    { name: "Electronics", image: "/mobile.jpg", route: "/electro", count: 245 },
    { name: "Women Dresses", image: "/dress1.webp", route: "/women", count: 189 },
    { name: "Men Dresses", image: "/men2.jpg", route: "/men", count: 156 },
    { name: "Vegetables", image: "/veg2.webp", route: "/vegetables", count: 98 },
    { name: "Home Appliances", image: "/OIP (1).jpg", route: "/appliances", count: 134 },
    { name: "Kids Wear", image: "/OIP (1).webp", route: "/kidswear", count: 87 },
    { name: "Footwear", image: "/OIP (2).webp", route: "/footwear", count: 203 },
    { name: "Accessories", image: "/acces.jpg", route: "/accessories", count: 167 },
  ];

  // Mock products data as fallback
  const mockProducts = [
    { id: 1, name: "Premium Double Door Fridge", price: 18999, mrp: 22999, image: "/doubledoorfringe.avif", rating: 4.4, reviews: 234, category: "home", brand: "Samsung", discount: 15 },
    { id: 2, name: "Premium Cashew Nuts 500g", price: 699, mrp: 899, image: "/cashew.webp", rating: 4.2, reviews: 156, category: "food", brand: "NutriLife", discount: 22 },
    { id: 3, name: "Luxury Blue Sofa Set", price: 14999, mrp: 18999, image: "/bluesofa.webp", rating: 4.5, reviews: 89, category: "home", brand: "Ikea", discount: 21 },
    { id: 4, name: "Designer Red Kurta", price: 1299, mrp: 1799, image: "/dress1.webp", rating: 4.1, reviews: 67, category: "women", brand: "FabIndia", discount: 28 },
    { id: 5, name: "Modern Sofa Chair", price: 9999, mrp: 12999, image: "/sofa.webp", rating: 4.3, reviews: 123, category: "home", brand: "Godrej", discount: 23 },
    { id: 6, name: "iPhone 15 Pro Max", price: 12499, mrp: 13999, image: "/mobile.jpg", rating: 4.6, reviews: 445, category: "electronics", brand: "Apple", discount: 11 },
    { id: 7, name: "Organic Dates 1kg", price: 399, mrp: 499, image: "/dates.jpg", rating: 4.0, reviews: 78, category: "food", brand: "Organic Farms", discount: 20 },
    { id: 8, name: "Silk Wedding Saree", price: 1899, mrp: 2499, image: "/saree2.jpg", rating: 4.3, reviews: 156, category: "women", brand: "Kanchipuram", discount: 24 },
    { id: 9, name: "Apple Watch Series 9", price: 2999, mrp: 3499, image: "/smartwatch.webp", rating: 4.7, reviews: 312, category: "electronics", brand: "Apple", discount: 14 },
    { id: 10, name: "Cotton Kurta Set", price: 1599, mrp: 1999, image: "/dress3.webp", rating: 4.2, reviews: 98, category: "men", brand: "Raymond", discount: 20 },
    { id: 11, name: "MacBook Pro 16\"", price: 199999, mrp: 229999, image: "/laptop.webp", rating: 4.8, reviews: 67, category: "electronics", brand: "Apple", discount: 13 },
    { id: 12, name: "Nike Air Max Shoes", price: 8999, mrp: 11999, image: "/footk.jpg", rating: 4.5, reviews: 234, category: "men", brand: "Nike", discount: 25 },
    { id: 13, name: "Samsung 4K TV 55\"", price: 45999, mrp: 54999, image: "/OIP (4).webp", rating: 4.6, reviews: 189, category: "electronics", brand: "Samsung", discount: 16 },
    { id: 14, name: "Designer Kurta", price: 15999, mrp: 19999, image: "/blue.webp", rating: 4.7, reviews: 145, category: "women", brand: "Manish Malhotra", discount: 20 },
    { id: 15, name: "Coffee Maker", price: 3499, mrp: 4499, image: "/OIP (5).webp", rating: 4.3, reviews: 87, category: "home", brand: "Philips", discount: 22 },
    { id: 16, name: "Wireless Headphones", price: 4999, mrp: 6999, image: "/noicehead.jpg", rating: 4.4, reviews: 203, category: "electronics", brand: "Sony", discount: 28 },
    { id: 17, name: "Wooden Dining Table", price: 12999, mrp: 16999, image: "/plates.jpg", rating: 4.6, reviews: 112, category: "home", brand: "Hometown", discount: 24 },
    { id: 18, name: "Men's Formal Shirt", price: 899, mrp: 1299, image: "/sherwa.webp", rating: 4.2, reviews: 156, category: "men", brand: "Celio", discount: 31 },
    { id: 19, name: "Women's Sports Shoes", price: 3499, mrp: 4999, image: "/footw.jpg", rating: 4.5, reviews: 178, category: "women", brand: "Puma", discount: 30 },
    { id: 20, name: "Organic Spices Mix", price: 249, mrp: 399, image: "/masala.webp", rating: 4.3, reviews: 67, category: "food", brand: "NatureLeaf", discount: 38 },
    { id: 21, name: "Kids Clothing Set", price: 699, mrp: 999, image: "/kid1.webp", rating: 4.4, reviews: 89, category: "kids", brand: "PlayKids", discount: 30 },
    { id: 22, name: "Gold Bracelet", price: 2999, mrp: 4999, image: "/bracelet.webp", rating: 4.6, reviews: 234, category: "accessories", brand: "Tanishq", discount: 40 },
    { id: 23, name: "Wall Clock", price: 599, mrp: 899, image: "/desklamp.jpg", rating: 4.2, reviews: 123, category: "home", brand: "Modern Decor", discount: 33 },
    { id: 24, name: "Denim Jeans", price: 1199, mrp: 1799, image: "/denim.webp", rating: 4.3, reviews: 198, category: "men", brand: "Levi's", discount: 33 },
    { id: 25, name: "Flower Pot Set", price: 799, mrp: 1199, image: "/flower.webp", rating: 4.5, reviews: 76, category: "home", brand: "GreenHome", discount: 33 },
    { id: 26, name: "Keyboard & Mouse", price: 1599, mrp: 2499, image: "/keyboard.jpg", rating: 4.4, reviews: 145, category: "electronics", brand: "Logitech", discount: 36 },
    { id: 27, name: "Red Saree", price: 2499, mrp: 3999, image: "/redsaree.jpg", rating: 4.6, reviews: 267, category: "women", brand: "Silk Saree", discount: 37 },
    { id: 28, name: "Electric Fan", price: 1299, mrp: 1899, image: "/fan.jpg", rating: 4.3, reviews: 134, category: "home", brand: "Usha", discount: 31 },
    { id: 29, name: "Hair Clip Set", price: 349, mrp: 599, image: "/hairclip.jpg", rating: 4.4, reviews: 87, category: "accessories", brand: "HairStyle", discount: 42 },
    { id: 30, name: "Walnuts 250g", price: 299, mrp: 499, image: "/walnut.jpg", rating: 4.5, reviews: 156, category: "food", brand: "NutriLife", discount: 40 },
  ];

  const [products, setProducts] = useState(mockProducts);

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      title: "Discover Your Style",
      subtitle: "Premium Collection of Fashion & Lifestyle",
      description: "Explore our curated collection of trendy dresses, accessories, and home essentials with unbeatable prices and quality.",
      image: "/banner.avif",
      cta: "Shop Now",
      gradient: "from-purple-600 via-pink-600 to-red-600"
    },
    {
      title: "New Arrivals Daily",
      subtitle: "Fresh Fashion Every Day",
      description: "Stay ahead of trends with our daily updated collection featuring the latest in fashion and lifestyle products.",
      image: "/homeoffer.avif",
      cta: "Explore New",
      gradient: "from-blue-600 via-cyan-600 to-teal-600"
    },
    {
      title: "Exclusive Deals",
      subtitle: "Up to 70% Off on Selected Items",
      description: "Don't miss out on our limited-time offers. Premium quality products at prices you'll love.",
      image: "/eleoffer1.avif",
      cta: "View Deals",
      gradient: "from-orange-600 via-red-600 to-pink-600"
    }
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiCall(API_ENDPOINTS.PRODUCTS);
        if (response.success && response.data && response.data.length > 0) {
          const transformedProducts = response.data.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.mrp || product.price * 1.2,
            image: product.image || "/placeholder.jpg",
            rating: 4.5,
            reviews: Math.floor(Math.random() * 200) + 50,
            tag: product.stock_quantity > 10 ? "In Stock" : "Limited",
            brand: product.brand || product.category || "Brand",
            discount: Math.floor(Math.random() * 30) + 10,
            colors: ["Default"],
            sizeGuide: { S: {}, M: {}, L: {}, XL: {} }
          }));
          setProducts(transformedProducts);
        }
      } catch (err) {
        console.error("Error fetching products from API, using mock data:", err);
        // Keep using mock data
      }
    };

    fetchProducts();
  }, []);

  // Auto-play slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  // Check scroll position for category buttons
  useEffect(() => {
    const el = scrollRef.current;
    const checkScroll = () => {
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(
        el.scrollLeft < el.scrollWidth - el.clientWidth
      );
    };
    checkScroll();
    el?.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const scrollByAmount = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Search Bar - FIRST */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none shadow-sm hover:shadow-md transition-shadow"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section - SECOND */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>

          <div className="relative">
            <button
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10 disabled:opacity-50 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
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
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200">
                    <div className="relative">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {cat.count}
                      </div>
                    </div>
                    <p className="text-center mt-4 text-gray-800 font-semibold group-hover:text-blue-600 transition-colors text-lg">
                      {cat.name}
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-1">
                      {cat.count} products
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10 disabled:opacity-50 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Hero Section - THIRD */}
      <div className="relative overflow-hidden bg-gray-900">
        {/* Hero Slides */}
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroSlides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <div className={`relative h-[600px] bg-gradient-to-r ${slide.gradient} overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 flex items-center justify-between w-full">
                    <div className="text-white max-w-2xl animate-fade-in-up">
                      <h2 className="text-lg font-semibold mb-2 text-white/80 uppercase tracking-wider">
                        {slide.subtitle}
                      </h2>
                      <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xl mb-8 text-white/90 leading-relaxed max-w-lg">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          to="/women"
                          className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
                        >
                          {slide.cta}
                        </Link>
                        <Link
                          to="/collection"
                          className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 text-lg"
                        >
                          View Collection
                        </Link>
                      </div>
                    </div>

                    {/* Hero Image */}
                    <div className="hidden lg:block animate-fade-in-right">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-150"></div>
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="relative h-96 object-contain transform hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold animate-bounce shadow-lg">
                          🔥 Hot Deal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronRight size={24} />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Products - FOURTH - AMAZON STYLE GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended For You</h2>
            <p className="text-gray-600">Based on your browsing history and preferences</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={products}
                showRating={true}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View All {products.length} Products
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Best Sellers</h2>
              <p className="text-gray-600">Most loved products by customers</p>
            </div>
            <Link to="/collection" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.slice(0, 24).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={products}
                showRating={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="py-12 bg-gradient-to-r from-orange-400 to-red-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">Lightning Deals</h2>
            <p className="text-orange-100">Limited time offers - Stocks running out fast!</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.slice(0, 18).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={products}
                showRating={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Trending Now</h2>
              <p className="text-gray-600">Most popular products this week</p>
            </div>
            <Link to="/collection" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.slice(5, 29).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={products}
                showRating={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed Products */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Recently Viewed</h2>
              <p className="text-gray-600">Items you've looked at</p>
            </div>
            <Link to="/collection" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.slice(10, 34).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={products}
                showRating={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Top Rated Products</h2>
              <p className="text-gray-600">Highest rated by customers</p>
            </div>
            <Link to="/collection" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.slice(15, 39).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={products}
                showRating={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">New Arrivals</h2>
              <p className="text-gray-600">Just added to our store</p>
            </div>
            <Link to="/collection" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.slice(20, 44).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                products={products}
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
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
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Amazing quality products at great prices. The delivery was super fast
                and the customer service is excellent!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">R</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Rahul Kumar</h4>
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "StyleNest has become my go-to shopping destination. The variety is
                amazing and prices are unbeatable!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">A</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Anjali Patel</h4>
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Love the user-friendly interface and the quality of products. Highly
                recommend StyleNest to everyone!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-white bg-opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-5 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-5 rounded-full"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="inline-block p-4 bg-white bg-opacity-20 rounded-full mb-4 backdrop-blur-sm">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-black mb-4">Stay Updated with StyleNest</h2>
          <p className="text-back-100 mb-8 text-xl leading-relaxed max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive deals, new product launches, and style tips delivered to your inbox.
          </p>

          <div className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 text-lg"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                Subscribe Now
              </button>
            </div>
          </div>

          <p className="text-indigo-1000 text-sm mt-6 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
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
