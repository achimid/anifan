require('dotenv').config()

const maxAge = process.env.NODE_ENV == 'production' ? 1 * 86400000 : 0

const cors = require('cors')
const express = require('express')
const compression = require('compression')

const app = express()
const routes = require('./config/routes')
const { databaseInit } = require('./config/database')

const browserInit = require('./extractor/puppeteer')
const extractor = require('./extractor/extractor-service')
const { startCacheCookies } = require('./extractor/cookies/cookies-service')

app.use(cors())

app.use(compression())
app.use(express.json())
app.disable('x-powered-by')

app.use(express.static('public', { maxAge, extensions:['html','xml'] }))

databaseInit()
    .then(() => routes(app))
    .then(browserInit)
    .then(startCacheCookies)
    .then(extractor.start)

app.listen(process.env.PORT)
