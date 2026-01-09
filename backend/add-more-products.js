import pool from './config/database.js';

async function addMoreProducts() {
  try {
    const products = [
      // Electronics
      {
        name: 'Wireless Bluetooth Speaker',
        description: 'High-quality wireless Bluetooth speaker with 360° sound',
        price: 2999,
        mrp: 5999,
        category: 'Electronics',
        image: '/speaker.webp',
        stock_quantity: 15
      },
      {
        name: 'USB-C Phone Charger',
        description: 'Fast charging USB-C charger compatible with all phones',
        price: 599,
        mrp: 1299,
        category: 'Electronics',
        image: '/charger.webp',
        stock_quantity: 50
      },
      {
        name: 'HD Webcam',
        description: '1080p HD webcam with auto-focus for video calls',
        price: 1999,
        mrp: 3999,
        category: 'Electronics',
        image: '/webcam.webp',
        stock_quantity: 20
      },
      // Home & Kitchen
      {
        name: 'Non-Stick Cookware Set',
        description: 'Premium non-stick cookware set with 8 pieces',
        price: 3999,
        mrp: 7999,
        category: 'Home & Kitchen',
        image: '/cookware.webp',
        stock_quantity: 12
      },
      {
        name: 'Electric Kettle',
        description: 'Fast electric kettle with auto shut-off feature',
        price: 899,
        mrp: 1799,
        category: 'Home & Kitchen',
        image: '/kettle.webp',
        stock_quantity: 25
      },
      {
        name: 'Dinner Set (32 Pieces)',
        description: 'Complete dinner set with plates, bowls and glasses',
        price: 2499,
        mrp: 4999,
        category: 'Home & Kitchen',
        image: '/dinnerset.webp',
        stock_quantity: 18
      },
      // Sports & Fitness
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with carrying strap',
        price: 799,
        mrp: 1599,
        category: 'Sports & Fitness',
        image: '/yogamat.webp',
        stock_quantity: 30
      },
      {
        name: 'Dumbbells Set (10kg)',
        description: 'Adjustable dumbbells set with total weight 10kg',
        price: 2499,
        mrp: 4999,
        category: 'Sports & Fitness',
        image: '/dumbbells.webp',
        stock_quantity: 8
      },
      {
        name: 'Fitness Tracking Band',
        description: 'Smart fitness band with heart rate monitor',
        price: 1999,
        mrp: 3999,
        category: 'Sports & Fitness',
        image: '/fitband.webp',
        stock_quantity: 22
      },
      // Books & Media
      {
        name: 'Self-Help Book Bundle',
        description: 'Set of 5 best-selling self-help and motivation books',
        price: 1299,
        mrp: 2499,
        category: 'Books',
        image: '/books.webp',
        stock_quantity: 40
      },
      // Beauty & Personal Care
      {
        name: 'Skincare Kit',
        description: 'Complete skincare kit with cleanser, toner and moisturizer',
        price: 1899,
        mrp: 3499,
        category: 'Beauty',
        image: '/skincare.webp',
        stock_quantity: 35
      },
      {
        name: 'Hair Care Set',
        description: 'Professional hair care set with shampoo and conditioner',
        price: 599,
        mrp: 1199,
        category: 'Beauty',
        image: '/haircare.webp',
        stock_quantity: 45
      }
    ];

    console.log('🔄 Adding more products to database...\n');
    
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
      
      await pool.query(sql, [
        product.name,
        product.description,
        product.price,
        product.mrp,
        product.category,
        product.image,
        product.stock_quantity
      ]);
      
      console.log(`✅ ${product.name}`);
    }

    console.log('\n✅ All products added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding products:', error.message);
    process.exit(1);
  }
}

addMoreProducts();
