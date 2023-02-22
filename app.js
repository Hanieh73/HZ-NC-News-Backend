const express = require('express')
const app = express()
const apiRouter = require('./routes/api.router')


const {handle500Error, handle404Error} = require('./errorhandler/errorhandler')



app.use('/api', apiRouter)

app.use(handle404Error)

app.use(handle500Error)

module.exports = app;