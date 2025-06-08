const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); // logs the error

  if (err.name === 'MulterError') {
    // Multer-specific errors
    return res.status(400).json({
        status: 'error',
        message: `Multer error: ${err.message}`
    });
  }

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || 'Internal Server Error',
  });
  next();
};

module.exports = globalErrorHandler;
