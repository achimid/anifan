require('dotenv').config()

const maxAge = process.env.NODE_ENV == 'production' ? 7*86400000 : 0

const express = require('express')
const compression = require('compression')
const cors = require('cors')
const routes = require('./config/routes')

const app = express()

app.use(cors())

app.use(compression())
app.use(express.json())
app.disable('x-powered-by')

app.use(express.static('public', { maxAge, extensions:['html','xml'] }))

routes(app)

app.listen(process.env.PORT)
