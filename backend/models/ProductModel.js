import pool from '../config/database.js';

class ProductModel {
  // Create a new product
  static async create(productData) {
    const { name, description, price, mrp, category, image, stock_quantity } = productData;
    const query = `
      INSERT INTO products (name, description, price, mrp, category, image, stock_quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const [result] = await pool.query(query, [name, description, price, mrp, category, image, stock_quantity]);
      return {
        id: result.insertId,
        ...productData,
        created_at: new Date(),
        updated_at: new Date()
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Get all products
  static async getAll(filters = {}) {
    let query = 'SELECT * FROM products WHERE is_active = TRUE';
    const params = [];

    // Category filter
    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    // Search filter
    if (filters.search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Price range filter
    if (filters.minPrice !== undefined) {
      query += ' AND price >= ?';
      params.push(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query += ' AND price <= ?';
      params.push(filters.maxPrice);
    }

    // Sorting
    const sortBy = filters.sortBy || 'created_at';
    const sortOrder = filters.sortOrder || 'DESC';
    query += ` ORDER BY ${sortBy} ${sortOrder}`;

    try {
      const [rows] = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get single product by ID
  static async findById(id) {
    const query = 'SELECT * FROM products WHERE id = ? AND is_active = TRUE';
    try {
      const [rows] = await pool.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Get products by category
  static async getByCategory(category) {
    const query = 'SELECT * FROM products WHERE category = ? AND is_active = TRUE ORDER BY created_at DESC';
    try {
      const [rows] = await pool.query(query, [category]);
      return rows;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  // Update product
  static async update(id, productData) {
    const { name, description, price, mrp, category, image, stock_quantity, is_active } = productData;
    const query = `
      UPDATE products 
      SET name = ?, description = ?, price = ?, mrp = ?, category = ?, 
          image = ?, stock_quantity = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    try {
      const [result] = await pool.query(query, [name, description, price, mrp, category, image, stock_quantity, is_active !== undefined ? is_active : true, id]);
      return result;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product (soft delete)
  static async delete(id) {
    const query = 'UPDATE products SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    try {
      const [result] = await pool.query(query, [id]);
      return result;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Get total product count
  static async getCount(filters = {}) {
    let query = 'SELECT COUNT(*) as total FROM products WHERE is_active = TRUE';
    const params = [];

    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters.search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    try {
      const [rows] = await pool.query(query, params);
      return rows[0].total;
    } catch (error) {
      console.error('Error counting products:', error);
      throw error;
    }
  }

  // Get featured products (top rated or best sellers)
  static async getFeatured(limit = 12) {
    const query = `
      SELECT * FROM products 
      WHERE is_active = TRUE 
      ORDER BY created_at DESC 
      LIMIT ?
    `;
    try {
      const [rows] = await pool.query(query, [limit]);
      return rows;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }

  // Update stock quantity
  static async updateStock(id, quantity) {
    const query = 'UPDATE products SET stock_quantity = stock_quantity + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    try {
      const [result] = await pool.query(query, [quantity, id]);
      return result;
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  }

  // Get low stock products (for admin alerts)
  static async getLowStock(threshold = 10) {
    const query = 'SELECT id, name, stock_quantity FROM products WHERE stock_quantity < ? AND is_active = TRUE ORDER BY stock_quantity ASC';
    try {
      const [rows] = await pool.query(query, [threshold]);
      return rows;
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      throw error;
    }
  }
}

export default ProductModel;
