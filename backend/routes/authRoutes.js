import express from 'express';
import { register, login, logout, getProfile, updateProfile, getAllUsers, getLoginHistory, getSessionStats } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// User routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.get('/login-history/:userId', getLoginHistory);
router.get('/session-stats/:userId', getSessionStats);

// Admin routes
router.get('/users', getAllUsers);

export default router;
