import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.DEBUG === 'true' && { stack: err.stack })
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
};

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
};

export { errorHandler, notFoundHandler, requestLogger };
