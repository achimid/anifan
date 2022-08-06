const router = require('express').Router()
const { CREATED } = require('http-status-codes').StatusCodes

const integrationService = require('./integration-service')

router.post('/', async (req, res) => {
    return integrationService.create(req.body)
        .then(() => res.status(CREATED).send())
        .catch(res.onError)   
})

module.exports = router