import pool from '../config/database.js';
import logger from '../utils/logger.js';

class ContactModel {
  static async create(contactData) {
    const connection = await pool.getConnection();
    try {
      const query = `
        INSERT INTO contacts (full_name, email, mobile_number, order_id, issue_type, message, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
      `;

      const [result] = await connection.execute(query, [
        contactData.fullName,
        contactData.email,
        contactData.mobileNumber,
        contactData.orderId || null,
        contactData.issueType,
        contactData.message
      ]);

      logger.info(`Contact created with ID: ${result.insertId}`);
      return result;
    } catch (error) {
      logger.error('Error creating contact', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findById(id) {
    const connection = await pool.getConnection();
    try {
      const [contacts] = await connection.execute(
        'SELECT * FROM contacts WHERE id = ?',
        [id]
      );
      return contacts.length > 0 ? contacts[0] : null;
    } catch (error) {
      logger.error('Error fetching contact', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findAll(filters = {}) {
    const connection = await pool.getConnection();
    try {
      let query = 'SELECT * FROM contacts WHERE 1=1';
      const params = [];

      if (filters.status) {
        query += ' AND status = ?';
        params.push(filters.status);
      }

      if (filters.email) {
        query += ' AND email = ?';
        params.push(filters.email);
      }

      query += ' ORDER BY created_at DESC';

      if (filters.limit) {
        query += ' LIMIT ?';
        params.push(filters.limit);
      }

      const [contacts] = await connection.execute(query, params);
      return contacts;
    } catch (error) {
      logger.error('Error fetching contacts', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async updateStatus(id, status) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'UPDATE contacts SET status = ? WHERE id = ?',
        [status, id]
      );

      if (result.affectedRows > 0) {
        logger.info(`Contact ${id} status updated to: ${status}`);
      }

      return result;
    } catch (error) {
      logger.error('Error updating contact status', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'DELETE FROM contacts WHERE id = ?',
        [id]
      );

      if (result.affectedRows > 0) {
        logger.info(`Contact ${id} deleted`);
      }

      return result;
    } catch (error) {
      logger.error('Error deleting contact', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async countByStatus() {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.execute(
        'SELECT status, COUNT(*) as count FROM contacts GROUP BY status'
      );
      return results;
    } catch (error) {
      logger.error('Error counting contacts by status', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default ContactModel;
