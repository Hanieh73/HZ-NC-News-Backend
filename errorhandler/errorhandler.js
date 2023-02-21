
exports.handle404Error = (req, res, next) => {
    
    res.status(404).send({msg: 'Not Found'})
}

//handling errors which haven't been identified to respond with an internal server error
exports.handle500Error = (err, req, res, next) => {
    console.log(err)
res.status(500).send({msg: "Internal Server Error"})
}