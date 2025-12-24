import UserModel from '../models/UserModel.js';
import logger from '../utils/logger.js';
import crypto from 'crypto';

// Simple password hashing (use bcrypt in production)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const verifyPassword = (password, hash) => {
  return hashPassword(password) === hash;
};

// Register user
export const register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, first_name, last_name, phone } = req.body;

    // Validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, password, and confirm password are required' 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create user
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      first_name: first_name || '',
      last_name: last_name || '',
      phone: phone || ''
    });

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: result.insertId,
        email
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    logger.info(`User logged in: ${email}`);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token: `Bearer_${user.id}_${Date.now()}` // Simple token (use JWT in production)
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

// Get user profile
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Get profile error:', error);
    next(error);
  }
};

// Update profile
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { first_name, last_name, phone, address, city, state, postal_code, country } = req.body;

    const result = await UserModel.updateProfile(userId, {
      first_name,
      last_name,
      phone,
      address,
      city,
      state,
      postal_code,
      country
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    logger.info(`User profile updated: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    next(error);
  }
};

// Get all users (admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.getAll();

    res.status(200).json({
      success: true,
      data: users,
      total: users.length
    });
  } catch (error) {
    logger.error('Get all users error:', error);
    next(error);
  }
};
