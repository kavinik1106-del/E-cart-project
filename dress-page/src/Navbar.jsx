import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import { apiCall, API_ENDPOINTS } from "./config/apiConfig.js";
import {
  Heart,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  Search,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const { getCartCount, wishlist } = useCart();

  useEffect(() => {
    const onUserUpdated = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    window.addEventListener("userUpdated", onUserUpdated);
    return () => window.removeEventListener("userUpdated", onUserUpdated);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await apiCall(API_ENDPOINTS.LOGOUT, {
          method: "POST",
          body: JSON.stringify({ token }),
        });
      }
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white px-4 py-4 shadow-md md:px-8 lg:px-16">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo5.jpg"
            alt="StyleNest"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="text-xl font-bold underline">StyleNest</span>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:block flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pr-12 rounded-lg text-gray-800"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded">
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {["Home", "About", "Collection", "Contact", "Order"].map((item) => (
            <button
              key={item}
              onClick={() =>
                navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)
              }
              className="hover:text-yellow-300"
            >
              {item}
            </button>
          ))}

          {/* Wishlist */}
          <button onClick={() => navigate("/wishlist")} className="relative">
            <Heart size={22} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button onClick={() => navigate("/cart")} className="relative">
            <ShoppingCart size={22} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <>
              <span className="text-sm bg-white/10 px-3 py-1 rounded-full">
                {user.first_name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-2 rounded"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 px-4 py-2 rounded"
            >
              Login
            </button>
          )}

          {/* Admin */}
          <button
            onClick={() =>
              navigate(
                localStorage.getItem("isAdmin") === "true"
                  ? "/admin"
                  : "/admin/login"
              )
            }
            className="bg-yellow-400 text-blue-700 px-4 py-2 rounded"
          >
            Admin
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-white text-gray-800 rounded-lg p-4 space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 pr-10 rounded border"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              <Search size={16} />
            </button>
          </form>

          {["Home", "About", "Collection", "Contact", "Order"].map((item) => (
            <button
              key={item}
              onClick={() => {
                navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`);
                setOpen(false);
              }}
              className="block w-full text-left"
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
