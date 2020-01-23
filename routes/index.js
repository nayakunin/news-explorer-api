const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const { login, createUser } = require('../controllers/users');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');
const error = require('../responses');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('*', () => {
  throw new NotFoundError(error.notFound);
});

module.exports = router;
