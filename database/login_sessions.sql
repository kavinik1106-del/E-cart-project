-- Create login_sessions table to track user login history
CREATE TABLE IF NOT EXISTS login_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  device_info JSON,
  login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  logout_time TIMESTAMP NULL,
  session_token VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  login_status ENUM('success', 'failed') DEFAULT 'success',
  failure_reason VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_login_time (login_time),
  INDEX idx_session_token (session_token),
  INDEX idx_is_active (is_active)
);