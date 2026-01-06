import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// List of 50 products with details
const productsData = [
  // Electronics
  { name: 'Premium Sofa Set', category: 'Furniture', price: 12000, mrp: 28000, image: '/bluesofa.webp', description: 'Comfortable 3-seater sofa with premium fabric upholstery' },
  { name: 'Modern Bookshelf', category: 'Furniture', price: 5999, mrp: 12999, image: '/whiteboard.jpg', description: 'Elegant wooden bookshelf with multiple shelves' },
  { name: 'Wooden Dining Table', category: 'Furniture', price: 18999, mrp: 45000, image: '/plates.jpg', description: 'Solid wood dining table for 6 people' },
  { name: 'Office Chair', category: 'Furniture', price: 7999, mrp: 18999, image: '/seat.jpg', description: 'Ergonomic office chair with back support' },
  { name: 'Desk Lamp', category: 'Electronics', price: 1299, mrp: 3999, image: '/desklamp.jpg', description: 'LED desk lamp with adjustable brightness' },
  { name: 'Smart Watch', category: 'Electronics', price: 4999, mrp: 12999, image: '/smartwatch.webp', description: 'Smart watch with fitness tracking' },
  { name: 'Wireless Headphones', category: 'Electronics', price: 2999, mrp: 7999, image: '/headphone.webp', description: 'Noise-cancelling wireless headphones' },
  { name: 'USB-C Charging Hub', category: 'Electronics', price: 1499, mrp: 4999, image: '/chargerhub.jpg', description: 'Multi-port USB charging hub' },
  { name: 'Mechanical Keyboard', category: 'Electronics', price: 3499, mrp: 8999, image: '/keyboard.jpg', description: 'RGB mechanical gaming keyboard' },
  { name: 'Laptop Stand', category: 'Electronics', price: 999, mrp: 2999, image: '/laptopstand.jpg', description: 'Aluminum laptop stand for better posture' },

  // Clothing
  { name: 'Blue Casual Dress', category: 'Clothing', price: 899, mrp: 2599, image: '/blue.webp', description: 'Stylish blue casual dress for everyday wear' },
  { name: 'Cotton T-Shirt', category: 'Clothing', price: 299, mrp: 599, image: '/white.webp', description: 'Premium cotton t-shirt in multiple colors' },
  { name: 'Summer Dress', category: 'Clothing', price: 1299, mrp: 3999, image: '/dress1.webp', description: 'Light and breathable summer dress' },
  { name: 'Denim Jeans', category: 'Clothing', price: 1599, mrp: 4999, image: '/denim.webp', description: 'Classic blue denim jeans for men and women' },
  { name: 'Formal Suit', category: 'Clothing', price: 4999, mrp: 12999, image: '/formalsuit.avif', description: 'Premium formal suit for office and events' },
  { name: 'Winter Jacket', category: 'Clothing', price: 2499, mrp: 6999, image: '/winter.webp', description: 'Warm winter jacket with insulation' },
  { name: 'Sports Shorts', category: 'Clothing', price: 599, mrp: 1999, image: '/shorts.avif', description: 'Comfortable sports shorts for gym' },
  { name: 'Saree', category: 'Clothing', price: 1999, mrp: 5999, image: '/redsaree.jpg', description: 'Traditional silk saree for special occasions' },
  { name: 'Kurta', category: 'Clothing', price: 899, mrp: 2999, image: '/kurta.jpg', description: 'Traditional kurta for men' },
  { name: 'Lehenga Choli', category: 'Clothing', price: 2999, mrp: 8999, image: '/halfsaree.webp', description: 'Traditional lehenga choli for festivals' },

  // Footwear
  { name: 'Casual Sneakers', category: 'Footwear', price: 1999, mrp: 5999, image: '/footk.jpg', description: 'Comfortable casual sneakers for daily wear' },
  { name: 'Sports Running Shoes', category: 'Footwear', price: 2499, mrp: 6999, image: '/footm.jpg', description: 'Professional running shoes with cushioning' },
  { name: 'Formal Shoes', category: 'Footwear', price: 2999, mrp: 7999, image: '/footw.jpg', description: 'Elegant formal shoes for office' },
  { name: 'Slippers', category: 'Footwear', price: 399, mrp: 999, image: '/slipper.jpg', description: 'Comfortable home slippers' },
  { name: 'Sandals', category: 'Footwear', price: 599, mrp: 1999, image: '/footk1.jpg', description: 'Summer sandals for men' },

  // Beauty & Personal Care
  { name: 'Lipstick Set', category: 'Beauty', price: 699, mrp: 1999, image: '/lipstick.jpg', description: 'Matte lipstick in 5 shades' },
  { name: 'Face Powder', category: 'Beauty', price: 399, mrp: 999, image: '/powder.jpg', description: 'Translucent face powder for all skin types' },
  { name: 'Eye Liner', category: 'Beauty', price: 299, mrp: 799, image: '/eyeliner.jpg', description: 'Waterproof eye liner pencil' },
  { name: 'Hair Clips Set', category: 'Beauty', price: 499, mrp: 1499, image: '/hairclip.jpg', description: 'Stylish hair clips set' },
  { name: 'Eye Mask', category: 'Beauty', price: 199, mrp: 599, image: '/eyemask.jpg', description: 'Gel eye mask for under eye care' },

  // Kitchen & Appliances
  { name: 'Kitchen Trolley', category: 'Kitchen', price: 3499, mrp: 8999, image: '/timer.jpg', description: 'Stainless steel kitchen trolley' },
  { name: 'Glass Water Bottle', category: 'Kitchen', price: 599, mrp: 1999, image: '/waterbottle.jpg', description: 'Eco-friendly glass water bottle' },
  { name: 'Plates Set', category: 'Kitchen', price: 1299, mrp: 3999, image: '/plates.jpg', description: '12-piece ceramic plates set' },
  { name: 'Table Fan', category: 'Appliances', price: 2999, mrp: 7999, image: '/fan.jpg', description: 'Powerful table fan with 3 speeds' },
  { name: 'Mini Printer', category: 'Appliances', price: 4999, mrp: 9999, image: '/printermini.jpg', description: 'Portable mini photo printer' },
  { name: 'Projector', category: 'Appliances', price: 12999, mrp: 29999, image: '/projector.jpg', description: 'HD projector for home theater' },

  // Jewelry & Accessories
  { name: 'Gold Ring', category: 'Jewelry', price: 4999, mrp: 12999, image: '/ring.jpg', description: 'Elegant gold ring with stone' },
  { name: 'Silver Bracelet', category: 'Jewelry', price: 1999, mrp: 5999, image: '/bracelet.webp', description: 'Classic silver bracelet' },
  { name: 'Chain Necklace', category: 'Jewelry', price: 2999, mrp: 8999, image: '/chain.jpg', description: 'Long chain necklace in gold' },
  { name: 'Watch', category: 'Accessories', price: 3999, mrp: 9999, image: '/watch.jpg', description: 'Stylish analog watch' },
  { name: 'Bag', category: 'Accessories', price: 1499, mrp: 4999, image: '/bag.jpg', description: 'Durable travel backpack' },

  // Home & Garden
  { name: 'Tubelight', category: 'Home', price: 399, mrp: 999, image: '/tubelight.webp', description: 'LED tube light for home' },
  { name: 'Whiteboard', category: 'Home', price: 699, mrp: 1999, image: '/whiteboard.jpg', description: 'Wall mounted whiteboard' },
  { name: 'Flower Pot', category: 'Garden', price: 299, mrp: 799, image: '/flower.webp', description: 'Ceramic flower pot for plants' },
  { name: 'Indoor Plant', category: 'Garden', price: 499, mrp: 1499, image: '/flower.webp', description: 'Beautiful indoor plant with pot' },
];

async function insertProducts() {
  const connection = await pool.getConnection();
  
  try {
    console.log('🔄 Starting product insertion...\n');
    
    // First, let's check existing products
    const [existing] = await connection.query('SELECT COUNT(*) as count FROM products');
    console.log(`📊 Current products in database: ${existing[0].count}`);
    
    let insertedCount = 0;
    let errorCount = 0;

    for (const product of productsData) {
      try {
        const query = `
          INSERT INTO products (name, description, price, mrp, category, image, stock_quantity, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        `;
        
        await connection.query(query, [
          product.name,
          product.description,
          product.price,
          product.mrp,
          product.category,
          product.image,
          Math.floor(Math.random() * 50) + 5  // Random stock between 5-55
        ]);
        
        insertedCount++;
        console.log(`✅ [${insertedCount}] ${product.name} - ${product.category}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error inserting ${product.name}:`, error.message);
      }
    }

    // Check final count
    const [final] = await connection.query('SELECT COUNT(*) as count FROM products');
    
    console.log('\n' + '='.repeat(60));
    console.log('📈 INSERTION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully inserted: ${insertedCount} products`);
    console.log(`❌ Failed: ${errorCount} products`);
    console.log(`📊 Total products in database: ${final[0].count}`);
    console.log('='.repeat(60) + '\n');
    
    // List all categories
    const [categories] = await connection.query(`
      SELECT category, COUNT(*) as count 
      FROM products 
      GROUP BY category 
      ORDER BY count DESC
    `);
    
    console.log('📂 PRODUCTS BY CATEGORY:');
    categories.forEach(cat => {
      console.log(`   ${cat.category}: ${cat.count} products`);
    });
    
  } catch (error) {
    console.error('💥 Error:', error);
  } finally {
    await connection.release();
    await pool.end();
    process.exit(0);
  }
}

// Run the script
console.log('🚀 Product Insertion Script Started\n');
insertProducts().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
