import pool from '../config/database.js';

class UserModel {
  // Create a new user
  static async create(userData) {
    const { email, password, first_name, last_name, phone } = userData;
    const query = `
      INSERT INTO users (email, password, first_name, last_name, phone)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [email, password, first_name, last_name, phone]);
    return result;
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.query(query, [email]);
    return rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT id, email, first_name, last_name, phone, address, city, state, postal_code, country, created_at FROM users WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  }

  // Update user profile
  static async updateProfile(userId, profileData) {
    const { first_name, last_name, phone, address, city, state, postal_code, country } = profileData;
    const query = `
      UPDATE users 
      SET first_name = ?, last_name = ?, phone = ?, address = ?, city = ?, state = ?, postal_code = ?, country = ?
      WHERE id = ?
    `;
    const [result] = await pool.query(query, [first_name, last_name, phone, address, city, state, postal_code, country, userId]);
    return result;
  }

  // Check if email exists
  static async emailExists(email) {
    const query = 'SELECT id FROM users WHERE email = ?';
    const [rows] = await pool.query(query, [email]);
    return rows.length > 0;
  }

  // Get all users (admin)
  static async getAll() {
    const query = 'SELECT id, email, first_name, last_name, phone, created_at FROM users';
    const [rows] = await pool.query(query);
    return rows;
  }
}

export default UserModel;
