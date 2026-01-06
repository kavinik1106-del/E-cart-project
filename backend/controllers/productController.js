import ProductModel from '../models/ProductModel.js';
import logger from '../utils/logger.js';

export const getAllProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sortBy, sortOrder, limit } = req.query;

    const filters = {
      category: category || null,
      search: search || null,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      sortBy: sortBy || 'created_at',
      sortOrder: sortOrder || 'DESC'
    };

    // Remove null values
    Object.keys(filters).forEach(key => filters[key] === null && delete filters[key]);

    const products = await ProductModel.getAll(filters);

    // Apply limit if specified
    const result = limit ? products.slice(0, parseInt(limit)) : products;

    res.json({
      success: true,
      data: result,
      count: result.length,
      total: products.length
    });
  } catch (error) {
    logger.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await ProductModel.getByCategory(category);

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    logger.error('Error fetching products by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, mrp, category, image, stock_quantity } = req.body;

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, price, category'
      });
    }

    const product = await ProductModel.create({
      name,
      description: description || '',
      price: parseFloat(price),
      mrp: mrp ? parseFloat(mrp) : null,
      category,
      image: image || '',
      stock_quantity: parseInt(stock_quantity) || 0
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    logger.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, mrp, category, image, stock_quantity, is_active } = req.body;

    // Check if product exists
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await ProductModel.update(id, {
      name: name || product.name,
      description: description !== undefined ? description : product.description,
      price: price ? parseFloat(price) : product.price,
      mrp: mrp ? parseFloat(mrp) : product.mrp,
      category: category || product.category,
      image: image || product.image,
      stock_quantity: stock_quantity !== undefined ? parseInt(stock_quantity) : product.stock_quantity,
      is_active: is_active !== undefined ? is_active : product.is_active
    });

    const updatedProduct = await ProductModel.findById(id);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    logger.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await ProductModel.delete(id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const { limit } = req.query;

    const products = await ProductModel.getFeatured(limit ? parseInt(limit) : 12);

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    logger.error('Error fetching featured products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products',
      error: error.message
    });
  }
};

export const getLowStockProducts = async (req, res) => {
  try {
    const { threshold } = req.query;

    const products = await ProductModel.getLowStock(threshold ? parseInt(threshold) : 10);

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    logger.error('Error fetching low stock products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching low stock products',
      error: error.message
    });
  }
};

export const getProductCount = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filters = {
      category: category || null,
      search: search || null
    };

    Object.keys(filters).forEach(key => filters[key] === null && delete filters[key]);

    const count = await ProductModel.getCount(filters);

    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    logger.error('Error counting products:', error);
    res.status(500).json({
      success: false,
      message: 'Error counting products',
      error: error.message
    });
  }
};
