const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: 'Este recurso já está cadastrado.',
    });
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({
      message: 'Dados inválidos.',
    });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      message: 'O JSON enviado é inválido.',
    });
  }

  const statusCode = err.statusCode || 500;

  const message = statusCode === 500
    ? 'Erro interno do servidor.'
    : err.message;

  return res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;
