const ApiError = require('./ApiError');

class ForbiddenError extends ApiError {
  constructor(message = 'Acesso negado.') {
    super(message, 403);
  }
}

module.exports = ForbiddenError;
