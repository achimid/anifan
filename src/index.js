require('dotenv').config()

const express = require('express')
const compression = require('compression')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.disable('x-powered-by')

app.use(express.static('public', { extensions:['html'] }))

app.listen(process.env.PORT)
