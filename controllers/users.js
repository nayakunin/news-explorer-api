const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const error = require('../responses');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserById = (req, res, next) => {
  User.find({ _id: req.user })
    .then((user) => {
      if (!user.length) {
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
    .then((user) => res.send({ data: user }))
    .catch((next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentionals(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { httpOnly: true });
      res.status(201).send({ user, token });
    })
    .catch(next);
};
