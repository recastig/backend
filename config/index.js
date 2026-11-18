const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI
  || (IS_PRODUCTION ? undefined : 'mongodb://127.0.0.1:27017/cineroleta');

const JWT_SECRET = process.env.JWT_SECRET
  || (IS_PRODUCTION ? undefined : 'cineroleta-local-development-only-secret');

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  IS_PRODUCTION,
};
