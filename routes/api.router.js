const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const articlesRouter = require('./articles.router')




apiRouter.use("/articles", articlesRouter);
apiRouter.use("/topics", topicsRouter);


module.exports = apiRouter;







