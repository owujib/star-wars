/**
 * @author Enang Favour <owujibfavour@gmail.com>
 * @description custom ApiError handler
 * @param {null}
 * @name ApiError
 * @returns {Null}
 *
 */

class ApiError extends Error {
  /**
   * @param {String} message a string containing values for your response
   * @param {Number} statusCode containing your response status code
   * @param {Object} statusCode containing your error obj
   */
  constructor(message, statusCode, error) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
