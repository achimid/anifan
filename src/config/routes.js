const healthcheck = require('./healthcheck')
const home = require('../home/home-controller')
const push = require('../push/push-controller')
const user = require('../user/user-controller')
const auth = require('../auth/auth-middleware')
const anime = require('../anime/anime-controller')
const integration = require('../integration/integration-controller')

const { errorHandler } = require('./error-handler')

const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = (app) => {
    console.info(`Registrando rotas...`)

    app.use(errorHandler)
    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/home`, home)
    app.use(`${prefix}/anime`, anime)
    app.use(`${prefix}/push`, auth, push)
    app.use(`${prefix}/user`, auth, user)
    app.use(`${prefix}/integration`, integration)


    console.info(`Rotas registradas com sucesso...`)

    return app
}