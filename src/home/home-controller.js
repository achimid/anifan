const router = require('express').Router()
const { OK } = require('http-status-codes')

router.get('/', (req, res) => {
    console.log("Index call...")
    res.status(OK).send(require("./home-example.json"))
})

router.get('/wallet', (req, res) => {
    console.log("Has Wallet... ", req.headers['x-forwarded-for'] || req.socket.remoteAddress )
})

module.exports = router