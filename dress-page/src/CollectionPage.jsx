import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function CollectionPage() {

  /* -------------------- STATES -------------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 8;

  /* -------------------- CATEGORIES -------------------- */
  const categories = [
    { id: "all", name: "All", image: "/mobile.jpg" },
    { id: "electronics", name: "Electronics", image: "/mobile.jpg" },
    { id: "women", name: "Women Dresses", image: "/dress1.webp" },
    { id: "men", name: "Men Dresses", image: "/men2.jpg" },
    { id: "food", name: "Dry Fruits", image: "/cashew.webp" },
    { id: "home", name: "Home Appliances", image: "/fridge.webp" },
  ];

  /* -------------------- PRODUCTS -------------------- */
  const allProducts = [
    { id: 1, name: "Double Door Fridge", price: 18999, image: "/doubledoorfringe.avif", rating: 4.4, category: "home", brand: "Samsung" },
    { id: 2, name: "Cashew Nuts 500g", price: 699, image: "/cashew.webp", rating: 4.2, category: "food", brand: "NutriLife" },
    { id: 3, name: "Luxury Sofa", price: 14999, image: "/bluesofa.webp", rating: 4.5, category: "home", brand: "Ikea" },
    { id: 4, name: "Red Kurta", price: 1299, image: "/dress1.webp", rating: 4.1, category: "women", brand: "FabIndia" },
    { id: 5, name: "Sofa Chair", price: 9999, image: "/sofa.webp", rating: 4.3, category: "home", brand: "Godrej" },
    { id: 6, name: "iPhone 15", price: 124999, image: "/mobile.jpg", rating: 4.6, category: "electronics", brand: "Apple" },
    { id: 7, name: "Dates 1kg", price: 399, image: "/dates.jpg", rating: 4.0, category: "food", brand: "Organic" },
    { id: 8, name: "Silk Saree", price: 1899, image: "/saree2.jpg", rating: 4.3, category: "women", brand: "Kanchipuram" },
    { id: 9, name: "Apple Watch", price: 29999, image: "/smartwatch.webp", rating: 4.7, category: "electronics", brand: "Apple" },
    { id: 10, name: "Men Kurta Set", price: 1599, image: "/dress3.webp", rating: 4.2, category: "men", brand: "Raymond" },
  ];

  /* -------------------- FILTER LOGIC -------------------- */
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  /* -------------------- SORT -------------------- */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.id - a.id;
  });

  /* -------------------- PAGINATION -------------------- */
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-14">
        <h1 className="text-4xl font-bold text-center">Premium Collection</h1>
        <p className="text-center mt-3 text-blue-100">
          Best quality products at best prices
        </p>
      </div>

      {/* FILTER TOGGLE */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          <SlidersHorizontal size={18} />
          Filters
          {showFilters ? <ChevronUp /> : <ChevronDown />}
        </button>

        {/* FILTER PANEL */}
        {showFilters && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <div className="grid md:grid-cols-3 gap-4">

              {/* CATEGORY */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* PRICE */}
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([0, parseInt(e.target.value)])
                }
              />

              {/* SORT */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {paginatedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded"
            >
              Prev
            </button>

            <span className="px-4 py-2 font-semibold">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionPage;
