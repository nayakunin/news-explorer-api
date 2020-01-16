const articleRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const { getArticlesByUserId, createArticle, deleteArticleById } = require('../controllers/articles');

articleRouter.get('/', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), getArticlesByUserId);

articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    data: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
}), createArticle);

articleRouter.delete('/:articleId', celebrate({
  body: Joi.object().keys({
    articleId: Joi.string().required(),
  }),
}), deleteArticleById);

module.exports = articleRouter;
