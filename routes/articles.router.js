const articlesRouter = require("express").Router();

const { getArticles, getArticlesById } = require('../controller/articles.controller')

articlesRouter.route('/').get(getArticles)

articlesRouter.route('/:article_id').get(getArticlesById)
 

module.exports = articlesRouter;





