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
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id]).then((result) => {
        const articles = result.rows 
        if (result.rowCount === 0) {
            return Promise.reject({ msg: 'Not Found', status: 404})
        } else {
            return articles[0]
        }
    
    })

}


exports.fetchCommentsByArticleId = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id]).then((response) => {
        if (response.rows.length === 0) {
             return Promise.reject({msg: 'Not Found', status: 404})
        }
        else {
            return db.query(`SELECT * FROM comments WHERE article_id = $1  ORDER BY comments.created_at DESC;`, [article_id]).then((result) => {
                return result.rows

             })
        }
     })
}

exports.postCommentByArticleId = (article_id, commentData) => {
    const { username, body } = commentData;

    return db.query(`INSERT INTO comments (body, votes, author, article_id)
    VALUES
    ($1, 0, $2, $3)
    RETURNING *;
`
, [body, username, article_id]).then((response) => {
  
    
         if (response.rows.length === 0 || !article_id) {
             return Promise.reject({msg: 'Not Found', status: 404})
         }
         
         else {
             return response.rows[0]
        }

    })
        
}
    
exports.patchArticleVoteById = (article_id, inc_votes) => {
    return db.query(`UPDATE articles
    SET
    votes = votes + $1
    WHERE article_id = $2
    RETURNING *;
    
    `, [inc_votes, article_id]).then((response) => {
        
 
        
        if (response.rows.length === 0 || !article_id) {
             return Promise.reject({msg: 'Not Found', status: 404})
         }
         
         else {
             return response.rows[0]
        }
    })


}
   

