import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  HelpCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
  Shield,
  X,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react";
import { apiCall, API_ENDPOINTS } from "./config/apiConfig.js";

function ContactPage() {
  const [activeBox, setActiveBox] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    orderId: "",
    issueType: "Order Related Issue",
    message: "",
    priority: "normal"
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const faqs = [
    {
      q: "How can I track my order?",
      a: "Go to Orders > Track Order to see delivery updates. You'll receive SMS and email notifications at every step.",
      category: "orders"
    },
    {
      q: "How do I cancel or return an item?",
      a: "You can cancel before shipping from Orders page. Returns are available within 7 days of delivery. Visit Returns & Refunds section.",
      category: "returns"
    },
    {
      q: "When will my refund be processed?",
      a: "Refunds are processed within 5–7 business days after approval. You'll receive an email confirmation.",
      category: "payments"
    },
    {
      q: "Why did my payment fail?",
      a: "Please check your bank balance, card validity, or try another payment option. Contact your bank if the issue persists.",
      category: "payments"
    },
    {
      q: "How do I change my delivery address?",
      a: "Address changes are possible before shipping. Contact us immediately or update in your order details.",
      category: "shipping"
    },
    {
      q: "Are the products authentic?",
      a: "Yes, all our products are 100% authentic with manufacturer warranty. We partner with authorized dealers only.",
      category: "products"
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await apiCall(API_ENDPOINTS.CONTACT, {
        method: "POST",
        body: JSON.stringify(formData)
      });

      if (response.success) {
        setSuccessMessage("Thank you! Your message has been submitted successfully. We'll respond within 24 hours.");
        setFormData({
          fullName: "",
          email: "",
          mobileNumber: "",
          orderId: "",
          issueType: "Order Related Issue",
          message: "",
          priority: "normal"
        });
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setErrorMessage(response.message || "Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error submitting form. Please check your connection and try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-primary text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-300/10 rounded-full blur-2xl animate-pulse delay-1000" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4 text-yellow-300" />
              Customer Support
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Get in <span className="text-secondary">Touch</span>
            </h1>

            <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed max-w-4xl mx-auto">
              We're here to help you with any questions, concerns, or support you need.
              Our dedicated team is ready to assist you 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">support@stylenest.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>  


      {/* Enhanced Support Options */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div
            onClick={() => setActiveBox("chat")}
            className={`group bg-white rounded-2xl shadow-xl p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-2xl border border-gray-100 ${
              activeBox === "chat" ? "ring-2 ring-blue-500 shadow-blue-200" : "hover:scale-105"
            }`}
          >
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <MessageCircle className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Live Chat</h3>
            <p className="text-gray-600 leading-relaxed">
              Instant messaging support with our expert team
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium">
              <span>Available 24/7</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div
            onClick={() => setActiveBox("help")}
            className={`group bg-white rounded-2xl shadow-xl p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-2xl border border-gray-100 ${
              activeBox === "help" ? "ring-2 ring-blue-500 shadow-blue-200" : "hover:scale-105"
            }`}
          >
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <HelpCircle className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Help Center</h3>
            <p className="text-gray-600 leading-relaxed">
              Find answers to common questions and issues
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium">
              <span>1000+ Articles</span>
            </div>
          </div>

          <div
            onClick={() => setActiveBox("call")}
            className={`group bg-white rounded-2xl shadow-xl p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-2xl border border-gray-100 ${
              activeBox === "call" ? "ring-2 ring-blue-500 shadow-blue-200" : "hover:scale-105"
            }`}
          >
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <Phone className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Call Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Speak directly with our customer care executives
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium">
              <span>Mon-Sat 9AM-8PM</span>
            </div>
          </div>
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
                  <div className="bg-primary/20 p-3 rounded-lg">
                    👋 Hi! How can we help you today?
                  </div>
                  <div className="bg-primary/30 p-3 rounded-lg text-right">
                    I need help with my order
                  </div>
                  <div className="bg-primary/20 p-3 rounded-lg">
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
                          ? "bg-primary/10 border-primary"
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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information Card */}
          <div className="bg-primary/10 rounded-3xl p-8 shadow-xl border border-primary/20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed">
                We're here to help! Reach out to us through any of these channels and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                  <p className="text-gray-600 text-sm">support@stylenest.com</p>
                  <p className="text-blue-600 text-xs mt-1">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
                  <p className="text-gray-600 text-sm">Chennai, Tamil Nadu, India</p>
                  <p className="text-blue-600 text-xs mt-1">Visit our showroom</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600 text-sm">Mon – Sat (9 AM – 8 PM)</p>
                  <p className="text-blue-600 text-xs mt-1">Sunday: Emergency support only</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary rounded-2xl text-white">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-90">Support</div>
              </div>
              <div className="text-center p-4 bg-primary rounded-2xl text-white">
                <div className="text-2xl font-bold">&lt;2hrs</div>
                <div className="text-sm opacity-90">Response</div>
              </div>
            </div>
          </div>

          {/* ENHANCED CONTACT FORM */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Write to Us</h2>
              <p className="text-gray-600">
                Please provide accurate details so we can resolve your issue faster.
              </p>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-2xl border border-green-200 flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
                  <input
                    type="text"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type *</label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-white"
                >
                  <option value="">Select Issue Type</option>
                  <option>Order Related Issue</option>
                  <option>Payment / Refund</option>
                  <option>Delivery Problem</option>
                  <option>Account Support</option>
                  <option>Product Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 resize-none"
                  rows="5"
                  placeholder="Describe your issue in detail. The more information you provide, the better we can help you."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary disabled:bg-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Request"
                )}
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  Our team usually responds within 24 hours
                </p>
              </div>
            </form>
          </div>
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


      {/* Professional Footer */}
<footer className="bg-primary text-white">
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid md:grid-cols-4 gap-8">

      {/* Brand */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-secondary">
          StyleNest
        </h3>
        <p className="text-blue-100 text-sm leading-relaxed">
          Your trusted online shopping destination for fashion, lifestyle, and more.
          Quality products backed by reliable service.
        </p>

        <div className="flex space-x-4">
          {[Facebook, Instagram, Twitter].map((Icon, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-primary/40 hover:bg-secondary text-white hover:text-gray-900 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <Icon className="w-5 h-5" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
        <ul className="space-y-2 text-sm text-blue-100">
          <li><a href="/about" className="hover:text-secondary transition">About Us</a></li>
          <li><a href="/collection" className="hover:text-secondary transition">Collections</a></li>
          <li><a href="/new" className="hover:text-secondary transition">New Arrivals</a></li>
          <li><a href="/best-sellers" className="hover:text-secondary transition">Best Sellers</a></li>
        </ul>
      </div>

      {/* Customer Care */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Customer Care</h4>
        <ul className="space-y-2 text-sm text-blue-100">
          <li><a href="/contact" className="hover:text-yellow-400 transition">Contact Us</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition">Shipping Info</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition">Returns</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition">Size Guide</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Contact Info</h4>
        <div className="space-y-3 text-sm text-blue-100">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-secondary" />
            <span>Chennai, Tamil Nadu, India</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-secondary" />
            <span>support@stylenest.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-secondary" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>

    </div>

    {/* Bottom Bar */}
    <div className="border-t border-blue-800/50 mt-10 pt-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-blue-200 text-sm">
          © 2025 StyleNest. All rights reserved. | Made with ❤️ in India
        </p>
        <div className="flex gap-6 text-sm text-blue-200">
          <a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-400 transition">Terms</a>
          <a href="#" className="hover:text-yellow-400 transition">Cookies</a>
        </div>
      </div>
    </div>

  </div>
</footer>
</div>
  );
}

export default ContactPage;