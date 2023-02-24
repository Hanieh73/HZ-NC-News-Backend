
const { fetchArticles, fetchArticlesById, fetchCommentsByArticleId, postCommentByArticleId, patchArticleVoteById } = require('../models/articles.model')


exports.getArticles = (req, res, next) => {
    fetchArticles()
        .then((articles) => {
        res.status(200).send({articles})

        })
        .catch((err) => {

          
        next(err)
    })

}

exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticlesById(article_id)
        .then((article) => {
            res.status(200).send({ article })

        })
        .catch((err) => {
            next(err)

        })

}



exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    fetchCommentsByArticleId(article_id)
        .then((comments) => {
        res.status(200).send({comments})

        })
        .catch((err) => {
        next(err)
    })

}

exports.postComment = (req, res, next) => {

    const { article_id } = req.params;
    const commentData = req.body;
    postCommentByArticleId(article_id, commentData)
        .then((comment) => {
        
          res.status(201).send({comment})  
        })
        .catch((err) => {
        next(err)
    })

}

exports.patchArticle = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body
  
    patchArticleVoteById(article_id, inc_votes)
        .then((article) => {
            res.status(200)
            .send(article)

        })
        .catch((err) => {
        
next(err)
    })

}
