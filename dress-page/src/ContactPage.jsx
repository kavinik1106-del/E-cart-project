import React, { useState } from "react";
import Navbar from "./Navbar.jsx";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative text-white text-center px-4 
                   h-56 sm:h-72 md:h-150
                   bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('dressbanner.jpg')" }}
      >
        

        
      </section>

      {/* Info Cards */}
      <section className="w-full bg-gradient-to-r from-pink-50 to-white py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {[
            { title: "Email", value: "kaviboutique@gmail.com", icon: "📧" },
            { title: "Phone", value: "+91 98765 43210", icon: "📞" },
            { title: "Location", value: "Chennai, India", icon: "📍" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-pink-50 text-center"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-pink-50 text-xl sm:text-2xl">
                {item.icon}
              </div>

              <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm mt-1 break-words">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
<section className="max-w-5xl mx-auto mt-12 px-4 grid md:grid-cols-2 gap-10">

  {/* Left – Contact Details */}
  <div className="space-y-6">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
      Get in Touch
    </h2>

    <p className="text-gray-600 text-sm md:text-base">
      Have questions or need help? We’re here for you.  
      Reach out to us anytime.
    </p>

    <div className="space-y-4 text-sm md:text-base">
      <p>
        📍 <span className="font-semibold">Address:</span><br />
        Click2Buy, Chennai, Tamil Nadu, India
      </p>

      <p>
        📞 <span className="font-semibold">Phone:</span><br />
        +91 98765 43210
      </p>

      <p>
        📧 <span className="font-semibold">Email:</span><br />
        support@click2buy.com
      </p>

      <p>
        ⏰ <span className="font-semibold">Working Hours:</span><br />
        Mon – Sat (9:00 AM – 6:00 PM)
      </p>
    </div>
  </div>

  {/* Right – Contact Form */}
  <div>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
      Send Us a Message
    </h2>

    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg space-y-5"
    >
      <input
        type="text"
        placeholder="Your Name"
        required
        className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none"
      />

      <input
        type="email"
        placeholder="Your Email"
        required
        className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none"
      />

      {/* Subject */}
      <select
        required
        className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none"
      >
        <option value="">Select Subject</option>
        <option>Order Related</option>
        <option>Payment Issue</option>
        <option>Delivery Issue</option>
        <option>General Query</option>
      </select>

      <textarea
        rows="4"
        placeholder="Your Message"
        required
        className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none resize-none"
      />

      <button
        type="submit"
        className="w-full py-2.5 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
      >
        Send Message
      </button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Your details are safe with us.
      </p>

      {submitted && (
        <p className="text-green-600 text-center text-sm font-medium">
          ✅ Message sent successfully! We will contact you soon.
        </p>
      )}
    </form>
  </div>
</section>

      {/* Google Map */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
          Visit Our Store
        </h2>
        <iframe
          title="map"
          className="w-full h-56 sm:h-72 md:h-80 rounded-2xl shadow-lg"
          src="https://www.google.com/maps?q=chennai&output=embed"
          loading="lazy"
        ></iframe>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-5 mt-16 text-xs sm:text-sm">
        © 2025{" "}
        <span className="text-white font-semibold">Click2Buy</span>.  
        Made with ❤️ in Chennai
      </footer>
    </div>
  );
}

export default ContactPage;
