import express from 'express';
import { createCustomer, loginCustomer } from '../controllers/customerAuth.controller.js';

const router = express.Router();

router.post('/register', createCustomer);
router.post('/login', loginCustomer);

export default router;
