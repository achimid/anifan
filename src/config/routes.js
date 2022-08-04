const healthcheck = require('./healthcheck')
const home = require('../home/home-controller')
const post = require('../post/post-controller')
const detail = require('../detail/detail-controller')
const push = require('../push/push-controller')
const user = require('../user/user-controller')
const auth = require('../auth/auth-middleware')

const { errorHandler } = require('./error-handler')

const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = (app) => {
    console.info(`Registrando rotas...`)

    app.use(errorHandler)
    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/home`, auth, home)
    app.use(`${prefix}/post`, auth, post)
    app.use(`${prefix}/detail`, auth, detail)
    app.use(`${prefix}/push`, auth, push)
    app.use(`${prefix}/user`, auth, user)

    console.info(`Rotas registradas com sucesso...`)

    return app
}