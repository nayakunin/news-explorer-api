const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');

router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.get('*', (req, res) => {
  res.status(404).send({ message: 'Server can not find the requested resource' });
});

module.exports = router;
