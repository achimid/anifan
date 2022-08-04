const router = require('express').Router()
const { CREATED } = require('http-status-codes').StatusCodes

const pushService = require('./push-service')

router.post('/subscribe', async (req, res) => {
    const subscription = req.body
    const userId = req._user.id

    pushService.subscribe(userId, subscription)

    res.status(CREATED).send()
})

router.post('/send/:id', async (req, res) => {
    const userId = req.params.id
    const body = req.body

    pushService.sendPushById(userId, body)

    res.status(CREATED).send()
})


module.exports = router