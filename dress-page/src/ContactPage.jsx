import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

function ContactPage() {
  const [activeBox, setActiveBox] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      q: "How can I track my order?",
      a: "Go to Orders > Track Order to see delivery updates.",
    },
    {
      q: "How do I cancel or return an item?",
      a: "You can cancel before shipping. Returns are available within 7 days.",
    },
    {
      q: "When will my refund be processed?",
      a: "Refunds are processed within 5–7 business days.",
    },
    {
      q: "Why did my payment fail?",
      a: "Please check your bank balance or try another payment option.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

     {/* Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-14">
        <h1 className="text-4xl font-bold text-center">
          StyleNest Customer Support
        </h1>
        <p className="text-center mt-3 text-sm opacity-90">
          We are here to help you
        </p>
      </div>  


      {/* Support Options */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 grid md:grid-cols-3 gap-6">
        <div
          onClick={() => setActiveBox("chat")}
          className={`bg-white rounded-xl shadow p-6 text-center cursor-pointer
          ${activeBox === "chat" ? "ring-2 ring-pink-500" : ""}`}
        >
          <MessageCircle className="mx-auto text-pink-500 mb-3" size={30} />
          <h3 className="font-semibold">Live Chat</h3>
          <p className="text-sm text-gray-600 mt-2">
            Instant messaging support
          </p>
        </div>

        <div
          onClick={() => setActiveBox("help")}
          className={`bg-white rounded-xl shadow p-6 text-center cursor-pointer
          ${activeBox === "help" ? "ring-2 ring-pink-500" : ""}`}
        >
          <HelpCircle className="mx-auto text-pink-500 mb-3" size={30} />
          <h3 className="font-semibold">Help Center</h3>
          <p className="text-sm text-gray-600 mt-2">
            FAQs & self-service
          </p>
        </div>

        <div
          onClick={() => setActiveBox("call")}
          className={`bg-white rounded-xl shadow p-6 text-center cursor-pointer
          ${activeBox === "call" ? "ring-2 ring-pink-500" : ""}`}
        >
          <Phone className="mx-auto text-pink-500 mb-3" size={30} />
          <h3 className="font-semibold">Call Support</h3>
          <p className="text-sm text-gray-600 mt-2">
            Talk to our team
          </p>
        </div>
      </div>

      {/* Dynamic Info Section */}
      {activeBox && (
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <div className="bg-white rounded-xl shadow p-8">
            {activeBox === "chat" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Live Chat Support
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    👋 Hi! How can we help you today?
                  </div>
                  <div className="bg-pink-100 p-3 rounded-lg text-right">
                    I need help with my order
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    Sure! Please share your order ID.
                  </div>
                </div>
              </>
            )}

            {activeBox === "help" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Help Center – FAQs
                </h2>

                {faqs.map((item, index) => (
                  <div key={index} className="mb-3">
                    <button
                      onClick={() =>
                        setActiveFAQ(activeFAQ === index ? null : index)
                      }
                      className={`w-full text-left p-4 rounded-lg border font-medium
                      ${
                        activeFAQ === index
                          ? "bg-pink-50 border-pink-400"
                          : "bg-white"
                      }`}
                    >
                      {item.q}
                    </button>

                    {activeFAQ === index && (
                      <div className="p-4 text-sm text-gray-600 bg-gray-50">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {activeBox === "call" && (
              <>
                <h2 className="text-2xl font-semibold mb-3">
                  Call Support
                </h2>
                <p className="text-gray-600 text-sm">
                  📞 +91 98765 43210
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Monday – Saturday (9 AM – 8 PM)
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* CONTACT DETAILS + ENHANCED FORM */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-xl shadow p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>

          <div className="flex gap-4">
            <Mail className="text-pink-500" />
            <p className="text-sm text-gray-600">support@stylenest.com</p>
          </div>

          <div className="flex gap-4">
            <MapPin className="text-pink-500" />
            <p className="text-sm text-gray-600">
              Chennai, Tamil Nadu, India
            </p>
          </div>

          <div className="flex gap-4">
            <Clock className="text-pink-500" />
            <p className="text-sm text-gray-600">
              Mon – Sat (9 AM – 8 PM)
            </p>
          </div>
        </div>

        {/* ENHANCED AMAZON-STYLE CONTACT FORM */}
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-semibold mb-2">Write to Us</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please provide accurate details so we can resolve your issue faster.
          </p>

          <form className="space-y-4">
            <input className="w-full border rounded-lg px-4 py-3 text-sm" placeholder="Full Name" />
            <input className="w-full border rounded-lg px-4 py-3 text-sm" placeholder="Email Address" />
            <input className="w-full border rounded-lg px-4 py-3 text-sm" placeholder="Mobile Number" />
            <input className="w-full border rounded-lg px-4 py-3 text-sm" placeholder="Order ID (optional)" />

            <select className="w-full border rounded-lg px-4 py-3 text-sm text-gray-600">
              <option>Select Issue Type</option>
              <option>Order Related Issue</option>
              <option>Payment / Refund</option>
              <option>Delivery Problem</option>
              <option>Account Support</option>
              <option>Other</option>
            </select>

            <textarea
              className="w-full border rounded-lg px-4 py-3 text-sm"
              rows="4"
              placeholder="Describe your issue in detail"
            />

            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold">
              Submit Request
            </button>

            <p className="text-xs text-gray-500 text-center">
              Our team usually responds within 24 hours
            </p>
          </form>
        </div>
      </div>
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


      <div className="bg-gray-200 text-center py-6 text-sm text-gray-600">
        © 2025 StyleNest – Trusted Online Shopping Platform
      </div>
    </div>
  );
}

export default ContactPage;