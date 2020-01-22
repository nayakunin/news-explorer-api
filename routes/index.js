const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');

const NotFoundError = require('../errors/not-found-err');
const error = require('../responses');

router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('*', () => {
  throw new NotFoundError(error.notFound);
});

module.exports = router;
