const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const AuthError = require('../errors/auth-err');
const error = require('../responses');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentionals = function findUserByCredentionals(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(error.singin);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(error.singin);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
