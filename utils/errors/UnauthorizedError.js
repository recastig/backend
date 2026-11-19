const ApiError = require('./ApiError');

class UnauthorizedError extends ApiError {
  constructor(message = 'Autorização necessária.') {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
