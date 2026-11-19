const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const requestStream = fs.createWriteStream(
  path.join(__dirname, '../request.log'),
  { flags: 'a' },
);

const errorStream = fs.createWriteStream(
  path.join(__dirname, '../error.log'),
  { flags: 'a' },
);

morgan.token('safe-path', (req) => req.path);

const logFormat = ':date[iso] :method :safe-path :status :response-time ms';

const requestLogger = morgan(logFormat, {
  stream: requestStream,
});

const errorLogger = morgan(logFormat, {
  stream: errorStream,
  skip: (req, res) => res.statusCode < 400,
});

module.exports = {
  requestLogger,
  errorLogger,
};
