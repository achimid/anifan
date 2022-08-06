const router = require('express').Router()
const { OK } = require('http-status-codes').StatusCodes

const animeService = require('./anime-service')

router.get('/:id', async (req, res) => {
    return animeService.findById(req.params.id)
        .then(anime => res.status(OK).json(anime))
        .catch(res.onError)   
})

module.exports = router