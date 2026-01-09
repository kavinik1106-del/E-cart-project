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

// Map of product names to image paths
const imageMap = {
  'Premium Sofa Set': '/bluesofa.webp',
  'Modern Bookshelf': '/whiteboard.jpg',
  'Wooden Dining Table': '/plates.jpg',
  'Office Chair': '/seat.jpg',
  'Desk Lamp': '/desklamp.jpg',
  'Smart Watch': '/smartwatch.webp',
  'Wireless Headphones': '/headphone.webp',
  'USB-C Charging Hub': '/chargerhub.jpg',
  'Mechanical Keyboard': '/keyboard.jpg',
  'Laptop Stand': '/laptopstand.jpg',
  'Blue Casual Dress': '/blue.webp',
  'Cotton T-Shirt': '/white.webp',
  'Summer Dress': '/dress1.webp',
  'Denim Jeans': '/denim.webp',
  'Formal Suit': '/formalsuit.avif',
  'Winter Jacket': '/winter.webp',
  'Sports Shorts': '/shorts.avif',
  'Saree': '/redsaree.jpg',
  'Kurta': '/kurta.jpg',
  'Lehenga Choli': '/halfsaree.webp',
  'Casual Sneakers': '/footk.jpg',
  'Sports Running Shoes': '/footm.jpg',
  'Formal Shoes': '/footw.jpg',
  'Slippers': '/slipper.jpg',
  'Sandals': '/footk1.jpg',
  'Lipstick Set': '/lipstick.jpg',
  'Face Powder': '/powder.jpg',
  'Eye Liner': '/eyeliner.jpg',
  'Hair Clips Set': '/hairclip.jpg',
  'Eye Mask': '/eyemask.jpg',
  'Kitchen Trolley': '/timer.jpg',
  'Glass Water Bottle': '/waterbottle.jpg',
  'Plates Set': '/plates.jpg',
  'Table Fan': '/fan.jpg',
  'Mini Printer': '/printermini.jpg',
  'Projector': '/projector.jpg',
  'Gold Ring': '/ring.jpg',
  'Silver Bracelet': '/bracelet.webp',
  'Chain Necklace': '/chain.jpg',
  'Watch': '/watch.jpg',
  'Bag': '/bag.jpg',
  'Tubelight': '/tubelight.webp',
  'Whiteboard': '/whiteboard.jpg',
  'Flower Pot': '/flower.webp',
  'Indoor Plant': '/flower.webp',
};

async function updateProductImages() {
  const connection = await pool.getConnection();
  
  try {
    console.log('🖼️  Starting product image update...\n');
    
    let updatedCount = 0;
    let errorCount = 0;

    for (const [productName, imagePath] of Object.entries(imageMap)) {
      try {
        const query = `UPDATE products SET image = ? WHERE name = ?`;
        const [result] = await connection.query(query, [imagePath, productName]);
        
        if (result.affectedRows > 0) {
          console.log(`✅ Updated: ${productName} → ${imagePath}`);
          updatedCount++;
        } else {
          console.log(`⚠️  Not found: ${productName}`);
        }
      } catch (error) {
        console.error(`❌ Error updating ${productName}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n✅ Update complete!`);
    console.log(`📊 Successfully updated: ${updatedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    
  } finally {
    await connection.end();
    await pool.end();
  }
}

updateProductImages();
