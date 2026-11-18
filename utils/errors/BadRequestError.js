const ApiError = require('./ApiError');

class BadRequestError extends ApiError {
  constructor(message = 'Dados inválidos.') {
    super(message, 400);
  }
}

module.exports = BadRequestError;
