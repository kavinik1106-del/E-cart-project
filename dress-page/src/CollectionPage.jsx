
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  X
} from "lucide-react";

function CollectionPage() {
  /* ---------- STATE ---------- */
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* ---------- CATEGORIES ---------- */
  const categories = [
    { id: "electronics", name: "Electronics", image: "/mobile.jpg", count: 245 },
    { id: "women", name: "Women Dresses", image: "/dress1.webp", count: 189 },
    { id: "men", name: "Men Dresses", image: "/men2.jpg", count: 156 },
    { id: "vegetables", name: "Vegetables", image: "/veg2.webp", count: 98 },
    { id: "home", name: "Home Appliances", image: "/OIP (1).jpg", count: 134 },
    { id: "kids", name: "Kids Wear", image: "/OIP (1).webp", count: 87 },
    { id: "footwear", name: "Footwear", image: "/OIP (2).webp", count: 203 },
    { id: "accessories", name: "Accessories", image: "/acces.jpg", count: 167 },
  ];

  /* ---------- PRODUCTS ---------- */
  const allProducts = [
    { id: 1, name: "Premium Double Door Fridge", price: 18999, mrp: 22999, image: "/doubledoorfringe.avif", rating: 4.4, reviews: 234, category: "home", brand: "Samsung", discount: 15 },
    { id: 2, name: "Premium Cashew Nuts 500g", price: 699, mrp: 899, image: "/cashew.webp", rating: 4.2, reviews: 156, category: "vegetables", brand: "NutriLife", discount: 22 },
    { id: 3, name: "Luxury Blue Sofa Set", price: 14999, mrp: 18999, image: "/bluesofa.webp", rating: 4.5, reviews: 89, category: "home", brand: "Ikea", discount: 21 },
    { id: 4, name: "Designer Red Kurta", price: 1299, mrp: 1799, image: "/dress1.webp", rating: 4.1, reviews: 67, category: "women", brand: "FabIndia", discount: 28 },
    { id: 5, name: "Modern Sofa Chair", price: 9999, mrp: 12999, image: "/sofa.webp", rating: 4.3, reviews: 123, category: "home", brand: "Godrej", discount: 23 },
    { id: 6, name: "iPhone 15 Pro Max", price: 12499, mrp: 13999, image: "/mobile.jpg", rating: 4.6, reviews: 445, category: "electronics", brand: "Apple", discount: 11 },
    { id: 7, name: "Organic Dates 1kg", price: 399, mrp: 499, image: "/dates.jpg", rating: 4.0, reviews: 78, category: "vegetables", brand: "Organic Farms", discount: 20 },
    { id: 8, name: "Silk Wedding Saree", price: 1899, mrp: 2499, image: "/saree2.jpg", rating: 4.3, reviews: 156, category: "women", brand: "Kanchipuram", discount: 24 },
    { id: 9, name: "Apple Watch Series 9", price: 2999, mrp: 3499, image: "/smartwatch.webp", rating: 4.7, reviews: 312, category: "electronics", brand: "Apple", discount: 14 },
    { id: 10, name: "Cotton Kurta Set", price: 1599, mrp: 1999, image: "/dress3.webp", rating: 4.2, reviews: 98, category: "men", brand: "Raymond", discount: 20 },
    { id: 11, name: "MacBook Pro 16\"", price: 199999, mrp: 229999, image: "/laptop.webp", rating: 4.8, reviews: 67, category: "electronics", brand: "Apple", discount: 13 },
    { id: 12, name: "Nike Air Max Shoes", price: 8999, mrp: 11999, image: "/footk.jpg", rating: 4.5, reviews: 234, category: "footwear", brand: "Nike", discount: 25 },
    { id: 13, name: "Samsung 4K TV 55\"", price: 45999, mrp: 54999, image: "/OIP (4).webp", rating: 4.6, reviews: 189, category: "electronics", brand: "Samsung", discount: 16 },
    { id: 14, name: "Designer Kurta", price: 15999, mrp: 19999, image: "/blue.webp", rating: 4.7, reviews: 145, category: "women", brand: "Manish Malhotra", discount: 20 },
    { id: 15, name: "Coffee Maker", price: 3499, mrp: 4499, image: "/OIP (5).webp", rating: 4.3, reviews: 87, category: "home", brand: "Philips", discount: 22 },
    { id: 16, name: "Wireless Headphones", price: 4999, mrp: 6999, image: "/noicehead.jpg", rating: 4.4, reviews: 203, category: "electronics", brand: "Sony", discount: 28 },
    { id: 17, name: "Wooden Dining Table", price: 12999, mrp: 16999, image: "/plates.jpg", rating: 4.6, reviews: 112, category: "home", brand: "Hometown", discount: 24 },
    { id: 18, name: "Men's Formal Shirt", price: 899, mrp: 1299, image: "/sherwa.webp", rating: 4.2, reviews: 156, category: "men", brand: "Celio", discount: 31 },
    { id: 19, name: "Women's Sports Shoes", price: 3499, mrp: 4999, image: "/footw.jpg", rating: 4.5, reviews: 178, category: "footwear", brand: "Puma", discount: 30 },
    { id: 20, name: "Organic Spices Mix", price: 249, mrp: 399, image: "/masala.webp", rating: 4.3, reviews: 67, category: "vegetables", brand: "NatureLeaf", discount: 38 },
    { id: 21, name: "Kids Clothing Set", price: 699, mrp: 999, image: "/kid1.webp", rating: 4.4, reviews: 89, category: "kids", brand: "PlayKids", discount: 30 },
    { id: 22, name: "Gold Bracelet", price: 2999, mrp: 4999, image: "/bracelet.webp", rating: 4.6, reviews: 234, category: "accessories", brand: "Tanishq", discount: 40 },
    { id: 23, name: "Wall Clock", price: 599, mrp: 899, image: "/desklamp.jpg", rating: 4.2, reviews: 123, category: "home", brand: "Modern Decor", discount: 33 },
    { id: 24, name: "Denim Jeans", price: 1199, mrp: 1799, image: "/denim.webp", rating: 4.3, reviews: 198, category: "men", brand: "Levi's", discount: 33 },
    { id: 25, name: "Flower Pot Set", price: 799, mrp: 1199, image: "/flower.webp", rating: 4.5, reviews: 76, category: "home", brand: "GreenHome", discount: 33 },
    { id: 26, name: "Keyboard & Mouse", price: 1599, mrp: 2499, image: "/keyboard.jpg", rating: 4.4, reviews: 145, category: "electronics", brand: "Logitech", discount: 36 },
    { id: 27, name: "Red Saree", price: 2499, mrp: 3999, image: "/redsaree.jpg", rating: 4.6, reviews: 267, category: "women", brand: "Silk Saree", discount: 37 },
    { id: 28, name: "Electric Fan", price: 1299, mrp: 1899, image: "/fan.jpg", rating: 4.3, reviews: 134, category: "home", brand: "Usha", discount: 31 },
    { id: 29, name: "Hair Clip Set", price: 349, mrp: 599, image: "/hairclip.jpg", rating: 4.4, reviews: 87, category: "accessories", brand: "HairStyle", discount: 42 },
    { id: 30, name: "Walnuts 250g", price: 299, mrp: 499, image: "/walnut.jpg", rating: 4.5, reviews: 156, category: "vegetables", brand: "NutriLife", discount: 40 },
    { id: 31, name: "Black Formal Saree", price: 3499, mrp: 4999, image: "/redsaree.jpg", rating: 4.5, reviews: 178, category: "women", brand: "Silk Saree", discount: 30 },
    { id: 32, name: "Studio Headphones Pro", price: 7999, mrp: 11999, image: "/noicehead.jpg", rating: 4.7, reviews: 298, category: "electronics", brand: "Sony", discount: 33 },
    { id: 33, name: "Smart Watch Ultra", price: 19999, mrp: 29999, image: "/smartwatch.webp", rating: 4.6, reviews: 267, category: "electronics", brand: "Samsung", discount: 33 },
    { id: 34, name: "Premium Almond Oil", price: 599, mrp: 899, image: "/cashew.webp", rating: 4.4, reviews: 145, category: "vegetables", brand: "NutriLife", discount: 33 },
    { id: 35, name: "Casual T-Shirt Men", price: 599, mrp: 999, image: "/sherwa.webp", rating: 4.3, reviews: 124, category: "men", brand: "Celio", discount: 40 },
    { id: 36, name: "Running Shoes Women", price: 4999, mrp: 7499, image: "/footw.jpg", rating: 4.6, reviews: 203, category: "footwear", brand: "Puma", discount: 33 },
    { id: 37, name: "LED Table Lamp", price: 1299, mrp: 1999, image: "/desklamp.jpg", rating: 4.4, reviews: 98, category: "home", brand: "Modern Decor", discount: 35 },
    { id: 38, name: "Silk Scarf Set", price: 799, mrp: 1299, image: "/bracelet.webp", rating: 4.5, reviews: 87, category: "accessories", brand: "Tanishq", discount: 38 },
    { id: 39, name: "Kids Winter Jacket", price: 1499, mrp: 2299, image: "/kid1.webp", rating: 4.3, reviews: 76, category: "kids", brand: "PlayKids", discount: 35 },
    { id: 40, name: "Organic Honey 500ml", price: 449, mrp: 699, image: "/masala.webp", rating: 4.5, reviews: 156, category: "vegetables", brand: "NatureLeaf", discount: 36 },
    { id: 41, name: "Premium Bed Sheet Set", price: 2499, mrp: 3999, image: "/flower.webp", rating: 4.4, reviews: 134, category: "home", brand: "Hometown", discount: 37 },
    { id: 42, name: "Camera HD 4K", price: 35999, mrp: 49999, image: "/OIP (4).webp", rating: 4.7, reviews: 289, category: "electronics", brand: "Samsung", discount: 28 },
    { id: 43, name: "Women's Lehenga", price: 4999, mrp: 7499, image: "/dress1.webp", rating: 4.5, reviews: 201, category: "women", brand: "FabIndia", discount: 33 },
    { id: 44, name: "Men's Blazer", price: 5499, mrp: 8999, image: "/sherwa.webp", rating: 4.4, reviews: 167, category: "men", brand: "Celio", discount: 39 },
    { id: 45, name: "Casual Canvas Shoes", price: 1999, mrp: 3499, image: "/footk.jpg", rating: 4.6, reviews: 245, category: "footwear", brand: "Nike", discount: 43 },
    { id: 46, name: "Decorative Mirror", price: 1999, mrp: 2999, image: "/desklamp.jpg", rating: 4.3, reviews: 112, category: "home", brand: "Modern Decor", discount: 33 },
    { id: 47, name: "Pearl Necklace Set", price: 3999, mrp: 5999, image: "/bracelet.webp", rating: 4.6, reviews: 198, category: "accessories", brand: "Tanishq", discount: 33 },
    { id: 48, name: "Kids Books Collection", price: 599, mrp: 999, image: "/kid1.webp", rating: 4.4, reviews: 89, category: "kids", brand: "PlayKids", discount: 40 },
    { id: 49, name: "Organic Tea Mix", price: 399, mrp: 599, image: "/masala.webp", rating: 4.5, reviews: 134, category: "vegetables", brand: "NatureLeaf", discount: 33 },
    { id: 50, name: "Cushion Set 4 Pcs", price: 2299, mrp: 3499, image: "/flower.webp", rating: 4.3, reviews: 101, category: "home", brand: "GreenHome", discount: 34 },
    { id: 51, name: "iPhone 15 Pro", price: 11499, mrp: 12999, image: "/mobile.jpg", rating: 4.7, reviews: 512, category: "electronics", brand: "Apple", discount: 12 },
    { id: 52, name: "Salwar Kameez Set", price: 1999, mrp: 2999, image: "/dress1.webp", rating: 4.4, reviews: 143, category: "women", brand: "FabIndia", discount: 33 },
    { id: 53, name: "Cotton Shirt Bundle", price: 2999, mrp: 4499, image: "/sherwa.webp", rating: 4.3, reviews: 178, category: "men", brand: "Celio", discount: 33 },
    { id: 54, name: "Sports Sneakers", price: 2999, mrp: 4999, image: "/footw.jpg", rating: 4.5, reviews: 212, category: "footwear", brand: "Puma", discount: 40 },
    { id: 55, name: "Night Lamp Ambient", price: 1899, mrp: 2999, image: "/desklamp.jpg", rating: 4.4, reviews: 156, category: "home", brand: "Modern Decor", discount: 37 },
    { id: 56, name: "Handbag Sling", price: 1299, mrp: 1999, image: "/bracelet.webp", rating: 4.3, reviews: 98, category: "accessories", brand: "HairStyle", discount: 35 },
    { id: 57, name: "Kids Shoes Casual", price: 999, mrp: 1599, image: "/kid1.webp", rating: 4.4, reviews: 112, category: "kids", brand: "PlayKids", discount: 38 },
    { id: 58, name: "Dry Fruits Mix 1kg", price: 1099, mrp: 1699, image: "/walnut.jpg", rating: 4.5, reviews: 189, category: "vegetables", brand: "NutriLife", discount: 35 },
    { id: 59, name: "Outdoor Picnic Set", price: 3499, mrp: 5499, image: "/plates.jpg", rating: 4.4, reviews: 134, category: "home", brand: "Hometown", discount: 36 },
    { id: 60, name: "Portable Speaker Bluetooth", price: 3999, mrp: 5999, image: "/noicehead.jpg", rating: 4.6, reviews: 278, category: "electronics", brand: "Sony", discount: 33 },
  ];

  /* ---------- FILTER & SORT ---------- */
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.id - a.id;
  });


  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Check scroll position for category buttons
  useEffect(() => {
    const el = scrollRef.current;
    const checkScroll = () => {
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(
        el.scrollLeft < el.scrollWidth - el.clientWidth
      );
    };
    checkScroll();
    el?.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 300;
    if (direction === "left") {
      el.scrollLeft -= scrollAmount;
    } else {
      el.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />


      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">Explore All Products</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Discover our complete collection of premium products across all categories
          </p>
        </div>
      </div>

      {/* Categories Section - Like HomePage */}
      <section className="bg-white mt-2 p-4 sticky top-16 z-40 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-lg mb-3">Shop by Category</h2>
          <div className="relative flex items-center">
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth px-8"
              style={{ scrollBehavior: "smooth" }}
            >
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
                className={`text-center min-w-[90px] flex-shrink-0 cursor-pointer transition-all ${
                  selectedCategory === "all" ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                <div className={`w-20 h-20 mx-auto rounded-full border-4 flex items-center justify-center text-2xl ${
                  selectedCategory === "all" 
                    ? "border-blue-600 bg-blue-50" 
                    : "border-gray-300 bg-gray-50 hover:border-blue-400"
                }`}>
                  🏪
                </div>
                <p className="text-xs mt-2 font-medium">All</p>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`text-center min-w-[90px] flex-shrink-0 cursor-pointer transition-all ${
                    selectedCategory === cat.id ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className={`w-20 h-20 mx-auto rounded-full border-4 overflow-hidden flex items-center justify-center bg-gray-100 ${
                    selectedCategory === cat.id 
                      ? "border-blue-600" 
                      : "border-gray-300 hover:border-blue-400"
                  }`}>
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs mt-2 font-medium line-clamp-2">{cat.name}</p>
                </button>
              ))}
            </div>
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === "all"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedCategory === cat.id
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full justify-center"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showFilters && (
                <div className="mt-4 p-4 bg-white rounded-lg border space-y-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              )}
            </div>

            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === "all" ? "All Products" : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{filteredProducts.length} results found</p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="hidden md:block p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} showRating={true} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12 gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 border rounded-lg ${
                            currentPage === pageNum
                              ? "bg-blue-500 text-white border-blue-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
