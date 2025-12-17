import React from "react";
import Navbar from "./Navbar.jsx";

function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative text-white text-center px-4 
                   h-48 sm:h-64 md:h-80 lg:h-96
                   bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('banner.avif')" }}
      >
       
         
        
      </section>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: "10K+", label: "Customers" },
            { value: "500+", label: "Designs" },
            { value: "4.8★", label: "Rating" },
            { value: "Fast", label: "Delivery" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 sm:p-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-pink-500">
                {item.value}
              </h2>
              <p className="text-black-600 text-xs sm:text-sm mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-4 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="text-3xl sm:text-4xl mb-2">👗</div>
            <h3 className="font-semibold text-base sm:text-lg">
              Quality
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Best fabrics & designs
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="text-3xl sm:text-4xl mb-2">💰</div>
            <h3 className="font-semibold text-base sm:text-lg">
              Affordable
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Budget friendly prices
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="text-3xl sm:text-4xl mb-2">🚚</div>
            <h3 className="font-semibold text-base sm:text-lg">
              Delivery
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Quick & safe shipping
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center text-xs sm:text-sm py-4">
        © 2025 Kavi Boutique
      </footer>
    </div>
  );
}

export default AboutPage;
