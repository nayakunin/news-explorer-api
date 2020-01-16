const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');

router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
