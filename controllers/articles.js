const Article = require('../models/article');

const NotFoundError = require('../errors/not-found-err');

module.exports.getArticlesByUserId = (req, res, next) => {
  Article.find({ owner: req.user })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  Article.create({ ...req.body, owner: req.user })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findOne({ _id: req.params.articleId, owner: req.user._id })
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Article is not found');
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then((result) => res.send({ data: result }))
        .catch(next);
    })
    .catch(next);
};
