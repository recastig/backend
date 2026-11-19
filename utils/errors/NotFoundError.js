const ApiError = require('./ApiError');

class NotFoundError extends ApiError {
  constructor(message = 'Recurso não encontrado.') {
    super(message, 404);
  }
}

module.exports = NotFoundError;
