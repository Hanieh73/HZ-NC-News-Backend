//handling custom errors
exports.handleCustomError = (err, req, res, next) => {
    if(err.status && err.msg) res.status(err.status).send({ msg: err.msg})
    else {
        next(err)
}
}
exports.handle404Error = (req, res, next) => {
    
    res.status(404).send({msg: 'Not Found'})
}

exports.handle400Error = (err, req, res, next) => {
    if (err.code === '22P02') {
    res.status(400).send({ msg: 'bad request'})
    } else {
        next(err)
    }
    

    

}

//handling errors which haven't been identified to respond with an internal server error
exports.handle500Error = (err, req, res, next) => {
    console.log(err)
res.status(500).send({msg: "Internal Server Error"})
}