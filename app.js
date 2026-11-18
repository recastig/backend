const express = require('express');
const helmet = require('helmet');

const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/requestLogger');

const { NotFoundError } = require('./utils/errors');

const app = express();

// Registrar todas as requisições e respostas HTTP.
app.use(requestLogger);
app.use(errorLogger);

// Adicionar cabeçalhos HTTP de segurança.
app.use(helmet());

// Limitar a quantidade de requisições por IP.
app.use(rateLimiter);

// Permitir o recebimento de dados em JSON.
app.use(express.json());

// Verificar se a API está funcionando.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API Cineroleta funcionando!',
  });
});

// Rotas da aplicação.
app.use(userRoutes);
app.use(movieRoutes);

// Tratar rotas inexistentes.
app.use((req, res, next) => {
  next(new NotFoundError('Rota não encontrada.'));
});

// Tratamento centralizado de erros.
app.use(errorHandler);

module.exports = app;
