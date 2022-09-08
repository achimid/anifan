const router = require('express').Router()
const { OK } = require('http-status-codes').StatusCodes

const releaseService = require('../release/release-service')


router.get('/',  async (req, res) => {
    return releaseService.findLast()
        .then(releases => res.status(OK).json(releases))
        .catch(res.onError)
})


module.exports = router