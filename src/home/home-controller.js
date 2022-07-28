const router = require('express').Router()
const { OK } = require('http-status-codes')
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
    console.log("Index call...")

    const json = require("./home-example.json")

    for (let i = 0; i < json.length; i++) {
        const item = json[i];
        
        const malData = await fetch(`https://api.jikan.moe/v4/anime?q=${item.anime}`)
            .then(res => res.json())
            .then(j => j.data[0])

        item.detail.image = malData.images.webp.image_url
        item.detail.mal = malData.url
        item.detail.sinopse = malData.synopsis
        
    }
    
    res.status(OK).send(json)
})

router.get('/wallet', (req, res) => {
    res.send()
    console.log("Has Wallet... ", req.headers['x-forwarded-for'] || req.socket.remoteAddress )
})

module.exports = router