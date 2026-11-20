const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/index');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/requestLogger');
const { NotFoundError } = require('./utils/errors');
const { HTTP_STATUS, MESSAGES } = require('./config/constants');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://cineroleta-xi.vercel.app',
  'https://cineroleta-87sjk6jch-around5.vercel.app',
];

app.use(cors({
  origin: allowedOrigins,
}));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}
app.use(requestLogger);
app.use(errorLogger);

app.use(helmet());
app.use(rateLimiter);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: 'ok',
    message: MESSAGES.API_RUNNING,
  });
});

app.use('/api', routes);

app.use((req, res, next) => {
  next(new NotFoundError(MESSAGES.ROUTE_NOT_FOUND));
});

app.use(errorHandler);

module.exports = app;
