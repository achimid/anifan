const router = require('express').Router()
const { OK } = require('http-status-codes')

const service = require('./home-service')


router.get('/', async (req, res) => {
    console.log("Index call...")

    const json = require("./home-example.json")

    for (let i = 0; i < json.length; i++) {
        const item = json[i];

        item.detail = await service.getDetail(item.anime)
    }
    
    res.status(OK).send(json)
})

router.get('/wallet', (req, res) => {
    res.send()
    console.log("Has Wallet... ", req.headers['x-forwarded-for'] || req.socket.remoteAddress )
})

module.exports = router