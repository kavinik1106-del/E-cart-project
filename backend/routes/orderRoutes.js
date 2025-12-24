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

// Order routes
router.post('/', createOrder);
router.get('/:id', getOrder);
router.get('/number/:orderNumber', getOrderByNumber);
router.get('/user/:userId', getUserOrders);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/payment-status', updatePaymentStatus);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.get('/', getAllOrders);

export default router;
