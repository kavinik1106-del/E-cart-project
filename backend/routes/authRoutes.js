import express from 'express';
import { register, login, getProfile, updateProfile, getAllUsers } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// User routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);

// Admin routes
router.get('/users', getAllUsers);

export default router;
