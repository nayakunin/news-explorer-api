const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
require('dotenv').config();

const { NODE_ENV, PORT = 3000, MONGODB_SERVER_ADDRESS } = process.env;
const { configMongoDBServerAddress } = require('./config');

const app = express();

const routes = require('./routes/index');

const { cors } = require('./middlewares/CORS');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mainErrorHandler = require('./main_error_handler');
const rateLimiter = require('./rate-limiter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? MONGODB_SERVER_ADDRESS : configMongoDBServerAddress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(requestLogger);

app.set('trust proxy', 1);

app.use(rateLimiter);

app.use(cors);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use(mainErrorHandler);

app.listen(PORT, () => {});
