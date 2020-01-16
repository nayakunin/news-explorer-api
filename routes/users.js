const userRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const { getUserById } = require('../controllers/users');

userRouter.get('/me', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), getUserById);

module.exports = userRouter;
