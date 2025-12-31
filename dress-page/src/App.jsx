import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage.jsx";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";
import CollectionPage from "./CollectionPage.jsx";

import ProductDetailPage from "./ProductDetailPage.jsx"
import ProductDetail from "./ProductDetail.jsx";

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
import ShoesCategory from "./ShoesCategory.jsx";
import LoginPage from "./LoginPage.jsx";
import { CustomerProvider } from "./contexts/CustomerContext";


import PrivateRoute from "./components/PrivateRoute.jsx";


/* 🔥 NEW IMPORTS */
import CartPage from "./CartPage.jsx";
import WishlistPage from "./WishlistPage.jsx";
import CheckoutPage from "./CheckoutPage.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminProducts from "./admin/AdminProducts.jsx";
import AdminOrders from "./admin/AdminOrders.jsx";
import AdminCustomers from "./admin/AdminCustomers.jsx";
import AdminSettings from "./admin/AdminSettings.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";
import SearchResults from "./SearchResults.jsx";

function AppContent() {
  return (
    <CartProvider>
      <CustomerProvider>
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
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        
        <Route path="/product/:id" element={<ProductDetailPage />} />
        

        {/* 🆕 NEW ROUTES */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute><AdminCustomers /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        

    </Routes>
    </CustomerProvider>
    </CartProvider>
    
  );
}

export default AppContent;    