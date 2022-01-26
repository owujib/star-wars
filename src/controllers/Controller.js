class Controller {
  /**
   *
   * @param {import('express').Response} res
   * @param {Object} data
   * @param {String} message
   * @param {Number} statusCode
   * @returns
   */
  sendSuccessResponse(res, data, message, statusCode) {
    return res.status(statusCode || 200).json({
      status: 'success',
      message,
      data,
    });
  }
}

module.exports = Controller;
