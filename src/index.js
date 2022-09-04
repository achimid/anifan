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
const { loadJobInjestInfo } = require('./anime/anime-injestor')

app.use(cors())

app.use(compression())
app.use(express.json())
app.disable('x-powered-by')

app.use(express.static('public', { maxAge, extensions:['html','xml'] }))

databaseInit()
    .then(() => routes(app))
    .then(loadJobInjestInfo)
    .then(browserInit)
    .then(startCacheCookies)
    // .then(extractor.start)


app.listen(process.env.PORT)
