const router = require('express').Router()
const { CREATED } = require('http-status-codes').StatusCodes

const postService = require('./post-service')
const homeService = require('../home/home-service')


router.post('/', async (req, res) => {
    
    const data = req.body 
    console.log("Data: ", data)

    postService.createFromData(data)
    homeService.getDetail(data.anime)
    
    res.status(CREATED).send(data)
})

module.exports = router