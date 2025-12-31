-- Create products table for admin dashboard
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  mrp DECIMAL(10, 2),
  category VARCHAR(100),
  image VARCHAR(255),
  stock_quantity INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_is_active (is_active)
);

-- Insert sample products for testing
INSERT INTO products (name, description, price, mrp, category, image, stock_quantity) VALUES
('Premium Sofa Set', 'Comfortable 3-seater sofa with premium fabric upholstery', 12000, 28000, 'Furniture', '/bluesofa.webp', 10),
('Red Party Dress', 'Elegant party wear dress perfect for special occasions', 1500, 2200, 'Clothing', '/dress1.webp', 25),
('Premium Cashew Nuts', 'Fresh and healthy premium quality cashews', 800, 1200, 'Food', '/cashew.webp', 50),
('Formal Suit', 'Premium formal suit for business meetings', 3500, 5000, 'Clothing', '/formalsuit.avif', 15),
('Cotton T-Shirt', 'Comfortable cotton t-shirt for daily wear', 800, 1200, 'Clothing', '/men1.avif', 30),
('Denim Jeans', 'Classic denim jeans with perfect fit', 1500, 2200, 'Clothing', '/chino.avif', 20),
('Casual Dress', 'Stylish casual dress for everyday wear', 1200, 1800, 'Clothing', '/pinkdress.avif', 18),
('Sports Shoes', 'Comfortable sports shoes for running', 2500, 3500, 'Footwear', '/shorts.avif', 12);