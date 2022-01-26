require('dotenv').config();
const ApiError = require('../utils/ApiError');

const SequelizeUniqueConstraintError = (err) => {
  const value = err.errors[0].message;
  return new ApiError(`Duplicate field value: ${value}`, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ApiError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  console.error({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  // A) API routes error
  return res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    error: err.error,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API routes
  // A) Operational, trusted error: send messagex to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

/**
 *
 * @param {import('express').ErrorRequestHandler} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'SequelizeUniqueConstraintError') {
      error = SequelizeUniqueConstraintError(error);
    }
    if (error.name === 'SequelizeValidationError') {
      error = handleValidationErrorDB(error);
    }

    return sendErrorProd(error, req, res);
  }
};
