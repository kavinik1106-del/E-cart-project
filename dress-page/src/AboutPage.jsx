import React from "react";
import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Truck,
  HeadphonesIcon,
  Award,
  Users,
  ShoppingBag,
  Star,
  CheckCircle,
  Globe,
  Heart,
  Zap,
  Target,
  Eye,
  TrendingUp,
  Quote,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import Counter from "./components/Counter.jsx";

export default function AboutPage() {
  const navigate = useNavigate();

  const stats = [
    { value: "10K+", label: "Happy Customers", icon: Users },
    { value: "500+", label: "Premium Products", icon: ShoppingBag },
    { value: "4.8★", label: "Customer Rating", icon: Star },
    { value: "24/7", label: "Customer Support", icon: HeadphonesIcon },
  ];

  const values = [
    {
      icon: Shield,
      title: "Secure Shopping",
      desc: "Industry-standard security & encrypted payments.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Reliable delivery with real-time tracking across India.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      desc: "Hand-picked products with strict quality checks.",
    },
    {
      icon: Heart,
      title: "Customer First",
      desc: "We prioritize customer satisfaction always.",
    },
  ];

  const features = [
    "Trusted premium brands",
    "Verified sellers",
    "Secure payments",
    "Fast delivery & easy returns",
    "24/7 customer support",
    "Transparent pricing",
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HERO */}
      <section className="bg-primary text-white py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center">
            <Zap className="w-10 h-10 text-secondary" />
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            About{" "}
            <span className="text-secondary">
              StyleNest
            </span>
          </h1>

          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-10">
            Your trusted destination for premium fashion, lifestyle & home
            essentials across India.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="bg-secondary text-gray-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition"
            >
              Start Shopping <ArrowRight className="inline ml-1" />
            </button>

            <button
              onClick={() => navigate("/collection")}
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-full font-bold hover:bg-secondary hover:text-gray-900 transition"
            >
              <PlayCircle className="inline mr-1" />
              Explore Collection
            </button>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <s.icon className="text-white w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900">
                <Counter
                  end={parseInt(s.value.replace(/[^\d]/g, ""))}
                  suffix={s.value.replace(/[\d]/g, "")}
                />
              </div>
              <p className="font-semibold text-gray-900">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <Target className="text-secondary w-10 h-10 mb-4" />
            <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              To deliver high-quality products at fair prices while maintaining
              trust, transparency, and customer satisfaction.
            </p>
          </div>

          <div>
            <Eye className="text-secondary w-10 h-10 mb-4" />
            <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg">
              To become India’s most trusted and loved online marketplace.
            </p>
            <div className="flex items-center gap-2 mt-4 text-secondary font-semibold">
              <TrendingUp /> Growing every day
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose StyleNest
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-primary/5 border border-primary/20 p-8 rounded-2xl shadow hover:shadow-xl transition"
              >
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                  <v.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">What Sets Us Apart</h2>
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 mb-4 p-4 bg-white rounded-xl border border-blue-200"
              >
                <CheckCircle className="text-secondary" />
                <span className="text-gray-700 font-medium">{f}</span>
              </div>
            ))}
          </div>

          <div className="bg-primary p-8 rounded-3xl text-white">
            <Quote className="text-yellow-400 w-10 h-10 mb-4" />
            <p className="mb-6">
              “StyleNest blends trust, technology, and service into one seamless
              shopping experience.”
            </p>
            <p className="font-semibold">— Arun Kumar, Founder</p>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-24 bg-primary text-white text-center">
        <Globe className="w-16 h-16 mx-auto mb-6 text-secondary" />
        <h2 className="text-4xl font-bold mb-6">Trusted Across India</h2>
        <p className="max-w-3xl mx-auto mb-10 text-blue-100">
          Thousands of happy customers rely on StyleNest for quality, security,
          and reliability.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="bg-secondary text-gray-900 px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition"
        >
          Get in Touch
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo5.jpg" alt="StyleNest" className="w-9 h-9 rounded-full" />
              <span className="text-2xl font-bold">StyleNest</span>
            </div>
            <p className="text-blue-200">
              Premium shopping experience trusted by customers across India.
            </p>
          </div>

          {["Quick Links", "Support", "Connect"].map((title, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-4 text-secondary">{title}</h4>
              <ul className="space-y-2 text-blue-200">
                <li className="hover:text-secondary transition cursor-pointer">
                  Sample Link
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-blue-800 text-center py-6 text-blue-300">
          © 2025 StyleNest. All rights reserved. | Made in India
        </div>
      </footer>
    </div>
  );
}
