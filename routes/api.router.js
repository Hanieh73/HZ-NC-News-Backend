const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const articlesRouter = require('./articles.router');


// const { getArticlesById } = require("../controller/articles.controller");

apiRouter.use("/topics", topicsRouter);
apiRouter.use('/articles', articlesRouter)



module.exports = apiRouter;