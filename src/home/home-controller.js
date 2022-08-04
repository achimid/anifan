const router = require('express').Router()
const { OK } = require('http-status-codes').StatusCodes

const homeService = require('./home-service')
const postService = require('../post/post-service')


router.get('/', async (req, res) => {
    console.log("Index call...")

    const posts = postService.getPosts().slice(0, 15)

    for (let i = 0; i < posts.length; i++) {
        const item = posts[i];
        item.detail = await homeService.getDetail(item)
    }
    
    res.status(OK).send(posts)
})

router.get('/wallet', (req, res) => {
    res.send()
    console.log("Has Wallet... ", req.headers['x-forwarded-for'] || req.socket.remoteAddress )
})

module.exports = router