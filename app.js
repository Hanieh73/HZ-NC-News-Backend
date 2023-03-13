const express = require('express')
const app = express()
const apiRouter = require('./routes/api.router')
const cors = require('cors');

const {handle500Error, handle404Error, handle400Error, handleCustomError} = require('./errorhandler/errorhandler')


app.use(cors());
app.use(express.json())

app.use('/api', apiRouter)

app.use(handle400Error)


app.use(handleCustomError)

app.use(handle500Error)

// handling invalid paths
app.all('/*', handle404Error)

module.exports = app;