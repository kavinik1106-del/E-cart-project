import express from 'express';
import { 
  createOrder, 
  getOrder, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus, 
  updatePaymentStatus, 
  cancelOrder,
  getOrderByNumber
} from '../controllers/orderController.js';

const router = express.Router();

// Admin routes - get all orders
router.get('/', getAllOrders);

// Order routes with specific paths
router.get('/number/:orderNumber', getOrderByNumber);
router.get('/user/:userId', getUserOrders);

// Individual order routes (must be after specific paths)
router.get('/:id', getOrder);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/payment-status', updatePaymentStatus);
router.put('/:id/cancel', cancelOrder);

// Create order
router.post('/', createOrder);

export default router;
