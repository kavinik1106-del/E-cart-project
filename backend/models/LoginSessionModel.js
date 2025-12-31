import pool from '../config/database.js';

class LoginSessionModel {
  // Create a new login session
  static async create(sessionData) {
    const {
      user_id,
      email,
      ip_address,
      user_agent,
      device_info,
      session_token,
      login_status = 'success',
      failure_reason = null
    } = sessionData;

    const query = `
      INSERT INTO login_sessions
      (user_id, email, ip_address, user_agent, device_info, session_token, login_status, failure_reason)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const [result] = await pool.query(query, [
        user_id,
        email,
        ip_address,
        user_agent,
        JSON.stringify(device_info || {}),
        session_token,
        login_status,
        failure_reason
      ]);
      return {
        insertId: result.insertId,
        affectedRows: result.affectedRows
      };
    } catch (error) {
      console.error('Error creating login session:', error);
      throw error;
    }
  }

  // Update logout time for a session
  static async updateLogout(sessionToken) {
    const query = `
      UPDATE login_sessions
      SET logout_time = CURRENT_TIMESTAMP, is_active = FALSE
      WHERE session_token = ?
    `;

    try {
      const [result] = await pool.query(query, [sessionToken]);
      return result;
    } catch (error) {
      console.error('Error updating logout time:', error);
      throw error;
    }
  }

  // Get active sessions for a user
  static async getActiveSessions(userId) {
    const query = `
      SELECT * FROM login_sessions
      WHERE user_id = ? AND is_active = TRUE
      ORDER BY login_time DESC
    `;

    try {
      const [rows] = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      console.error('Error getting active sessions:', error);
      throw error;
    }
  }

  // Get login history for a user
  static async getLoginHistory(userId, limit = 50) {
    const query = `
      SELECT
        id,
        email,
        ip_address,
        device_info,
        login_time,
        logout_time,
        login_status,
        failure_reason
      FROM login_sessions
      WHERE user_id = ?
      ORDER BY login_time DESC
      LIMIT ?
    `;

    try {
      const [rows] = await pool.query(query, [userId, limit]);
      return rows.map(row => ({
        ...row,
        device_info: row.device_info ? JSON.parse(row.device_info) : null
      }));
    } catch (error) {
      console.error('Error getting login history:', error);
      throw error;
    }
  }

  // Deactivate all sessions for a user (logout from all devices)
  static async deactivateAllSessions(userId, exceptToken = null) {
    let query = `
      UPDATE login_sessions
      SET logout_time = CURRENT_TIMESTAMP, is_active = FALSE
      WHERE user_id = ? AND is_active = TRUE
    `;
    let params = [userId];

    if (exceptToken) {
      query += ' AND session_token != ?';
      params.push(exceptToken);
    }

    try {
      const [result] = await pool.query(query, params);
      return result;
    } catch (error) {
      console.error('Error deactivating sessions:', error);
      throw error;
    }
  }

  // Clean up old inactive sessions (older than 30 days)
  static async cleanupOldSessions() {
    const query = `
      DELETE FROM login_sessions
      WHERE is_active = FALSE
      AND logout_time < DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 30 DAY)
    `;

    try {
      const [result] = await pool.query(query);
      return result;
    } catch (error) {
      console.error('Error cleaning up old sessions:', error);
      throw error;
    }
  }

  // Get session statistics
  static async getSessionStats(userId = null) {
    let whereClause = '';
    let params = [];

    if (userId) {
      whereClause = 'WHERE user_id = ?';
      params = [userId];
    }

    const query = `
      SELECT
        COUNT(*) as total_logins,
        COUNT(CASE WHEN login_status = 'success' THEN 1 END) as successful_logins,
        COUNT(CASE WHEN login_status = 'failed' THEN 1 END) as failed_logins,
        COUNT(CASE WHEN is_active = TRUE THEN 1 END) as active_sessions,
        MAX(login_time) as last_login
      FROM login_sessions
      ${whereClause}
    `;

    try {
      const [rows] = await pool.query(query, params);
      return rows[0];
    } catch (error) {
      console.error('Error getting session stats:', error);
      throw error;
    }
  }
}

export default LoginSessionModel;