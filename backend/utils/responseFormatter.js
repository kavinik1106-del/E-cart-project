const responseFormatter = {
  success: (data, message = 'Success', statusCode = 200) => ({
    success: true,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString()
  }),

  error: (error, statusCode = 500) => ({
    success: false,
    statusCode,
    error: error instanceof Error ? error.message : error,
    timestamp: new Date().toISOString()
  }),

  paginated: (data, page, limit, total) => ({
    success: true,
    data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  })
};

export default responseFormatter;
