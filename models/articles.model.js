const db = require('../db/connection')

exports.fetchArticles = () => {




    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(Count(comments.article_id) AS INT) AS comment_count FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
    `).then(({ rows: articles }) => {
        return articles
    })


}

exports.fetchArticlesById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = ${article_id};`).then((result) => {
        const articles = result.rows 
        if (result.rowCount === 0) {
            return Promise.reject({ msg: 'Not Found', status: 404})
        } else {
            return articles[0]
        }
    
    })

}