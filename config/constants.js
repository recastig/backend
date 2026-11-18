const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const MESSAGES = {
  API_RUNNING: 'API Cineroleta funcionando!',
  ROUTE_NOT_FOUND: 'Rota não encontrada.',
  INTERNAL_ERROR: 'Erro interno do servidor.',
  AUTH_REQUIRED: 'Autorização necessária.',
  INVALID_TOKEN: 'Token inválido ou expirado.',
};

module.exports = {
  HTTP_STATUS,
  MESSAGES,
};
