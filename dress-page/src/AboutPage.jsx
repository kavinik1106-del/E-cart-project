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
  Zap
} from "lucide-react";
import Counter from "./components/Counter.jsx";

export default function AboutPage() {
  const navigate = useNavigate();

  const stats = [
    { value: "10K+", label: "Happy Customers", icon: Users, color: "from-blue-500 to-blue-600" },
    { value: "500+", label: "Premium Products", icon: ShoppingBag, color: "from-green-500 to-green-600" },
    { value: "4.8★", label: "Customer Rating", icon: Star, color: "from-yellow-500 to-yellow-600" },
    { value: "24/7", label: "Customer Support", icon: HeadphonesIcon, color: "from-purple-500 to-purple-600" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data and payments are protected with industry-standard security measures."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery across India with real-time tracking."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Every product is carefully selected and verified for quality."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do."
    }
  ];

  const features = [
    "Curated premium collections",
    "Verified sellers & quality standards",
    "Secure payments & data protection",
    "Fast delivery & easy returns",
    "Dedicated customer support",
    "Transparent pricing"
  ];

  const team = [
    {
      name: "Arun Kumar",
      role: "CEO & Founder",
      bio: "Passionate about revolutionizing e-commerce in India"
    },
    {
      name: "Meera Singh",
      role: "Head of Operations",
      bio: "Ensuring seamless delivery and customer satisfaction"
    },
    {
      name: "Vikram Rao",
      role: "Tech Lead",
      bio: "Building innovative solutions for better shopping"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-24 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Zap className="w-14 h-14 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">
            About <span className="text-yellow-300">StyleNest</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl mb-8">
            Your trusted destination for fashion, lifestyle, and home essentials.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate("/collection")}
              className="border-2 border-white px-8 py-4 rounded-xl font-bold"
            >
              Explore Collection
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="text-white w-10 h-10" />
              </div>
              <div className="text-3xl font-bold">
                <Counter
                  end={parseInt(stat.value.replace(/[^\d]/g, ""))}
                  suffix={stat.value.replace(/[\d]/g, "")}
                />
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              To deliver high-quality products at affordable prices while maintaining trust,
              transparency, and exceptional service.
            </p>
            <p className="text-lg text-gray-600">
              We aim to redefine online shopping through innovation and customer-first thinking.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Why Choose StyleNest?</h3>
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <CheckCircle className="text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CUSTOMERS TRUST US (REPLACEMENT SECTION) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Customers Trust Us</h2>
          <p className="text-xl text-gray-600 mb-12">
            Reliability, security, and satisfaction — built into everything we do.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow">
              <Shield className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">All transactions are encrypted and protected.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <Truck className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Reliable pan-India shipping with tracking.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <HeadphonesIcon className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated team always ready to help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-xl">
                <div className="w-24 h-24 mx-auto bg-blue-600 text-white flex items-center justify-center rounded-full text-3xl mb-4">
                  {member.name[0]}
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <Globe className="w-14 h-14 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Trusted by Millions</h2>
        <p className="max-w-2xl mx-auto text-blue-100">
          Your security and satisfaction are our top priorities.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p className="text-gray-400">© 2025 StyleNest. All rights reserved.</p>
      </footer>
    </div>
  );
}
