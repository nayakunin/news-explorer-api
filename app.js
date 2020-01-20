const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
require('dotenv').config();

const { PORT = 3000, MONGODB_SERVER_ADDRESS = 'mongodb://localhost:27017/newsdb' } = process.env;

const app = express();

const routes = require('./routes/index');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mainErrorHandler = require('./main_error_handler');
const rateLimiter = require('./rate-limiter');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGODB_SERVER_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(requestLogger);

app.set('trust proxy', 1);

app.use(rateLimiter);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use(mainErrorHandler);

app.listen(PORT, () => {});
