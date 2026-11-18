const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const { NotFoundError } = require('./utils/errors');

const app = express();

app.use(helmet());
app.use(rateLimiter);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API Cineroleta funcionando!',
  });
});

app.use(userRoutes);
app.use(movieRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Rota não encontrada.'));
});

app.use(errorHandler);

module.exports = app;
