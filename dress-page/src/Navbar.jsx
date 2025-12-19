import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-pink-500 text-white px-4 py-4">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo5.jpg"
            alt="Kavi Boutique Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-bold">StyleNest</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/collection")}>Collection</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/order")}>Order</button>
          
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-pink-400 rounded-lg p-4 flex flex-col gap-4 text-center">
          <button onClick={() => {navigate("/"); setOpen(false);}}>Home</button>
          <button onClick={() => {navigate("/about"); setOpen(false);}}>About</button>
          <button onClick={() => {navigate("/collection"); setOpen(false);}}>Collection</button>
          <button onClick={() => {navigate("/contact"); setOpen(false);}}>Contact</button>
          <button onClick={() => {navigate("/order"); setOpen(false);}}>Order</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
