const { Joi, celebrate } = require('celebrate');

const validateUserId = celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
});

const validateCardDeletion = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required(),
  }),
});

module.exports = {
  validateUserId,
  validateCardCreation,
  validateCardDeletion,
};
