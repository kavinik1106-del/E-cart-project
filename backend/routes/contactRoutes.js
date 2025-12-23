import express from 'express';
import {
  createContact,
  getContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
  getContactStats
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/', createContact);
router.get('/', getAllContacts);
router.get('/stats', getContactStats);
router.get('/:id', getContact);
router.put('/:id', updateContactStatus);
router.delete('/:id', deleteContact);

export default router;
