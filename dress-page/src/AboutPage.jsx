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
    {
      value: "10K+",
      label: "Happy Customers",
      icon: Users,
      color: "from-blue-400 to-blue-500",
      description: "Trusted by thousands",
    },
    {
      value: "500+",
      label: "Premium Products",
      icon: ShoppingBag,
      color: "from-blue-400 to-blue-500",
      description: "Curated collection",
    },
    {
      value: "4.8★",
      label: "Customer Rating",
      icon: Star,
      color: "from-yellow-400 to-yellow-500",
      description: "Average rating",
    },
    {
      value: "24/7",
      label: "Customer Support",
      icon: HeadphonesIcon,
      color: "from-blue-300 to-blue-400",
      description: "Always available",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "Your data and payments are protected with industry-standard security measures and SSL encryption.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Quick and reliable delivery across India with real-time tracking and flexible shipping options.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "Every product is carefully selected, verified for quality, and backed by our satisfaction guarantee.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We put our customers at the heart of everything we do, from product selection to after-sales support.",
    },
  ];

  const features = [
    "Curated premium collections from trusted brands",
    "Verified sellers & rigorous quality standards",
    "Secure payments & complete data protection",
    "Fast delivery & hassle-free returns",
    "Dedicated customer support team",
    "Transparent pricing with no hidden costs",
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Fashion Enthusiast",
      content:
        "StyleNest has transformed my shopping experience. The quality is exceptional and delivery is always on time.",
      rating: 5,
      avatar: "P",
    },
    {
      name: "Rahul Kumar",
      role: "Tech Professional",
      content:
        "I love the variety and the customer service is outstanding. Found everything I needed in one place.",
      rating: 5,
      avatar: "R",
    },
    {
      name: "Anjali Mehta",
      role: "Home Maker",
      content:
        "The product descriptions are accurate and the return policy gives me complete peace of mind.",
      rating: 5,
      avatar: "A",
    },
  ];

  const team = [
    {
      name: "Arun Kumar",
      role: "CEO & Founder",
      bio: "Passionate about revolutionizing e-commerce in India with 15+ years of experience in retail and technology.",
      expertise: "Strategic Leadership",
    },
    {
      name: "Meera Singh",
      role: "Head of Operations",
      bio: "Ensuring seamless delivery and customer satisfaction with expertise in supply chain management.",
      expertise: "Operations Excellence",
    },
    {
      name: "Vikram Rao",
      role: "Chief Technology Officer",
      bio: "Building innovative solutions for better shopping experiences with a focus on user-centric design.",
      expertise: "Technology Innovation",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8"
            >
              <Zap className="w-10 h-10 text-yellow-300" />
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                StyleNest
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-8 text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Your trusted destination for premium fashion, lifestyle, and home
              essentials. We curate the finest products to elevate your everyday
              living.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/collection")}
                className="group border-2 border-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 hover:text-white backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                Explore Collection
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Building trust through consistent excellence and customer
              satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div
                  className={`relative w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <stat.icon className="text-white w-8 h-8" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  <Counter
                    end={parseInt(stat.value.replace(/[^\d]/g, ""))}
                    suffix={stat.value.replace(/[\d]/g, "")}
                  />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-yellow-500" />
                <h2 className="text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                To deliver exceptional quality products at competitive prices
                while maintaining the highest standards of trust, transparency,
                and customer service.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We strive to redefine online shopping through innovation,
                personalized experiences, and a commitment to sustainability and
                ethical practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-blue-500" />
                <h2 className="text-4xl font-bold">Our Vision</h2>
              </div>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                To become India's most trusted and preferred online marketplace,
                setting new benchmarks for e-commerce excellence.
              </p>
              <div className="flex items-center gap-4 text-yellow-600">
                <TrendingUp className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  Growing stronger every day
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose StyleNest?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with personalized service to
              deliver an unparalleled shopping experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                What Sets Us Apart
              </h2>
              <div className="space-y-4">
                {features.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                    <CheckCircle className="text-green-500 w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-200 to-blue-300 p-8 rounded-3xl text-gray-900">
                <Quote className="w-12 h-12 text-yellow-500 mb-4" />
                <p className="text-lg leading-relaxed mb-6">
                  "StyleNest represents the future of e-commerce in India -
                  combining technology, trust, and exceptional customer service
                  in one seamless platform."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">Arun Kumar</p>
                    <p className="text-blue-700 text-sm">CEO & Founder</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from real customers who trust StyleNest
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-400 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experienced professionals dedicated to building India's premier
              e-commerce platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-400 text-gray-900 flex items-center justify-center rounded-full text-2xl mb-6 font-bold group-hover:scale-110 transition-transform duration-300">
                  {member.name[0]}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 mb-2 text-center font-semibold">
                  {member.role}
                </p>
                <p className="text-yellow-600 mb-4 text-center text-sm font-medium">
                  {member.expertise}
                </p>
                <p className="text-gray-700 leading-relaxed text-center">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Trust Banner */}
      <section className="py-20 bg-gradient-to-br from-blue-100 to-blue-200 text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Globe className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
            <h2 className="text-4xl font-bold mb-6">
              Trusted by Millions Across India
            </h2>
            <p className="text-xl mb-8 text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your security, satisfaction, and trust are the cornerstones of
              everything we do. Join thousands of happy customers who choose
              StyleNest for their shopping needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/logo5.jpg"
                  alt="StyleNest"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-xl font-bold">StyleNest</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted destination for premium products and exceptional
                service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/collection"
                    className="hover:text-white transition-colors"
                  >
                    Collection
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 StyleNest. All rights reserved. | Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
