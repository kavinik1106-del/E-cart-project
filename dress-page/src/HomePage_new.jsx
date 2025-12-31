import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  HeadphonesIcon,
  Zap,
  Award,
  Users,
  ShoppingBag,
  TrendingUp,
  Play,
  Pause,
} from "lucide-react";
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

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    orders: 0,
    satisfaction: 0,
  });

  const heroSlides = [
    {
      title: "Discover Your Style",
      subtitle: "Premium Collection of Fashion & Lifestyle",
      description:
        "Explore trendy dresses, accessories, and home essentials with unbeatable prices.",
      image: "/banner.avif",
      cta: "Shop Now",
      gradient: "from-purple-600 via-pink-600 to-red-600",
    },
    {
      title: "New Arrivals Daily",
      subtitle: "Fresh Fashion Every Day",
      description:
        "Stay ahead with our daily updated collection of fashion and lifestyle products.",
      image: "/homeoffer.avif",
      cta: "Explore New",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
    },
    {
      title: "Exclusive Deals",
      subtitle: "Up to 70% Off",
      description:
        "Limited-time offers on premium quality products you’ll love.",
      image: "/eleoffer1.avif",
      cta: "View Deals",
      gradient: "from-orange-600 via-red-600 to-pink-600",
    },
  ];

  /* -------------------- FETCH PRODUCTS -------------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiCall(API_ENDPOINTS.PRODUCTS);

        if (response.success) {
          const transformed = response.data.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            mrp: Math.round(p.price * 1.2),
            image: p.image || "/placeholder.jpg",
            rating: 4.5,
            reviews: Math.floor(Math.random() * 200) + 50,
            tag: p.stock > 10 ? "In Stock" : "Limited",
            brand: p.type,
            discount: Math.floor(Math.random() * 30) + 10,
            colors: ["Default"],
            sizeGuide: { S: {}, M: {}, L: {}, XL: {} },
          }));
          setProducts(transformed);
        } else {
          setError("Failed to load products");
        }
      } catch (err) {
        setError("Error loading products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /* -------------------- FETCH STATS -------------------- */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiCall(API_ENDPOINTS.DASHBOARD_STATS);
        if (response.success) setStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  /* -------------------- HERO AUTO PLAY -------------------- */
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(
      () => setCurrentSlide((p) => (p + 1) % heroSlides.length),
      5000
    );
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`} />
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div>
                <h1 className="text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8">{slide.description}</p>
                <Link to="/products" className="bg-white text-black px-8 py-4 rounded-full font-semibold">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="absolute bottom-4 right-4 bg-white/20 p-3 rounded-full">
          {isAutoPlaying ? <Pause /> : <Play />}
        </button>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} showRating />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
          <div><Users className="mx-auto mb-2" />{stats.customers}+ Customers</div>
          <div><ShoppingBag className="mx-auto mb-2" />{stats.products}+ Products</div>
          <div><TrendingUp className="mx-auto mb-2" />{stats.orders}+ Orders</div>
          <div><Award className="mx-auto mb-2" />{stats.satisfaction}% Satisfaction</div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 text-center">
          <div className="bg-white p-8 rounded-xl shadow">
            <Truck className="mx-auto mb-4 text-blue-600" />
            Free Shipping
          </div>
          <div className="bg-white p-8 rounded-xl shadow">
            <Shield className="mx-auto mb-4 text-green-600" />
            Secure Payment
          </div>
          <div className="bg-white p-8 rounded-xl shadow">
            <HeadphonesIcon className="mx-auto mb-4 text-purple-600" />
            24/7 Support
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
        <Zap className="mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
        <input className="px-4 py-3 rounded text-black" placeholder="Enter your email" />
      </section>
    </div>
  );
}

export default HomePage;
