import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage.jsx";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";
import CollectionPage from "./CollectionPage.jsx";
import ProductDetailPage from "./ProductDetailPage.jsx";
import KidsWear from "./kidswear.jsx";
import OrderPage from "./OrderPage.jsx";
import Electro from "./Electro.jsx";
import WomenDress from "./WomenDress1.jsx";
import MenDress from "./MenDress.jsx";
import Vegetables from "./Vegetables.jsx";
import Bicycles from "./bicycles.jsx";
import Accessories from "./accessories.jsx";
import Footwear from "./footwear.jsx";
import HomeAppliances from "./HomeAppliances.jsx";
import LoginPage from "./LoginPage.jsx";

/* 🔥 NEW IMPORTS */
import CartPage from "./CartPage.jsx";
import WishlistPage from "./WishlistPage.jsx";
import CheckoutPage from "./CheckoutPage.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* EXISTING ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/kidswear" element={<KidsWear />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/electro" element={<Electro />} />
        <Route path="/women" element={<WomenDress />} />
        <Route path="/footwear" element={<Footwear />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/men" element={<MenDress />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/appliances" element={<HomeAppliances />} />
        <Route path="/bicycles" element={<Bicycles />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        {/* 🆕 NEW ROUTES */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
