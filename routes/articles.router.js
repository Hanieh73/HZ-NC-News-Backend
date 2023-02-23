const articlesRouter = require("express").Router();

const { getArticles, getArticlesById, getCommentsByArticleId } = require('../controller/articles.controller')

articlesRouter.route('/').get(getArticles)

articlesRouter.route('/:article_id').get(getArticlesById)
articlesRouter.route('/:article_id/comments').get(getCommentsByArticleId)

module.exports = articlesRouter;





