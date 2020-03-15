const userRouter = require('express').Router();

const { getUserById } = require('../controllers/users');

userRouter.get('/me', getUserById);

module.exports = userRouter;
