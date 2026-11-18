const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Autorização necessária.',
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload._id) {
      return res.status(401).json({
        message: 'Token inválido.',
      });
    }

    req.user = { _id: payload._id };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido ou expirado.',
    });
  }
};

module.exports = auth;
