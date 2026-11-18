const express = require('express');
const helmet = require('helmet');

const routes = require('./routes/index');

const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/requestLogger');

const { NotFoundError } = require('./utils/errors');

const app = express();

// Registrar requisições e respostas HTTP.
app.use(requestLogger);
app.use(errorLogger);

// Aplicar proteções de segurança.
app.use(helmet());
app.use(rateLimiter);

// Permitir o recebimento de dados em JSON.
app.use(express.json());

// Verificar o funcionamento da API.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API Cineroleta funcionando!',
  });
});

// Rotas da aplicação.
app.use(routes);

// Tratar rotas inexistentes.
app.use((req, res, next) => {
  next(new NotFoundError('Rota não encontrada.'));
});

// Tratamento centralizado de erros.
app.use(errorHandler);

module.exports = app;
