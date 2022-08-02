const router = require('express').Router()
const { CREATED } = require('http-status-codes').StatusCodes

const postService = require('./post-service')
const homeService = require('../home/home-service')


router.post('/', async (req, res) => {
    
    const data = req.body 

    if (!postService.hasTitle(data.title)) {
        await postService.createFromData(data)
        await homeService.getDetailCreate(data.anime)
    } else {
        console.log("Post com o titulo já cadastrado, ignorado. ", data.anime)
    }

    
    res.status(CREATED).send(data)
})

require("./posts-example.json")
    .map(data => {
        postService.createFromData(data)
        homeService.getDetailCreate(data.anime)
    })

module.exports = router