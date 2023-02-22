const articlesRouter = require('express').Router();
const { getArticlesById } = require('../controller/articles.controller')

//'/' or '/:article_id'
articlesRouter.route('/articles/:article_id').get(getArticlesById)

module.exports = articlesRouter;
