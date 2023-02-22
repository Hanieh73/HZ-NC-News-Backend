const db = require('../db/connection')

exports.fetchArticlesById = (article_id) => {
    let queryString = `SELECT * FROM articles`;
    const queryParams = []

    if (article_id !== undefined) {
        queryString += 'WHERE article_id = $1';
        queryParams.push(article_id)
    }
    if (sort_by) {
        queryString += `ORDER BY ${sort_by}`
    }
    return db.query(queryString, queryParams).then((result) => {
        const articles = result.rows 
        if (result.rowCount === 0) {
            return Promise.reject('article_id not found')
        } else {
            return articles[0]
        }
    
    })

}