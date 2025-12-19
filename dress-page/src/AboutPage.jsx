import React from "react";
import Navbar from "./Navbar.jsx";
import { motion } from "framer-motion";

export default function AboutPage() {
  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "500+", label: "Premium Designs" },
    { value: "4.8★", label: "Customer Rating" },
    { value: "Fast", label: "Delivery" },
  ];

  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative h-[480px] bg-cover bg-center"
        style={{ backgroundImage: "url('/banner3.jpg')" }}
      >
        {/* Pink overlay */}
        <div className="absolute inset-0 bg-pink-900/70" />

        {/* Hero Text */}
        <div className="relative max-w-7xl mx-auto h-full flex items-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About StyleNest
            </h1>
            <p className="text-lg text-pink-100 leading-relaxed">
              A trusted e-commerce platform delivering curated fashion and
              lifestyle products through a secure, customer-first shopping
              experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT OVERVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* WHO WE ARE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-4 border-pink-600 pl-6"
          >
            <h2 className="text-3xl font-semibold text-pink-700 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              StyleNest is a modern digital commerce platform that connects
              customers with trusted sellers and carefully curated products.
              We focus on reliability, transparency, and long-term customer
              trust.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By combining secure technology, efficient logistics, and
              customer-centric design, we deliver a seamless shopping journey
              from discovery to delivery.
            </p>
          </motion.div>

          {/* WHAT MAKES US DIFFERENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-pink-50 border border-pink-200 rounded-3xl p-10 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-pink-700 mb-6">
              What Makes Us Different
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li>✔ Curated premium collections</li>
              <li>✔ Verified sellers & quality standards</li>
              <li>✔ Secure payments & data protection</li>
              <li>✔ Fast delivery & easy returns</li>
              <li>✔ Dedicated customer support</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="py-24 bg-pink-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-pink-700 mb-14">
            Trusted by Thousands
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-pink-600 text-white rounded-3xl p-8 shadow-lg"
              >
                <h3 className="text-4xl font-bold">{item.value}</h3>
                <p className="mt-2 text-pink-100">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="border-t border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h4 className="font-semibold text-pink-700">Secure Payments</h4>
            <p className="text-sm text-gray-600 mt-2">
              Industry-standard security
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-pink-700">Easy Returns</h4>
            <p className="text-sm text-gray-600 mt-2">
              Transparent return policies
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-pink-700">24/7 Support</h4>
            <p className="text-sm text-gray-600 mt-2">
              Always-on customer assistance
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-pink-700 text-pink-100 text-center text-sm py-6">
        © 2025 StyleNest. All rights reserved.
      </footer>
    </div>
  );
}