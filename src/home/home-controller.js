const router = require('express').Router()
const { OK } = require('http-status-codes').StatusCodes

const releaseService = require('../release/release-service')
const statusService = require('../status/status-service')


router.get('/',  async (req, res) => {
    return releaseService.findLast()
        .then(releases => res.status(OK).json(releases))
        .catch(res.onError)
})

router.get('/status',  async (req, res) => {
    return statusService.getStatus()
        .then(status => res.status(OK).json(status))
        .catch(res.onError)
})


module.exports = router