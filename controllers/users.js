const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const error = require('../responses');

const { NODE_ENV, JWT_SECRET } = process.env;
const { configJWTSecret } = require('../config');

module.exports.getUserById = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(error.userDoesNotExist);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { _id } = user;
      res.status(201).send({ _id, email, name });
    })
    .catch((next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentionals(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : configJWTSecret,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { httpOnly: true });
      const { _id, name } = user;
      res.status(200).send({
        user: {
          _id,
          email,
          name,
        },
        token,
      });
    })
    .catch(next);
};
