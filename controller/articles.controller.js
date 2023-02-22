const { fetchArticlesById } = require('../models/articles.model')

exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params
   // const { sort_by } = req.query and then passing a second argument below as sort_by?
    
    fetchArticlesById(article_id)
        .then((article) => {
        res.status(200).send({article})

        })
    .catch((err) => {
        next(err)

    })

}