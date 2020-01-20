const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-err');
const error = require('../responses');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(error.noAuth);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError(error.noAuth);
  }

  req.user = payload;

  next();
};
