import logger from '../utils/logger.js';

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const validateRequired = (fields) => (req, res, next) => {
  const missingFields = fields.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    logger.warn(`Missing required fields: ${missingFields.join(', ')}`);
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    });
  }
  next();
};

export { asyncHandler, validateRequired };
