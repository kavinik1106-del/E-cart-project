-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  order_id VARCHAR(50),
  issue_type VARCHAR(100) NOT NULL,
  message LONGTEXT NOT NULL,
  status ENUM('pending', 'in-progress', 'resolved') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
