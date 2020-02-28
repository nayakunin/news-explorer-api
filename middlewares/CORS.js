module.exports = (req, res, next) => {
  const allowedCors = [
    'https://nayakunin-news-explorer.ru',
    'http://nayakunin-news-explorer.ru',
    'http://localhost:8000',
  ];

  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
