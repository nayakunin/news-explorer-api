const articleRouter = require('express').Router();

const { validateUserId, validateCardCreation, validateCardDeletion } = require('../validators/article');
const { getArticlesByUserId, createArticle, deleteArticleById } = require('../controllers/articles');

articleRouter.get('/', validateUserId, getArticlesByUserId);
articleRouter.post('/', validateCardCreation, createArticle);
articleRouter.delete('/:articleId', validateCardDeletion, deleteArticleById);

module.exports = articleRouter;
