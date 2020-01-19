const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');

const error = require('../responses');

router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.get('*', (req, res) => {
  res.status(404).send({ message: error.resourceNotFound });
});

module.exports = router;
