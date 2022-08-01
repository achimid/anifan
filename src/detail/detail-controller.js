const router = require('express').Router()
const { CREATED } = require('http-status-codes').StatusCodes

const homeService = require('../home/home-service')

router.post('/', async (req, res) => {
    
    const data = req.body 
    console.log("Data: ", data)

    await homeService.getDetailCreate(data.anime)
    
    res.status(CREATED).send(data)
})

module.exports = router