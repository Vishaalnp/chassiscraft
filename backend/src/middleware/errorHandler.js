const errorHandler = (err, req, res, next) => {
  console.error('[BODYCRAFT TN Error]', err.stack || err.message);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    message = `Resource not found with specified ID: ${err.value}`;
    statusCode = 404;
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(', ')}`;
    statusCode = 400;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
