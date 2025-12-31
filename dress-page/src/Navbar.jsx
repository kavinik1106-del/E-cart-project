import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import { Heart, ShoppingCart, User, LogOut, Menu, X, Search } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const { getCartCount, wishlist } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ token })
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r bg-blue-600  text-white px-4 py-4 shadow-md md:px-8 lg:px-16">
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
          <span className="text-xl underline font-bold">StyleNest</span>
        </div>

        {/* Search Bar - Professional Style */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands & more"
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <button onClick={() => navigate("/")} className="hover:text-blue-200 transition-colors cursor-pointer">Home</button>
          <button onClick={() => navigate("/about")} className="hover:text-blue-200 transition-colors cursor-pointer">About</button>
          <button onClick={() => navigate("/collection")} className="hover:text-blue-200 transition-colors cursor-pointer">Collection</button>
          <button onClick={() => navigate("/contact")} className="hover:text-blue-200 transition-colors cursor-pointer">Contact</button>
          <button onClick={() => navigate("/order")} className="hover:text-blue-200 transition-colors cursor-pointer">Order</button>

          {/* Cart and Wishlist Icons */}
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => navigate("/wishlist")}
              className="relative hover:text-red-300 transition-colors"
              title="Wishlist"
            >
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => navigate("/cart")}
              className="relative hover:text-yellow-300 transition-colors"
              title="Cart"
            >
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>

          {user ? (
            <>
              <span className="text-sm bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white font-semibold tracking-wide border border-white/20 drop-shadow-md">
  Welcome, <span className="text-blue-400">{user.first_name || user.email}</span>
</span>

              <button onClick={handleLogout} className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/login")} className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold">Login</button>
          )}

          <button onClick={() => navigate(localStorage.getItem("isAdmin") === "true" ? "/admin" : "/admin/login")} className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all font-semibold">Admin</button>


        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-white rounded-lg p-4 flex flex-col gap-4 text-center shadow border border-gray-200">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <button onClick={() => {navigate("/"); setOpen(false);}}>Home</button>
          <button onClick={() => {navigate("/about"); setOpen(false);}}>About</button>
          <button onClick={() => {navigate("/collection"); setOpen(false);}}>Collection</button>
          <button onClick={() => {navigate("/contact"); setOpen(false);}}>Contact</button>
          <button onClick={() => {navigate("/order"); setOpen(false);}}>Order</button>

          {/* Mobile Cart and Wishlist */}
          <div className="flex justify-center gap-6 py-2 border-t border-b border-gray-200">
            <button 
              onClick={() => {navigate("/wishlist"); setOpen(false);}}
              className="relative"
              title="Wishlist"
            >
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => {navigate("/cart"); setOpen(false);}}
              className="relative"
              title="Cart"
            >
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>

          {user ? (
            <>
              <div className="text-sm text-gray-600 py-2">Welcome, {user.first_name || user.email}</div>
              <button onClick={() => {handleLogout(); setOpen(false);}} className="bg-blue-600 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <button onClick={() => {navigate("/login"); setOpen(false);}}>Login</button>
          )}

          <button onClick={() => {navigate(localStorage.getItem("isAdmin") === "true" ? "/admin" : "/admin/login"); setOpen(false);}}>Admin</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
