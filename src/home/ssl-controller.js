const router = require('express').Router()

router.get('/.well-known/acme-challenge/7Uc3Y3mJms3xCB0J0EV7Yi1ce-U0Ls4CUpj0zXBGvX8', (req, res) => {
    res.send("7Uc3Y3mJms3xCB0J0EV7Yi1ce-U0Ls4CUpj0zXBGvX8.uKBuafrqRprc3yyxfUTmtDzw1YWdyLN_NnzUj5u_5UA")
})

module.exports = router