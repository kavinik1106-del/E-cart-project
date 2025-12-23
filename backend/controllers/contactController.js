import ContactModel from '../models/ContactModel.js';
import { validateContact } from '../utils/validators.js';
import logger from '../utils/logger.js';

const createContact = async (req, res) => {
  try {
    const validation = validateContact(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      });
    }

    const result = await ContactModel.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: result.insertId
    });
  } catch (error) {
    logger.error('Error creating contact', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form'
    });
  }
};

const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactModel.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    logger.error('Error fetching contact', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact'
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const { status, email, limit } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (email) filters.email = email;
    if (limit) filters.limit = parseInt(limit);

    const contacts = await ContactModel.findAll(filters);

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    logger.error('Error fetching contacts', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts'
    });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: pending, in-progress, resolved'
      });
    }

    const result = await ContactModel.updateStatus(id, status);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully'
    });
  } catch (error) {
    logger.error('Error updating contact status', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact status'
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ContactModel.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting contact', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete contact'
    });
  }
};

const getContactStats = async (req, res) => {
  try {
    const stats = await ContactModel.countByStatus();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Error fetching contact stats', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
};

export {
  createContact,
  getContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
  getContactStats
};
