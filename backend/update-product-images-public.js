import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kavi1106',
  database: 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Map product names/categories to actual public folder images
const imageMap = {
  // Electronics
  'Wireless Bluetooth Speaker': '/headphone.webp',
  'USB-C Phone Charger': '/magnetcable.jpg',
  'HD Webcam': '/camara.jpg',
  
  // Home & Kitchen
  'Non-Stick Cookware Set': '/plates.jpg',
  'Electric Kettle': '/heatcup.jpg',
  'Dinner Set (32 Pieces)': '/plates.jpg',
  
  // Sports & Fitness
  'Yoga Mat': '/pad.jpg',
  'Dumbbells Set (10kg)': '/walker.jpg',
  'Fitness Tracking Band': '/smartwatch.webp',
  
  // Books
  'Self-Help Book Bundle': '/econote.jpg',
  
  // Beauty
  'Skincare Kit': '/powder.jpg',
  'Hair Care Set': '/hairclip.jpg',
  
  // Original Products
  'Premium Sofa Set': '/bluesofa.webp',
  'Red Party Dress': '/dress1.webp',
  'Premium Cashew Nuts': '/cashew.webp',
  'Formal Suit': '/formalsuit.avif',
  'Cotton T-Shirt': '/white.webp',
  'Denim Jeans': '/denim.webp',
  'Casual Dress': '/dress4.jpg',
  'Sports Shoes': '/footk.jpg',
};

async function updateProductImages() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    for (const [productName, imagePath] of Object.entries(imageMap)) {
      const [result] = await connection.execute(
        'UPDATE products SET image = ? WHERE name = ?',
        [imagePath, productName]
      );
      
      if (result.affectedRows > 0) {
        console.log(`✅ Updated "${productName}" → ${imagePath}`);
      }
    }
    
    console.log('\n✅ All product images updated to use public folder images!');
    
  } catch (error) {
    console.error('❌ Error updating images:', error.message);
  } finally {
    if (connection) connection.release();
    await pool.end();
  }
}

updateProductImages();
