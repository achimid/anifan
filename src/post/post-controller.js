const router = require('express').Router()
const { CREATED } = require('http-status-codes').StatusCodes

const postService = require('./post-service')
const homeService = require('../home/home-service')


router.post('/', async (req, res) => {
    
    const data = req.body 
    
    await postService.createFromData(data)
    await homeService.getDetailCreate(data)
    
    res.status(CREATED).send(data)
})

router.post('/:id/subscribe/notification', async (req, res) => {
    
    const postId = req.params.id
    const { userId } = req.body
    
    console.log(`Subscribe notification: userId=${userId} postId=${postId}`)

    const post = postService.findById(postId)
    
    postService.subscribeAnime(userId, post.anime)
    
    res.status(CREATED).json(post)
})

require("./posts-example.json")
    .map(data => {
        postService.createFromData(data)
        homeService.getDetailCreate(data)
    })

module.exports = router