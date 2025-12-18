import React from "react";
import Navbar from "./Navbar.jsx";

function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-56 sm:h-64 md:h-130 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/banner3.jpg')" }}
      >
        {/* You can add a title or hero text here if needed */}
      </section>

      {/* Trust / Stats Section */}
      <section
        className="relative mt-1 py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('/aboutbanner.jpg')" }}
      >
        {/* Pink overlay for readability */}
        

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { 
                value: "10K+", 
                label: "Happy Customers", 
                image: "/images/happycus.jpg",
                features: ["Trusted by thousands", "24/7 Support", "Verified Buyers"] 
              },
              { 
                value: "500+", 
                label: "Unique Designs", 
                image: "/images/designs.jpg",
                features: ["Trendy & Stylish", "Limited Editions", "Updated Weekly"] 
              },
              { 
                value: "4.8★", 
                label: "Customer Rating", 
                image: "/images/rating.jpg",
                features: ["High Satisfaction", "Positive Reviews", "Quality Assured"] 
              },
              { 
                value: "Fast", 
                label: "Delivery", 
                image: "/images/delivery.jpg",
                features: ["Quick Shipping", "Reliable Service", "On-Time Delivery"] 
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
                style={{ 
                  backgroundImage: `url(${item.image})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
                  minHeight: '250px' 
                }}
              >
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-white bg-opacity-30 flex flex-col justify-center items-center p-4">
                  <h2 className="text-3xl font-bold text-pink-600">{item.value}</h2>
                  <p className="text-black mt-1 mb-2 font-semibold">{item.label}</p>
                  <ul className="text-pink-800 text-sm space-y-1">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2">
                        <span className="text-pink-300">✔</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center text-sm py-5">
        © 2025 Click2Buy. All rights reserved.
      </footer>
    </div>
  );
}

export default AboutPage;
