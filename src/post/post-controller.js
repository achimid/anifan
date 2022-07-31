const router = require('express').Router()
const { CREATED } = require('http-status-codes').StatusCodes

const postService = require('./post-service')
const homeService = require('../home/home-service')


router.post('/', async (req, res) => {
    
    const data = req.body || {
        "url": "https://www.animestc.net/animes/boruto-naruto-next-generations-download-assistir-online",
        "title": "Boruto - Naruto Next Generations - Episódio 260",
        "anime": "Boruto - Naruto Next Generations",
        "mirrors": {
          "online": "https://www.animestc.net/online/boruto-naruto-next-generations-episodio-260",
          "1080p": "https://protetor.animestc.xyz/link/MjIxMzAvaGlnaC8y",
          "720p": "https://protetor.animestc.xyz/link/MjIxMzAvbWVkaXVtLzI=",
          "mp4": "https://protetor.animestc.xyz/link/MjIxMzAvbG93LzI="
        }
    }

    postService.create(data)
    homeService.getDetail(data.anime)
    
    res.status(CREATED).send(post)
})

module.exports = router