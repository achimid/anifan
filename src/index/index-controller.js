const router = require('express').Router()
const { OK } = require('http-status-codes')

router.get('/', (req, res) => {
    console.log("Index call...")
    res.status(OK).send(require("./index-example.json"))
})

module.exports = router