const healthcheck = require('./healthcheck')
const home = require('../home/home-controller')
const post = require('../post/post-controller')
const detail = require('../detail/detail-controller')
const push = require('../push/push-controller')


const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = (app) => {
    console.info(`Registrando rotas...`)

    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/home`, home)
    app.use(`${prefix}/post`, post)
    app.use(`${prefix}/detail`, detail)
    app.use(`${prefix}/push`, push)

    console.info(`Rotas registradas com sucesso...`)

    return app
}