const Article = require('../models/article');

const NotFoundError = require('../errors/not-found-err');

module.exports.getArticlesByUserId = (req, res, next) => {
  Article.find({ owner: req.params.id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  Article.create({ ...req.body })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findOne({ _id: req.params.articleId, owner: req.user._id })
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Статья не найдена');
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then((result) => res.send({ data: result }))
        .catch(next);
    })
    .catch(next);
};
