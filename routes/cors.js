const routerCors = require('express').Router();

const allowedCors = [
  'https://nayakunin-news-explorer.ru',
  'http://nayakunin-news-explorer.ru',
  'https://nayakunin.github.io',
  'http://localhost:8080',
];

routerCors.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  }

  next();
});

module.exports = routerCors;
