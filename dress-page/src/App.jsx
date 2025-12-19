import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";
import CollectionPage from "./CollectionPage.jsx";
import OrderPage from "./OrderPage.jsx";
import LoginPage from "./LoginPage.jsx";



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/collection" element={<CollectionPage />} />
       <Route path="/order" element={<OrderPage />} />
       <Route path="/login" element={<LoginPage />} />
       

    </Routes>
  );
}

export default App;
