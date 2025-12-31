import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import { Heart, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const { getCartCount, wishlist } = useCart();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r bg-blue-600 text-white px-4 py-4 shadow-md md:px-8 lg:px-16">
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

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/collection")}>Collection</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/order")}>Order</button>
          <button onClick={() => navigate("/register")}>Register</button>
          <button onClick={() => navigate(localStorage.getItem("isAdmin") === "true" ? "/admin" : "/admin/login")}>Admin</button>
          
          
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
