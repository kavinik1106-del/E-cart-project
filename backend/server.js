import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pool from './config/database.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler, notFoundHandler, requestLogger } from './middleware/middleware.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    logger.info('Database connected successfully');
    connection.release();
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

app.use('/api/contact', contactRoutes);
app.use('/api/contacts', contactRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
  logger.info('Available endpoints:');
  logger.info('  GET    /api/health');
  logger.info('  POST   /api/contact');
  logger.info('  GET    /api/contacts');
  logger.info('  GET    /api/contacts/:id');
  logger.info('  PUT    /api/contacts/:id');
  logger.info('  DELETE /api/contacts/:id');
  logger.info('  GET    /api/contacts/stats');
});

export default app;
