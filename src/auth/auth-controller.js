const passport = require('passport')
const router = require('express').Router()

const jwt = require("jsonwebtoken")

const onAuthenticateSuccess = (req, res) => {
    jwt.sign({ user: req.user }, "secretKey", { expiresIn: "7d" },
    (err, token) => {
        if (err) return res.redirect("/")

        res.cookie('X-Anifan-Token-JWT', token)
        return res.redirect("/")
    })
}

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/', session: false }), onAuthenticateSuccess)
  

module.exports = router