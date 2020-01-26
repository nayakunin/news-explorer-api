const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-err');
const error = require('../responses');

const { NODE_ENV, JWT_SECRET } = process.env;
const { configJWTSecret } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(error.noAuth);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : configJWTSecret);
  } catch (err) {
    throw new AuthError(error.noAuth);
  }

  req.user = payload;

  next();
};
