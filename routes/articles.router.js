const articlesRouter = require("express").Router();

const { getArticles } = require('../controller/articles.controller')

articlesRouter.route('/').get(getArticles)

module.exports = articlesRouter;