const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const corsRouter = require('./cors');
const { login, createUser } = require('../controllers/users');

const { checkSignIn, checkSignUp } = require('../validators/user');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');
const error = require('../responses');

router.use('*', corsRouter);

router.post('/signin', checkSignIn, login);
router.post('/signup', checkSignUp, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('*', () => {
  throw new NotFoundError(error.notFound);
});

module.exports = router;
