import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import AdvancedSearch from "./components/AdvancedSearch.jsx";
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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Products will be fetched from API and stored in products state
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    orders: 0,
    satisfaction: 0
  });

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
        setLoading(true);
        const response = await apiCall(API_ENDPOINTS.PRODUCTS);
        if (response.success) {
          // Transform API data to match component expectations
          const transformedProducts = response.data.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.price * 1.2, // Assuming MRP is 20% higher
            image: product.image || "/placeholder.jpg",
            rating: 4.5, // Default rating
            reviews: Math.floor(Math.random() * 200) + 50, // Random reviews
            tag: product.stock > 10 ? "In Stock" : "Limited",
            brand: product.type,
            discount: Math.floor(Math.random() * 30) + 10, // Random discount
            colors: ["Default"],
            sizeGuide: { S: {}, M: {}, L: {}, XL: {} }
          }));
          setProducts(transformedProducts);
        } else {
          setError("Failed to load products");
        }
      } catch (err) {
        setError("Error loading products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  // Animated counters
  useEffect(() => {
    const targetStats = {
      customers: 50000,
      products: 2500,
      orders: 15000,
      satisfaction: 98
    };

    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setStats({
          customers: Math.floor(targetStats.customers * progress),
          products: Math.floor(targetStats.products * progress),
          orders: Math.floor(targetStats.orders * progress),
          satisfaction: Math.floor(targetStats.satisfaction * progress)
        });

        if (step >= steps) clearInterval(timer);
      }, increment);
    };

    // Start animation after component mounts
    setTimeout(animateStats, 1000);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

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
            <div className="relative h-96 bg-gradient-to-r from-purple-600 to-blue-600">
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

      {/* Statistics Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.customers.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.products.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Products Available</div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.orders.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Orders Delivered</div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.satisfaction}%
              </div>
              <div className="text-gray-600 font-medium">Customer Satisfaction</div>
            </div>
          </div>
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

      {/* Trust Badges */}
      <section className="py-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <Truck className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over ₹499</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="font-semibold text-gray-800">Quality Guarantee</h3>
                <p className="text-sm text-gray-600">Premium products only</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <HeadphonesIcon className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-800">24/7 Support</h3>
                <p className="text-sm text-gray-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div className="text-blue-100">Products Sold</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-blue-100">Premium Brands</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-blue-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose StyleNest?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience shopping like never before with our premium features and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Shipping</h3>
              <p className="text-gray-600 leading-relaxed">
                Enjoy free shipping on all orders above ₹999. Fast and reliable delivery across India with real-time tracking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Payment</h3>
              <p className="text-gray-600 leading-relaxed">
                Your payments are 100% secure with multiple payment options including UPI, cards, and digital wallets.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <HeadphonesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our customer support team is available round the clock to help you with any queries or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products at unbeatable prices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
                <ProductCard product={product} showRating={true} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View All Products
              <ChevronRight className="w-5 h-5" />
            </Link>
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
            {products.slice(0, 3).map((product) => (
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
                  state={{ product, related: products }}
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
            {products.slice(0, 10).map((product) => (
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
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated with StyleNest</h2>
          <p className="text-indigo-100 mb-8 text-xl leading-relaxed max-w-2xl mx-auto">
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

          <p className="text-indigo-200 text-sm mt-6 flex items-center justify-center gap-2">
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
