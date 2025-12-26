import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo5.jpg"
                alt="StyleNest Logo"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-xl font-bold">StyleNest</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for fashion, electronics, and lifestyle products.
              Quality guaranteed with fast delivery.
            </p>
            <div className="flex gap-4">
              <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer" />
              <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer" />
              <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/collection" className="hover:text-white">Collection</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/women" className="hover:text-white">Women Dresses</Link></li>
              <li><Link to="/men" className="hover:text-white">Men Dresses</Link></li>
              <li><Link to="/electro" className="hover:text-white">Electronics</Link></li>
              <li><Link to="/footwear" className="hover:text-white">Footwear</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm">123 Fashion Street, Style City</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="text-sm">support@stylenest.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 StyleNest. All rights reserved. | Made with ❤️ for fashion lovers</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;