const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const articlesRouter = require('./articles.router')


apiRouter.use("/topics", topicsRouter);

apiRouter.use("/articles", articlesRouter);

// apiRouter.use("/articles/:article_id", articlesRouter);

module.exports = apiRouter;







