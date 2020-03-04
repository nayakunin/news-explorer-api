const router = require('express').Router();
const cors = require('cors');
const userRouter = require('./users');
const articleRouter = require('./articles');
// const corsRouter = require('./cors');
const { login, createUser } = require('../controllers/users');

const { checkSignIn, checkSignUp } = require('../validators/user');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');
const error = require('../responses');

const whitelist = [
  'https://nayakunin-news-explorer.ru',
  'http://nayakunin-news-explorer.ru',
  'https://nayakunin.github.io',
  'http://localhost:8080',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  preflightContinue: true,
};

router.options('*', cors(corsOptions));
router.post('/signin', cors(corsOptions), checkSignIn, login);
router.post('/signup', cors(corsOptions), checkSignUp, createUser);

router.use(auth);

router.use('/users', cors(corsOptions), userRouter);
router.use('/articles', cors(corsOptions), articleRouter);
router.use('*', cors(corsOptions), () => {
  throw new NotFoundError(error.notFound);
});

module.exports = router;
