const PORT = process.env.PORT || 3000;
const { MONGODB_URI, JWT_SECRET } = process.env;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  IS_PRODUCTION,
};
