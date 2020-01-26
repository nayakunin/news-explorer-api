const Article = require('../models/article');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const error = require('../responses');

module.exports.getArticlesByUserId = (req, res, next) => {
  Article.find({ owner: req.user })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  Article.create({ ...req.body, owner: req.user })
    .then((article) => {
      const {
        _id,
        keyword,
        title,
        date,
        source,
        link,
        image,
      } = article;
      res.status(201).send(
        {
          data: {
            _id,
            keyword,
            title,
            date,
            source,
            link,
            image,
          },
        },
      );
    })
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((response) => {
      if (!response) {
        throw new NotFoundError(error.notFound);
      } else if (String(response.owner) !== req.user._id) {
        throw new ForbiddenError(error.forbidden);
      } else {
        Article.findByIdAndRemove(req.params.articleId)
          .then((result) => res.status(200).send({ data: result }))
          .catch(next);
      }
    })
    .catch(next);
};
