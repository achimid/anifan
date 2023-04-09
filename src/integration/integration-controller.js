const router = require('express').Router()
const { CREATED } = require('http-status-codes').StatusCodes

const integrationService = require('./integration-service')

router.post('/', async (req, res) => {
    return integrationService.create(req.body)
        .then(() => res.status(CREATED).send())
        .catch(res.onError)   
})

router.post('/batch', async (req, res) => {
    
    console.time("integration.request");

    for (let i = 0; i < req.body.list.length; i++) {
        const item = req.body.list[i];            
        try {
            await integrationService.create(item).catch(console.log)            
        } catch (error) {
            console.log('Error on integration batch', error)
        } 
    }
    
    res.status(CREATED).send()
    console.timeEnd("integration.request");
})

module.exports = router