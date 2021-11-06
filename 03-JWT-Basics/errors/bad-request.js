const CustomAPIError = require('./custom-error');
const { StatusCode } = require('http-status-codes');

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
