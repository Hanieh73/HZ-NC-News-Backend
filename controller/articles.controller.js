
const { fetchArticles, fetchArticlesById, fetchCommentsByArticleId } = require('../models/articles.model')


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
