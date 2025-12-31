import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  try {
    logger.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    if (!res.headersSent) {
      res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.DEBUG === 'true' && { stack: err.stack })
      });
    }
  } catch (error) {
    console.error('Error in errorHandler:', error);
  }
};

const notFoundHandler = (req, res) => {
  try {
    res.status(404).json({
      success: false,
      error: 'Route not found'
    });
  } catch (error) {
    console.error('Error in notFoundHandler:', error);
  }
};

const requestLogger = (req, res, next) => {
  try {
    logger.info(`${req.method} ${req.path}`);
  } catch (error) {
    console.error('Error in requestLogger:', error);
  }
  next();
};

export { errorHandler, notFoundHandler, requestLogger };
