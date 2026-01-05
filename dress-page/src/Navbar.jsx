import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import { apiCall, API_ENDPOINTS } from './config/apiConfig.js';
import { Heart, ShoppingCart, User, LogOut, Menu, X, Search } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const { getCartCount, wishlist } = useCart();

  // Update user state when other components update localStorage (e.g. after login/register)
  useEffect(() => {
    const onUserUpdated = () => {
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    };
    window.addEventListener('userUpdated', onUserUpdated);
    return () => window.removeEventListener('userUpdated', onUserUpdated);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await apiCall(API_ENDPOINTS.LOGOUT, { method: 'POST', body: JSON.stringify({ token }) });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white px-4 py-4 shadow-md md:px-8 lg:px-16">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo5.jpg"
            alt="StyleNest Logo"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="text-xl font-bold underline">StyleNest</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands & more"
              className="w-full px-4 py-3 pr-12 rounded-lg border border-primary/20 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-secondary hover:text-primary text-white p-2 rounded-md transition"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {["Home", "About", "Collection", "Contact", "Order"].map((item) => (
            <button
              key={item}
              onClick={() => navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
              className="hover:text-secondary transition"
            >
              {item}
            </button>
          ))}

          {/* Wishlist */}
          <button
            onClick={() => navigate("/wishlist")}
            className="relative hover:text-red-300"
          >
            <Heart size={24} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative hover:text-secondary"
          >
            <ShoppingCart size={24} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-lg">
                <User size={18} />
                <div>
                  <div className="font-semibold">{user.first_name || user.email.split('@')[0]}</div>
                  <div className="text-xs opacity-75">Profile</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 flex items-center gap-2 text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <User size={18} />
              <span>Login</span>
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
            className="bg-secondary text-primary px-4 py-2 rounded-lg font-semibold hover:opacity-90 shadow"
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
        <div className="md:hidden mt-4 bg-white text-gray-800 rounded-lg p-4 space-y-4 shadow">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pr-12 rounded-lg border border-primary/20 focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-secondary text-white p-2 rounded-md"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {["Home", "About", "Collection", "Contact", "Order"].map((item) => (
            <button
              key={item}
              onClick={() => {
                navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`);
                setOpen(false);
              }}
              className="block w-full text-left hover:text-primary font-medium"
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => {
              navigate(
                localStorage.getItem("isAdmin") === "true"
                  ? "/admin"
                  : "/admin/login"
              );
              setOpen(false);
            }}
            className="bg-secondary text-primary font-semibold py-2 rounded-lg w-full"
          >
            Admin
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
