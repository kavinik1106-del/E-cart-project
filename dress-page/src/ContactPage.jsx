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
  Loader
} from "lucide-react";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Thank you! Your message has been submitted successfully. We'll respond within 24 hours.");
        setFormData({
          fullName: "",
          email: "",
          mobileNumber: "",
          orderId: "",
          issueType: "Order Related Issue",
          message: ""
        });
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setErrorMessage(data.error || "Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error submitting form. Please check your connection and try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

     {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-14">
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
          ${activeBox === "chat" ? "ring-2 ring-blue-500" : ""}`}
        >
          <MessageCircle className="mx-auto text-blue-500 mb-3" size={30} />
          <h3 className="font-semibold">Live Chat</h3>
          <p className="text-sm text-gray-600 mt-2">
            Instant messaging support
          </p>
        </div>

        <div
          onClick={() => setActiveBox("help")}
          className={`bg-white rounded-xl shadow p-6 text-center cursor-pointer
          ${activeBox === "help" ? "ring-2 ring-blue-500" : ""}`}
        >
          <HelpCircle className="mx-auto text-blue-500 mb-3" size={30} />
          <h3 className="font-semibold">Help Center</h3>
          <p className="text-sm text-gray-600 mt-2">
            FAQs & self-service
          </p>
        </div>

        <div
          onClick={() => setActiveBox("call")}
          className={`bg-white rounded-xl shadow p-6 text-center cursor-pointer
          ${activeBox === "call" ? "ring-2 ring-blue-500" : ""}`}
        >
          <Phone className="mx-auto text-blue-500 mb-3" size={30} />
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
                  <div className="bg-blue-100 p-3 rounded-lg text-right">
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
                          ? "bg-blue-50 border-blue-400"
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
            <Mail className="text-blue-500" />
            <p className="text-sm text-gray-600">support@stylenest.com</p>
          </div>

          <div className="flex gap-4">
            <MapPin className="text-blue-500" />
            <p className="text-sm text-gray-600">
              Chennai, Tamil Nadu, India
            </p>
          </div>

          <div className="flex gap-4">
            <Clock className="text-blue-500" />
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

          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
              ✓ {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              ✗ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-sm"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-sm"
              placeholder="Email Address"
            />
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
              className="w-full border rounded-lg px-4 py-3 text-sm"
              placeholder="Mobile Number (10 digits)"
            />
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-3 text-sm"
              placeholder="Order ID (optional)"
            />

            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-sm text-gray-600"
            >
              <option>Select Issue Type</option>
              <option>Order Related Issue</option>
              <option>Payment / Refund</option>
              <option>Delivery Problem</option>
              <option>Account Support</option>
              <option>Other</option>
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-sm"
              rows="4"
              placeholder="Describe your issue in detail"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-200"
            >
              {loading ? "Submitting..." : "Submit Request"}
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