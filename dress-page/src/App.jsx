import React from "react";
import { Routes, Route } from "react-router-dom";

/* Pages */
import HomePage from "./HomePage.jsx";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";
import CollectionPage from "./CollectionPage.jsx";
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
import LoginPage from "./LoginPageAPI.jsx";
import SearchResults from "./SearchResults.jsx";
import ProductDetailPage from "./ProductDetailPage.jsx";


/* Cart & Wishlist */
import CartPage from "./CartPage.jsx";
import WishlistPage from "./WishlistPage.jsx";
import CheckoutPage from "./CheckoutPage.jsx";
import { CartProvider, useCart } from "./contexts/CartContext.jsx";

/* Admin */
import AdminPanel from "./admin/AdminPanel.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminProducts from "./admin/AdminProducts.jsx";
import AdminOrders from "./admin/AdminOrders.jsx";
import AdminCustomers from "./admin/AdminCustomers.jsx";
import AdminSettings from "./admin/AdminSettings.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";
/* ✅ Toast Component */
import Toast from "./components/Toast.jsx"; // <-- ADD THIS

function AppContent() {
  const { toast } = useCart();

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/kidswear" element={<KidsWear />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route path="/order" element={<OrderPage />} />
        <Route path="/electro" element={<Electro />} />
        <Route path="/women" element={<WomenDress />} />
        <Route path="/men" element={<MenDress />} />
        <Route path="/footwear" element={<Footwear />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/appliances" element={<HomeAppliances />} />
        <Route path="/bicycles" element={<Bicycles />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchResults />} />

        {/* Cart */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute>
              <AdminCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => {}}
        />
      )}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
