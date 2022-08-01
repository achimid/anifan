const router = require('express').Router()
const { CREATED } = require('http-status-codes').StatusCodes

const postService = require('./post-service')
const homeService = require('../home/home-service')


router.post('/', async (req, res) => {
    
    const data = req.body 
    console.log("Data: ", data)

    await postService.createFromData(data)
    await homeService.getDetailCreate(data.anime)
    
    res.status(CREATED).send(data)
})

require("./posts-example.json")
    .map(data => {
        postService.createFromData(data)
        homeService.getDetailCreate(data.anime)
    })

module.exports = router