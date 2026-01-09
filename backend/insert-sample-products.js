import pool from './config/database.js';

async function insertSampleProducts() {
  try {
    const products = [
      {
        name: 'Premium Sofa Set',
        description: 'Comfortable 3-seater sofa with premium fabric upholstery',
        price: 12000,
        mrp: 28000,
        category: 'Furniture',
        image: '/bluesofa.webp',
        stock_quantity: 10
      },
      {
        name: 'Red Party Dress',
        description: 'Elegant party wear dress perfect for special occasions',
        price: 1500,
        mrp: 2200,
        category: 'Clothing',
        image: '/dress1.webp',
        stock_quantity: 25
      },
      {
        name: 'Premium Cashew Nuts',
        description: 'Fresh and healthy premium quality cashews',
        price: 800,
        mrp: 1200,
        category: 'Food',
        image: '/cashew.webp',
        stock_quantity: 50
      },
      {
        name: 'Formal Suit',
        description: 'Premium formal suit for business meetings',
        price: 3500,
        mrp: 5000,
        category: 'Clothing',
        image: '/formalsuit.avif',
        stock_quantity: 15
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable cotton t-shirt for daily wear',
        price: 800,
        mrp: 1200,
        category: 'Clothing',
        image: '/men1.avif',
        stock_quantity: 30
      },
      {
        name: 'Denim Jeans',
        description: 'Classic denim jeans with perfect fit',
        price: 1500,
        mrp: 2200,
        category: 'Clothing',
        image: '/chino.avif',
        stock_quantity: 20
      },
      {
        name: 'Casual Dress',
        description: 'Stylish casual dress for everyday wear',
        price: 1200,
        mrp: 1800,
        category: 'Clothing',
        image: '/pinkdress.avif',
        stock_quantity: 18
      },
      {
        name: 'Sports Shoes',
        description: 'Comfortable sports shoes for running',
        price: 2500,
        mrp: 3500,
        category: 'Footwear',
        image: '/shorts.avif',
        stock_quantity: 12
      }
    ];

    console.log('🔄 Inserting sample products...');
    
    for (const product of products) {
      const sql = `
        INSERT INTO products (name, description, price, mrp, category, image, stock_quantity, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE
        description = VALUES(description),
        price = VALUES(price),
        mrp = VALUES(mrp),
        stock_quantity = VALUES(stock_quantity)
      `;
      
      const [result] = await pool.query(sql, [
        product.name,
        product.description,
        product.price,
        product.mrp,
        product.category,
        product.image,
        product.stock_quantity
      ]);
      
      console.log(`✅ Inserted/Updated: ${product.name}`);
    }

    console.log('\n✅ All products inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inserting products:', error.message);
    process.exit(1);
  }
}

insertSampleProducts();
