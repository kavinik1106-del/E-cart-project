# Cart & Order System Guide - Like Flipkart

## Overview
Your e-commerce application now has a complete cart system integrated with context API. When users click on a product or "Add to Cart", the product is automatically added to the cart and displayed on the Order Page.

---

## 🎯 How It Works

### 1. **Product Display & Linking**
All product pages (accessories.jsx, MenDress.jsx, WomenDress1.jsx, etc.) display products using the `ProductCard` component.

**Product Card Component** (`ProductCard.jsx`):
```jsx
import { useCart } from "./contexts/CartContext.jsx";

function ProductCard({ product, products = [], showRating = false }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1, selectedSize, "Default");
    navigate("/order");  // Navigate to order page
  };

  return (
    <Link to={`/product/${product.id}`}>
      {/* Product display */}
    </Link>
  );
}
```

### 2. **Product Detail Page** (`ProductDetailPage.jsx`)
When user clicks on a product card, they go to detailed view:
- View full product details
- Select size, color, quantity
- Add to cart button
- Rich tabs (Description, Specs, Reviews, Shipping)

```jsx
const handleAddToCart = () => {
  addToCart(product, quantity, selectedSize, selectedColor);
  navigate("/order");  // Adds to cart and redirects
};
```

### 3. **Cart Context** (`contexts/CartContext.jsx`)
Global state management for cart items. All cart operations happen here:

```jsx
const { addToCart, removeFromCart, updateQuantity, cart } = useCart();

// Add product to cart
addToCart(product, quantity, size, color);

// Remove product
removeFromCart(productId);

// Update quantity
updateQuantity(productId, newQuantity);

// Get all cart items
const cartItems = cart;
```

### 4. **Order Page** (`OrderPage.jsx`)
Displays:
- **Left side**: Suggested products (can be added to cart)
- **Right side**: Cart summary with items added from any page

When user adds product from anywhere → It appears on Order Page immediately!

```jsx
import { useCart } from "./contexts/CartContext.jsx";

function OrderPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  
  // Cart automatically shows items added from ProductCard or ProductDetailPage
  return (
    <div>
      {/* Show all cart items */}
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

---

## 📝 Complete Code Examples

### Example 1: Adding Product to Cart from Any Page

```jsx
import { useCart } from "./contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = {
    id: 1,
    name: "Awesome Dress",
    price: "₹999",
    image: "/dress.jpg"
  };

  const handleAddToCart = () => {
    // Add product with quantity 1, size M, default color
    addToCart(product, 1, "M", "Default");
    
    // Navigate to order page to show cart
    navigate("/order");
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

### Example 2: Display Cart Items on Order Page

```jsx
import { useCart } from "./contexts/CartContext.jsx";

function OrderPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate totals
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cart.reduce((sum, item) => sum + ((item.mrp - item.price) * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="md:col-span-2">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="border-b pb-4 mb-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
              <h3>{item.name}</h3>
              <p className="font-bold text-pink-600">₹{item.price}</p>
              
              {/* Quantity Controls */}
              <div className="flex gap-2 items-center">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)} className="text-red-600">
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span>₹{(total + discount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- ₹{discount.toLocaleString()}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Order Total</span>
            <span className="text-pink-600">₹{total.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full mt-4 bg-pink-600 text-white py-3 rounded-lg font-bold">
          Place Order
        </button>
      </div>
    </div>
  );
}
```

### Example 3: Product Data Structure

```jsx
const product = {
  id: 1,
  name: "Classic Chino",
  brand: "Premium Brand",
  category: "Pants",
  type: "Pant",
  price: "₹999",
  mrp: "₹1999",
  discount: 50,
  image: "/chino.jpg",
  rating: 4.5,
  reviews: 234,
  tag: "Bestseller",
  description: "Comfortable chino pants perfect for casual wear",
  material: "Cotton Blend",
  weight: "250g",
  
  // Size Guide (for clothing)
  sizeGuide: {
    S: { chest: "36 inches", length: "28 inches" },
    M: { chest: "38 inches", length: "29 inches" },
    L: { chest: "40 inches", length: "30 inches" },
    XL: { chest: "42 inches", length: "31 inches" }
  },

  // OR Shoe Guide (for footwear)
  shoeGuide: {
    "6": { eu: "39", inches: "8" },
    "7": { eu: "40", inches: "8.5" },
    "8": { eu: "41", inches: "9" },
    "9": { eu: "42", inches: "9.5" }
  },

  colors: ["Black", "Navy", "Khaki"],
};
```

---

## 🔄 Flow Diagram

```
User browses Products
        ↓
  Click on Product Card → ProductDetailPage (with more details)
        ↓
  Select Size/Color/Quantity
        ↓
  Click "Add to Cart" OR "Buy Now"
        ↓
  addToCart() called via Context
        ↓
  Cart stored in localStorage + Context State
        ↓
  Navigate to /order
        ↓
  Order Page displays all cart items
        ↓
  User can modify quantity or remove items
        ↓
  Order Summary updates in real-time
```

---

## 📂 File Structure

```
src/
├── contexts/
│   └── CartContext.jsx          ← Global cart state (ADD/REMOVE/UPDATE)
├── ProductCard.jsx              ← Displays product in grid
├── ProductDetailPage.jsx        ← Full product details page
├── OrderPage.jsx                ← Shows cart items + order summary
├── accessories.jsx              ← Product listing pages
├── MenDress.jsx
├── WomenDress1.jsx
├── HomePage.jsx
└── App.jsx                      ← Routes including /product/:id and /order
```

---

## 🚀 Key Features

✅ **Add to Cart** - From product card or detailed page
✅ **Display in Order Page** - Automatic display from context
✅ **Modify Quantity** - Increase/decrease from order page
✅ **Remove Items** - Remove individual items
✅ **Persistent Storage** - Saves to localStorage (survives refresh)
✅ **Real-time Updates** - All changes reflect instantly
✅ **Price Calculations** - Auto-calculate totals and discounts
✅ **Size/Color Selection** - Before adding to cart
✅ **Product Details** - Tabs for specs, care, reviews, shipping

---

## 💡 How to Add New Products

### Method 1: Add to existing category pages

Edit `accessories.jsx`, `MenDress.jsx`, etc:

```jsx
const products = [
  {
    id: 1,
    name: "Product Name",
    price: "₹999",
    image: "/image.jpg",
    brand: "Brand Name",
    category: "Category",
    rating: 4.5,
    // ... more properties
  },
  // Add more products
];
```

### Method 2: Create new product listing page

Create `NewCategory.jsx`:

```jsx
import ProductCard from "./ProductCard.jsx";

function NewCategory() {
  const products = [...]; // Your product array

  return (
    <section className="grid grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
```

Then add route in `App.jsx`:
```jsx
<Route path="/newcategory" element={<NewCategory />} />
```

---

## 🎨 Customization Tips

### Change Price Format
In OrderPage.jsx:
```jsx
// Change from ₹ to $ or other currency
<span>₹{total.toLocaleString()}</span>
// To:
<span>${(total / 80).toFixed(2)}</span>
```

### Change Colors
```jsx
// Replace all "pink-600" with your brand color
// bg-pink-600 → bg-blue-600
// text-pink-600 → text-blue-600
```

### Add Product Filters
In any product listing page:
```jsx
const [selectedCategory, setSelectedCategory] = useState("All");

const filtered = products.filter(p => 
  selectedCategory === "All" ? true : p.category === selectedCategory
);
```

---

## ✅ Everything is Working!

Your application now has:
- ✅ Product display system
- ✅ Detailed product page
- ✅ Cart management with Context API
- ✅ Order page showing cart items
- ✅ Real-time cart updates
- ✅ LocalStorage persistence
- ✅ Automatic redirect to order page after adding

**App is running on:** http://localhost:5177

You can now:
1. Browse products
2. Click on any product to see details
3. Add to cart
4. See items in Order page
5. Modify quantities
6. Remove items

Everything works like Flipkart! 🎉
