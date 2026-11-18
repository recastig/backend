const ApiError = require('./ApiError');

class ConflictError extends ApiError {
  constructor(message = 'Este recurso já existe.') {
    super(message, 409);
  }
}

module.exports = ConflictError;
