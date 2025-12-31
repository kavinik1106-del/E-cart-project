import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import { apiCall, API_ENDPOINTS } from "./config/apiConfig.js";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Mock products data as fallback
  const mockProducts = [
    { id: 1, name: "Premium Double Door Fridge", price: 18999, mrp: 22999, image: "/doubledoorfringe.avif", rating: 4.4, reviews: 234, category: "home", brand: "Samsung", discount: 15 },
    { id: 2, name: "Premium Cashew Nuts 500g", price: 699, mrp: 899, image: "/cashew.webp", rating: 4.2, reviews: 156, category: "food", brand: "NutriLife", discount: 22 },
    { id: 3, name: "Luxury Blue Sofa Set", price: 14999, mrp: 18999, image: "/bluesofa.webp", rating: 4.5, reviews: 89, category: "home", brand: "Ikea", discount: 21 },
    { id: 4, name: "Designer Red Kurta", price: 1299, mrp: 1799, image: "/dress1.webp", rating: 4.1, reviews: 67, category: "women", brand: "FabIndia", discount: 28 },
    { id: 5, name: "Modern Sofa Chair", price: 9999, mrp: 12999, image: "/sofa.webp", rating: 4.3, reviews: 123, category: "home", brand: "Godrej", discount: 23 },
    { id: 6, name: "iPhone 15 Pro Max", price: 12499, mrp: 13999, image: "/mobile.jpg", rating: 4.6, reviews: 445, category: "electronics", brand: "Apple", discount: 11 },
    { id: 7, name: "Organic Dates 1kg", price: 399, mrp: 499, image: "/dates.jpg", rating: 4.0, reviews: 78, category: "food", brand: "Organic Farms", discount: 20 },
    { id: 8, name: "Silk Wedding Saree", price: 1899, mrp: 2499, image: "/saree2.jpg", rating: 4.3, reviews: 156, category: "women", brand: "Kanchipuram", discount: 24 },
    { id: 9, name: "Apple Watch Series 9", price: 2999, mrp: 3499, image: "/smartwatch.webp", rating: 4.7, reviews: 312, category: "electronics", brand: "Apple", discount: 14 },
    { id: 10, name: "Cotton Kurta Set", price: 1599, mrp: 1999, image: "/dress3.webp", rating: 4.2, reviews: 98, category: "men", brand: "Raymond", discount: 20 },
    { id: 11, name: "MacBook Pro 16\"", price: 199999, mrp: 229999, image: "/laptop.webp", rating: 4.8, reviews: 67, category: "electronics", brand: "Apple", discount: 13 },
    { id: 12, name: "Nike Air Max Shoes", price: 8999, mrp: 11999, image: "/footk.jpg", rating: 4.5, reviews: 234, category: "men", brand: "Nike", discount: 25 },
    { id: 13, name: "Samsung 4K TV 55\"", price: 45999, mrp: 54999, image: "/OIP (4).webp", rating: 4.6, reviews: 189, category: "electronics", brand: "Samsung", discount: 16 },
    { id: 14, name: "Designer Kurta", price: 15999, mrp: 19999, image: "/blue.webp", rating: 4.7, reviews: 145, category: "women", brand: "Manish Malhotra", discount: 20 },
    { id: 15, name: "Coffee Maker", price: 3499, mrp: 4499, image: "/OIP (5).webp", rating: 4.3, reviews: 87, category: "home", brand: "Philips", discount: 22 },
    { id: 16, name: "Wireless Headphones", price: 4999, mrp: 6999, image: "/noicehead.jpg", rating: 4.4, reviews: 203, category: "electronics", brand: "Sony", discount: 28 },
    { id: 17, name: "Wooden Dining Table", price: 12999, mrp: 16999, image: "/plates.jpg", rating: 4.6, reviews: 112, category: "home", brand: "Hometown", discount: 24 },
    { id: 18, name: "Men's Formal Shirt", price: 899, mrp: 1299, image: "/sherwa.webp", rating: 4.2, reviews: 156, category: "men", brand: "Celio", discount: 31 },
    { id: 19, name: "Women's Sports Shoes", price: 3499, mrp: 4999, image: "/footw.jpg", rating: 4.5, reviews: 178, category: "women", brand: "Puma", discount: 30 },
    { id: 20, name: "Organic Spices Mix", price: 249, mrp: 399, image: "/masala.webp", rating: 4.3, reviews: 67, category: "food", brand: "NatureLeaf", discount: 38 },
    { id: 21, name: "Kids Clothing Set", price: 699, mrp: 999, image: "/kid1.webp", rating: 4.4, reviews: 89, category: "kids", brand: "PlayKids", discount: 30 },
    { id: 22, name: "Gold Bracelet", price: 2999, mrp: 4999, image: "/bracelet.webp", rating: 4.6, reviews: 234, category: "accessories", brand: "Tanishq", discount: 40 },
    { id: 23, name: "Wall Clock", price: 599, mrp: 899, image: "/desklamp.jpg", rating: 4.2, reviews: 123, category: "home", brand: "Modern Decor", discount: 33 },
    { id: 24, name: "Denim Jeans", price: 1199, mrp: 1799, image: "/denim.webp", rating: 4.3, reviews: 198, category: "men", brand: "Levi's", discount: 33 },
    { id: 25, name: "Flower Pot Set", price: 799, mrp: 1199, image: "/flower.webp", rating: 4.5, reviews: 76, category: "home", brand: "GreenHome", discount: 33 },
    { id: 26, name: "Keyboard & Mouse", price: 1599, mrp: 2499, image: "/keyboard.jpg", rating: 4.4, reviews: 145, category: "electronics", brand: "Logitech", discount: 36 },
    { id: 27, name: "Red Saree", price: 2499, mrp: 3999, image: "/redsaree.jpg", rating: 4.6, reviews: 267, category: "women", brand: "Silk Saree", discount: 37 },
    { id: 28, name: "Electric Fan", price: 1299, mrp: 1899, image: "/fan.jpg", rating: 4.3, reviews: 134, category: "home", brand: "Usha", discount: 31 },
    { id: 29, name: "Hair Clip Set", price: 349, mrp: 599, image: "/hairclip.jpg", rating: 4.4, reviews: 87, category: "accessories", brand: "HairStyle", discount: 42 },
    { id: 30, name: "Walnuts 250g", price: 299, mrp: 499, image: "/walnut.jpg", rating: 4.5, reviews: 156, category: "food", brand: "NutriLife", discount: 40 },
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiCall(API_ENDPOINTS.PRODUCTS);
        if (response.success && response.data && response.data.length > 0) {
          const transformedProducts = response.data.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.mrp || product.price * 1.2,
            image: product.image || "/placeholder.jpg",
            rating: 4.5,
            reviews: Math.floor(Math.random() * 200) + 50,
            tag: product.stock_quantity > 10 ? "In Stock" : "Limited",
            brand: product.brand || product.category || "Brand",
            discount: Math.floor(Math.random() * 30) + 10,
            colors: ["Default"],
            sizeGuide: { S: {}, M: {}, L: {}, XL: {} },
            category: product.category || "general"
          }));
          setProducts(transformedProducts);
        } else {
          setProducts(mockProducts);
        }
      } catch (err) {
        console.error("Error fetching products from API, using mock data:", err);
        setProducts(mockProducts);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products based on search query
  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      setLoading(false);
      return;
    }

    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.toLowerCase().includes(query.toLowerCase())
    );

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply price range filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseInt(priceRange.max));
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setLoading(false);
  }, [query, products, sortBy, priceRange, selectedCategory]);

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Search className="w-5 h-5 text-gray-400" />
            <h1 className="text-xl font-semibold text-gray-800">
              Search Results for "{query}"
            </h1>
            <span className="text-sm text-gray-500">
              ({filteredProducts.length} results)
            </span>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="discount">Discount</option>
            </select>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    placeholder="0"
                    className="w-full bg-white border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    placeholder="No limit"
                    className="w-full bg-white border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;