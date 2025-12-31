import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  Shield,
  HeadphonesIcon,
  Quote,
  Users,
  ShoppingBag,
  TrendingUp,
  Award,
  Play,
  Pause,
} from "lucide-react";
import { apiCall, API_ENDPOINTS } from "./config/apiConfig.js";

function HomePage() {
  const scrollRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  /* ---------------- HERO SLIDES ---------------- */
  const heroSlides = [
    {
      title: "Discover Your Style",
      subtitle: "Premium Collection",
      description:
        "Explore trendy fashion and lifestyle products at unbeatable prices.",
      cta: "Shop Now",
      gradient: "from-purple-600 via-pink-600 to-red-600",
      image: "/hero1.png",
    },
    {
      title: "New Arrivals Daily",
      subtitle: "Fresh Fashion",
      description:
        "Stay ahead of trends with our newly launched collections.",
      cta: "Explore",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      image: "/hero2.png",
    },
    {
      title: "Exclusive Deals",
      subtitle: "Up to 70% Off",
      description: "Limited-time deals on premium products.",
      cta: "View Deals",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      image: "/hero3.png",
    },
  ];

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await apiCall(API_ENDPOINTS.PRODUCTS);

        if (res.success) {
          const mapped = res.data.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            mrp: Math.round(p.price * 1.2),
            image: p.image || "/placeholder.jpg",
            rating: 4.5,
            reviews: Math.floor(Math.random() * 200) + 50,
            tag: p.stock > 10 ? "In Stock" : "Limited",
          }));
          setProducts(mapped);
        } else {
          setError("Failed to load products");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- AUTO SLIDE ---------------- */
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ---------------- HERO ---------------- */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide, i) => (
            <div key={i} className="min-w-full">
              <div
                className={`h-[600px] bg-gradient-to-r ${slide.gradient} flex items-center`}
              >
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
                  <div className="text-white">
                    <h2 className="uppercase tracking-widest mb-2">
                      {slide.subtitle}
                    </h2>
                    <h1 className="text-5xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="mb-6">{slide.description}</p>
                    <Link
                      to="/collection"
                      className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold"
                    >
                      {slide.cta}
                    </Link>
                  </div>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="hidden lg:block h-96 mx-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentSlide(
              (currentSlide - 1 + heroSlides.length) % heroSlides.length
            )
          }
          className="absolute left-4 top-1/2 bg-white/30 p-2 rounded-full"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % heroSlides.length)
          }
          className="absolute right-4 top-1/2 bg-white/30 p-2 rounded-full"
        >
          <ChevronRight />
        </button>

        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute bottom-4 right-4 bg-white/30 p-2 rounded-full"
        >
          {isAutoPlaying ? <Pause /> : <Play />}
        </button>
      </div>

      {/* ---------------- FEATURED PRODUCTS ---------------- */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          Featured Products
        </h2>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showRating
            />
          ))}
        </div>
      </section>

      {/* ---------------- TRENDING ---------------- */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showRating
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS (ONLY ONCE) ---------------- */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-10">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {["Priya", "Rahul", "Anjali"].map((name, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold">
                  {name[0]}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                “Amazing quality and fast delivery. Highly recommend!”
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        © 2025 StyleNest. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;
